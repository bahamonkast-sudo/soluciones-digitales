// AGENTE MOTOR DE DIAGNÓSTICO — puntuación, cuellos de botella, AIDA, DOFA, journey
import { FACTORES, FactorId } from "./factors";

export type Answers = Record<string, any>;
export type Scores = Record<FactorId, number>;

// Heurística transparente: cada respuesta suma/restas por factor. Groq interpreta, reglas deciden.
export function scoreAnswers(a: Answers): Scores {
  const s: Scores = {} as Scores;
  for (const f of FACTORES) s[f.id] = 50; // base neutral
  const bump = (id: FactorId, d: number) => { s[id] = Math.max(0, Math.min(100, s[id] + d)); };

  // Origen clientes
  if (a.origen_clientes?.includes("conocidos") || a.origen_clientes?.includes("referidos")) { bump("captacion", -18); bump("visibilidad", -10); }
  if (a.origen_clientes?.includes("google") || a.origen_clientes?.includes("redes")) bump("captacion", 12);
  if (a.origen_clientes?.includes("ninguno") || a.flujo === "muy_bajo") { bump("captacion", -20); bump("visibilidad", -15); }

  // Presencia / canales
  const canales: string[] = a.canales || [];
  if (canales.length === 0 || canales.includes("ninguno")) { bump("presencia_digital", -30); bump("visibilidad", -20); bump("confianza", -15); }
  else { bump("presencia_digital", Math.min(25, canales.length * 5)); }
  if (canales.includes("web")) bump("confianza", 10);
  if (canales.includes("google")) bump("visibilidad", 15);
  if (canales.includes("instagram") || canales.includes("facebook") || canales.includes("tiktok")) bump("redes_sociales", 10);

  // Frecuencia contenido
  if (a.frecuencia === "nunca") { bump("contenido", -25); bump("redes_sociales", -15); }
  if (a.frecuencia === "diario" || a.frecuencia === "semanal") { bump("contenido", 18); bump("redes_sociales", 10); }

  // Reseñas / prueba social
  if (a.resenas === "pocas" || a.resenas === "ninguna") bump("confianza", -20);
  if (a.resenas === "muchas_buenas") bump("confianza", 22);

  // Seguimiento
  if (a.seguimiento === "no") { bump("proceso_comercial", -25); bump("conversion", -12); }
  if (a.seguimiento === "sistematico") { bump("proceso_comercial", 20); bump("conversion", 10); }
  if (a.tiempo_respuesta === "horas" || a.tiempo_respuesta === "dias") bump("proceso_comercial", -15);
  if (a.tiempo_respuesta === "minutos") bump("proceso_comercial", 12);

  // Oferta / propuesta
  if (!a.diferencial || a.diferencial === "no_se") { bump("propuesta_valor", -20); bump("posicionamiento", -12); }
  else bump("propuesta_valor", 12);
  if (!a.oferta_clara || a.oferta_clara === "no") bump("oferta", -18); else bump("oferta", 12);

  // Cliente
  if (!a.cliente_definido || a.cliente_definido === "no") bump("cliente_objetivo", -20); else bump("cliente_objetivo", 15);

  // Medición
  if (a.medicion === "nada") bump("medicion", -25); else if (a.medicion === "kpis") bump("medicion", 20);

  // Fidelización
  if (a.recompra === "nunca") bump("fidelizacion", -18);
  if (a.recompra === "frecuente") bump("fidelizacion", 18);

  // Competencia
  if (a.competencia === "no_se") bump("competencia", -15);
  if (a.competencia === "si") bump("posicionamiento", 5);

  // Nivel de marketing declarado
  if (a.nivel === "cero") { bump("presencia_digital", -15); bump("visibilidad", -10); }
  if (a.nivel === "redes_sin_ventas") { bump("conversion", -12); bump("oferta", -8); }
  if (a.nivel === "vendo") { bump("conversion", 10); bump("proceso_comercial", 8); }
  if (a.nivel === "campanas") { bump("visibilidad", 8); bump("medicion", 5); }

  // Objetivo valida: sin oferta/cliente claro, la prioridad es definir, no escalar
  if (a.objetivo === "validar" && (!a.diferencial || a.diferencial === "no_se")) bump("propuesta_valor", -8);

  // Presupuesto/etapa ajustan expectativas, no score
  return s;
}

export function saludGeneral(scores: Scores): number {
  let num = 0, den = 0;
  for (const f of FACTORES) { num += scores[f.id] * f.peso; den += f.peso; }
  return Math.round(num / den);
}

