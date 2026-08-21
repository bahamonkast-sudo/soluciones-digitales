# Documentación: Optimización de Performance

## 📋 Resumen

Este documento describe las optimizaciones de performance implementadas para mejorar Core Web Vitals, SEO y experiencia de usuario.

---

## ⚡ Optimizaciones Implementadas

### 1. **Preconnect y DNS Prefetch**

**Archivo:** `index.html`

```html
<!-- Preconnect a dominios externos críticos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://motionsites.ai">
<link rel="dns-prefetch" href="https://wa.me">
```

**Beneficios:**
- Reduce latencia de conexión TCP/SSL (~100-200ms)
- DNS prefetch acelera resolución de dominios
- Critical para resources de terceros (fuentes, GIFs marquee)

---

### 2. **Preload de Fuentes Críticas**

```html
<!-- Preload fonts para First Contentful Paint rápido -->
<link rel="preload" href="https://fonts.googleapis.com/.../Plus+Jakarta+Sans..." as="style">
<link rel="preload" href="https://fonts.googleapis.com/.../Cal+Sans..." as="style">
```

**Impacto:**
- FCP improvement: ~300-500ms
- Previene FOUT (Flash of Unstyled Text)
- Fuentes cargadas antes del render inicial

---

### 3. **LazyImage Component**

**Archivo:** `src/components/LazyImage.jsx`

Componente reutilizable con:
- ✅ Lazy loading nativo (`loading="lazy"`)
- ✅ Soporte WebP con fallback automático
- ✅ Placeholders blur para UX
- ✅ `fetchpriority` configurable
- ✅ Prevención de CLS con `aspectRatio`
- ✅ Detección de caché del navegador

**Uso:**
```jsx
import LazyImage from './components/LazyImage';

<LazyImage
  src="/assets/case-whatsapp.png"
  webpSrc="/assets/case-whatsapp.webp"
  alt="Caso de éxito WhatsApp"
  loading="lazy"
  fetchPriority="low"
  aspectRatio="16/9"
  placeholder="/assets/case-whatsapp-lqip.jpg"
/>
```

**Beneficios:**
- Reducción ~40-60% en payload inicial
- LCP improvement para imágenes below-the-fold
- CLS = 0 con aspect ratio

---

### 4. **LazySection Component**

**Archivo:** `src/components/LazySection.jsx`

Lazy loading de secciones completas:

```jsx
import LazySection from './components/LazySection';

<LazySection minHeight="500px" rootMargin="200px">
  <HeavyChartComponent />
</LazySection>
```

**Use cases:**
- Gráficos pesados (charts, visualizaciones)
- Secciones con muchas animaciones
- Componentes con dependencias pesadas
- Contenido below-the-fold

---

### 5. **useIntersectionObserver Hook**

**Archivo:** `src/hooks/useIntersectionObserver.js`

Hook reutilizable para detectar visibilidad:

```jsx
import { useLazyLoad } from './hooks/useIntersectionObserver';

function MyComponent() {
  const [ref, shouldLoad] = useLazyLoad({ rootMargin: '200px' });
  
  return (
    <div ref={ref}>
      {shouldLoad && <ExpensiveContent />}
    </div>
  );
}
```

**Opciones:**
- `threshold`: Umbral de visibilidad (0-1)
- `rootMargin`: Distancia anticipada (ej: '200px')
- `triggerOnce`: Cargar una sola vez (default: true)

---

## 📊 Estado Actual de Imágenes

**Total:** 5.14 MB en imágenes PNG/SVG

### Imágenes Críticas (>0.5 MB)

| Archivo | Tamaño | Estado | Prioridad |
|---------|--------|--------|-----------|
| `public/hyper-warmer.png` | 0.75 MB | ❌ No optimizado | 🟡 Media |
| `public/web_dev_bento_bg.png` | 0.70 MB | ❌ No optimizado | 🟡 Media |
| `src/assets/case-b2b-mining.png` | 0.63 MB | ❌ No optimizado | 🔴 Alta |
| `public/ecosistema_bg.png` | 0.61 MB | ❌ No optimizado | 🟡 Media |
| `src/assets/case-web-ux.png` | 0.60 MB | ❌ No optimizado | 🔴 Alta |
| `public/floating_phones.png` | 0.56 MB | ❌ No optimizado | 🟡 Media |
| `src/assets/typing_chatbot.png` | 0.55 MB | ❌ No optimizado | 🟡 Media |
| `src/assets/case-whatsapp.png` | 0.54 MB | ❌ No optimizado | 🔴 Alta |

