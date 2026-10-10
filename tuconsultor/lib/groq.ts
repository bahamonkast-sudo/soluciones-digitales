// AGENTE IA/GROQ — server-side only. Structured outputs + fallback + observabilidad + anti-alucinación.
import Groq from "groq-sdk";
import { z } from "zod";
import { retrieveKnowledge } from "./knowledge";
import { SOLUTIONS } from "./solutions";
import { FACTORES } from "./factors";
import { findCases } from "./cases";

export const InsightSchema = z.object({
  problem: z.string(), severity: z.enum(["alta", "media", "baja"]), cause: z.string(),
  explanation: z.string(), recommendation: z.string(), priority: z.enum(["ahora", "proximo", "despues"]),
  expected_result: z.string(), kpis: z.array(z.string()), sources: z.array(z.object({ titulo: z.string(), url: z.string().optional(), tipo: z.string() })),
  next_action: z.string(),
});
export type Insight = z.infer<typeof InsightSchema>;

export interface ObsLog { agent: string; model: string; promptVersion: string; usedFallback: boolean; ms: number; at: string }

const SYSTEM = `Eres tuConsultor, consultor estratégico 360° de Soluciones Digitales.
REGLAS ESTRICTAS:
- Usa SOLO el contexto del negocio proporcionado. Personaliza, nada genérico.
- NO inventes estadísticas, estudios, políticas, cifras, casos ni fuentes. Si no hay información suficiente di: "No hay información suficiente para determinarlo."
- Distingue: FUENTE OFICIAL / ACADÉMICA / ESTUDIO / BUENA PRÁCTICA / RECOMENDACIÓN DE tuConsultor.
- Tono humano, claro, accionable. Explica el POR QUÉ antes del QUÉ.
- Responde en JSON válido según el esquema pedido.`;

export async function groqInsight(context: object, question: string, apiKeyOpt?: string): Promise<{ insight: Insight | null; fallback: boolean; log: ObsLog }> {
  const t0 = Date.now();
  const apiKey = process.env.GROQ_API_KEY || apiKeyOpt;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const log = (fb: boolean): ObsLog => ({ agent: "ia/groq", model: fb ? "rules-fallback" : model, promptVersion: "v1.2", usedFallback: fb, ms: Date.now() - t0, at: new Date().toISOString() });
  if (!apiKey) return { insight: null, fallback: true, log: log(true) };
  try {
    const groq = new Groq({ apiKey });
    const completion: any = await groq.chat.completions.create({
      model, temperature: 0.4, max_tokens: 900,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: `CONTEXTO DEL NEGOCIO:\n${JSON.stringify(context).slice(0, 4000)}\n\nPREGUNTA A INTERPRETAR: ${question}\n\nDevuelve JSON con: problem, severity(alta|media|baja), cause, explanation, recommendation, priority(ahora|proximo|despues), expected_result, kpis[], sources[{titulo,url?,tipo}], next_action.` },
      ],
      response_format: { type: "json_object" } as any,
    });
    const raw = completion.choices?.[0]?.message?.content || "{}";
    const parsed = InsightSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return { insight: null, fallback: true, log: log(true) };
    return { insight: parsed.data, fallback: false, log: log(false) };
  } catch { return { insight: null, fallback: true, log: log(true) }; }
}

// ── Asistente "Habla con tuConsultor": respuestas ANCLADAS al diagnóstico ──
export const ChatAnswerSchema = z.object({
  veredicto: z.string(),
  tu_caso: z.string(),
  evidencia: z.array(z.object({ texto: z.string(), tipo: z.string(), fuente: z.string().optional(), url: z.string().optional() })).max(3),
  plan: z.array(z.string()).max(4),
  kpi: z.string(),
  caso_real: z.string().optional(),
  implementar: z.object({ ofrecer: z.boolean(), solucion: z.string().optional(), mensaje: z.string().optional() }),
});
export type ChatAnswer = z.infer<typeof ChatAnswerSchema>;

export interface ChatCtx {
  perfil: any;
  scores: Record<string, number>;
  salud: number;
  cuellos: { factor: string; score: number; mensaje: string }[];
  rules: { need: string; solutions: string[]; priority: string; reason: string }[];
  soluciones: { solution_id: string; name: string; description: string; when_to_use: string; when_not_to_use: string; cost_level: string; kpis: string[] }[];
  extras?: { nicho?: string; objetivo?: string; cierre?: string; dolor?: string; intentos?: string; pais?: string };
  fuentesWeb?: { titulo: string; url: string; medio: string }[];
}

