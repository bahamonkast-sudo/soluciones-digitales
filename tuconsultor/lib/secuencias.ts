// Nutrición para tu app de envíos masivos: secuencia día 0/2/7/14.
// Tono humano, 1 CTA por mensaje, siempre con salida (responde BAJA).
export interface Plantilla { dia: string; momento: string; texto: string }

export function buildSecuencia(lead: { nombre: string; negocio: string; salud: number; freno: string }): Plantilla[] {
  const n = lead.nombre.split(" ")[0] || "hola";
  return [
    { dia: "Día 0", momento: "Entrega del ebook", texto: `Hola ${n}, soy tuConsultor, de Soluciones Digitales. Aquí está tu plan de crecimiento para ${lead.negocio} (salud ${lead.salud}/100). Tu freno principal: ${lead.freno}. Empieza por el corto plazo: te toma 20 min. ¿Me confirmas cuando lo termines? (Responde BAJA para no recibir más)` },
    { dia: "Día 2", momento: "Seguimiento suave", texto: `Hola ${n}, ¿cómo vas con tu plan? La mayoría se atasca en el seguimiento a 24h. Si quieres, te explico cómo automatizarlo en 25 min. ¿Te sirve?` },
    { dia: "Día 7", momento: "Medición semanal", texto: `${n}, hoy toca medir tu semana: contactos, respuestas en <1h y ventas. Si me pasas tus 3 números, te digo qué ajustar. ¿Los tienes a mano?` },
    { dia: "Día 14", momento: "Oferta de implementación", texto: `${n}, si el plan te sirvió pero te falta tiempo para implementarlo, en Soluciones Digitales lo hacemos por ti (empezamos por ${lead.freno}). ¿Agendamos 15 min para verlo?` },
  ];
}
