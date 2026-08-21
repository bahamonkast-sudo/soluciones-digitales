/**
 * validate-seo-files.cjs
 * Validador de sitemap.xml y robots.txt para SEO
 * 
 * Uso: node scripts/validate-seo-files.cjs
 */

const fs = require('fs');
const path = require('path');

// Paths
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const ROBOTS_PATH = path.join(__dirname, '../public/robots.txt');
const BASE_URL = 'https://soluciones-digitales.ai.studio';

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

function log(color, symbol, message) {
  console.log(`${color}${symbol} ${message}${colors.reset}`);
}

function success(msg) { log(colors.green, '✓', msg); }
function error(msg) { log(colors.red, '✗', msg); }
function warning(msg) { log(colors.yellow, '⚠', msg); }
function info(msg) { log(colors.blue, 'ℹ', msg); }

/**
 * Valida el sitemap.xml
 */
function validateSitemap() {
  console.log(`\n${colors.bold}📄 VALIDACIÓN SITEMAP.XML${colors.reset}\n`);
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    error('Sitemap no encontrado en ' + SITEMAP_PATH);
    return false;
  }

  const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
  let valid = true;

  // 1. Verificar XML bien formado
  if (!content.includes('<?xml version="1.0"')) {
    error('Falta declaración XML');
    valid = false;
  } else {
    success('Declaración XML presente');
  }

  // 2. Verificar namespace correcto
  if (!content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    error('Namespace de sitemap incorrecto o faltante');
    valid = false;
  } else {
    success('Namespace correcto');
  }

  // 3. Contar URLs
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  if (urlCount === 0) {
    error('No se encontraron URLs en el sitemap');
    valid = false;
  } else if (urlCount > 50000) {
    warning(`Sitemap tiene ${urlCount} URLs (máximo recomendado: 50,000)`);
  } else {
    success(`${urlCount} URLs encontradas`);
  }

  // 4. Verificar que todas las URLs tengan el BASE_URL correcto
  const locMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  const invalidUrls = locMatches.filter(loc => !loc.includes(BASE_URL));
  
  if (invalidUrls.length > 0) {
    error(`${invalidUrls.length} URLs con dominio incorrecto`);
    invalidUrls.slice(0, 3).forEach(url => console.log(`    ${url}`));
    valid = false;
  } else {
    success('Todas las URLs usan el dominio correcto');
  }

  // 5. Verificar etiquetas requeridas
  const requiredTags = ['loc', 'lastmod', 'priority', 'changefreq'];
  requiredTags.forEach(tag => {
    if (content.includes(`<${tag}>`)) {
      success(`Etiqueta <${tag}> presente`);
    } else {
      warning(`Etiqueta <${tag}> no encontrada (recomendada)`);
    }
  });

  // 6. Verificar valores de priority válidos
  const priorities = content.match(/<priority>(.*?)<\/priority>/g) || [];
  const invalidPriorities = priorities.filter(p => {
    const val = parseFloat(p.match(/>(.*?)</)[1]);
    return isNaN(val) || val < 0 || val > 1;
  });

  if (invalidPriorities.length > 0) {
    error(`${invalidPriorities.length} prioridades inválidas (debe ser 0.0-1.0)`);
    valid = false;
  } else {
    success('Todas las prioridades son válidas');
  }

  // 7. Verificar changefreq válidos
  const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  const changefreqs = content.match(/<changefreq>(.*?)<\/changefreq>/g) || [];
  const invalidFreqs = changefreqs.filter(f => {
    const val = f.match(/>(.*?)</)[1];
    return !validFreqs.includes(val);
  });

  if (invalidFreqs.length > 0) {
    error(`${invalidFreqs.length} changefreq inválidos`);
    valid = false;
  } else {
    success('Todos los changefreq son válidos');
  }

  // 8. Verificar tamaño del archivo
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
  if (sizeKB > 50 * 1024) { // 50MB
    error(`Sitemap demasiado grande: ${sizeKB}KB (máximo: 50MB)`);
    valid = false;
  } else {
    info(`Tamaño del archivo: ${sizeKB}KB`);
  }

  return valid;
}

/**
 * Valida el robots.txt
 */
