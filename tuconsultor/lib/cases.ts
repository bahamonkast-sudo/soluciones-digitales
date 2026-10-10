// Biblioteca de casos y patrones REALES. Regla de oro: solo mecanismos públicos y
// cualitativos. NADA de cifras, resultados ni historias inventadas.
export type CaseKind = "empresa" | "patron_pyme";
export interface Case {
  id: string;
  nombre: string;
  tipo: CaseKind;
  mecanismo: string;      // qué hacen, verificable públicamente
  leccion_pyme: string;   // cómo lo aplica un negocio pequeño
  tags: string[];         // para emparejar con preguntas y soluciones
}

export const CASES: Case[] = [
  { id: "amazon", nombre: "Amazon", tipo: "empresa", mecanismo: "Cada producto muestra reseñas, preguntas respondidas y oferta clara con un solo botón de compra.", leccion_pyme: "Pide reseñas, responde dudas frecuentes en tu catálogo y deja UN botón de contacto visible.", tags: ["confianza", "resenas", "conversion", "catalogo", "oferta"] },
  { id: "mercadolibre", nombre: "Mercado Libre", tipo: "empresa", mecanismo: "Reputación por colores, ficha completa del producto y respuesta rápida al comprador.", leccion_pyme: "Tu WhatsApp es tu ficha: catálogo completo, foto real, precio y respuesta en minutos.", tags: ["marketplace", "conversion", "whatsapp", "confianza", "catalogo"] },
  { id: "airbnb", nombre: "Airbnb", tipo: "empresa", mecanismo: "Fotos reales, reseñas de ambos lados y recordatorios que evitan abandonos.", leccion_pyme: "Fotos reales + pedir reseña después de cada venta + un mensaje de seguimiento al que preguntó y no compró.", tags: ["confianza", "resenas", "contenido", "seguimiento", "fidelizacion"] },
  { id: "duolingo", nombre: "Duolingo", tipo: "empresa", mecanismo: "Onboarding conversacional que clasifica al usuario y recordatorios de reactivación.", leccion_pyme: "Un bot o mensaje de bienvenida que pregunte '¿qué buscas?' clasifica mejor que un 'hola, ¿en qué te ayudo?'.", tags: ["bot", "conversion", "email", "automatizacion", "landing"] },
  { id: "hubspot", nombre: "HubSpot", tipo: "empresa", mecanismo: "Educa gratis con contenido (blogs, guías) y recién después ofrece el producto: embudo educativo.", leccion_pyme: "Publica 70% contenido que educa, 20% prueba social y 10% venta. La venta llega sola.", tags: ["contenido", "embudo", "captacion", "instagram", "tiktok"] },
  { id: "shopify", nombre: "Shopify", tipo: "empresa", mecanismo: "Landings por segmento con una sola oferta y un solo llamado a la acción.", leccion_pyme: "Una página (o mensaje) por oferta, con un solo botón. Si ofreces todo a la vez, no vendes nada.", tags: ["landing", "oferta", "conversion", "publicidad", "web"] },
  { id: "starbucks", nombre: "Starbucks", tipo: "empresa", mecanismo: "Consistencia + programa que premia volver: la recompra como motor.", leccion_pyme: "Una lista simple de clientes + un beneficio por volver (descuento, recordatorio) vale más que buscar clientes nuevos.", tags: ["fidelizacion", "crm", "email", "whatsapp", "oferta"] },
  { id: "nike", nombre: "Nike / Netflix", tipo: "empresa", mecanismo: "Contenido de comunidad e historias, no solo producto: la gente sigue a quien le aporta.", leccion_pyme: "Muestra el proceso, clientes reales y antes/después honestos (sin promesas falsas). Comunidad antes que catálogo.", tags: ["contenido", "redes_sociales", "instagram", "tiktok", "youtube"] },
  { id: "pyme_gbp", nombre: "Patrón PYME: ficha de Google + reseñas", tipo: "patron_pyme", mecanismo: "Negocios locales que completan su ficha (fotos, horarios, servicios) y piden reseñas reciben más llamadas desde Maps.", leccion_pyme: "Completa tu ficha hoy y pide 5 reseñas esta semana. Es gratis y es lo primero que ve quien busca.", tags: ["google_business", "seo_local", "visibilidad", "resenas", "emprendedor"] },
  { id: "pyme_wa", nombre: "Patrón PYME: WhatsApp que vende", tipo: "patron_pyme", mecanismo: "Emprendimientos que ordenan WhatsApp (catálogo, respuestas rápidas, etiquetas, seguimiento a 24h) cierran más con el mismo tráfico.", leccion_pyme: "Responde en minutos, etiqueta a cada contacto y re-escribe al día siguiente al que no compró.", tags: ["whatsapp", "catalogo", "seguimiento", "bot", "emprendedor", "conversion"] },
];

export function findCases(tags: string[], top = 2): Case[] {
  const norm = (s: string) => s.toLowerCase();
  const scored = CASES.map((c) => ({ c, hit: c.tags.filter((t) => tags.some((q) => norm(q).includes(t) || norm(t).includes(norm(q)))).length }));
  const ranked = scored.filter((s) => s.hit > 0).sort((a, b) => b.hit - a.hit);
  return (ranked.length ? ranked : scored.slice(0, 0)).slice(0, top).map((s) => s.c);
}
