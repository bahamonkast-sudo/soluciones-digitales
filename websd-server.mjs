import express from "express";
import next from "./tuconsultor/node_modules/next/dist/server/next.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const siteDist = path.join(root, "dist");
const consultantDir = path.join(root, "tuconsultor");
const port = Number(process.env.PORT || 8080);

const consultant = next({ dev: false, dir: consultantDir });
await consultant.prepare();
const handleConsultant = consultant.getRequestHandler();

const server = express();
server.disable("x-powered-by");
server.use((req, res, nextMiddleware) => {
  const pathname = req.path;
  if (pathname === "/tuconsultor" || pathname.startsWith("/tuconsultor/")) {
    return handleConsultant(req, res);
  }
  return nextMiddleware();
});
server.use(express.static(siteDist, { extensions: ["html"] }));
server.use((_req, res) => res.sendFile(path.join(siteDist, "index.html")));

server.listen(port, "0.0.0.0", () => {
  console.log(`websd + TuConsultor disponible en el puerto ${port}`);
});
