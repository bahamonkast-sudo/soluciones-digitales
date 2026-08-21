const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Mapeo de nombres antiguos a nuevos nombres descriptivos
const IMAGE_MAPPING = {
  // Assets (src/assets)
  'case-whatsapp.png': 'caso-exito-whatsapp-automation',
  'case-b2b-mining.png': 'caso-exito-mineria-datos-b2b',
  'case-web-ux.png': 'caso-exito-diseno-web-ux',
  'typing_chatbot.png': 'chatbot-inteligencia-artificial-typing',
  'hero.png': 'hero-soluciones-digitales-ia',
  
  // Public
  'hyper-warmer.png': 'calentador-cuentas-whatsapp-hiperwarmer',
  'web_dev_bento_bg.png': 'desarrollo-web-background-bento',
  'ecosistema_bg.png': 'ecosistema-ventas-background',
  'floating_phones.png': 'smartphones-flotantes-whatsapp',
  'wa-warmer.png': 'whatsapp-account-warmer'
};

const QUALITY = {
  webp: 85,  // Calidad WebP (0-100)
  jpeg: 90,  // Calidad JPEG para fallback (0-100)
  png: 9     // Nivel de compresión PNG (0-9)
};

async function optimizeImage(inputPath, outputDir, newBaseName) {
  const ext = path.extname(inputPath).toLowerCase();
  const filename = path.basename(inputPath);
  
  console.log(`\n📸 Procesando: ${filename}`);
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);
    console.log(`   Original: ${originalSize} KB`);
    
    // Leer metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Dimensiones: ${metadata.width}x${metadata.height}px`);
    
    // Crear versión WebP
    const webpPath = path.join(outputDir, `${newBaseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: QUALITY.webp, effort: 6 })
      .toFile(webpPath);
    
    const webpStats = fs.statSync(webpPath);
    const webpSize = (webpStats.size / 1024).toFixed(2);
    const savings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`   ✅ WebP: ${webpSize} KB (ahorro: ${savings}%)`);
    
    // Crear versión PNG optimizada (fallback)
    if (ext === '.png') {
      const pngPath = path.join(outputDir, `${newBaseName}.png`);
      await sharp(inputPath)
        .png({ compressionLevel: QUALITY.png, effort: 10 })
        .toFile(pngPath);
      
      const pngStats = fs.statSync(pngPath);
      const pngSize = (pngStats.size / 1024).toFixed(2);
      console.log(`   📦 PNG optimizado: ${pngSize} KB`);
    }
    
    return {
      original: filename,
      newName: newBaseName,
      originalSize: parseFloat(originalSize),
      webpSize: parseFloat(webpSize),
      savings: parseFloat(savings)
    };
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

async function processDirectory(sourceDir, targetDir, label) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔄 Procesando: ${label}`);
  console.log('='.repeat(60));
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const files = fs.readdirSync(sourceDir);
  const results = [];
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    
    const inputPath = path.join(sourceDir, file);
    const newBaseName = IMAGE_MAPPING[file];
    
    if (!newBaseName) {
      console.log(`\n⚠️  Saltando: ${file} (no hay mapeo definido)`);
      continue;
    }
    
    const result = await optimizeImage(inputPath, targetDir, newBaseName);
    if (result) results.push(result);
  }
  
  return results;
}

async function main() {
  console.log('🚀 OPTIMIZADOR Y RENOMBRADOR DE IMÁGENES');
  console.log('==========================================\n');
  
  const projectRoot = path.resolve(__dirname, '..');
  
  // Procesar assets (src/assets)
  const assetsSource = path.join(projectRoot, 'src', 'assets');
  const assetsTarget = path.join(projectRoot, 'src', 'assets', 'optimized');
  const assetsResults = await processDirectory(assetsSource, assetsTarget, 'Assets (src/assets)');
  
  // Procesar public
  const publicSource = path.join(projectRoot, 'public');
  const publicTarget = path.join(projectRoot, 'public', 'optimized');
  const publicResults = await processDirectory(publicSource, publicTarget, 'Public');
  
  // Resumen final
  const allResults = [...assetsResults, ...publicResults];
  
  if (allResults.length === 0) {
    console.log('\n⚠️  No se procesaron imágenes.');
    return;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN FINAL');
  console.log('='.repeat(60));
  
  const totalOriginal = allResults.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebp = allResults.reduce((sum, r) => sum + r.webpSize, 0);
  const totalSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);
  
  console.log(`\n✨ Imágenes procesadas: ${allResults.length}`);
  console.log(`📦 Tamaño original total: ${totalOriginal.toFixed(2)} KB`);
  console.log(`🎯 Tamaño WebP total: ${totalWebp.toFixed(2)} KB`);
  console.log(`💰 Ahorro total: ${(totalOriginal - totalWebp).toFixed(2)} KB (${totalSavings}%)`);
  
  console.log('\n📋 TABLA DE CONVERSIONES:');
  console.log('-'.repeat(60));
  allResults.forEach(r => {
    console.log(`${r.original.padEnd(30)} → ${r.newName}`);
  });
  
  console.log('\n✅ Imágenes optimizadas guardadas en:');
  console.log(`   - ${assetsTarget}`);
  console.log(`   - ${publicTarget}`);
  
  console.log('\n⚡ PRÓXIMOS PASOS:');
  console.log('1. Revisa las imágenes optimizadas');
  console.log('2. Reemplaza las originales (haz backup primero)');
  console.log('3. Actualiza las referencias en el código');
  console.log('4. Usa el componente LazyImage con fallback PNG');
}

main().catch(console.error);