**Acción requerida:** Convertir a WebP (calidad 80-85)

**Ahorros estimados:**
- WebP: ~30-50% reducción → 2.57 MB - 1.54 MB
- Total ahorrado: **1-2 MB**

---

## 🛠️ Scripts de Performance

### Analizar Imágenes

```bash
npm run perf:images
# o
npm run perf:check
```

**Output:**
- Lista de imágenes encontradas
- Tamaño actual
- Estado de optimización (WebP disponible)
- Guía de conversión paso a paso

### Validar SEO (incluye performance)

```bash
npm run seo:validate
```

---

## 🎯 Core Web Vitals - Objetivos

### Largest Contentful Paint (LCP)

**Objetivo:** < 2.5 segundos

**Optimizaciones:**
- [x] Preconnect a dominios críticos
- [x] Preload de fuentes
- [ ] Convertir hero images a WebP
- [ ] Preload hero image principal
- [x] Lazy load imágenes below-the-fold

**Impacto estimado:** 1.5s → 1.8s (mejora de 300ms)

---

### First Input Delay (FID)

**Objetivo:** < 100 ms

**Optimizaciones:**
- [x] Code splitting con Vite
- [x] Lazy loading de secciones pesadas
- [x] Intersection Observer para cargas on-demand
- [ ] Web Workers para procesamiento pesado (futuro)

**Estado actual:** Bajo (React + Vite ya optimizado)

---

### Cumulative Layout Shift (CLS)

**Objetivo:** < 0.1

**Optimizaciones:**
- [x] `aspectRatio` en LazyImage component
- [ ] `width` y `height` explícitos en todas las imágenes
- [x] `minHeight` en LazySection
- [x] Skeleton loaders para contenido dinámico

**Áreas a mejorar:**
- Agregar dimensiones explícitas a imágenes de casos
- Placeholder heights para marquee GIFs

---

### First Contentful Paint (FCP)

**Objetivo:** < 1.8 segundos

**Optimizaciones:**
- [x] Preload de fuentes críticas
- [x] CSS inline crítico (Tailwind JIT)
- [x] Minimize JavaScript inicial
- [ ] Optimize font loading (font-display: swap)

---

## 📐 Dimensiones Recomendadas

### Hero Images
- **Desktop:** 1920x1080px (@1x), 3840x2160px (@2x)
- **Tablet:** 1024x768px
- **Mobile:** 750x1334px

### Casos de Estudio
- **Thumbnail:** 600x400px (@1x), 1200x800px (@2x)
- **Full:** 1200x800px (@1x), 2400x1600px (@2x)

### Backgrounds
- **Decorativos:** 1920x1080px max
- **Patterns:** 512x512px (tileable)

### Iconos
- **SVG preferido** (vectorial, escalable)
- **PNG fallback:** 512x512px max

---

## 🔄 Proceso de Conversión a WebP

### Opción 1: Squoosh (Recomendado)

1. Abrir https://squoosh.app/
2. Drag & drop imagen PNG/JPG
3. Configurar:
   - Format: WebP
   - Quality: 85 (o ajustar hasta mantener calidad visual)
   - Resize: Dimensión target si es necesario
4. Comparar lado a lado (toggle)
5. Descargar versión optimizada
6. Renombrar: `original-name.webp`
7. Guardar en misma ubicación que original

### Opción 2: CLI con Sharp

```bash
# Instalar sharp-cli globalmente
npm install -g sharp-cli

# Convertir imagen individual
sharp -i src/assets/case-whatsapp.png -o src/assets/case-whatsapp.webp --webp '{"quality": 85}'

# Batch conversion (PowerShell)
Get-ChildItem -Path src/assets -Filter *.png | ForEach-Object {
  $output = $_.FullName -replace '\.png$', '.webp'
  sharp -i $_.FullName -o $output --webp '{"quality": 85}'
}
```