function validateRobots() {
  console.log(`\n${colors.bold}🤖 VALIDACIÓN ROBOTS.TXT${colors.reset}\n`);
  
  if (!fs.existsSync(ROBOTS_PATH)) {
    error('robots.txt no encontrado en ' + ROBOTS_PATH);
    return false;
  }

  const content = fs.readFileSync(ROBOTS_PATH, 'utf8');
  let valid = true;

  // 1. Verificar User-agent presente
  if (!content.includes('User-agent:')) {
    error('No hay directivas User-agent');
    valid = false;
  } else {
    success('Directivas User-agent presentes');
  }

  // 2. Verificar referencia a sitemap
  if (!content.includes('Sitemap:')) {
    warning('No hay referencia a sitemap.xml (recomendado)');
  } else if (!content.includes(BASE_URL + '/sitemap.xml')) {
    error('URL del sitemap incorrecta');
    valid = false;
  } else {
    success('Referencia a sitemap.xml correcta');
  }

  // 3. Verificar sintaxis de directivas
  const lines = content.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  const validDirectives = ['User-agent:', 'Allow:', 'Disallow:', 'Sitemap:', 'Crawl-delay:'];
  
  const invalidLines = lines.filter(line => {
    return !validDirectives.some(dir => line.trim().startsWith(dir));
  });

  if (invalidLines.length > 0) {
    warning(`${invalidLines.length} líneas con sintaxis no estándar`);
    invalidLines.slice(0, 3).forEach(line => console.log(`    ${line}`));
  } else {
    success('Sintaxis de directivas correcta');
  }

  // 4. Verificar que haya al menos un Allow o Disallow
  if (!content.includes('Allow:') && !content.includes('Disallow:')) {
    error('No hay directivas Allow: ni Disallow:');
    valid = false;
  } else {
    success('Directivas de acceso presentes');
  }

  // 5. Contar reglas
  const allowCount = (content.match(/Allow:/g) || []).length;
  const disallowCount = (content.match(/Disallow:/g) || []).length;
  
  info(`${allowCount} reglas Allow, ${disallowCount} reglas Disallow`);

  // 6. Verificar que no bloquee assets críticos
  const criticalPaths = ['/assets/', '.css', '.js', '.png', '.jpg'];
  const blocking = criticalPaths.filter(path => {
    const regex = new RegExp(`Disallow:.*${path.replace('.', '\\.')}`, 'i');
    return regex.test(content);
  });

  if (blocking.length > 0) {
    warning(`Posible bloqueo de assets críticos: ${blocking.join(', ')}`);
  } else {
    success('Assets críticos no bloqueados');
  }

  // 7. Verificar tamaño
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
  if (sizeKB > 500) {
    warning(`robots.txt grande: ${sizeKB}KB (puede afectar performance)`);
  } else {
    info(`Tamaño del archivo: ${sizeKB}KB`);
  }

  return valid;
}

/**
 * Valida accesibilidad de archivos
 */
function validateAccessibility() {
  console.log(`\n${colors.bold}🔗 VALIDACIÓN DE ACCESIBILIDAD${colors.reset}\n`);
  
  let valid = true;

  // Verificar que los archivos estén en public/
  if (!SITEMAP_PATH.includes('public')) {
    error('sitemap.xml debe estar en el directorio public/');
    valid = false;
  } else {
    success('sitemap.xml en directorio public/');
  }

  if (!ROBOTS_PATH.includes('public')) {
    error('robots.txt debe estar en el directorio public/');
    valid = false;
  } else {
    success('robots.txt en directorio public/');
  }

  // Verificar permisos de lectura
  try {
    fs.accessSync(SITEMAP_PATH, fs.constants.R_OK);
    success('sitemap.xml tiene permisos de lectura');
  } catch {
    error('sitemap.xml no tiene permisos de lectura');
    valid = false;
  }

  try {
    fs.accessSync(ROBOTS_PATH, fs.constants.R_OK);
    success('robots.txt tiene permisos de lectura');
  } catch {
    error('robots.txt no tiene permisos de lectura');
    valid = false;
  }

  return valid;
}

/**
 * Ejecuta todas las validaciones
 */
function runValidation() {
  console.log(`\n${colors.bold}═══════════════════════════════════════════════`);
  console.log(`   🔍 VALIDADOR DE ARCHIVOS SEO`);
  console.log(`═══════════════════════════════════════════════${colors.reset}\n`);

  const sitemapValid = validateSitemap();
  const robotsValid = validateRobots();
  const accessValid = validateAccessibility();

  console.log(`\n${colors.bold}═══════════════════════════════════════════════`);
  console.log(`   📊 RESUMEN DE VALIDACIÓN`);
  console.log(`═══════════════════════════════════════════════${colors.reset}\n`);

  if (sitemapValid && robotsValid && accessValid) {
    success('Todos los archivos SEO son válidos ✨');
    console.log('');
    return true;
  } else {
    error('Algunos archivos tienen errores que deben corregirse');
    console.log('');
    if (!sitemapValid) error('  - sitemap.xml tiene problemas');
    if (!robotsValid) error('  - robots.txt tiene problemas');
    if (!accessValid) error('  - Problemas de accesibilidad');
    console.log('');
    return false;
  }
}

// Ejecutar
if (require.main === module) {
  const isValid = runValidation();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateSitemap, validateRobots, validateAccessibility };
