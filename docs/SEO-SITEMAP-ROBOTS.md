# Documentación: Sitemap.xml y Robots.txt

## 📋 Resumen

Este documento describe la configuración y mantenimiento de `sitemap.xml` y `robots.txt` para optimización SEO del sitio.

---

## 📄 Sitemap.xml

### Ubicación
```
public/sitemap.xml
```

### Características
- **22 URLs indexadas** organizadas por prioridad SEO
- **Actualización automática** con fecha lastmod
- **Prioridades optimizadas** según tipo de contenido
- **Changefreq estratégico** para crawling eficiente

### Estructura de Prioridades

| Tipo de Página | Priority | Changefreq | Ejemplos |
|----------------|----------|------------|----------|
| Homepage | 1.0 | weekly | `/` |
| Productos principales | 0.95 | weekly | `/chatbot`, `/guardian-difusion`, `/extractor` |
| Institucionales | 0.9 | monthly | `/quienes-somos`, `/ecosistema` |
| E-commerce | 0.85 | weekly | `/tienda` |
| Productos secundarios | 0.8 | monthly | `/calentador-cuentas`, `/fanpage-envio-masivo` |
| Blog | 0.8 | weekly | `/blog` |
| Tutoriales | 0.7 | monthly | `/tutorial-botweb`, `/tutorial-ia` |
| Páginas legales | 0.3 | yearly | `/politica-privacidad` |
| Admin | 0.1 | yearly | `/admin-auditor` |

### URLs Indexadas (22 total)

**Homepage:**
- `/` - Priority 1.0

**Productos Principales (7):**
- `/chatbot` - BotWeb IA
- `/guardian-difusion` - WhatsApp Automation
- `/extractor` - Minería de Datos B2B
- `/auditor-estrategico` - Auditoría SEO Estratégica
- `/auditor-sitio-web` - Auditor de Sitios Web
- `/tarjeta-digital` - Tarjeta Digital
- `/sitios-web` - Desarrollo Web

**Institucionales (3):**
- `/quienes-somos`
- `/ecosistema`
- `/blog`

**Productos Secundarios (4):**
- `/canal1-chatbot`
- `/calentador-cuentas`
- `/fanpage-envio-masivo`
- `/probador-virtual`

**E-commerce (2):**
- `/tienda`
- `/producto`

**Tutoriales (3):**
- `/tutorial-botweb`
- `/tutorial-guardian-difusion`
- `/tutorial-ia`

**Legales (1):**
- `/politica-privacidad`

**Admin (1):**
- `/admin-auditor`

---

## 🤖 Robots.txt

### Ubicación
```
public/robots.txt
```

### Reglas Implementadas

#### ✅ Permitir
```
User-agent: *
Allow: /
```

**Assets críticos explícitamente permitidos:**
- `/assets/` - Recursos estáticos
- `*.css` - Hojas de estilo
- `*.js` - JavaScript (excepto temporales)
- `*.png, *.jpg, *.jpeg, *.gif, *.webp, *.svg` - Imágenes
- `*.ico` - Favicons
- `*.woff, *.woff2` - Fuentes

#### 🚫 Bloquear

**Directorios administrativos:**
- `/admin-auditor` - Panel de administración
- `/reportes/` - Reportes privados
- `/api/` - Endpoints API

**Archivos sensibles:**
- `*.json` - Configuraciones
- `*.cjs` - Scripts de servidor
- `*.bat` - Scripts de sistema
- `*.log` - Logs
- `*.md` - Documentación interna
- `/temp*.js` - Archivos temporales

**Directorios de desarrollo:**
- `/node_modules/`
- `/dist/`
- `/.agents/`

#### 🎯 Bots Específicos

**Google:**
```
User-agent: Googlebot
Allow: /
Disallow: /admin-auditor
Disallow: /reportes/
```

**Google Images:**
```
User-agent: Googlebot-Image
Allow: /assets/
Allow: /*.png$
Allow: /*.jpg$
# ... (todas las imágenes)
```

**Redes Sociales (Open Graph):**
```
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /
```

**Bots Maliciosos Bloqueados:**
- `AhrefsBot` - Scraper SEO
- `SemrushBot` - Scraper SEO
- `MJ12bot` - Bot agresivo
- `DotBot` - Bot no deseado

#### ⏱️ Crawl Delay
```
Crawl-delay: 1
```
Delay de 1 segundo entre requests para evitar sobrecarga del servidor.

