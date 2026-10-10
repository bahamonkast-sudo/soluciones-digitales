// Soluciones INMEDIATAS, no sugerencias: cada respuesta importante recibe
// qué hacer + cómo hacerlo paso a paso + texto listo para copiar +
// prompt específico para IA. Concreto, nada convencional.
import { detectNicho } from "./escucha";
import { nichoById } from "./nichos";
export interface Flash {
  titulo: string;
  diagnostico: string;
  pasos: string[];
  plantilla?: { titulo: string; texto: string };
  promptIA?: string;
  tiempo: string;
}

const arr = (v: any): string[] => (Array.isArray(v) ? v : v ? [v] : []);

export function flashPara(qid: string, val: any): Flash | null {
  const c = arr(val);
  switch (qid) {
    case "negocio": {
      if (!val || !String(val).trim()) return null;
      const det = detectNicho(String(val));
      const n = nichoById(det?.nichoId || "otro");
      const e1 = n.canales_estrella[0];
      const e2 = n.canales_estrella[1];
      return {
        titulo: `Tu punto de partida${det ? ` (${n.label.split("(")[0].trim().toLowerCase()})` : ""}: 3 movimientos esta semana`,
        diagnostico: det && e1
          ? `Ya detecté tu nicho y sé dónde sí vende: ${e1.canal} (${e1.por_que})${e2 ? ` y ${e2.canal}` : ""}. Empieza por ahí, no por todo a la vez.`
          : "Ya tengo tu objetivo. El nicho exacto lo confirmamos en la siguiente pantalla y ajusto el plan.",
        pasos: [
          `Escribe tu oferta en 1 línea: [resultado para el estudiante/cliente] + [modalidad] + pide info por WhatsApp. Sin esa línea, nada más convierte.`,
          e1 ? `Tu canal #1 es ${e1.canal}: complétalo hoy (perfil, fotos reales, botón de contacto).` : "Completa tu ficha de Google hoy (fotos, horarios, contacto).",
          e2 ? `Tu canal #2 es ${e2.canal}: ${e2.por_que}` : "Pide tus primeras 5 reseñas a quienes ya te conocen.",
          `Tu mejor cierre en este nicho: ${n.mejor_cierre}. Ordena ese canal esta semana.`,
        ],
        plantilla: { titulo: "Oferta en 1 línea (adáptala)", texto: "[Producto o servicio] en [ciudad/modalidad]. [Beneficio concreto que te diferencia]. Pide info aquí: [WhatsApp]" },
        promptIA: "Actúa como estratega de captación para negocios pequeños. Mi negocio: [descríbelo]. Mi cliente: [descríbelo]. Mi problema: [cuéntalo en 1 línea]. Dame 3 ofertas de captación concretas con el mensaje exacto de WhatsApp para cada una, tono cercano, sin promesas falsas ni clichés.",
        tiempo: "Esta semana",
      };
    }
    case "canales":
      if (c.includes("ninguno") || !c.length) return {
        titulo: "Tu primera vitrina en 48 horas (gratis)",
        diagnostico: "Sin presencia digital solo existes para tus conocidos. Esto se arregla en 2 tardes.",
        pasos: [
          "Crea una FANPAGE en Facebook (no uses tu perfil personal: el perfil limita el alcance comercial, no da estadísticas ni botón de WhatsApp, y vender desde ahí viola las normas). Nombre: [tu negocio] + ciudad.",
          "Completa la fanpage: foto de perfil (logo), portada (tu producto/servicio), botón 'Enviar mensaje a WhatsApp' y horario.",
          "Crea tu ficha de Google Business: así apareces en Maps cuando buscan lo que vendes.",
          "Abre un CANAL de Telegram con tu nombre: ahí publicarás ofertas sin pelear con el algoritmo.",
        ],
        plantilla: { titulo: "Bio lista para tu fanpage", texto: "[Qué vendes] en [ciudad] ✅ [Diferencial: ej. entrega el mismo día] 📲 Pide por WhatsApp: [tu número] ⏰ [Horario]" },
        promptIA: "Actúa como fotógrafo de producto para redes sociales. Te describo mi producto y me devuelves: 1) cómo fotografiarlo con un celular (fondo, luz, ángulo), 2) 3 ideas de fotos que vendan. Mi producto: [descríbelo]. Sin consejos genéricos.",
        tiempo: "2 tardes",
      };
      if (!c.includes("google")) return {
        titulo: "Aparece en Google Maps esta semana",
        diagnostico: "Tienes redes pero te falta donde la gente busca con intención de compra.",
        pasos: ["Entra a google.com/business y crea tu ficha con tu dirección o zona de servicio.", "Sube 10 fotos reales (local, productos, equipo) y tus horarios.", "Pide tus primeras 5 reseñas a clientes felices (abajo tienes el mensaje exacto).", "Publica 1 novedad al mes en la ficha: aparece en tu perfil de Maps."],
        plantilla: { titulo: "Mensaje para pedir reseñas", texto: "Hola [nombre] 🙏 ¿Me ayudas con 2 minutos? Tu reseña me ayuda muchísimo a que más personas me encuentren. Aquí el enlace directo: [link de reseñas de Google]. ¡Gracias!" },
        tiempo: "1 tarde",
      };
      return null;
    case "origen_clientes":
      if (c.includes("conocidos") || c.includes("referidos")) return {
        titulo: "Convierte el voz a voz en sistema",
        diagnostico: "La confianza ya la tienes; te falta el mecanismo para que se repita sin depender de la suerte.",
        pasos: ["Haz una lista de tus 20 mejores clientes.", "Escríbeles el mensaje de abajo (1 por 1, nada masivo).", "Ofrece un beneficio por referido que SÍ compre (descuento o detalle, no promesas).", "Registra quién te refirió a quién en una hoja o etiquetas de WhatsApp."],
        plantilla: { titulo: "Mensaje pide-referidos", texto: "Hola [nombre] 💚 Gracias por confiar en [negocio]. Estoy creciendo con clientes como tú: ¿conoces a 1 persona que necesite [lo que vendes]? Si me la presentas y compra, te regalo [beneficio concreto]. ¿Te parece?" },
        promptIA: "Actúa como estratega de referidos para un negocio pequeño. Mi negocio: [descríbelo]. Mi ticket promedio: [monto]. Dame 3 incentivos de referido de bajo costo que sí motiven, con el mensaje exacto para cada uno. Nada de 'descuentos increíbles' genéricos.",
        tiempo: "1 hora",
      };
      return null;
    case "seguimiento":
      if (c.includes("no") || c.includes("aveces")) return {
        titulo: "Rescata ventas desde mañana con 1 mensaje",
        diagnostico: "La mayoría de ventas se cierra entre el 2º y 5º contacto. Hoy ese dinero se pierde.",
        pasos: ["Etiqueta en WhatsApp a todo el que preguntó y no compró (etiqueta: 'seguimiento').", "A las 24h envíales el mensaje de abajo. Sin excepción.", "Si responde, cierra con una pregunta (no con '¿te interesa?').", "Repite cada semana con los nuevos contactos."],
        plantilla: { titulo: "Mensaje 24h (copiar y adaptar)", texto: "Hola [nombre], ayer me preguntaste por [producto]. Te guardé [disponibilidad/beneficio] hasta hoy. ¿Te lo separo o te quedó alguna duda? 🙂" },
        promptIA: "Actúa como vendedor por WhatsApp. Situación: el cliente preguntó precio ayer y no respondió. Mi producto: [X], precio [Y]. Escríbeme 3 mensajes de seguimiento distintos (corto, útil, sin presión): uno con urgencia honesta, uno con prueba social y uno con pregunta. Máximo 25 palabras cada uno.",
        tiempo: "20 minutos",
      };
      return null;
    case "resenas":
      if (c.includes("ninguna") || c.includes("pocas")) return {
        titulo: "Tus primeras 5 estrellas esta semana",
        diagnostico: "Sin prueba social, cada visita a tu perfil termina en duda. Con 5 reseñas, todo convierte más.",
        pasos: ["Activa el enlace directo de reseñas (Google Business > Conseguir más reseñas).", "Elige 5 clientes felices y escríbeles justo después de entregarles (momento feliz).", "Usa el mensaje de abajo, personalizado con su nombre.", "Responde CADA reseña (gracias + 1 línea): eso también vende."],
        plantilla: { titulo: "Pedir reseña en el momento feliz", texto: "¡Qué bueno que te gustó, [nombre]! 🎉 ¿Me regalas una reseña? Son 2 minutos y me ayuda a llegar a más personas como tú: [link]" },
        tiempo: "30 minutos",
      };
      return null;
    case "oferta_clara":
      if (c.includes("no") || c.includes("maso")) return {
        titulo: "Tu oferta en 1 línea que sí se entiende",
        diagnostico: "Si no se entiende en 5 segundos, el cliente compra al competidor. Fórmula: resultado + plazo + cómo pedirlo.",
        pasos: ["Completa la fórmula: 'Te ayudo a [resultado] en [plazo] por [WhatsApp/web/local]'.", "Quita todo lo demás de tu bio y estados por 7 días. Solo esa línea.", "Pregunta a 3 personas: '¿entiendes qué vendo?' Ajusta hasta que digan sí."],
        plantilla: { titulo: "Plantilla de oferta", texto: "[Resultado concreto] en [plazo realista], sin [objeción típica]. Pídela aquí: [WhatsApp]. Ej: 'Reparo tu celular hoy mismo, con garantía de 30 días. Escríbeme.'" },
        promptIA: "Actúa como redactor de ofertas. Mi negocio: [descríbelo]. Mi cliente: [descríbelo]. Dame 5 versiones de mi oferta en UNA línea cada una (resultado + plazo + cómo pedirlo), tono [cercano/profesional], sin palabras vacías como 'calidad' o 'excelente servicio'.",
        tiempo: "25 minutos",
      };
      return null;
    case "frecuencia":
      if (c.includes("nunca") || c.includes("aveces")) return {
        titulo: "1 contenido semanal que sí vende (sistema, no inspiración)",
        diagnostico: "No necesitas viralidad: necesitas 1 pieza semanal que responda lo que tus clientes preguntan.",
        pasos: ["Anota las 4 preguntas que más te hacen tus clientes.", "Cada semana responde UNA en video de 40 segundos o carrusel.", "Estructura fija: gancho (el error/la duda) → explicación → 'escríbeme por WhatsApp'.", "Repite las que más comentarios traigan."],
        plantilla: { titulo: "Guion de 40 segundos", texto: "¿[Pregunta del cliente]? Te explico en 40 segundos. [Respuesta en 2 frases]. El error más común es [X]. Si te pasa, escríbeme '[PALABRA]' por WhatsApp y te ayudo." },
        promptIA: "Actúa como guionista de Reels para negocios locales. Mi negocio: [X]. Mi cliente: [Y]. La duda a responder: [Z]. Dame el guion palabra por palabra de 40 segundos: gancho de 3 segundos, desarrollo simple y CTA a WhatsApp. Tono conversacional, cero clichés motivacionales.",
        tiempo: "40 min/semana",
      };
      return null;
    case "tiempo_respuesta":
      if (c.includes("horas") || c.includes("dias")) return {
        titulo: "Responde como si fuera urgente (porque lo es)",
        diagnostico: "El que responde primero suele vender. Configura esto hoy y deja de perder clientes dormidos.",
        pasos: ["Activa mensaje de bienvenida en WhatsApp Business (responde en segundos, siempre).", "Crea 3 respuestas rápidas: precios, horarios/ubicación y garantía.", "Define un horario de respuesta y cúmplelo (ej: <30 min de 8am a 7pm).", "Fuera de horario: mensaje de ausencia con hora de respuesta."],
        plantilla: { titulo: "Bienvenida automática", texto: "¡Hola! Gracias por escribir a [negocio] 👋 Te atiendo en unos minutos. Mientras tanto: ¿buscas [opción A] o [opción B]? ⏰ Horario: [X a Y]" },
        tiempo: "20 minutos",
      };
      return null;
    case "presupuesto":
      if (c.includes("cero")) return {
        titulo: "Tu arsenal gratis que sí vende",
        diagnostico: "Con $0 se puede vender: el orden es Google + reseñas + WhatsApp + 1 contenido semanal.",
        pasos: ["Día 1: ficha de Google completa + 10 fotos.", "Día 2: WhatsApp Business (catálogo + bienvenida + etiquetas).", "Día 3: pide 5 reseñas.", "Cada semana: 1 contenido que responda dudas + 1 ronda de seguimiento."],
        tiempo: "1 semana, $0",
      };
      return null;
    case "nicho":
      if (["multinivel", "suplementos", "finanzas"].includes(String(val))) return {
        titulo: "Cómo crecer en nicho sensible sin que te bloqueen",
        diagnostico: "Tu nicho tiene reglas estrictas: el que promete de más, pierde la cuenta. El camino es educar.",
        pasos: ["Prohibido: promesas de ingresos/resultados, antes/después milagrosos, mensajes masivos no solicitados.", "Publica tu proceso diario y lo que aprendes (marca personal > spam).", "Todo seguimiento 1 a 1 y con permiso. Las listas masivas frías te queman.", "Lee las políticas de Meta y WhatsApp Business antes de cualquier campaña."],
        promptIA: "Actúa como asesor de cumplimiento para marketing. Mi nicho: [multinivel/suplementos/finanzas]. Voy a publicar: [describe tu idea de post]. Dime si tiene riesgos de bloqueo o rechazo y cómo reescribirlo de forma segura y honesta, sin promesas.",
        tiempo: "Hoy",
      };
      return null;
    case "diferencial":
      if (c.includes("no_se")) return {
        titulo: "Encuentra tu diferencia en 15 minutos",
        diagnostico: "Sin diferencia compites solo por precio. Responde esto y aparece sola.",
        pasos: ["¿Qué te agradecen tus clientes? (pregunta a 3).", "¿Qué odian de tu competencia? (lee sus reseñas malas).", "Une ambas: 'lo que ellos odian, yo lo hago bien'. Esa es tu frase.", "Ponla en tu bio y repítela en cada venta."],
        plantilla: { titulo: "Frase diferencial", texto: "A diferencia de [competencia], en [negocio] [beneficio concreto que agradecen]. Ej: 'A diferencia de otros talleres, te doy el diagnóstico gratis y por escrito.'" },
        tiempo: "15 minutos",
      };
      return null;
    case "cliente_definido":
      if (c.includes("no")) return {
        titulo: "Tu cliente ideal en 1 frase",
        diagnostico: "Hablarle a todos es hablarle a nadie. Define UNO y todo (contenido, oferta, canal) se aclara.",
        pasos: ["Piensa en tu mejor cliente: ¿edad, dónde vive, qué le dolía?", "Escríbelo así: '[persona] que quiere [resultado] sin [obstáculo]'.", "Toda tu comunicación de 7 días: solo para esa persona."],
        plantilla: { titulo: "Frase de cliente ideal", texto: "Ayudo a [persona concreta] a lograr [resultado] sin [lo que odia]. Ej: 'Ayudo a mamás ocupadas a tener ropa impecable sin salir de casa.'" },
        tiempo: "15 minutos",
      };
      return null;
    case "quiere_publicidad":
      if (c.includes("si")) return {
        titulo: "Checklist: ¿ya puedes pautar sin quemar dinero?",
        diagnostico: "Pautar sin esto es donarle dinero a Meta. Verifica los 5 puntos primero.",
        pasos: ["¿Oferta entendible en 5 segundos? (si no, arréglala primero).", "¿Destino que convierta (landing/WhatsApp ordenado)?", "¿Píxel instalado y 1.000 visitas/mes mínimo?", "¿Presupuesto de prueba que puedas perder 2 semanas?", "¿Sabes tu costo por lead máximo rentable? (ticket × conversión)."],
        plantilla: { titulo: "Tu número antes de pautar", texto: "Mi ticket es $[X], convierto [Y]% de contactos → puedo pagar hasta $[X×Y] por contacto. Si el anuncio cuesta más, pierdo." },
        tiempo: "Revisión de 30 min",
      };
      return null;
    case "nivel":
      if (c.includes("cero")) return {
        titulo: "Plan 48h desde cero",
        diagnostico: "Partir de cero es ventaja: sin malos hábitos. Este es el orden exacto.",
        pasos: ["Hoy: fanpage + Google Business (usa la guía de arriba).", "Mañana: WhatsApp Business + catálogo + 5 reseñas.", "Esta semana: primer contenido con el sistema de 40 segundos."],
        tiempo: "48 horas",
      };
      return null;
    case "flujo":
      if (c.includes("muy_bajo")) return {
        titulo: "Primeros 10 prospectos esta semana",
        diagnostico: "Sin flujo nada más importa. Tres fuentes gratis y rápidas.",
        pasos: ["Pide 5 referidos con el mensaje de la guía de arriba.", "Publica tu oferta en 3 grupos/Marketplace locales (aportando, sin spam).", "Re-escribe a 10 contactos viejos con el mensaje de 24h."],
        plantilla: { titulo: "Reactivar contacto frío", texto: "Hola [nombre], soy [tú] de [negocio]. Esta semana tengo [oferta/beneficio concreto]. ¿Te sirve o conoces a alguien que lo necesite? 🙂" },
        tiempo: "Esta semana",
      };
      return null;
    case "dolor":
      return val ? {
        titulo: "Tu freno ya está en el plan",
        diagnostico: `“${String(val).slice(0, 100)}” — el diagnóstico lo usará para ordenar las prioridades del informe.`,
        pasos: ["Termina el diagnóstico cuando quieras completar tu plan.", "El consultor de marketing está disponible por separado, en cualquier momento.", "Ejecuta la solución de tu plan de 7 días marcada como AHORA."],
        tiempo: "5 minutos",
      } : null;
    default: return null;
  }
}


