const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'tutorial', 'groq');
fs.mkdirSync(outDir, { recursive: true });

async function svgToWebp(svg, outName) {
  const outPath = path.join(outDir, outName);
  await sharp(Buffer.from(svg))
    .resize(1280, 800)
    .webp({ quality: 85 })
    .toFile(outPath);
  console.log('created', outName);
}

// Step 01/02 - Login (same image for both, user provided identical)
const loginSvg = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#f8fafc"/>
  <rect width="1280" height="56" fill="white" stroke="#e2e8f0"/>
  <text x="20" y="36" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#111">groq</text>
  <text x="620" y="34" font-family="Arial" font-size="13" fill="#64748b">Playground</text>
  <text x="710" y="34" font-family="Arial" font-size="13" fill="#ef4444" font-weight="600">API Keys</text>
  <text x="780" y="34" font-family="Arial" font-size="13" fill="#64748b">Dashboard</text>
  <text x="860" y="34" font-family="Arial" font-size="13" fill="#64748b">Docs</text>
  <rect x="1050" y="14" width="170" height="32" rx="16" fill="#f1f5f9" stroke="#e2e8f0"/>
  <text x="1135" y="33" font-family="Arial" font-size="13" fill="#111" text-anchor="middle">Log In</text>

  <text x="640" y="150" font-family="Arial" font-size="20" fill="#1e293b" text-anchor="middle">Create an account or</text>
  <text x="640" y="178" font-family="Arial" font-size="20" fill="#1e293b" text-anchor="middle">login to access this page</text>

  <rect x="440" y="210" width="400" height="44" rx="22" fill="white" stroke="#cbd5e1"/>
  <text x="640" y="238" font-family="Arial" font-size="14" fill="#111" text-anchor="middle">G  Continue with Google</text>
  <text x="730" y="210" font-family="Arial" font-size="10" fill="#888" text-anchor="middle">Last used</text>

  <rect x="440" y="268" width="400" height="44" rx="22" fill="white" stroke="#cbd5e1"/>
  <text x="640" y="296" font-family="Arial" font-size="14" fill="#111" text-anchor="middle">Continue with GitHub</text>

  <rect x="440" y="326" width="400" height="44" rx="22" fill="white" stroke="#cbd5e1"/>
  <text x="640" y="354" font-family="Arial" font-size="14" fill="#111" text-anchor="middle">Continue with SSO</text>

  <line x1="440" y1="400" x2="600" y2="400" stroke="#cbd5e1"/>
  <text x="640" y="404" font-family="Arial" font-size="12" fill="#64748b" text-anchor="middle">or</text>
  <line x1="680" y1="400" x2="840" y2="400" stroke="#cbd5e1"/>

  <rect x="440" y="420" width="400" height="44" rx="22" fill="white" stroke="#cbd5e1"/>
  <text x="460" y="448" font-family="Arial" font-size="13" fill="#94a3b8">example@email.com</text>

  <rect x="440" y="478" width="400" height="44" rx="22" fill="white" stroke="#cbd5e1"/>
  <text x="640" y="506" font-family="Arial" font-size="14" fill="#111" text-anchor="middle">Continue with email</text>

  <text x="640" y="620" font-family="Arial" font-size="10" fill="#94a3b8" text-anchor="middle">By continuing, I accept the Services Agreement and acknowledge that I</text>
  <text x="640" y="634" font-family="Arial" font-size="10" fill="#94a3b8" text-anchor="middle">have read the Privacy Policy.</text>
</svg>
`;

const apiKeysSvg = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#f8fafc"/>
  <rect width="1280" height="56" fill="white" stroke="#e2e8f0"/>
  <text x="20" y="36" font-family="Arial" font-size="28" font-weight="700" fill="#111">groq</text>
  <text x="120" y="34" font-family="Arial" font-size="13" fill="#64748b">Personal  /  Default Project</text>
  <text x="820" y="34" font-family="Arial" font-size="13" fill="#64748b">Playground</text>
  <text x="910" y="34" font-family="Arial" font-size="13" fill="#ef4444" font-weight="600">API Keys</text>
  <text x="980" y="34" font-family="Arial" font-size="13" fill="#64748b">Dashboard</text>
  <text x="1060" y="34" font-family="Arial" font-size="13" fill="#64748b">Docs</text>

  <rect x="0" y="56" width="1280" height="744" fill="white" stroke="#e2e8f0"/>
  <text x="80" y="140" font-family="Arial" font-size="20" font-weight="700" fill="#111">API Keys</text>
  <text x="80" y="168" font-family="Arial" font-size="12" fill="#475569">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</text>
  <rect x="980" y="120" width="190" height="38" rx="8" fill="white" stroke="#ef4444" stroke-width="1.2"/>
  <text x="1075" y="143" font-family="Arial" font-size="13" fill="#111" text-anchor="middle">+  Create API Key</text>
</svg>
`;