const INTENT_IMPL = /implement|contrat|instal|precio|cu[aá]nto cuesta|ayuda|empez|quiero|pasos|hazlo|lo haces|ustedes pueden/i;

const MARKETING_GUIDES = [
  { match: /cliente ideal|publico objetivo|p[uú]blico objetivo|segmentaci[oó]n|audiencia/, title: "Empieza por entender a quién ayudas", explanation: "Tu cliente ideal no es una etiqueta demográfica: es la persona que tiene un problema concreto, busca resolverlo y puede beneficiarse de tu oferta. Habla con clientes recientes y escucha sus propias palabras antes de definir mensajes.", plan: ["Describe el problema que resuelves y en qué momento aparece.", "Pregunta a clientes recientes qué compararon antes de elegirte.", "Agrupa necesidades parecidas y elige un segmento prioritario.", "Prueba un mensaje dirigido a ese grupo y escucha las respuestas."], kpi: "Consultas calificadas del segmento elegido y porcentaje que avanza a una conversación de venta.", tags: ["estrategia", "captacion"] },
  { match: /posicionamiento|diferenciar|marca|identidad de marca|propuesta de valor/, title: "Haz que tu diferencia sea fácil de entender", explanation: "Una marca fuerte ayuda al cliente a reconocer para quién eres, qué resuelves y por qué elegirte. No tienes que ser distinto en todo: basta con expresar una ventaja importante para el cliente y respaldarla con la experiencia.", plan: ["Escribe para quién es tu oferta y qué problema resuelve.", "Nombra una diferencia que el cliente pueda comprobar.", "Repite la misma idea en tu perfil, anuncios y conversación de venta.", "Pregunta a clientes si entienden por qué elegirte."], kpi: "Porcentaje de consultas que mencionan espontáneamente tu ventaja principal.", tags: ["estrategia", "oferta"] },
  { match: /contenido|que publico|qu[eé] publico|redes sociales|instagram|tiktok|facebook|reels/, title: "Publica para resolver una duda real", explanation: "El contenido útil conecta una pregunta del cliente con una respuesta sencilla. Alterna explicaciones, demostraciones de tu trabajo y una invitación clara a dar el siguiente paso; no hace falta publicar por publicar.", plan: ["Anota las preguntas que más recibes antes de vender.", "Convierte una pregunta en un consejo breve o demostración.", "Muestra cómo se ve el servicio o producto en la práctica.", "Cierra con una acción simple: consultar, reservar o conocer la oferta."], kpi: "Consultas útiles que llegan desde cada pieza, no solo vistas o reacciones.", tags: ["contenido", "redes_sociales", "confianza"] },
  { match: /meta ads|facebook ads|instagram ads|publicidad en meta|anuncios de meta|pautar en meta|anuncios en facebook/, title: "Antes de pautar en Meta, prepara el recorrido completo", explanation: "Un anuncio puede captar atención, pero el resultado depende también de la oferta, el destino y el seguimiento. Define una acción que tenga valor para el negocio y prepara cómo vas a atender a quienes respondan.", plan: ["Elige un solo objetivo de negocio para la campaña.", "Crea una pieza dirigida a una necesidad específica.", "Lleva a una página o conversación que continúe la misma promesa.", "Registra consultas, ventas y costo por resultado para decidir qué ajustar."], kpi: "Costo por consulta calificada y porcentaje de esas consultas que se convierten en clientes.", tags: ["publicidad", "facebook", "instagram"] },
  { match: /google ads|anuncios en google|publicidad en google|palabras clave|keywords|b[uú]squeda pagada/, title: "Google Ads puede responder a una intención de búsqueda", explanation: "La búsqueda pagada funciona mejor cuando conectas lo que alguien está buscando con una oferta y una página muy relevantes. Antes de invertir, comprueba que puedas atender la demanda y medir qué ocurre después del clic.", plan: ["Anota cómo buscaría un cliente el producto o servicio.", "Separa las búsquedas con intención de compra de las informativas.", "Escribe un anuncio y una página que respondan a la misma necesidad.", "Mide llamadas, solicitudes o ventas y excluye búsquedas irrelevantes."], kpi: "Costo por contacto calificado o venta atribuible, junto con la tasa de conversión de la página.", tags: ["publicidad", "seo", "estrategia"] },
  { match: /seo|posicionamiento org[aá]nico|aparecer en google|tr[aá]fico org[aá]nico/, title: "El SEO empieza respondiendo bien una búsqueda", explanation: "El posicionamiento orgánico ayuda a que te encuentren cuando buscan una necesidad relacionada. Primero crea páginas útiles y específicas para tus servicios; los resultados suelen tomar tiempo, así que no lo trates como una solución inmediata.", plan: ["Haz una lista de preguntas y búsquedas de tus clientes.", "Crea una página clara para cada servicio prioritario.", "Explica beneficios, proceso, ubicación si aplica y cómo contactarte.", "Revisa qué consultas atraen visitas relevantes y mejora esas páginas."], kpi: "Visitas orgánicas que terminan en consultas relevantes o ventas.", tags: ["seo", "visibilidad", "web"] },
  { match: /embudo|conversion|conversi[oó]n|landing|p[aá]gina de aterrizaje|no me compran|visitas pero/, title: "Busca en qué paso se pierde el interés", explanation: "Cuando alguien no compra, el problema puede estar en varios lugares: llega poca gente adecuada, la oferta no se entiende, falta confianza o el siguiente paso es difícil. Mide cada tramo antes de cambiar todo a la vez.", plan: ["Dibuja el recorrido desde el primer contacto hasta la compra.", "Cuenta personas en cada paso durante un periodo definido.", "Ubica la caída más grande y pregunta a clientes qué les hizo dudar.", "Prueba un cambio puntual y compara el mismo indicador."], kpi: "Conversión entre cada etapa y abandono en el paso prioritario.", tags: ["conversion", "embudo", "landing"] },
  { match: /precio|precios|descuento|promoci[oó]n|oferta|cobrar|cu[aá]nto cobro/, title: "Presenta el valor antes de bajar el precio", explanation: "Una oferta se entiende mejor cuando el cliente puede ver qué incluye, qué problema resuelve y qué debe hacer para comenzar. Un descuento sin motivo puede reducir margen sin resolver dudas de compra.", plan: ["Especifica qué recibe el cliente y qué queda fuera.", "Conecta cada elemento con un beneficio concreto.", "Explica condiciones, plazo y siguiente paso sin letra pequeña confusa.", "Contrasta la oferta con preguntas y objeciones reales."], kpi: "Margen por venta y porcentaje de propuestas aceptadas.", tags: ["oferta", "conversion"] },
  { match: /m[eé]tricas|medir|roas|retorno|rentabilidad|costo de adquisici[oó]n|\bcac\b|\bcpa\b|resultados de mis anuncios|funciona mi publicidad/, title: "Mide el resultado que importa al negocio", explanation: "Las impresiones y los clics describen exposición e interés, pero no dicen por sí solos si ganaste dinero. Relaciona el gasto con contactos calificados, ventas y margen, y asegúrate de atribuir cada resultado de forma consistente.", plan: ["Define qué acción cuenta como resultado: llamada, reserva o venta.", "Registra su origen y el costo asociado.", "Incluye ingresos y margen cuando puedas, no solo cantidad de leads.", "Compara periodos y campañas con la misma definición."], kpi: "Costo por adquisición y margen generado por cada canal.", tags: ["publicidad", "conversion", "estrategia"] },
  { match: /fideliz|recompra|retenci[oó]n|clientes actuales|email marketing|correo/, title: "Crecer también es cuidar a quienes ya compraron", explanation: "Los clientes actuales pueden volver a comprar o recomendarte cuando la experiencia resuelve su necesidad y el seguimiento aporta valor. La comunicación posterior debe ser útil y respetar el permiso y las preferencias de contacto.", plan: ["Identifica por qué y cuándo un cliente podría necesitarte de nuevo.", "Envía una recomendación o recordatorio útil para ese momento.", "Pide opinión y facilita resolver cualquier problema.", "Registra recompra, recomendación y motivos de abandono."], kpi: "Tasa de recompra y referencias de clientes existentes.", tags: ["fidelizacion", "seguimiento", "crm"] },
  { match: /.*/, title: "Convirtamos tu pregunta en una decisión de marketing", explanation: "La recomendación depende de tu objetivo, el cliente al que quieres llegar, la oferta y los recursos disponibles. Podemos trabajar estrategia, marca, ventas, contenido, publicidad, SEO, canales, presupuesto o medición; empecemos por el problema concreto que quieres resolver.", plan: ["Define qué resultado quieres conseguir.", "Describe a quién quieres ayudar y qué le ofreces.", "Elige el canal más cercano a ese objetivo.", "Decide qué señal te dirá si la prueba funcionó."], kpi: "Una medida ligada a tu objetivo: contactos calificados, ventas, recompra o margen.", tags: ["estrategia", "oferta"] },
] as const;
// Fallback fundamentado: compone la respuesta desde reglas + soluciones + casos + fuentes.
// Nunca genérico, nunca inventado.
export function localAnswer(question: string, ctx: ChatCtx): ChatAnswer {
  const q = question.toLowerCase();
  // Modo objeción: "no tengo tiempo/dinero" — respuesta fundamentada, sin humo.
  if (/no tengo (tiempo|plata|dinero)|sin (tiempo|plata|dinero|presupuesto)|muy caro|no puedo pagar|no me alcanza/.test(q)) {
    const esTiempo = /tiempo/.test(q);
    const docs = retrieveKnowledge(esTiempo ? ["contenido", "crm"] : ["emprendedor", "presupuesto", "whatsapp"], 2);
    const casos = findCases(["emprendedor", "whatsapp", "pyme"], 1);
    return {
      veredicto: esTiempo ? "Con poco tiempo, prioriza una acción de marketing que puedas sostener." : "Con poco presupuesto, empieza por mejorar la oferta y los canales orgánicos antes de pagar anuncios.",
      tu_caso: `Tu diagnóstico prioriza ${ctx.rules?.[0]?.need || "definir qué quieres lograr"}. ${ctx.perfil?.negocio ? `Para ${ctx.perfil.negocio}, conviene elegir una acción que puedas mantener.` : "Si me cuentas qué vendes, adapto estas ideas a tu negocio."}`,
      evidencia: [
        ...docs.map((d) => ({ texto: d.resumen, tipo: d.tipo === "buena_practica" ? "buena_practica" : d.tipo, fuente: d.titulo, url: d.url })),
        { texto: "Recomendación de tuConsultor según tu presupuesto y diagnóstico.", tipo: "recomendacion" },
      ].slice(0, 3),
      plan: esTiempo
        ? ["Elige una pregunta frecuente de un cliente y respóndela con una pieza sencilla.", "Reserva un momento fijo para contestar y dar seguimiento a las consultas.", "Reutiliza la misma idea en los canales donde ya tienes presencia.", "Anota qué acciones generaron conversaciones útiles."]
        : ["Aclara tu oferta y el siguiente paso para comprar o consultar.", "Completa los canales gratuitos que tu cliente ya usa, como WhatsApp o una ficha local.", "Publica una demostración o respuesta útil con los recursos que ya tienes.", "Pide opinión a clientes satisfechos y haz seguimiento con respeto."],
      kpi: esTiempo ? "Tiempo dedicado y consultas calificadas que genera cada acción." : "Consultas orgánicas calificadas y ventas que producen.",
      caso_real: casos[0] ? `${casos[0].nombre}: ${casos[0].mecanismo} Lección: ${casos[0].leccion_pyme}` : undefined,
      implementar: { ofrecer: false },
    };
  }
  const guia = MARKETING_GUIDES.slice(0, -1).find((g) => g.match.test(q));
  if (guia) {
    const guiaDocs = retrieveKnowledge([...guia.tags], 2);
    const negocio = ctx.perfil?.negocio ? ` Para ${ctx.perfil.negocio}, en el sector ${ctx.perfil?.sector || "que compartiste"}, conviene contrastarlo con tus clientes y recursos.` : " Todavía no conozco tu oferta ni tu cliente; si me los cuentas, puedo aterrizarlo a tu caso.";
    return {
      veredicto: `${guia.title}. ${guia.explanation}`,
      tu_caso: `${ctx.rules?.[0]?.need ? `Tu diagnóstico actual también señala como prioridad ${ctx.rules[0].need}.` : "Esta es una orientación general, todavía no basada en un diagnóstico."}${negocio}`,
      evidencia: guiaDocs.map((d) => ({ texto: d.resumen, tipo: d.tipo === "buena_practica" ? "buena_practica" : d.tipo, fuente: d.titulo, url: d.url })),
      plan: [...guia.plan],
      kpi: guia.kpi,
      implementar: { ofrecer: false },
    };
  }
  const words = q.split(/[^a-záéíóúñü]+/).filter((w) => w.length > 3);
  const scoredSol = SOLUTIONS.map((s) => {
    const hay = `${s.name} ${s.description} ${s.problems_solved.join(" ")} ${s.when_to_use}`.toLowerCase();
    return { s, hit: words.filter((w) => hay.includes(w)).length };
  }).sort((a, b) => b.hit - a.hit);
  const best = scoredSol[0].hit > 0 ? scoredSol[0].s : null;

  const peor = FACTORES.map((f) => ({ f, v: ctx.scores[f.id] ?? 50 })).sort((a, b) => a.v - b.v)[0];
  const rule = ctx.rules[0];
  const tags = best ? [best.solution_id.split("_")[0], ...best.problems_solved.map((p) => p.replace(/^(low|no|slow)_/, ""))] : ["estrategia"];
  if (ctx.extras?.nicho) tags.push(ctx.extras.nicho);
  if (ctx.extras?.cierre) tags.push(ctx.extras.cierre);
  if (ctx.extras?.intentos) tags.push(...ctx.extras.intentos.toLowerCase().split(/[^a-záéíóúñü]+/).filter((w) => w.length > 4).slice(0, 4));
  const docs = retrieveKnowledge(tags, 2);
  const casos = findCases(best ? [best.solution_id, ...tags] : [...tags], 1);
  const dolorTxt = ctx.extras?.dolor ? ` En tus palabras: "${ctx.extras.dolor}".` : "";
  const ofrecer = INTENT_IMPL.test(question);

  if (!best) {
    const general = MARKETING_GUIDES[MARKETING_GUIDES.length - 1];
    const generalDocs = retrieveKnowledge([...general.tags], 2);
    return {
      veredicto: `${general.title}. ${general.explanation}`,
      tu_caso: `Tu prioridad actual es ${rule?.need || "por definir"}.${dolorTxt} Para aterrizarlo, cuéntame qué vendes y qué resultado quieres conseguir.`,
      evidencia: generalDocs.map((d) => ({ texto: d.resumen, tipo: d.tipo === "buena_practica" ? "buena_practica" : d.tipo, fuente: d.titulo, url: d.url })),
      plan: [...general.plan],
      kpi: general.kpi,
      implementar: { ofrecer: false },
    };
  }
  return {
    veredicto: `${best.name}: ${/no|todav|despu/i.test(best.when_not_to_use) && q.includes("ya") ? "puede servir, pero con condiciones. " : ""}${best.description}`,
    tu_caso: `En tu caso, ${peor.f.nombre} está en ${peor.v}/100 y tu diagnóstico pide: ${rule?.need || best.name}. ${best.when_to_use}.${dolorTxt}`,
    evidencia: [
      ...docs.map((d) => ({ texto: d.resumen, tipo: d.tipo === "buena_practica" ? "buena_practica" : d.tipo, fuente: d.titulo, url: d.url })),
      { texto: "Recomendación de tuConsultor basada en tu diagnóstico y reglas verificables.", tipo: "recomendacion" },
    ].slice(0, 3),
    plan: [
      `Condición: ${best.required_conditions.join("; ") || best.when_to_use}`,
      `Primer paso (${best.implementation_time}): ${best.description}`,
      `Mide: ${best.kpis.slice(0, 2).join(" y ")}`,
      `Ojo: ${best.when_not_to_use}`,
    ].slice(0, 4),
    kpi: best.kpis.slice(0, 2).join(" · "),
    caso_real: casos[0] ? `${casos[0].nombre} (${casos[0].tipo === "empresa" ? "mecanismo público conocido" : "patrón observado en PYMES"}): ${casos[0].mecanismo} Lección: ${casos[0].leccion_pyme}` : undefined,
    implementar: ofrecer
      ? { ofrecer: true, solucion: best.name, mensaje: `Si quieres, Soluciones Digitales puede implementarte ${best.name} (${best.implementation_time}, ${best.cost_level === "gratis" ? "costo mínimo" : "costo " + best.cost_level}).` }
      : { ofrecer: false },
  };
}

