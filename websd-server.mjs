import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const siteDist = path.join(root, "dist");
const consultantDir = path.join(root, "tuconsultor");
const port = Number(process.env.PORT || 8080);

// TuConsultor es opcional: si su build (.next) falta en Cloud Run / AI Studio,
// no debemos tumbar todo el servicio ni impedir que escuche en PORT.
let handleConsultant = null;
try {
  const prerenderManifest = path.join(consultantDir, ".next", "prerender-manifest.json");
  if (!fs.existsSync(prerenderManifest)) {
    throw new Error(`falta ${prerenderManifest} (no se hizo "npm run build" de tuconsultor)`);
  }
  const { default: next } = await import("./tuconsultor/node_modules/next/dist/server/next.js");
  const consultant = next({ dev: false, dir: consultantDir });
  await consultant.prepare();
  handleConsultant = consultant.getRequestHandler();
  console.log("TuConsultor listo en /tuconsultor");
} catch (err) {
  console.error("TuConsultor no disponible, sirviendo solo sitio estatico:", err?.message || err);
}

const server = express();
server.disable("x-powered-by");
server.use((req, res, nextMiddleware) => {
  const pathname = req.path;
  if (pathname === "/tuconsultor" || pathname.startsWith("/tuconsultor/")) {
    if (!handleConsultant) {
      return res.status(503).send("TuConsultor no disponible en este despliegue (falta build de Next.js)");
    }
    return handleConsultant(req, res);
  }
  return nextMiddleware();
});
server.use(express.static(siteDist, { extensions: ["html"] }));
server.use((_req, res) => res.sendFile(path.join(siteDist, "index.html")));

server.listen(port, "0.0.0.0", () => {
  console.log(`websd + TuConsultor disponible en el puerto ${port}`);
});
