// Guiones de cierre por canal — del auditor websd: saludo, calificación,
// presentación, objeción y seguimiento. [Corchetes] = completar por el negocio.
export interface Guion { canal: string; titulo: string; pasos: { nombre: string; texto: string }[] }
const W = "[tu negocio]";

export const GUIONES: Record<string, Guion> = {
  whatsapp: { canal: "WhatsApp", titulo: "Cierre 1 a 1 por WhatsApp", pasos: [
    { nombre: "1. Saludo rápido", texto: `Hola, gracias por escribir a ${W} 👋 ¿Qué estabas buscando hoy?` },
    { nombre: "2. Calificar", texto: "Para ayudarte mejor: ¿es para ti o para alguien más? ¿Para cuándo lo necesitas?" },
    { nombre: "3. Presentar", texto: "Por lo que me cuentas, te sirve [oferta concreta]. Incluye [2-3 beneficios] y el precio es [precio]." },
    { nombre: "4. Objeción precio", texto: "Te entiendo. Lo que incluye es [X] y además tienes [garantía]. ¿Lo separamos hoy con [anticipo]?" },
    { nombre: "5. Cierre", texto: "Perfecto, te agendo para [fecha]. Te envío la confirmación por aquí mismo. ✅" },
    { nombre: "6. Seguimiento 24h", texto: "Hola, ayer me preguntaste por [oferta]. ¿Te quedó alguna duda? Hoy puedo [beneficio/urgencia honesta]." },
  ]},
  llamada: { canal: "Llamada", titulo: "Cierre por llamada", pasos: [
    { nombre: "1. Apertura", texto: `Hola [nombre], te llamo de ${W} como acordamos. ¿Tienes 5 minutos?` },
    { nombre: "2. Calificar", texto: "Cuéntame: ¿qué te trae por aquí y qué has probado antes?" },
    { nombre: "3. Presentar", texto: "Entonces lo ideal es [oferta], porque [razón ligada a lo que dijo]." },
    { nombre: "4. Objeción 'lo pienso'", texto: "Claro. ¿Qué parte te genera duda: el precio, el tiempo o si te funcionará? Vamos una por una." },
    { nombre: "5. Cierre", texto: "¿Avanzamos hoy con [primer paso pequeño]? Así aseguras [beneficio]." },
    { nombre: "6. Seguimiento", texto: "Mensaje al día siguiente resumiendo lo hablado + el enlace para pagar/agendar." },
  ]},
  zoom: { canal: "Zoom / Meet", titulo: "Cierre por videollamada", pasos: [
    { nombre: "1. Apertura", texto: `Gracias por conectarte. En 20 min vemos si ${W} es para ti. ¿Te parece?` },
    { nombre: "2. Calificar", texto: "Comparte pantalla o pizarra: situación actual → meta → obstáculo." },
    { nombre: "3. Presentar", texto: "Muestra 1 caso/proceso (no 20 diapositivas): así se ve con nosotros." },
    { nombre: "4. Objeción", texto: "Aísla la duda real: 'Si resolvemos [X], ¿avanzamos hoy?'" },
    { nombre: "5. Cierre", texto: "Dos opciones: [A completo / B inicial]. ¿Cuál te deja más tranquilo?" },
    { nombre: "6. Seguimiento", texto: "Resumen por WhatsApp en 1h + fecha de decisión acordada." },
  ]},
  web: { canal: "Web automática", titulo: "Lo que tu web debe cerrar sola", pasos: [
    { nombre: "1. Promesa en 5 seg", texto: "Título: qué + para quién + resultado. Sin poesía." },
    { nombre: "2. Prueba", texto: "Reseñas, números honestos, fotos reales cerca del botón." },
    { nombre: "3. Oferta + botón", texto: "Un solo CTA visible sin scroll: [Comprar / Agendar / WhatsApp]." },
    { nombre: "4. Objeciones", texto: "Responde arriba del botón: precio, garantía, tiempos, envío." },
    { nombre: "5. Rescate", texto: "Carrito/visita abandonada → email o remarketing (con permiso)." },
  ]},
  dm: { canal: "DM Instagram/Facebook", titulo: "Cierre por mensajes directos", pasos: [
    { nombre: "1. Respuesta humana", texto: "Hola 🙌 Vi tu mensaje, ¿buscas [A] o [B]? (2 opciones califican rápido)." },
    { nombre: "2. Calificar", texto: "2 preguntas máximo antes de presentar. Nadie lee interrogatorios." },
    { nombre: "3. Presentar", texto: "Video o nota de voz de 30 seg > 5 párrafos. La voz genera confianza." },
    { nombre: "4. Pasar a WhatsApp", texto: "Te escribo por WhatsApp para enviarte [catálogo/precios]: ¿me pasas tu número?" },
    { nombre: "5. Seguimiento", texto: "Si no responde en 24h: un mensaje útil (no '¿sigues interesado?')." },
  ]},
  presencial: { canal: "Presencial", titulo: "Cierre en local o visita", pasos: [
    { nombre: "1. Bienvenida", texto: `Bienvenido a ${W}. ¿Buscabas algo en especial hoy?` },
    { nombre: "2. Calificar", texto: "Pregunta de uso: ¿para qué lo necesitas y para cuándo?" },
    { nombre: "3. Presentar", texto: "Muestra 2 opciones (no 10): la ideal y la económica. Recomienda una." },
    { nombre: "4. Objeción", texto: "Si duda: ofrece probarlo, garantía o llevárselo con seña mínima." },
    { nombre: "5. Posventa", texto: "Pide WhatsApp para avisarle de [reposiciones/promos] + reseña en Google." },
  ]},
};

export const guionPorCierre = (cierre?: string): Guion => {
  const c = (cierre || "").toLowerCase();
  if (c.includes("llamada")) return GUIONES.llamada;
  if (c.includes("zoom") || c.includes("meet")) return GUIONES.zoom;
  if (c.includes("web") || c.includes("automat")) return GUIONES.web;
  if (c.includes("dm") || c.includes("instagram") || c.includes("directo")) return GUIONES.dm;
  if (c.includes("presencial") || c.includes("local") || c.includes("visita")) return GUIONES.presencial;
  return GUIONES.whatsapp;
};
