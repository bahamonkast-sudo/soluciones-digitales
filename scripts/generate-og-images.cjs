/**
 * generate-og-images.cjs
 * Genera imágenes Open Graph 1200x630 (JPG) con identidad del sitio.
 * Uso: node scripts/generate-og-images.cjs
 * Requiere: sharp (devDependency ya instalada)
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'og');
const W = 1200;
const H = 630;

const PAGES = [
  { file: 'og-home.jpg', badge: 'AGENCIA IA · COLOMBIA', title: 'Cero Plantillas.', accent: '100% Libertad Creativa.', sub: 'Software a medida · Chatbots IA · Automatización WhatsApp' },
  { file: 'og-chatbot.jpg', badge: 'BOTWEB IA', title: 'Agente Conversacional', accent: 'que vende 24/7', sub: 'Responde, califica, agenda y vende por ti en WhatsApp' },
  { file: 'og-guardian.jpg', badge: 'WHATSAPP AUTOMATION', title: 'Guardián de Difusión', accent: 'Envío masivo seguro', sub: 'Protege tus líneas mientras escalas tu difusión comercial' },
  { file: 'og-extractor.jpg', badge: 'MINERÍA DE DATOS B2B', title: 'Extractor PLUS', accent: 'Grupos y contactos', sub: 'Minería ética de WhatsApp, sin baneos' },
  { file: 'og-sitios-web.jpg', badge: 'DESARROLLO WEB UX/UI', title: 'Sitios web', accent: 'que venden', sub: 'Landing pages, corporativos y e-commerce a medida' },
  { file: 'og-tarjeta.jpg', badge: 'NETWORKING DIGITAL', title: 'Tarjeta Digital', accent: 'Profesional interactiva', sub: 'QR, guardado en agenda y enlaces de acción' },
  { file: 'og-auditor.jpg', badge: 'DIAGNÓSTICO CON IA', title: 'Auditor Estratégico', accent: 'SEO y conversión', sub: 'Descubre qué frena tus ventas y cómo escalar' },
  { file: 'og-ecosistema.jpg', badge: 'PIPELINE DIGITAL', title: 'Ecosistema', accent: 'de conversión completo', sub: 'Extracción → Atención IA → Difusión → Ventas' },
  { file: 'og-tienda.jpg', badge: 'CATÁLOGO', title: 'Tienda', accent: 'Soluciones digitales', sub: 'Chatbots, automatización y desarrollo a medida' },
  { file: 'og-default.jpg', badge: 'SOLUCIONES DIGITALES IA', title: 'Software a medida', accent: 'con Inteligencia Artificial', sub: 'soluciones-digitales.ai.studio' },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fitSize(s, base = 92) {
  const n = s.length;
  if (n <= 12) return base;
  if (n <= 18) return 76;
  if (n <= 24) return 62;
  return 52;
}

function svgFor({ badge, title, accent, sub }) {
  const tSize = fitSize(title);
  const aSize = fitSize(accent);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="12%" r="65%">
      <stop offset="0%" stop-color="#2962ff" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#1532cb" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0B0B0F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2962ff"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0B0B0F"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="1050" cy="90" r="220" fill="#2962ff" opacity="0.12"/>
  <circle cx="1120" cy="560" r="160" fill="#22d3ee" opacity="0.10"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="120" font-size="26" letter-spacing="6" fill="#7ee8ff" font-weight="bold">${esc(badge)}</text>
    <rect x="80" y="150" width="120" height="6" rx="3" fill="url(#bar)"/>
    <text x="80" y="300" font-size="${tSize}" fill="#ffffff" font-weight="900">${esc(title)}</text>
    <text x="80" y="400" font-size="${aSize}" fill="#22d3ee" font-weight="900">${esc(accent)}</text>
    <text x="80" y="480" font-size="32" fill="#B8C4CE">${esc(sub)}</text>
    <text x="80" y="560" font-size="24" letter-spacing="3" fill="#5B6B7A">SOLUCIONES DIGITALES IA · ai.studio</text>
  </g>
</svg>`;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const p of PAGES) {
    const out = path.join(OUT_DIR, p.file);
    await sharp(Buffer.from(svgFor(p)), { density: 150 })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(out);
    const st = fs.statSync(out);
    console.log(`OK ${p.file} (${(st.size / 1024).toFixed(1)} KB)`);
  }
  console.log(`Listo: ${PAGES.length} imágenes en public/og/`);
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