const CHAT_SYSTEM = `Eres el consultor de marketing de tuConsultor. Atiendes preguntas amplias de marketing: estrategia, investigación de clientes, marca y posicionamiento, propuesta de valor, precios, ventas, embudos, contenidos, redes sociales, Meta Ads, Google Ads, SEO, email, fidelización, presupuestos y medición.
Responde en español natural, cálido y sencillo, como una persona experta que explica sin juzgar. Contesta primero la pregunta directamente; define términos técnicos con palabras comunes, usa ejemplos breves cuando aclaren la idea y evita relleno, grandilocuencia, frases robóticas y promesas de resultados.
Personaliza usando el diagnóstico solo cuando ayude. No fuerces puntuaciones, reglas ni datos del negocio en todas las respuestas. Si falta un dato importante, da una orientación general útil y termina con una sola pregunta concreta para adaptarla. Distingue claramente lo que sabes del negocio, las recomendaciones y cualquier supuesto. Si te piden crear una pieza concreta (anuncio, texto, calendario, correo o guion), entrega un borrador utilizable y una breve nota para adaptarlo. No obligues a completar un diagnóstico para responder.
No inventes cifras, estadísticas, casos ni fuentes. Usa las fuentes del contexto solo si son pertinentes y conserva sus títulos y enlaces; si una política o función de una plataforma puede haber cambiado, dilo y apóyate en fuentes recientes si están disponibles. Si no hay una fuente, presenta el consejo como recomendación práctica, no como hecho oficial.
Incluye entre cero y tres evidencias relevantes, sin rellenar el campo por obligación. Devuelve exclusivamente JSON válido con esta forma: {"veredicto":"respuesta directa, clara y humana","tu_caso":"personalización pertinente o pregunta de aclaración","evidencia":[{"texto":"dato o recomendación","tipo":"oficial|academica|buena_practica|recomendacion","fuente":"título opcional","url":"enlace opcional"}],"plan":["hasta cuatro pasos concretos"],"kpi":"una medida sencilla conectada con el objetivo","caso_real":"solo si hay un caso documentado en el contexto","implementar":{"ofrecer":false,"solucion":"opcional","mensaje":"opcional"}}.
La respuesta debe servir aunque la pregunta no esté relacionada con el diagnóstico. Enfócate en ayudar a la persona a decidir qué probar y cómo aprender del resultado. Ofrece implementación o contratación solo si el usuario expresa interés en contratar a Soluciones Digitales; redactar una idea o pedir orientación no significa que quiera contratar. `;