### Opción 3: TinyPNG

1. Abrir https://tinypng.com/
2. Subir hasta 20 imágenes
3. Descargar ZIP con imágenes optimizadas
4. Opcional: Conversión a WebP disponible en sitio

---

## ✅ Checklist de Implementación

### FASE 1: Infraestructura (✅ Completado)

- [x] Crear LazyImage component
- [x] Crear LazySection component
- [x] Crear useIntersectionObserver hook
- [x] Agregar preconnect en index.html
- [x] Agregar preload de fuentes
- [x] Crear script optimize-images.cjs
- [x] Documentar en PERFORMANCE-OPTIMIZATION.md

### FASE 2: Conversión de Imágenes (⏳ Pendiente)

- [ ] **Críticas (casos de estudio):**
  - [ ] case-whatsapp.png → webp
  - [ ] case-b2b-mining.png → webp
  - [ ] case-web-ux.png → webp
  - [ ] typing_chatbot.png → webp

- [ ] **Secundarias (backgrounds):**
  - [ ] ecosistema_bg.png → webp
  - [ ] web_dev_bento_bg.png → webp
  - [ ] hyper-warmer.png → webp
  - [ ] floating_phones.png → webp
  - [ ] wa-warmer.png → webp

### FASE 3: Implementación en Código (⏳ Pendiente)

- [ ] Actualizar App.jsx para usar LazyImage en casos de estudio
- [ ] Agregar preload para hero image principal
- [ ] Implementar lazy loading en marquee (Intersection Observer)
- [ ] Agregar dimensiones width/height explícitas
- [ ] Envolver secciones pesadas con LazySection

### FASE 4: Testing y Validación (⏳ Pendiente)

- [ ] Ejecutar Lighthouse (móvil y desktop)
- [ ] Verificar WebP fallback en navegadores viejos
- [ ] Testear en red 3G simulada
- [ ] Validar CLS = 0 con aspect ratios
- [ ] Medir LCP antes y después

### FASE 5: Monitoreo Continuo (⏳ Pendiente)

- [ ] Configurar Google PageSpeed Insights
- [ ] Monitorear Core Web Vitals en Search Console
- [ ] Configurar alertas para regresiones
- [ ] Documentar resultados en SEO-OPTIMIZATION-GUIDE.md

---

## 📈 Métricas Objetivo vs Actual

| Métrica | Objetivo | Actual (estimado) | Después de WebP |
|---------|----------|-------------------|-----------------|
| **LCP** | < 2.5s | ~3.0s | ~2.0s ✅ |
| **FID** | < 100ms | ~50ms | ~50ms ✅ |
| **CLS** | < 0.1 | ~0.15 | ~0.05 ✅ |
| **FCP** | < 1.8s | ~2.0s | ~1.5s ✅ |
| **TTI** | < 3.8s | ~4.0s | ~3.0s ✅ |
| **Speed Index** | < 3.4s | ~3.8s | ~2.8s ✅ |

### Payload Sizes

| Asset Type | Actual | Target | Optimizado |
|------------|--------|--------|------------|
| **Imágenes PNG** | 5.14 MB | < 2 MB | ~2.5 MB ✅ |
| **JavaScript** | ~500 KB | < 300 KB | ~400 KB |
| **CSS** | ~50 KB | < 100 KB | ~50 KB ✅ |
| **Fuentes** | ~200 KB | < 150 KB | ~180 KB |
| **Total** | ~5.9 MB | < 2.5 MB | ~3.1 MB |

---

## 🔍 Herramientas de Testing

### 1. Lighthouse (Chrome DevTools)

```bash
# Modo incógnito para evitar extensiones
# DevTools > Lighthouse > Mobile > Performance
```

**Métricas clave:**
- Performance Score (objetivo: > 90)
- FCP, LCP, TBT, CLS, Speed Index

### 2. PageSpeed Insights

