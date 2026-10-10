// AGENTE MOTOR DE REGLAS — decisiones críticas verificables. La IA enriquece, las reglas deciden.
import { Answers } from "./scoring";
export interface RuleHit { rule: string; need: string; solutions: string[]; priority: "ahora" | "proximo" | "despues"; reason: string }

// Formato: IF condición THEN recomendación. Reglas auditables.
export function evaluateRules(a: Answers): RuleHit[] {
  const hits: RuleHit[] = [];
  const canales: string[] = a.canales || [];

  if ((a.origen_clientes || []).includes("conocidos") || a.flujo === "muy_bajo") {
    hits.push({ rule: "IF dependencia_referidos THEN sistema_captacion", need: "Flujo predecible de prospectos", solutions: ["google_business", "contenido", "embudo"], priority: "ahora", reason: "La adquisición depende de un canal difícil de escalar." });
  }
  if (!canales.includes("google")) {
    hits.push({ rule: "IF sin_google THEN visibilidad_local", need: "Ser encontrado en Google/Maps", solutions: ["google_business", "seo_local", "resenas"], priority: "ahora", reason: "Sin ficha de Google pierdes demanda local lista para comprar." });
  }
  if ((a.redes || "si") && (a.frecuencia === "nunca" || a.frecuencia === "aveces")) {
    hits.push({ rule: "IF redes_sin_sistema THEN contenido", need: "Contenido que genere confianza", solutions: ["contenido", "instagram", "tiktok"], priority: "proximo", reason: "Presencia sin constancia ni estrategia." });
  }
  if (a.resenas === "ninguna" || a.resenas === "pocas") {
    hits.push({ rule: "IF pocas_resenas THEN reputacion", need: "Prueba social", solutions: ["resenas", "google_business"], priority: "ahora", reason: "Sin reseñas la conversión cae aunque haya tráfico." });
  }
  if (a.seguimiento !== "sistematico") {
    hits.push({ rule: "IF sin_seguimiento THEN crm_followup", need: "No perder prospectos", solutions: ["crm", "automatizacion", "whatsapp"], priority: "ahora", reason: "El interés se enfría sin seguimiento <24h." });
  }
  // Regla crítica: NO pautar si conversión baja
  if (a.quiere_publicidad === "si" && (a.tiene_landing === "no" || a.oferta_clara === "no")) {
    hits.push({ rule: "IF quiere_ads AND conversion_baja THEN frenar_paid", need: "Arreglar conversión ANTES de pautar", solutions: ["landing", "oferta_fix", "whatsapp"], priority: "ahora", reason: "Pautar sin landing que convierta quema presupuesto. Primero conversión, después tráfico pago." });
  }
  if (a.oferta_clara === "no") {
    hits.push({ rule: "IF oferta_confusa THEN clarificar", need: "Oferta clara con CTA", solutions: ["landing", "catalogo"], priority: "ahora", reason: "Si la oferta no se entiende en 5 segundos, nada más convierte." });
  }
  if (a.etapa === "emprendedor" || a.etapa === "idea") {
    hits.push({ rule: "IF etapa_temprana THEN basicos", need: "Fundamentos antes de escalar", solutions: ["whatsapp", "catalogo", "google_business", "contenido"], priority: "ahora", reason: "Modo emprendedor: propuesta, cliente, oferta y WhatsApp primero. Nada de CRM empresarial aún." });
  }
  if (a.medicion === "nada") {
    hits.push({ rule: "IF sin_medicion THEN analitica", need: "Medir para decidir", solutions: ["analitica"], priority: "proximo", reason: "Sin datos decides por intuición." });
  }
  // Nicho sensible: cumplimiento primero, nada de promesas ni pauta agresiva
  if (["multinivel", "suplementos", "finanzas"].includes(a.nicho)) {
    hits.push({ rule: "IF nicho_sensible THEN compliance", need: "Crecer sin que te bloqueen", solutions: ["contenido", "whatsapp", "resenas"], priority: "ahora", reason: "Tu nicho tiene restricciones de promoción: el camino es educar, pedir permiso y cumplir políticas. Nada de promesas ni mensajes masivos." });
  }
  if (a.nicho === "apuestas") {
    hits.push({ rule: "IF apuestas THEN reorientar", need: "Reorientar el enfoque", solutions: ["contenido"], priority: "ahora", reason: "La promoción de apuestas está bloqueada en casi todas las plataformas. Te ayudamos a reorientar, no a evadir reglas." });
  }
  // Canales estrella del nicho ausentes
  const estrella: Record<string, string[]> = { gastronomia: ["google", "instagram"], salud: ["google", "whatsapp"], servicios_local: ["google", "whatsapp"], profesionales: ["google", "linkedin"], ecommerce: ["marketplace", "instagram"], educacion: ["contenido", "embudo"], inmobiliaria: ["facebook", "google"] };
  const rec = (estrella[a.nicho] || []).filter((c) => !(canales || []).includes(c) && !["contenido", "embudo"].includes(c));
  if (rec.length > 0) {
    const solMap: Record<string, string> = { google: "google_business", instagram: "instagram", whatsapp: "whatsapp", facebook: "facebook", linkedin: "linkedin", marketplace: "facebook" };
    hits.push({ rule: "IF estrella_ausente THEN cubrir", need: "Estar donde tu nicho sí vende", solutions: rec.map((c) => solMap[c]).filter(Boolean), priority: "proximo", reason: `En tu nicho, ${rec.join(" y ")} son canales que sí venden y hoy no los aprovechas.` });
  }
  // Pauta quemada: ya pagó sin resultado y sin base
  if (/paut|publicidad|anuncio|agencia|meta|google ads/i.test(a.intentos || "") && !canales.includes("web")) {
    hits.push({ rule: "IF pauta_quemada AND sin_base THEN reconstruir", need: "No repetir la pauta que no funcionó", solutions: ["landing", "whatsapp", "analitica"], priority: "ahora", reason: "Ya invertiste sin retorno. Antes de volver a pautar: oferta clara, destino que convierta y medición." });
  }
  // Cierre web sin web
  if (a.cierre === "web" && !canales.includes("web")) {
    hits.push({ rule: "IF cierre_web SIN web THEN crear_destino", need: "Un destino que cierre solo", solutions: ["landing", "web"], priority: "ahora", reason: "Dices cerrar por web pero no tienes destino que convierta." });
  }
  // Cierre conversacional sin sistema
  if (["llamada", "zoom"].includes(a.cierre) && a.seguimiento !== "sistematico") {
    hits.push({ rule: "IF cierre_consultivo THEN agendar", need: "Ordenar tu cierre consultivo", solutions: ["bot", "crm"], priority: "proximo", reason: "El cierre por llamada/Zoom se pierde sin agenda y seguimiento." });
  }
  // Objetivo validar: definir antes de escalar
  if (a.objetivo === "validar") {
    hits.push({ rule: "IF validar THEN definir_primero", need: "Validar oferta y cliente antes de escalar", solutions: ["whatsapp", "catalogo", "contenido"], priority: "ahora", reason: "Validar no pide escala: pide conversar con clientes reales y probar la oferta." });
  }
  // Ecommerce solo si corresponde
  if (a.quiere_ecommerce === "si" && (a.flujo === "muy_bajo" || !canales.includes("web"))) {
    hits.push({ rule: "IF quiere_ecommerce SIN trafico THEN posponer", need: "Validar antes del ecommerce", solutions: ["catalogo", "landing", "whatsapp"], priority: "proximo", reason: "Ecommerce sin tráfico ni logística fracasa. Catálogo + WhatsApp primero." });
  }
  return hits;
}

export function presupuestoFiltro(costos: string[], presupuesto?: string): string[] {
  if (!presupuesto || presupuesto === "cero") return costos.filter((c) => ["gratis", "bajo"].includes(costLevelOf(c)));
  if (presupuesto === "bajo") return costos;
  return costos; // medio/alto: todo permitido, se ordena por impacto
}
function costLevelOf(solutionId: string): string {
  const map: Record<string, string> = { google_business: "gratis", whatsapp: "gratis", contenido: "gratis", resenas: "gratis", catalogo: "gratis", instagram: "gratis", tiktok: "gratis", facebook: "gratis", crm: "bajo", landing: "bajo", email: "bajo", analitica: "bajo", web: "medio", bot: "medio", publicidad: "medio", automatizacion: "medio", ecommerce: "avanzado" };
  return map[solutionId] || "bajo";
}