export async function groqChat(ctx: ChatCtx, history: { role: string; content: string }[], apiKeyOpt?: string): Promise<{ answer: ChatAnswer; fallback: boolean }> {
  const lastQ = [...history].reverse().find((h) => h.role === "user")?.content || "";
  const apiKey = process.env.GROQ_API_KEY || apiKeyOpt;
  const model = process.env.GROQ_MODEL_FAST || process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  if (!apiKey) return { answer: localAnswer(lastQ, ctx), fallback: true };
  try {
    const groq = new Groq({ apiKey });
    const c: any = await groq.chat.completions.create({
      model, temperature: 0.45, max_tokens: 1400,
      messages: [
        { role: "system", content: CHAT_SYSTEM },
        { role: "user", content: `DIAGNÓSTICO:\n${JSON.stringify(ctx).slice(0, 6000)}\n\nCONVERSACIÓN:\n${JSON.stringify(history.slice(-6))}\n\nResponde la última pregunta del usuario en JSON.` },
      ],
      response_format: { type: "json_object" } as any,
    });
    const parsed = ChatAnswerSchema.safeParse(JSON.parse(c.choices?.[0]?.message?.content || "{}"));
    if (!parsed.success) return { answer: localAnswer(lastQ, ctx), fallback: true };
    return { answer: parsed.data, fallback: false };
  } catch {
    return { answer: localAnswer(lastQ, ctx), fallback: true };
  }
}

