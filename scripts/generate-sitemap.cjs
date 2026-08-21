/**
 * generate-sitemap.cjs
 * Generador automático de sitemap.xml optimizado para SEO
 * 
 * Uso: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuración base
const BASE_URL = 'https://solucionesdigitalesia.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const TODAY = new Date().toISOString().split('T')[0];

/**
 * Estructura de URLs del sitio con metadata SEO
 */
const SITE_STRUCTURE = [
  // Homepage - Máxima prioridad
  {
    loc: '/',
    priority: 1.0,
    changefreq: 'weekly',
    category: 'Homepage'
  },

  // Páginas institucionales - Alta prioridad
  {
    loc: '/quienes-somos',
    priority: 0.9,
    changefreq: 'monthly',
    category: 'Institucional'
  },
  {
    loc: '/ecosistema',
    priority: 0.9,
    changefreq: 'monthly',
    category: 'Institucional'
  },
  {
    loc: '/blog',
    priority: 0.8,
    changefreq: 'weekly',
    category: 'Institucional'
  },

  // Productos principales - Alta prioridad SEO
  {
    loc: '/chatbot',
    priority: 0.95,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/guardian-difusion',
    priority: 0.95,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/extractor',
    priority: 0.95,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/auditor-estrategico',
    priority: 0.95,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/auditor-sitio-web',
    priority: 0.95,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/tarjeta-digital',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },
  {
    loc: '/sitios-web',
    priority: 0.9,
    changefreq: 'weekly',
    category: 'Producto Principal'
  },

  // Productos secundarios
  {
    loc: '/canal1-chatbot',
    priority: 0.8,
    changefreq: 'monthly',
    category: 'Producto Secundario'
  },
  {
    loc: '/calentador-cuentas',
    priority: 0.8,
    changefreq: 'monthly',
    category: 'Producto Secundario'
  },
  {
    loc: '/fanpage-envio-masivo',
    priority: 0.8,
    changefreq: 'monthly',
    category: 'Producto Secundario'
  },
  {
    loc: '/probador-virtual',
    priority: 0.75,
    changefreq: 'monthly',
    category: 'Producto Secundario'
  },

  // E-commerce
  {
    loc: '/tienda',
    priority: 0.85,
    changefreq: 'weekly',
    category: 'E-commerce'
  },
  {
    loc: '/producto',
    priority: 0.7,
    changefreq: 'weekly',
    category: 'E-commerce'
  },

  // Tutoriales y recursos
  {
    loc: '/tutorial-botweb',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Tutorial'
  },
  {
    loc: '/tutorial-guardian-difusion',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Tutorial'
  },
  {
    loc: '/tutorial-ia',
    priority: 0.7,
    changefreq: 'monthly',
    category: 'Tutorial'
  },

  // Páginas legales
  {
    loc: '/politica-privacidad',
    priority: 0.3,
    changefreq: 'yearly',
    category: 'Legal'
  },

  // Admin (low priority)
  {
    loc: '/admin-auditor',
    priority: 0.1,
    changefreq: 'yearly',
    category: 'Admin'
  }
];

/**
 * Genera una entrada de URL para el sitemap
 */
function generateUrlEntry(url) {
  return `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
  </url>`;
}

/**
 * Genera el sitemap XML completo
 */
function generateSitemap() {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  `;

  const footer = `
</urlset>`;

  // Agrupar por categorías para mejor organización
  const grouped = SITE_STRUCTURE.reduce((acc, url) => {
    if (!acc[url.category]) {
      acc[url.category] = [];
    }
    acc[url.category].push(url);
    return acc;
  }, {});

  // Generar entradas con comentarios por categoría
  const entries = Object.entries(grouped)
    .map(([category, urls]) => {
      const categoryComment = `\n  <!-- ${category} -->`;
      const urlEntries = urls.map(generateUrlEntry).join('\n');
      return categoryComment + '\n' + urlEntries;
    })
    .join('\n');

  return header + entries + footer;
}

/**
 * Guarda el sitemap en el archivo
 */
function saveSitemap() {
  try {
    const sitemap = generateSitemap();
    
    // Crear directorio si no existe
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Escribir archivo
    fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
    
    console.log('✅ Sitemap generado exitosamente');
    console.log(`📄 Archivo: ${OUTPUT_PATH}`);
    console.log(`📊 URLs totales: ${SITE_STRUCTURE.length}`);
    console.log(`📅 Última actualización: ${TODAY}`);
    
    // Mostrar resumen por categoría
    const summary = SITE_STRUCTURE.reduce((acc, url) => {
      acc[url.category] = (acc[url.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📈 Resumen por categoría:');
    Object.entries(summary)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count} URL${count > 1 ? 's' : ''}`);
      });

  } catch (error) {
    console.error('❌ Error generando sitemap:', error.message);
    process.exit(1);
  }
}

// Ejecutar
if (require.main === module) {
  saveSitemap();
}

module.exports = { generateSitemap, SITE_STRUCTURE };