---

## 🛠️ Scripts de Mantenimiento

### Generar Sitemap
```bash
npm run seo:sitemap
```
Genera `public/sitemap.xml` automáticamente desde la configuración en `scripts/generate-sitemap.cjs`.

### Validar Archivos SEO
```bash
npm run seo:validate
# o
npm run seo:check
```

Valida:
- ✓ Sintaxis XML del sitemap
- ✓ URLs válidas y dominio correcto
- ✓ Prioridades (0.0-1.0)
- ✓ Changefreq válidos
- ✓ Referencia a sitemap en robots.txt
- ✓ Sintaxis de robots.txt
- ✓ Permisos de archivos

### Salida de Validación
```
═══════════════════════════════════════════════
   🔍 VALIDADOR DE ARCHIVOS SEO
═══════════════════════════════════════════════

📄 VALIDACIÓN SITEMAP.XML
✓ 22 URLs encontradas
✓ Todas las URLs usan el dominio correcto
✓ Todas las prioridades son válidas
✓ Todos los changefreq son válidos
ℹ Tamaño del archivo: 4.50KB

🤖 VALIDACIÓN ROBOTS.TXT
✓ Directivas User-agent presentes
✓ Referencia a sitemap.xml correcta
✓ Sintaxis de directivas correcta
ℹ 25 reglas Allow, 18 reglas Disallow

✓ Todos los archivos SEO son válidos ✨
```

---

## 📝 Cómo Agregar Nueva Página al Sitemap

### Opción 1: Script Automático (Recomendado)

Editar `scripts/generate-sitemap.cjs`:

```javascript
{
  loc: '/nueva-pagina',
  priority: 0.8,
  changefreq: 'weekly',
  category: 'Producto Principal'
}
```

Luego ejecutar:
```bash
npm run seo:sitemap
npm run seo:validate
```

### Opción 2: Edición Manual

Editar `public/sitemap.xml`:

```xml
<url>
  <loc>https://solucionesdigitalesia.com/nueva-pagina</loc>
  <lastmod>2026-07-27</lastmod>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>
```

**⚠️ Importante:** Mantener formato XML válido y actualizar `<lastmod>`.

---

## 🔍 Testing y Verificación

### Google Search Console

1. **Enviar Sitemap:**
   ```
   https://solucionesdigitalesia.com/sitemap.xml
   ```

2. **Probar Robots.txt:**
   ```
   https://search.google.com/search-console/robots-txt
   ```

3. **Verificar Indexación:**
   ```
   site:solucionesdigitalesia.com
   ```

### Herramientas Externas

**Validadores XML:**
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://validator.w3.org/

**Testers de Robots.txt:**
- https://support.google.com/webmasters/answer/6062598
- Google Search Console > robots.txt Tester

**Validadores SEO:**
- https://www.seoptimer.com/
- https://sitechecker.pro/

---

## 📊 Métricas a Monitorear

### Google Search Console

**Cobertura:**
- URLs enviadas vs. indexadas
- Errores de rastreo
- URLs bloqueadas por robots.txt

**Rendimiento:**
- Impresiones por página
- CTR por URL
- Posiciones promedio

**Sitemap:**
- Fecha del último rastreo
- URLs descubiertas
- URLs excluidas

### Analytics

**Tráfico Orgánico:**
- Páginas de entrada desde búsqueda
- Keywords principales por página
- Tiempo en página desde búsqueda

**Conversiones:**
- Objetivos completados por fuente orgánica
- Eventos desde páginas indexadas

---

## 🚀 Mejores Prácticas

### Actualización del Sitemap

**Cuando actualizar:**
- ✅ Nueva página agregada
- ✅ Página eliminada o renombrada
- ✅ Cambio de prioridad SEO
- ✅ Actualización mayor de contenido
- ✅ Cambio en estructura del sitio

**Frecuencia recomendada:**
- Productos/Landing pages: Actualizar `lastmod` semanalmente
- Blog posts: Actualizar `lastmod` al publicar/editar
- Institucionales: Revisar mensualmente

### Robots.txt

**No bloquear:**
- ❌ CSS crítico (afecta rendering de Google)
- ❌ JavaScript de aplicación
- ❌ Imágenes importantes
- ❌ Páginas públicas principales

**Sí bloquear:**
- ✅ Paneles de admin
- ✅ APIs internas
- ✅ Archivos temporales
- ✅ Recursos privados

---

