import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const siteDist = path.join(root, "dist");
const port = Number(process.env.PORT || 8080);

const server = express();
server.disable("x-powered-by");
server.use(express.static(siteDist, { extensions: ["html"] }));
server.use((_req, res) => res.sendFile(path.join(siteDist, "index.html")));

server.listen(port, "0.0.0.0", () => {
  console.log(`websd estatico disponible en el puerto ${port}`);
});