export type MarketingChatMessage = { role: "user" | "assistant"; content: string };

function localMarketingReply(question: string): string {
  const q = question.toLowerCase();
  if (/revisa|corrige|mejora|opina|eval[uú]a|feedback/.test(q)) {
    return "Puedo revisar el contenido con tres criterios: si habla de una necesidad concreta del cliente, si entrega algo útil antes de vender y si deja claro el siguiente paso. Pega aquí el texto o guion y dime a quién va dirigido; te devolveré una versión editada y explicaré los cambios.";
  }
  if (/calendario|plan de contenido|qu[eé] publico|qué publico|ideas para publicar/.test(q)) {
    return "Para armar un calendario que no se sienta repetido, alterna tres trabajos: resolver una duda, mostrar cómo haces algo y responder una objeción real. Una semana de ejemplo: una explicación breve, una demostración del proceso y una historia de cliente con permiso. Cada pieza debe cerrar con una acción coherente, como guardar, preguntar o cotizar. Cuéntame qué ofreces y en qué canal publicas y te preparo ideas específicas.";
  }
  if (/public|post|reel|historia|guion|copy|texto|caption|contenido/.test(q)) {
    return "Una pieza útil parte de una situación que el cliente reconoce, no de repetir las características del producto. Prueba esta estructura: 1) abre con una pregunta o problema concreto; 2) explica una idea que pueda aplicar; 3) muestra un ejemplo o demostración; 4) invita a un siguiente paso sencillo. Si me dices qué vendes, a quién y dónde lo publicarás, te escribo varias versiones con enfoques distintos.";
  }
  if (/marca|cliente ideal|p[uú]blico|audiencia|a qui[eé]n/.test(q)) {
    return "Para que el contenido conecte, empieza por una situación real de compra: qué intenta resolver la persona, qué le preocupa y qué necesita comparar. Convierte cada respuesta en una pieza distinta: una para aclarar, otra para demostrar y otra para ayudar a decidir. Dime qué ofreces y qué suele preguntar la gente antes de comprar; con eso aterrizo los temas.";
  }
  return "Puedo ayudarte a planear publicaciones, escribir o editar textos, encontrar ángulos distintos y conectar el contenido con consultas o ventas. Para avanzar sin adivinar, dime qué ofreces, a quién quieres llegar y qué contenido necesitas ahora. Si ya tienes un borrador, pégalo y lo trabajamos directamente.";
}

