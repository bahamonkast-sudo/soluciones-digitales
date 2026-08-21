/**
 * optimize-images.cjs
 * Script para documentar optimización de imágenes
 * 
 * Este script proporciona guías para optimizar imágenes manualmente
 * ya que la conversión automática requiere dependencias pesadas.
 * 
 * Uso: node scripts/optimize-images.cjs
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║            📸 GUÍA DE OPTIMIZACIÓN DE IMÁGENES                ║
╚═══════════════════════════════════════════════════════════════╝

🎯 OBJETIVO: Reducir tamaño de imágenes sin perder calidad visual

═══════════════════════════════════════════════════════════════

📊 FORMATOS RECOMENDADOS:

1. **WebP** (Formato moderno, ~30% más liviano que JPG/PNG)
   - Soporte: Chrome, Firefox, Edge, Safari 14+
   - Ideal para: todas las imágenes del sitio

2. **AVIF** (Siguiente generación, ~50% más liviano que JPG)
   - Soporte: Chrome 85+, Firefox 93+, Safari 16+
   - Ideal para: hero images, casos de estudio

3. **Fallbacks**: Siempre mantener JPG/PNG original

═══════════════════════════════════════════════════════════════

🛠️ HERRAMIENTAS DE CONVERSIÓN:

**Opción 1: Squoosh (Online, gratis, recomendado)**
https://squoosh.app/
- Drag & drop tus imágenes
- Seleccionar WebP con calidad 80-85
- Comparar lado a lado
- Descargar versión optimizada

**Opción 2: ImageOptim (Mac, gratis)**
https://imageoptim.com/
- Arrastrar carpeta de imágenes
- Optimización automática sin pérdida de calidad

**Opción 3: TinyPNG (Online, batch hasta 20 imágenes)**
https://tinypng.com/
- WebP y PNG optimizados
- API disponible para automatización

**Opción 4: CLI con Sharp (Node.js)**
npm install -g sharp-cli
sharp -i input.jpg -o output.webp --webp '{"quality": 85}'

═══════════════════════════════════════════════════════════════

📁 IMÁGENES DEL PROYECTO A OPTIMIZAR:

🔴 **Críticas (Hero / Above the fold):**
   src/assets/case-whatsapp.png
   src/assets/case-b2b-mining.png
   src/assets/case-web-ux.png
   
   Acción:
   1. Convertir a WebP (calidad 85)
   2. Crear versiones @2x para pantallas Retina
   3. Agregar placeholders LQIP (10x10px, blur)

🟡 **Secundarias (Below the fold):**
   public/ecosistema_bg.png
   public/floating_phones.png
   public/hyper-warmer.png
   public/wa-warmer.png
   public/web_dev_bento_bg.png
   
   Acción:
   1. Convertir a WebP (calidad 80)
   2. Implementar lazy loading nativo

🟢 **Decorativas (GIFs del marquee):**
   - Ya están hosteadas externamente en motionsites.ai
   - Verificar que tengan lazy loading
   - Considerar intersection observer para cargar on-demand

═══════════════════════════════════════════════════════════════

📐 DIMENSIONES RECOMENDADAS:

**Hero Images:**
- Desktop: 1920x1080px
- Mobile: 750x1334px
- Tablet: 1024x768px

**Casos de Estudio:**
- Card thumbnail: 600x400px @1x, 1200x800px @2x
- Full image: 1200x800px @1x, 2400x1600px @2x

**Iconos / Logos:**
- SVG (vectorial) cuando sea posible
- PNG solo para logos complejos
- Dimensión máxima: 512x512px

═══════════════════════════════════════════════════════════════

⚡ CONFIGURACIÓN EN CÓDIGO:

Implementado en el proyecto:

1. **LazyImage Component** (src/components/LazyImage.jsx)
   <LazyImage
     src="/assets/case-whatsapp.png"
     webpSrc="/assets/case-whatsapp.webp"
     alt="Caso WhatsApp"
     loading="lazy"
     fetchPriority="low"
   />

2. **LazySection Component** (src/components/LazySection.jsx)
   <LazySection minHeight="500px">
     <HeavyComponent />
   </LazySection>

3. **Preload crítico en index.html:**
   <link rel="preload" as="image" href="/hero-image.webp" />

═══════════════════════════════════════════════════════════════

📈 MÉTRICAS A MONITOREAR:

**Lighthouse Performance:**
- Largest Contentful Paint (LCP): < 2.5s
- First Contentful Paint (FCP): < 1.8s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms

**PageSpeed Insights:**
- Reducir imágenes sin dimensiones explícitas
- Servir imágenes en formatos de próxima generación
- Diferir imágenes fuera de pantalla

**Ahorros estimados:**
- WebP vs PNG: ~30-50% reducción
- WebP vs JPG: ~25-35% reducción
- Lazy loading: ~40-60% reducción en carga inicial

═══════════════════════════════════════════════════════════════

✅ CHECKLIST DE OPTIMIZACIÓN:

FASE 1: Conversión
[ ] Convertir case-whatsapp.png → case-whatsapp.webp
[ ] Convertir case-b2b-mining.png → case-b2b-mining.webp
[ ] Convertir case-web-ux.png → case-web-ux.webp
[ ] Convertir ecosistema_bg.png → ecosistema_bg.webp
[ ] Convertir floating_phones.png → floating_phones.webp

FASE 2: Implementación
[ ] Actualizar imports en componentes para usar LazyImage
[ ] Agregar preload para hero images
[ ] Implementar lazy loading en marquee GIFs
[ ] Agregar dimensiones width/height para prevenir CLS

FASE 3: Testing
[ ] Ejecutar Lighthouse en modo incógnito
[ ] Verificar carga en red 3G simulada
[ ] Testear en dispositivos móviles reales
[ ] Validar que fallbacks funcionen en navegadores antiguos

FASE 4: Monitoreo
[ ] Configurar Google PageSpeed Insights
[ ] Monitorear Core Web Vitals en Google Search Console
[ ] Configurar alertas para regresiones de performance

═══════════════════════════════════════════════════════════════

🔗 RECURSOS ADICIONALES:

- Web.dev Performance: https://web.dev/performance/
- WebP Best Practices: https://developers.google.com/speed/webp
- Image Optimization Guide: https://web.dev/fast/#optimize-your-images
- Lazy Loading: https://web.dev/lazy-loading-images/
- Core Web Vitals: https://web.dev/vitals/

═══════════════════════════════════════════════════════════════

📝 PRÓXIMOS PASOS:

1. Ejecutar: npm run seo:check
2. Convertir imágenes críticas con Squoosh
3. Actualizar componentes para usar LazyImage
4. Medir mejoras con Lighthouse
5. Documentar resultados en SEO-OPTIMIZATION-GUIDE.md

═══════════════════════════════════════════════════════════════
`);

// Detectar imágenes en el proyecto
function findImages() {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  const directories = ['src/assets', 'public'];
  const foundImages = [];

  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(path.join(process.cwd(), filePath));
          const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
          foundImages.push({ path: filePath, size: sizeMB, ext });
        }
      });
    }
  });

  return foundImages;
}

const images = findImages();

if (images.length > 0) {
  console.log('\n📦 IMÁGENES ENCONTRADAS EN EL PROYECTO:\n');
  
  images.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
  
  images.forEach(img => {
    const sizeNum = parseFloat(img.size);
    const icon = sizeNum > 1 ? '🔴' : sizeNum > 0.5 ? '🟡' : '🟢';
    const hasWebP = images.some(i => i.path === img.path.replace(/\.(png|jpg|jpeg)$/, '.webp'));
    const status = hasWebP ? '✓ WebP' : img.ext === '.webp' ? '(WebP)' : '❌ No optimizado';
    
    console.log(`${icon} ${img.path.padEnd(40)} ${img.size.padStart(6)} MB   ${status}`);
  });
  
  const totalSize = images.reduce((sum, img) => sum + parseFloat(img.size), 0);
  console.log(`\n   Total: ${totalSize.toFixed(2)} MB\n`);
  
  const unoptimized = images.filter(img => 
    ['.png', '.jpg', '.jpeg'].includes(img.ext) && 
    !images.some(i => i.path === img.path.replace(/\.(png|jpg|jpeg)$/, '.webp'))
  );
  
  if (unoptimized.length > 0) {
    console.log(`⚠️  ${unoptimized.length} imagen(es) sin versión WebP optimizada\n`);
  } else {
    console.log(`✅ Todas las imágenes tienen versión WebP\n`);
  }
} else {
  console.log('\n📦 No se encontraron imágenes en src/assets/ ni public/\n');
}

console.log('═══════════════════════════════════════════════════════════════\n');