const apiKeysArrowSvg = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#f8fafc"/>
  <rect width="1280" height="56" fill="white" stroke="#e2e8f0"/>
  <text x="20" y="36" font-family="Arial" font-size="28" font-weight="700" fill="#111">groq</text>
  <text x="120" y="34" font-family="Arial" font-size="13" fill="#64748b">Personal  /  Default Project</text>
  <text x="820" y="34" font-family="Arial" font-size="13" fill="#64748b">Playground</text>
  <text x="910" y="34" font-family="Arial" font-size="13" fill="#ef4444" font-weight="600">API Keys</text>
  <text x="980" y="34" font-family="Arial" font-size="13" fill="#64748b">Dashboard</text>
  <text x="1060" y="34" font-family="Arial" font-size="13" fill="#64748b">Docs</text>
  <rect x="0" y="56" width="1280" height="744" fill="white" stroke="#e2e8f0"/>
  <text x="80" y="140" font-family="Arial" font-size="20" font-weight="700" fill="#111">API Keys</text>
  <text x="80" y="168" font-family="Arial" font-size="12" fill="#475569">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</text>
  <rect x="980" y="120" width="190" height="38" rx="8" fill="white" stroke="#ef4444" stroke-width="1.5"/>
  <text x="1075" y="143" font-family="Arial" font-size="13" fill="#111" text-anchor="middle">+  Create API Key</text>
  <!-- red arrow -->
  <line x1="820" y1="140" x2="960" y2="140" stroke="#ef4444" stroke-width="3"/>
  <polygon points="960,130 985,140 960,150" fill="#ef4444"/>
</svg>
`;

const dialogSvg = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#0f0f12"/>
  <!-- dimmed table behind -->
  <text x="40" y="150" font-family="Arial" font-size="11" fill="#334155">SECRET KEY</text>
  <text x="280" y="150" font-family="Arial" font-size="11" fill="#334155">CREATED</text>
  <text x="400" y="150" font-family="Arial" font-size="11" fill="#334155">LAST USED</text>
  <text x="540" y="150" font-family="Arial" font-size="11" fill="#334155">EXPIRES</text>
  <text x="680" y="150" font-family="Arial" font-size="11" fill="#334155">USAGE (24HRS)</text>

  <text x="40" y="700" font-family="monospace" font-size="12" fill="#475569">gsk_••••DMAq</text>
  <text x="280" y="700" font-family="Arial" font-size="12" fill="#475569">10/4/2026</text>
  <text x="400" y="700" font-family="Arial" font-size="12" fill="#475569">10/4/2026</text>
  <text x="540" y="700" font-family="Arial" font-size="12" fill="#475569">Never</text>
  <text x="680" y="700" font-family="Arial" font-size="12" fill="#475569">0 API Calls</text>

  <!-- modal -->
  <rect x="320" y="160" width="640" height="420" rx="16" fill="white"/>
  <text x="350" y="210" font-family="Arial" font-size="18" font-weight="700" fill="#111">Create API Key</text>
  <text x="925" y="205" font-family="Arial" font-size="18" fill="#111">×</text>

  <text x="350" y="260" font-family="Arial" font-size="13" font-weight="600" fill="#111">Display Name</text>
  <rect x="350" y="275" width="580" height="42" rx="8" fill="white" stroke="#111" stroke-width="1.2"/>
  <text x="365" y="302" font-family="Arial" font-size="14" fill="#111">mi apikey</text>
  <text x="350" y="340" font-family="Arial" font-size="11" fill="#64748b">A display name for the key. Maximum 50 characters.</text>

  <text x="350" y="380" font-family="Arial" font-size="13" font-weight="600" fill="#111">Expiration</text>
  <rect x="350" y="395" width="580" height="42" rx="8" fill="white" stroke="#e2e8f0"/>
  <text x="365" y="422" font-family="Arial" font-size="13" fill="#111">No expiration</text>
  <text x="905" y="422" font-family="Arial" font-size="12" fill="#64748b">⌄</text>
  <text x="350" y="455" font-family="Arial" font-size="11" fill="#64748b">This key will not expire.</text>

  <rect x="820" y="500" width="110" height="38" rx="8" fill="white" stroke="#ef4444"/>
  <text x="875" y="523" font-family="Arial" font-size="13" fill="#111" text-anchor="middle">Submit</text>
</svg>
`;

const copySvg = `
<svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="800" fill="#0f0f12"/>
  <!-- table row with blurred key -->
  <rect x="0" y="80" width="1280" height="640" fill="#111119"/>
  <text x="40" y="140" font-family="Arial" font-size="11" fill="#475569">SECRET KEY</text>
  <text x="40" y="280" font-family="monospace" font-size="13" fill="#e2e8f0">gsk_</text>
  <rect x="70" y="268" width="180" height="16" rx="4" fill="#334155" opacity="0.9"/>
  <rect x="70" y="268" width="180" height="16" rx="4" fill="white" opacity="0.08"/>
  <text x="255" y="281" font-family="monospace" font-size="13" fill="#e2e8f0">DMAq</text>
  <rect x="310" y="272" width="48" height="20" rx="6" fill="#1e293b" stroke="#334155"/>
  <text x="334" y="286" font-family="Arial" font-size="10" fill="#94a3b8" text-anchor="middle">Copy</text>
  <text x="310" y="304" font-family="Arial" font-size="10" fill="#ef4444">(blur aplicado - solo tú verás la clave completa una vez)</text>

  <!-- callout -->
  <rect x="360" y="360" width="560" height="80" rx="12" fill="#ef4444"/>
  <text x="640" y="390" font-family="Arial" font-size="14" font-weight="700" fill="white" text-anchor="middle">¡Copia tu clave ahora!</text>
  <text x="640" y="412" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Empieza con gsk_  •  Solo se muestra una vez</text>
</svg>
`;

(async () => {
  await svgToWebp(loginSvg, 'step-01-console.webp');
  await svgToWebp(loginSvg, 'step-02-login.webp');
  await svgToWebp(apiKeysSvg, 'step-03-create.webp');
  // overwrite with arrow version as primary
  await svgToWebp(apiKeysArrowSvg, 'step-03-create.webp');
  await svgToWebp(dialogSvg, 'step-04-name.webp');
  await svgToWebp(copySvg, 'step-05-copy.webp');
  console.log('done');
})();
