// Canje del ebook: el usuario recibe un código, lo envía por WhatsApp al
// administrador y pega la autorización devuelta (mismo código + "-SD-980").
// Es una compuerta de captación (prueba de contacto), NO seguridad real:
// quien conozca el truco podría auto-desbloquear. Para lead-gen es suficiente.
const SUFIJO = "-SD-980";
const ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sin caracteres ambiguos

export function generarCodigo(): string {
  let s = "";
  for (let i = 0; i < 6; i++) s += ABC[Math.floor(Math.random() * ABC.length)];
  return `TC-${s.slice(0, 3)}-${s.slice(3)}`; // ej: TC-A7K-9Q2
}

export function codigoEsperado(emitido: string): string {
  return `${emitido.trim().toUpperCase()}${SUFIJO}`;
}

export function validarCodigo(emitido: string, pegado: string): boolean {
  if (!emitido || !pegado) return false;
  return pegado.trim().toUpperCase() === codigoEsperado(emitido);
}

export function mensajeWhatsapp(nombre: string, codigo: string): string {
  return `Hola Soluciones Digitales, quiero mi plan personalizado. Soy ${nombre} y mi código es ${codigo}.`;
}

// Mensaje de solicitud del INFORME COMPLETO. Va cargado con el diagnóstico
// entero (no un "hola, quiero información"): sector y sus restricciones,
// salud, freno, prioridades ordenadas, dolores, KPIs y el código que abre el
// ebook. Cuanto más concreto llega el mensaje, más certera es la respuesta.
export function mensajeSolicitudInforme(datos: {
  negocio: string;
  sector?: string;
  etapa?: string;
  salud: number;
  freno?: string;
  prioridades?: { need: string; prioridad: string }[];
  dolores: string[];
  kpis?: string[];
  restriccion?: string;
  codigo: string;
}): string {
  const PRIORIDAD: Record<string, string> = { ahora: "AHORA", proximo: "PRÓXIMO", despues: "DESPUÉS" };
  const lineas: string[] = [
    "SOLICITUD DE INFORME COMPLETO — tuConsultor",
    "",
    `Negocio: ${datos.negocio || "—"}`,
  ];
  if (datos.sector) lineas.push(`Sector: ${datos.sector}`);
  if (datos.restriccion) lineas.push(`Restricciones de plataforma: ${datos.restriccion}`);
  if (datos.etapa) lineas.push(`Etapa: ${datos.etapa}`);
  lineas.push(`Salud general del diagnóstico: ${datos.salud}/100`);
  if (datos.freno) lineas.push(`Freno principal: ${datos.freno}`);

  if (datos.prioridades && datos.prioridades.length) {
    lineas.push("", "Prioridades detectadas:");
    datos.prioridades.slice(0, 5).forEach((p, i) => {
      lineas.push(`${i + 1}. [${PRIORIDAD[p.prioridad] || p.prioridad}] ${p.need}`);
    });
  }

  if (datos.dolores.length) {
    lineas.push("", `Dolores detectados (${datos.dolores.length}):`);
    datos.dolores.slice(0, 12).forEach((d) => lineas.push(`• ${d}`));
  }

  if (datos.kpis && datos.kpis.length) {
    lineas.push("", `Indicadores a mejorar: ${datos.kpis.slice(0, 6).join(" · ")}`);
  }

  lineas.push(
    "",
    `Código de solicitud: ${datos.codigo}`,
    "",
    "Solicito el informe completo (detalle por dolor, videos y fuentes oficiales) y la autorización para desbloquear mi ebook."
  );
  return lineas.join("\n");
}

const CKEY = "tuconsultor_codigo";
const UKEY = "tuconsultor_desbloqueado";
export function leerCodigo(): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(CKEY); } catch { return null; }
}
export function guardarCodigo(c: string) {
  try { localStorage.setItem(CKEY, c); } catch { /* noop */ }
}
export function estaDesbloqueado(codigo: string): boolean {
  if (typeof window === "undefined" || !codigo) return false;
  try { return localStorage.getItem(UKEY) === codigoEsperado(codigo); } catch { return false; }
}
export function marcarDesbloqueado(codigo: string) {
  try { localStorage.setItem(UKEY, codigoEsperado(codigo)); } catch { /* noop */ }
}
