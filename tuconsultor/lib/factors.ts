// AGENTE ESTRATEGA — Los 15 factores pilares del diagnóstico 360°
export type FactorId =
  | "propuesta_valor" | "cliente_objetivo" | "posicionamiento"
  | "presencia_digital" | "visibilidad" | "redes_sociales" | "contenido"
  | "confianza" | "oferta" | "conversion" | "proceso_comercial"
  | "captacion" | "fidelizacion" | "competencia" | "medicion";

export interface Factor {
  id: FactorId;
  n: number;
  nombre: string;
  descripcion: string;
  peso: number; // peso relativo en salud general
  preguntasClave: string[];
}

export const FACTORES: Factor[] = [
  { id: "propuesta_valor", n: 1, nombre: "Propuesta de valor", descripcion: "Claridad de por qué elegirte y no a otro.", peso: 8, preguntasClave: ["negocio", "diferencial"] },
  { id: "cliente_objetivo", n: 2, nombre: "Cliente objetivo", descripcion: "Definición del cliente ideal y sus dolores.", peso: 8, preguntasClave: ["cliente", "dolor"] },
  { id: "posicionamiento", n: 3, nombre: "Posicionamiento", descripcion: "Lugar que ocupas en la mente del mercado.", peso: 6, preguntasClave: ["diferencial", "competencia"] },
  { id: "presencia_digital", n: 4, nombre: "Presencia digital", descripcion: "Activos digitales existentes y su estado.", peso: 7, preguntasClave: ["canales", "web"] },
  { id: "visibilidad", n: 5, nombre: "Visibilidad y descubrimiento", descripcion: "Facilidad para ser encontrado (SEO, GBP, mapas).", peso: 8, preguntasClave: ["descubrimiento", "google"] },
  { id: "redes_sociales", n: 6, nombre: "Redes sociales", descripcion: "Estrategia, constancia y comunidad en redes.", peso: 6, preguntasClave: ["redes", "frecuencia"] },
  { id: "contenido", n: 7, nombre: "Contenido", descripcion: "Contenido que educa, atrae y genera confianza.", peso: 6, preguntasClave: ["contenido"] },
  { id: "confianza", n: 8, nombre: "Confianza y reputación", descripcion: "Prueba social, reseñas, autoridad.", peso: 8, preguntasClave: ["resenas", "prueba_social"] },
  { id: "oferta", n: 9, nombre: "Oferta", descripcion: "Claridad, atractivo y urgencia de la oferta.", peso: 7, preguntasClave: ["oferta"] },
  { id: "conversion", n: 10, nombre: "Conversión", descripcion: "Capacidad de convertir interés en contacto/compra.", peso: 9, preguntasClave: ["conversion", "cta"] },
  { id: "proceso_comercial", n: 11, nombre: "Proceso comercial", descripcion: "Seguimiento, respuesta, cierre (WhatsApp, agenda).", peso: 8, preguntasClave: ["seguimiento", "whatsapp"] },
  { id: "captacion", n: 12, nombre: "Captación", descripcion: "Sistema predecible de generación de leads.", peso: 7, preguntasClave: ["origen_clientes", "leads"] },
  { id: "fidelizacion", n: 13, nombre: "Fidelización", descripcion: "Recompra, referidos y posventa.", peso: 5, preguntasClave: ["recompra", "posventa"] },
  { id: "competencia", n: 14, nombre: "Competencia y adaptación", descripcion: "Vigilancia competitiva y adaptación al cambio.", peso: 4, preguntasClave: ["competencia"] },
  { id: "medicion", n: 15, nombre: "Medición y estrategia", descripcion: "Datos, KPIs y decisiones basadas en evidencia.", peso: 3, preguntasClave: ["medicion"] },
];

export const factorById = (id: FactorId) => FACTORES.find((f) => f.id === id)!;
