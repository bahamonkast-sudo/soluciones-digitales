import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_CONFIG } from '../src/config/seoConfig.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://soluciones-digitales.ai.studio';
const pages = {
  'index.html': 'home',
  'quienes-somos.html': 'quienesSomos',
  'ecosistema.html': 'ecosistema',
  'blog.html': 'blog',
  'chatbot.html': 'chatbot',
  'canal1-chatbot.html': 'canal1',
  'guardian-difusion.html': 'guardian',
  'calentador-cuentas.html': 'calentador',
  'extractor.html': 'extractor',
  'fanpage-envio-masivo.html': 'fanpage',
  'autopublisher.html': 'autopublisher',
  'auditor-estrategico.html': 'auditor',
  'auditor-sitio-web.html': 'auditorSitio',
  'tarjeta-digital.html': 'tarjeta',
  'solucionesdigitales.html': 'solucionesDigitales',
  'sitios-web.html': 'web',
  'probador-virtual.html': 'probador',
  'tienda.html': 'tienda',
  'producto.html': 'producto',
  'tutorial-botweb.html': 'tutorialBotweb',
  'tutorial-guardian-difusion.html': 'tutorialGuardian',
  'tutorial-extractor.html': 'tutorialExtractor',
  'tutorial-calentador.html': 'tutorialCalentador',
  'tutorial-ia.html': 'tutorialIA',
  'politica-privacidad.html': 'privacidad',
};

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function setMeta(html, attribute, key, value) {
  const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${safeKey}["'])[^>]*>`, 'i');
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(value)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function setCanonical(html, url) {
  const pattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeAttribute(url)}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

for (const [filename, configKey] of Object.entries(pages)) {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) continue;
  const config = SEO_CONFIG[configKey];
  const canonical = `${siteUrl}${config.path}`;
  const fullTitle = `${config.title} | Soluciones Digitales IA`;
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(fullTitle)}</title>`);
  html = setMeta(html, 'name', 'description', config.description);
  if (config.keywords) html = setMeta(html, 'name', 'keywords', config.keywords);
  html = setMeta(html, 'property', 'og:title', fullTitle);
  html = setMeta(html, 'property', 'og:description', config.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:image', `${siteUrl}${config.ogImage || '/og/og-default.jpg'}`);
  html = setMeta(html, 'name', 'twitter:title', fullTitle);
  html = setMeta(html, 'name', 'twitter:description', config.description);
  html = setMeta(html, 'name', 'twitter:image', `${siteUrl}${config.ogImage || '/og/og-default.jpg'}`);
  html = setCanonical(html, canonical);
  if (config.robots) html = setMeta(html, 'name', 'robots', config.robots);
  fs.writeFileSync(filePath, html, 'utf8');
}

const adminPath = path.join(root, 'admin-auditor.html');
for (const adminFile of ['admin-auditor.html', 'admin-pases.html']) {
  const filePath = path.join(root, adminFile);
  if (!fs.existsSync(filePath)) continue;
  let adminHtml = fs.readFileSync(filePath, 'utf8');
  adminHtml = setMeta(adminHtml, 'name', 'robots', 'noindex, nofollow');
  fs.writeFileSync(filePath, adminHtml, 'utf8');
}

console.log(`Metadatos estáticos sincronizados en ${Object.keys(pages).length} páginas públicas.`);
