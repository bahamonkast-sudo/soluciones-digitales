const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const report = [];

function convertDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) { convertDir(full); continue; }
        if (path.extname(e.name).toLowerCase() !== '.png') continue;
        const out = full.replace(/\.png$/i, '.webp');
        const before = fs.statSync(full).size;
        sharp(full, { animated: false })
            .webp({ quality: 82, effort: 4 })
            .toFile(out)
            .then(() => {
                const after = fs.statSync(out).size;
                const pct = ((1 - after / before) * 100).toFixed(1);
                report.push({ name: full.replace(root + '\\', ''), before: kb(before), after: kb(after), pct });
            })
            .catch(err => console.error('ERROR', full, err.message));
    }
}

function kb(n) { return (n / 1024).toFixed(0) + ' KB'; }

convertDir(path.join(root, 'public'));
convertDir(path.join(root, 'src', 'assets'));

setTimeout(() => {
    const beforeSum = report.reduce((a, r) => a + parseFloat(r.before), 0);
    const afterSum = report.reduce((a, r) => a + parseFloat(r.after), 0);
    console.log('=== IMAGENES CONVERTIDAS ===');
    report.sort((a, b) => parseFloat(b.before) - parseFloat(a.before)).forEach(r =>
        console.log(`${r.name}\t${r.before} -> ${r.after}\t-${r.pct}%`));
    console.log(`\nTOTAL: ${beforeSum} KB -> ${afterSum} KB`);
}, 20000);