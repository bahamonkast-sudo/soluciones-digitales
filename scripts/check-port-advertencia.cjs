#!/usr/bin/env node
// ADVERTENCIA CRÍTICA: WBSD (5173) vs VCARD-STUDIO-BUILDER (no usar mismo puerto)
// Este script evita que http://localhost:5173/index.html muestre VCARD STUDIO en lugar de WBSD.
// Si el puerto 5173 está ocupado por otro proyecto, avisa y no deja arrancar a ciegas.
const net = require('net');
const { execSync } = require('child_process');

const PUERTO_WBSD = 5173;
const PROYECTO_VCARD = 'C:\\consola_maestra\\Proyectos\\vcard-studio-builder';

function checkPort(port) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once('error', () => resolve(false)); // puerto ocupado
    srv.once('listening', () => srv.close(() => resolve(true))); // libre
    srv.listen(port, '0.0.0.0');
  });
}

(async () => {
  const libre = await checkPort(PUERTO_WBSD);
  if (!libre) {
    console.error('\n' + '='.repeat(70));
    console.error('⚠️  ADVERTENCIA CRÍTICA — CONFLICTO DE PUERTO');
    console.error('='.repeat(70));
    console.error(`El puerto ${PUERTO_WBSD} ya está en uso.`);
    console.error(`Si ves "VCARD STUDIO" en http://localhost:${PUERTO_WBSD}/index.html,`);
    console.error(`es porque "vcard-studio-builder" está ocupando el puerto de WBSD.`);
    console.error('');
    console.error(`Proyecto WBSD:          C:\\consola_maestra\\Proyectos\\websd`);
    console.error(`Proyecto VCARD-BUILDER: ${PROYECTO_VCARD}`);
    console.error('');
    console.error('SOLUCIÓN:');
    console.error(`  1. Cierra vcard-studio-builder:  Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PUERTO_WBSD}).OwningProcess -Force`);
    console.error(`  2. O lanza VCARD en otro puerto:  npm run dev -- --port 5174   (desde vcard-studio-builder)`);
    console.error(`  3. Luego lanza WBSD:              npm run dev                 (desde websd, puerto ${PUERTO_WBSD})`);
    console.error('');
    try {
      const out = execSync('netstat -ano | findstr :5173', { encoding: 'utf-8' });
      console.error('Conexiones actuales en 5173:');
      console.error(out);
    } catch {}
    console.error('='.repeat(70) + '\n');
    // No bloqueamos el arranque, Vite igual intentará y mostrará su propio error,
    // pero el usuario YA vio la advertencia antes del infarto.
  } else {
    console.log(`\n✓ Puerto ${PUERTO_WBSD} libre — WBSD arrancará en http://localhost:${PUERTO_WBSD}/index.html\n`);
  }
})();