## 🔗 Integración con Google

### 1. Verificar Propiedad del Sitio

**Método de verificación HTML:**
```html
<!-- En index.html -->
<meta name="google-site-verification" content="TU_CODIGO_AQUI" />
```

### 2. Enviar Sitemap

Google Search Console > Sitemaps:
```
https://solucionesdigitalesia.com/sitemap.xml
```

### 3. Monitorear Errores

Revisar semanalmente:
- Coverage > Excluded
- Coverage > Error
- Enhancement > Unparseable structured data

### 4. Solicitar Indexación Rápida

Para páginas urgentes:
1. URL Inspection Tool
2. Test live URL
3. Request Indexing

---

## 📈 KPIs de Éxito

### Métricas Sitemap

- **Cobertura:** >90% de URLs enviadas indexadas
- **Errores de rastreo:** <5% de URLs
- **Frecuencia de rastreo:** Sitemap leído semanalmente

### Métricas Robots.txt

- **Assets bloqueados:** 0 CSS/JS críticos
- **Respuesta correcta:** HTTP 200 en robots.txt
- **Ubicación:** Raíz del dominio

### Métricas Orgánicas

- **Impresiones:** +20% mes a mes
- **CTR orgánico:** >3% promedio
- **Páginas indexadas:** 20/22 URLs (>90%)

---

## 🔧 Troubleshooting

### Sitemap no aparece en Google Search Console

**Causas comunes:**
- Robots.txt no apunta a sitemap
- Sitemap no accesible (404)
- Sintaxis XML incorrecta
- URLs con redireccionamientos

**Solución:**
```bash
# Validar sintaxis
npm run seo:validate

# Verificar accesibilidad
curl https://solucionesdigitalesia.com/sitemap.xml

# Verificar robots.txt
curl https://solucionesdigitalesia.com/robots.txt
```

### Páginas no se indexan

**Causas comunes:**
- Bloqueadas en robots.txt
- `noindex` meta tag presente
- Contenido duplicado
- Baja calidad de contenido

**Solución:**
1. Verificar robots.txt no bloquea la página
2. Revisar meta tags `<meta name="robots">`
3. Usar URL Inspection Tool en GSC
4. Solicitar indexación manual

### Errores de cobertura

**Causas comunes:**
- URLs con parámetros no definidas en sitemap
- Redirects 301/302 no actualizados
- Soft 404s
- Server errors 5xx

**Solución:**
1. Actualizar sitemap con URLs canónicas
2. Eliminar URLs redireccionadas del sitemap
3. Verificar server responses con `curl -I`

---

## 🎯 Checklist de Implementación

### Setup Inicial
- [x] Crear `public/sitemap.xml`
- [x] Crear `public/robots.txt`
- [x] Agregar todas las URLs principales (22)
- [x] Configurar prioridades correctas
- [x] Bloquear directorios sensibles
- [x] Permitir assets críticos

### Scripts y Herramientas
- [x] Crear `scripts/generate-sitemap.cjs`
- [x] Crear `scripts/validate-seo-files.cjs`
- [x] Agregar npm scripts (`seo:sitemap`, `seo:validate`)
- [x] Documentar proceso en `docs/SEO-SITEMAP-ROBOTS.md`

### Validación
- [x] Ejecutar validador local
- [ ] Verificar en Google Search Console
- [ ] Probar robots.txt tester
- [ ] Validar XML en validador online

### Integración Google
- [ ] Enviar sitemap a Google Search Console
- [ ] Configurar alertas de errores de rastreo
- [ ] Monitorear cobertura semanal
- [ ] Configurar reporting automático

### Mantenimiento
- [ ] Configurar revisión mensual del sitemap
- [ ] Actualizar `lastmod` al cambiar contenido
- [ ] Agregar nuevas páginas al script generador
- [ ] Revisar métricas GSC semanalmente

---

## 📚 Referencias

**Documentación Oficial:**
- [Google: Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google: Robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Central](https://developers.google.com/search)

**Guías SEO:**
- [Moz: Sitemap Best Practices](https://moz.com/learn/seo/xml-sitemap)
- [Ahrefs: Robots.txt Guide](https://ahrefs.com/blog/robots-txt/)

**Herramientas:**
- [XML Sitemap Validator](https://www.xml-sitemaps.com/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

**Última actualización:** 27 de julio de 2026  
**Versión:** 1.0  
**Autor:** Optimización SEO - Soluciones Digitales IA
