import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, renameSync, createReadStream, statSync } from 'fs'
import { resolve, join, extname } from 'path'

const MULTIDRINK_DIR = 'C:/consola_maestra/Proyectos/multidrink'
const MULTIDRINK_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

// Plugin: cache-busting para WhatsApp/Facebook + assets con hash
// - Inyecta og:updated_time y versiona og:image con timestamp de build
// - Evita que WhatsApp muestre preview viejo del mismo URL
function cacheBustingPlugin() {
  const buildTime = new Date().toISOString()
  const version = Date.now().toString(36)
  return {
    name: 'cache-busting',
    transformIndexHtml(html) {
      // 1. Insertar meta Cache-Control / Pragma / Expires si no existen
      let out = html
      if (!out.includes('http-equiv="Cache-Control"')) {
        out = out.replace('</title>', `</title>\n  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n  <meta http-equiv="Pragma" content="no-cache">\n  <meta http-equiv="Expires" content="0">`)
      }
      // 2. Insertar/actualizar og:updated_time
      if (out.includes('og:updated_time')) {
        out = out.replace(/<meta property="og:updated_time" content="[^"]*">/, `<meta property="og:updated_time" content="${buildTime}">`)
      } else {
        out = out.replace('</head>', `  <meta property="og:updated_time" content="${buildTime}">\n  <meta name="version" content="${version}">\n</head>`)
      }
      // 3. Versionar og:image y twitter:image para forzar re-scrape (solo si es ruta local)
      out = out.replace(/(<meta property="og:image" content=")([^"]+)(")/, (m, a, url, c) => {
        if (url.startsWith('http')) return m
        const sep = url.includes('?') ? '&' : '?'
        return `${a}${url}${sep}v=${version}${c}`
      })
      out = out.replace(/(<meta name="twitter:image" content=")([^"]+)(")/, (m, a, url, c) => {
        if (url.startsWith('http')) return m
        const sep = url.includes('?') ? '&' : '?'
        return `${a}${url}${sep}v=${version}${c}`
      })
      return out
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    cacheBustingPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        changeOrigin: true
      },
      '/reportes': {
        target: 'http://localhost:3006',
        changeOrigin: true
      },
      '/websd/wordpress/wp-json': {
        target: 'http://localhost',
        changeOrigin: true
      }
    },
    fs: {
      allow: [
        'C:/consola_maestra/Proyectos/websd',
        'C:/consola_maestra/Proyectos/multidrink'
      ]
    },
    middlewareMode: false,
    configureServer(server) {
      server.middlewares.use('/multidrink', (req, res, next) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0])
        let filePath
        if (urlPath === '/' || urlPath === '') {
          filePath = join(MULTIDRINK_DIR, 'index.html')
        } else {
          filePath = join(MULTIDRINK_DIR, urlPath)
        }
        let stat
        try {
          stat = statSync(filePath)
        } catch (e) {
          next()
          return
        }
        if (stat.isDirectory()) {
          filePath = join(filePath, 'index.html')
          try { stat = statSync(filePath) } catch (e) { next(); return }
        }
        res.setHeader('Content-Type', MULTIDRINK_MIME[extname(filePath).toLowerCase()] || 'application/octet-stream')
        res.setHeader('Cache-Control', 'no-cache')
        createReadStream(filePath).pipe(res)
      })
    }
  },
  base: '/',
  build: {
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: 'index.html',
        'quienes-somos': 'quienes-somos.html',
        blog: 'blog.html',
        'calentador-cuentas': 'calentador-cuentas.html',
        'guardian-difusion': 'guardian-difusion.html',
        'chatbot': 'chatbot.html',
        'canal1-chatbot': 'canal1-chatbot.html',
        'sitios-web': 'sitios-web.html',
        'probador-virtual': 'probador-virtual.html',
        'fanpage-envio-masivo': 'fanpage-envio-masivo.html',
        'autopublisher': 'autopublisher.html',
        'solucionesdigitales': 'solucionesdigitales.html',
        'tarjeta-digital': 'tarjeta-digital.html',
        'ecosistema': 'ecosistema.html',
        'extractor': 'extractor.html',
        'tienda': 'tienda.html',
        'producto': 'producto.html',
        'tutorial-ia': 'tutorial-ia.html',
        'tutorial-botweb': 'tutorial-botweb.html',
        'tutorial-guardian-difusion': 'tutorial-guardian-difusion.html',
        'tutorial-extractor': 'tutorial-extractor.html',
        'tutorial-calentador': 'tutorial-calentador.html',
        'auditor-estrategico': 'auditor-estrategico.html',
        'auditor-sitio-web': 'auditor-sitio-web.html',
        'admin-auditor': 'admin-auditor.html',
        'politica-privacidad': 'politica-privacidad.html'
      },
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    }
  }
}));
