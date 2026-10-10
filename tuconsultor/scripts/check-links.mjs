// Verificador de fiabilidad: comprueba que TODAS las URLs de la base de
// conocimiento y el catálogo respondan (advertimos antes de prometer).
// Uso: npm run links
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "lib");
const urls = new Set();
for (const f of readdirSync(root)) {
  if (!f.endsWith(".ts")) continue;
  const txt = readFileSync(join(root, f), "utf8");
  for (const m of txt.matchAll(/https?:\/\/[^\s"'`)\]]+/g)) {
    const u = m[0].replace(/[.,;]+$/, "");
    if (u.includes("${")) continue; // template literal, no es URL real
    urls.add(u);
  }
}
console.log(`Verificando ${urls.size} URLs...\n`);
let ok = 0, fail = 0;
async function prueba(u, method) {
  const r = await fetch(u, { method, redirect: "follow", signal: AbortSignal.timeout(15000) });
  if (method === "HEAD" && r.status === 404) {
    await r.arrayBuffer().catch(() => {});
    return prueba(u, "GET");
  }
  await r.arrayBuffer().catch(() => {});
  return r.status;
}
for (const u of [...urls].sort()) {
  try {
    const status = await prueba(u, "HEAD");
    const good = status < 400;
    good ? ok++ : fail++;
    console.log(`${good ? "OK  " : "FALLA"} [${status}] ${u}`);
  } catch (e) {
    fail++;
    console.log(`FALLA [red] ${u} (${String(e.cause || e.message).slice(0, 80)})`);
  }
}
console.log(`\n${ok} OK · ${fail} con problemas`);
process.exit(fail ? 1 : 0);