export async function groqMarketingAssistant(
  history: MarketingChatMessage[],
  apiKeyOpt?: string,
): Promise<{ reply: string; fallback: boolean }> {
  const lastQuestion = [...history].reverse().find((message) => message.role === "user")?.content || "";
  const apiKey = process.env.GROQ_API_KEY || apiKeyOpt;
  if (!apiKey) return { reply: localMarketingReply(lastQuestion), fallback: true };

  try {
    const groq = new Groq({ apiKey });
    const completion: any = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL_FAST || process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.72,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: `Eres un consultor de marketing cercano, práctico y especialmente bueno en estrategia y creación de contenido. Tu único contexto sobre la persona es lo que aparece en esta conversación; nunca recibes ni debes suponer un diagnóstico de negocio. No repitas ni resumas la pregunta para llenar espacio: contéstala directamente y aporta un criterio, ejemplo, borrador o siguiente decisión nueva. Evita consejos intercambiables como “publica con constancia” sin explicar qué publicar, para quién y con qué propósito. Cuando redactes contenido, ofrece opciones con ángulos realmente diferentes y adapta tono y canal a lo que pidió. Si falta contexto importante, entrega primero una orientación aprovechable y haz como máximo una pregunta concreta. No inventes datos del negocio, resultados, cifras o tendencias. Habla en español claro, humano y sin jerga innecesaria. No empujes a contratar ni a completar un diagnóstico.`,
        },
        ...history.slice(-12).map((message) => ({ role: message.role, content: message.content })),
      ],
    });
    const reply = completion.choices?.[0]?.message?.content?.trim();
    return reply ? { reply, fallback: false } : { reply: localMarketingReply(lastQuestion), fallback: true };
  } catch {
    return { reply: localMarketingReply(lastQuestion), fallback: true };
  }
}