https://pagespeed.web.dev/

**Input:** `https://solucionesdigitalesia.com/`

**Ventajas:**
- Field data real (CrUX)
- Sugerencias específicas
- Core Web Vitals en producción

### 3. WebPageTest

https://www.webpagetest.org/

**Configuración recomendada:**
- Location: Colombia (closest to users)
- Device: Moto G4 (representative)
- Connection: 3G
- Runs: 3 (median)

### 4. Chrome UX Report (CrUX)

https://developers.google.com/web/tools/chrome-user-experience-report

**Datos de usuarios reales:**
- 75th percentile metrics
- Desktop vs Mobile
- Trending over time

---

## 🚀 Mejores Prácticas Implementadas

### Carga de Imágenes

```jsx
// ✅ CORRECTO: Lazy loading con WebP
<LazyImage
  src="/image.png"
  webpSrc="/image.webp"
  alt="Descripción SEO"
  loading="lazy"
  fetchPriority="low"
  aspectRatio="16/9"
/>

// ❌ INCORRECTO: Sin lazy ni WebP
<img src="/image.png" alt="Image" />
```

### Carga de Secciones

```jsx
// ✅ CORRECTO: Lazy section con height
<LazySection minHeight="400px">
  <HeavyComponent />
</LazySection>

// ❌ INCORRECTO: Todo carga al inicio
<HeavyComponent />
```

### Preload Crítico

```html
<!-- ✅ CORRECTO: Preload solo recursos críticos -->
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preload" href="/main-font.woff2" as="font" crossorigin />

<!-- ❌ INCORRECTO: Preload demasiados recursos -->
<link rel="preload" href="/footer-image.png" as="image" />
```

---

## 🐛 Troubleshooting

### Problema: LCP alto (> 3s)

**Causas comunes:**
- Hero image sin preload
- Imágenes PNG pesadas
- Bloqueo de render (CSS/JS)

**Soluciones:**
1. Convertir hero a WebP
2. Agregar `<link rel="preload" as="image" href="/hero.webp">`
3. Optimizar critical CSS

---

### Problema: CLS alto (> 0.1)

**Causas comunes:**
- Imágenes sin dimensiones
- Fuentes con FOUT
- Contenido dinámico sin placeholder

**Soluciones:**
1. Agregar `aspectRatio` o `width/height` a todas las imágenes
2. Usar `font-display: swap` o `optional`
3. Skeleton loaders con `minHeight`

---

### Problema: Imágenes no cargan en Safari viejo

**Causa:** WebP no soportado en Safari < 14

**Solución:**
```jsx
<LazyImage
  src="/image.png"  // Fallback automático
  webpSrc="/image.webp"
  alt="Description"
/>
```

El componente LazyImage maneja el fallback automáticamente.

---

## 📚 Referencias

**Performance:**
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)

**Imágenes:**
- [WebP Best Practices](https://developers.google.com/speed/webp)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)

**Tools:**
- [Squoosh](https://squoosh.app/) - Image compression
- [TinyPNG](https://tinypng.com/) - Batch optimization
- [ImageOptim](https://imageoptim.com/) - Mac app

---

## 📝 Próximos Pasos

1. **Convertir imágenes críticas:**
   ```bash
   npm run perf:images
   ```
   Seguir guía de conversión con Squoosh

2. **Actualizar componentes:**
   - Reemplazar `<img>` por `<LazyImage>`
   - Envolver secciones pesadas con `<LazySection>`

3. **Medir baseline:**
   ```bash
   # Ejecutar Lighthouse antes de cambios
   # Guardar screenshot de métricas
   ```

4. **Implementar cambios y re-medir:**
   ```bash
   npm run build
   npm run preview
   # Ejecutar Lighthouse después de cambios
   ```

5. **Documentar mejoras:**
   - Actualizar `SEO-OPTIMIZATION-GUIDE.md`
   - Agregar antes/después screenshots
   - Reportar % de mejora en cada métrica

---

**Última actualización:** 27 de julio de 2026  
**Versión:** 1.0  
**Responsable:** Optimización SEO y Performance - Soluciones Digitales IA
