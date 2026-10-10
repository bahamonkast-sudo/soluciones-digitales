# Contexto y Flujo Operativo: Automatización de Despliegues y Sincronización en Google AI Studio

Este documento detalla la arquitectura de sincronización entre el repositorio GitHub (`bahamonkast-sudo/soluciones-digitales`) y el entorno de Google AI Studio, junto con los procedimientos operativos estándar para evitar la pérdida de código y gestionar el dominio de producción `https://soluciones-digitales.ai.studio`.

---

## 1. Regla Crítica de Seguridad (Git & AI Studio)

* **Problema:** En el panel `GitHub Sync` de Google AI Studio, la opción `Force push to bahamonkast-sudo/soluciones-digitales master` sincroniza desde AI Studio hacia GitHub, sobreescribiendo el historial remoto.
* **Directiva:** **NUNCA** ejecutar *Force Push* desde la interfaz de AI Studio cuando existan cambios o commits nuevos en GitHub que no estén presentes en el workspace activo de AI Studio.
* **Riesgo:** Se pierde el/los último(s) commit(s) en `master` (ej: `e26a1f1 feat: tutorial Groq...`). AI Studio reemplaza `master` con su workspace local.

Opciones en AI Studio `Sync to GitHub`:
* `Sync to a new repository` → Crea repo nuevo, no afecta `soluciones-digitales`.
* `Force push to bahamonkast-sudo/soluciones-digitales / master will be replaced... overwriting 1 previous commit` → **PELIGRO**: AI Studio → GitHub, borra historial remoto.

> Fuente de verdad siempre es **GitHub `master`**. AI Studio es consumidor, no productor, salvo que se quiera fusionar primero.

---

## 2. Protocolo de Actualización y Despliegue

Para actualizar la aplicación en vivo manteniendo siempre como fuente de verdad el repositorio en GitHub:

### Fase A: Confirmación en GitHub (local → remoto)
1. Realizar los cambios locales y subirlos a la rama principal:
   ```bash
   git add .
   git commit -m "feat/fix: descripción del cambio"
   git push origin master
   ```
2. Verificar push ok: `d9a4964..e26a1f1  master -> master` en https://github.com/bahamonkast-sudo/soluciones-digitales
3. El workflow `/.github/workflows/deploy-pages.yml` se dispara automático: `checkout → setup-node → npm ci → npm run build → upload-pages-artifact → deploy-pages@v4` (dist en `vite.config.js:75`).

### Fase B: Sincronización en Google AI Studio (remoto → AI Studio)
**Objetivo:** Traer `master` de GitHub a AI Studio para desplegar en `https://soluciones-digitales.ai.studio`.

* **Si Auto-deploy ON:** No hacer nada. El webhook de AI Studio detecta el push y despliega solo en 2-3 min.
  * Ver en AI Studio: `Settings → Connected Repository → Auto-deploy on push: ON`
* **Si Auto-deploy OFF / Manual:**
  1. En AI Studio NO usar `Sync to GitHub → Force push`.
  2. Usar la dirección inversa: `Pull from GitHub` / `Import from GitHub` / `Sync from GitHub` / `File → Open from GitHub → bahamonkast-sudo/soluciones-digitales → master → Import`
  3. Alternativa terminal en AI Studio:
     ```bash
     git fetch origin master
     git status # debe mostrar 1 commit behind
     git reset --hard origin/master
     # o git merge origin/master si hay cambios locales que conservar
     ```
  4. Verificar que el último commit visible en AI Studio sea el mismo que en GitHub (`git log --oneline -3`).

### Fase C: Verificación de Dominio y Cache
* Dominio producción: `https://soluciones-digitales.ai.studio` (definido en `src/utils/env.js:10`, `scripts/generate-sitemap.cjs:12`, `public/sitemap.xml:9`, `public/robots.txt:82`)
* Tras deploy, verificar en AI Studio → **Publish / Hosting** → estado `Deployed` verde.
* Si hay Cloudflare delante (proxy): `Cloudflare Dashboard → Caching → Purge Everything` tras cada deploy.
* Hard reload cliente: `Ctrl+F5` en `https://soluciones-digitales.ai.studio/` y `https://soluciones-digitales.ai.studio/auditor-estrategico/`

### Fase D: Activación de Auto-deploy (una sola vez)
Para no repetir Fase B manual:
1. AI Studio → `Settings → Connected Repository → Auto-deploy on push: ON`
2. En el servicio integrado, configura build `npm run build`, start `npm start` y puerto `8080` (o el valor asignado en `PORT`). No lo publiques como hosting estático con salida `dist`, porque no ejecutará Next.js ni sus API.
3. Guardar → AI Studio crea webhook en GitHub `Settings → Webhooks → https://ai.studio.../webhook`

---

## 3. Checklist Rápido (antes de tocar Sync en AI Studio)

- [ ] `git status` local limpio y `git push` ya hecho
- [ ] Último commit en GitHub == último commit esperado (ej: tutorial rojo)
- [ ] En AI Studio NO clickear `Force push to master` si GitHub está adelantado
- [ ] Si duda, cancelar y hacer `Pull from GitHub` en lugar de `Sync to GitHub`

---

## 4. Recuperación ante Error (si se hizo Force push por error)

```bash
# En local (si aún tienes el commit e26a1f1):
git reflog # buscar hash perdido
git push origin master --force-with-lease # restaurar master
# En AI Studio: git fetch origin && git reset --hard origin/master
```

Guardar este doc en `docs/FLUJO-OPERATIVO-AI-STUDIO.md` para consulta futura.

## 5. TuConsultor integrado en websd

TuConsultor vive en `tuconsultor/` y se presenta en `/tuconsultor.html` con el menú y el pie de página compartidos de websd. La aplicación Next.js conserva sus rutas y API bajo `/tuconsultor/`.

- El build raíz (`npm run build`) compila primero TuConsultor y luego el sitio Vite.
- El servidor de producción (`npm start`, puerto `8080`) sirve `dist/` y Next.js bajo el mismo dominio. El `Dockerfile` configura este runtime para Cloud Run.
- Para tener respuestas IA del servidor, configura `GROQ_API_KEY` como secreto de entorno en el despliegue; la clave no va en GitHub ni en el cliente. Sin esa clave, siguen disponibles los modos locales y la clave personal opcional de Groq que usa la app.
- Configura `LEADS_TOKEN` como secreto con un valor propio antes de exponer el panel `/tuconsultor/leads`.
- GitHub Pages publica solo los archivos estáticos de `dist`; no ejecuta las rutas API de Next.js. El sitio integrado completo debe desplegarse como servicio Node/Cloud Run, con `npm run build` y `npm start`, y no en modo de alojamiento estático con salida `dist`.