export function infraIndice(a: Answers): number {
  // existe(20)+funciona(20)+optimizado(20)+integrado(20)+resultados(20)
  let v = 0;
  const canales: string[] = a.canales || [];
  if (canales.length > 0 && !canales.includes("ninguno")) v += 20;
  if (canales.includes("web") || canales.includes("catalogo")) v += 20;
  if (a.frecuencia === "semanal" || a.frecuencia === "diario") v += 20;
  if (a.seguimiento === "sistematico" || a.crm === "si") v += 20;
  if (a.flujo === "estable" || a.flujo === "creciendo") v += 20;
  return v;
}

export function flujoIndice(scores: Scores): number {
  return Math.round((scores.visibilidad * 0.3 + scores.captacion * 0.3 + scores.conversion * 0.25 + scores.fidelizacion * 0.15));
}

export interface Bottleneck { factor: string; score: number; mensaje: string }
export function detectarCuellos(scores: Scores): Bottleneck[] {
  const arr = FACTORES.map((f) => ({ factor: f.nombre, id: f.id, score: scores[f.id] })).sort((x, y) => x.score - y.score);
  const out: Bottleneck[] = [];
  const peor = arr[0];
  if (peor.score < 55) out.push({ factor: peor.factor, score: peor.score, mensaje: `Principal freno: ${peor.factor} (${peor.score}/100). Todo el sistema pierde fuerza aquí.` });
  // Fuga conversión vs atención
  if (scores.redes_sociales >= 65 && scores.conversion < 45)
    out.push({ factor: "Conversión", score: scores.conversion, mensaje: "El problema no parece ser generar atención. Existe una fuga importante en conversión y seguimiento." });
  if (scores.visibilidad < 45 && scores.presencia_digital > 60)
    out.push({ factor: "Visibilidad", score: scores.visibilidad, mensaje: "Tienes infraestructura pero no genera flujo hacia ella: falta descubrimiento (Google, contenido, redes)." });
  if (scores.proceso_comercial < 45)
    out.push({ factor: "Proceso comercial", score: scores.proceso_comercial, mensaje: "Interés que no se cierra: respuesta lenta o sin seguimiento sistemático." });
  return out.slice(0, 3);
}

export function aida(scores: Scores) {
  return [
    { etapa: "Attention", valor: Math.round((scores.visibilidad + scores.redes_sociales) / 2) },
    { etapa: "Interest", valor: Math.round((scores.contenido + scores.posicionamiento) / 2) },
    { etapa: "Desire", valor: Math.round((scores.oferta + scores.confianza) / 2) },
    { etapa: "Action", valor: Math.round((scores.conversion + scores.proceso_comercial) / 2) },
  ];
}

export function journey(scores: Scores) {
  return [
    { etapa: "Descubrimiento", valor: scores.visibilidad },
    { etapa: "Consideración", valor: scores.contenido },
    { etapa: "Confianza", valor: scores.confianza },
    { etapa: "Contacto", valor: scores.conversion },
    { etapa: "Compra", valor: scores.proceso_comercial },
    { etapa: "Posventa", valor: scores.fidelizacion },
    { etapa: "Recompra", valor: scores.fidelizacion },
    { etapa: "Referido", valor: Math.round((scores.fidelizacion + scores.confianza) / 2) },
  ];
}

export function dofa(a: Answers, scores: Scores) {
  const fortalezas: string[] = [], debilidades: string[] = [], oportunidades: string[] = [], amenazas: string[] = [];
  for (const f of FACTORES) {
    if (scores[f.id] >= 65) fortalezas.push(`${f.nombre} (${scores[f.id]})`);
    else if (scores[f.id] < 45) debilidades.push(`${f.nombre} (${scores[f.id]})`);
  }
  oportunidades.push("Google Business Profile + SEO local para captar demanda existente");
  oportunidades.push("Contenido educativo y prueba social para construir autoridad");
  if ((a.canales || []).includes("whatsapp")) oportunidades.push("Profesionalizar WhatsApp + seguimiento para cerrar más");
  amenazas.push("Competidores visibles en Google y redes captando tu demanda");
  amenazas.push("Dependencia de referidos: canal difícil de escalar");
  return { fortalezas: fortalezas.slice(0, 5), debilidades: debilidades.slice(0, 5), oportunidades: oportunidades.slice(0, 4), amenazas };
}
