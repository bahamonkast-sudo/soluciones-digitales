# ⚠️ ADVERTENCIA CRÍTICA — WBSD vs VCARD-STUDIO-BUILDER

**Casi infarto evitado:** `http://localhost:5173/index.html` mostraba **VCARD STUDIO BUILDER** en lugar de **WBSD (Soluciones Digitales)** porque ambos proyectos competían por el puerto `5173`.

## Causa
- WBSD: `C:\consola_maestra\Proyectos\websd` → `vite` puerto `5173` (strictPort: true)
- VCARD-BUILDER: `C:\consola_maestra\Proyectos\vcard-studio-builder` → también `vite` puerto `5173`
- El que arranca primero gana el puerto. El segundo falla o el usuario ve la página equivocada sin darse cuenta.

## Solución permanente implementada
1. **`vite.config.js:63`** → `server.port: 5173, strictPort: true` — si 5173 está ocupado, Vite **no** cambia silenciosamente a 5174, **falla** y te obliga a cerrar el culpable.
2. **`scripts/check-port-advertencia.cjs`** → corre antes de `vite` (`package.json:7` `dev: node scripts/check-port-advertencia.cjs; vite`). Si 5173 está ocupado, imprime advertencia gigante con `netstat` y cómo arreglarlo, **antes** de que veas la página equivocada.
3. **Regla de uso:**
   - WBSD siempre en `5173`: `npm run dev` desde `websd`
   - VCARD-BUILDER siempre en `5174`: `npm run dev -- --port 5174` desde `vcard-studio-builder`

## Cómo lanzar correctamente
```powershell
# Terminal 1 — WBSD
cd C:\consola_maestra\Proyectos\websd
npm run dev
# → http://localhost:5173/index.html  (SOLUCIONES DIGITALES IA)

# Terminal 2 — VCARD (solo si lo necesitas, otro puerto)
cd C:\consola_maestra\Proyectos\vcard-studio-builder
npm run dev -- --port 5174
# → http://localhost:5174/index.html  (VCARD STUDIO BUILDER)
```

## Si ves VCARD en 5173 de nuevo
```powershell
netstat -ano | findstr :5173
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force
```
