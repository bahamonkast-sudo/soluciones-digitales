// Escucha activa: cuando el usuario escribe con sus palabras, el consultor
// PARA, refleja lo que entendió, lo alivia y lo motiva a seguir. Nunca
// interroga en frío: demuestra que está atento antes de pedir más.
export interface Escucha { reflejo: string; alivio: string; siguiente: string }

export interface NichoHint { id: string; nombre: string; nichoId?: string; keys: string[] }
const NICHO_HINTS: NichoHint[] = [
  { id: "gastronomia", nombre: "gastronomía", nichoId: "gastronomia", keys: ["restaurante", "comida", "cocina", "panader", "cafeter", "pizzer", "hamburgues"] },
  { id: "productos", nombre: "venta de productos físicos", nichoId: "ecommerce", keys: ["zapater", "zapatos", "calzado", "ropa", "moda", "boutique", "tienda", "vendo ropa", "accesorios", "cosm", "maquillaje", "promocional", "detall", "mayorista", "distribu", "papeler", "ferreter"] },
  { id: "servicios_local", nombre: "servicio local", nichoId: "servicios_local", keys: ["taller", "mecan", "peluquer", "barber", "uñas", "estetica", "belleza", "técnico", "reparo", "electric"] },
  { id: "salud", nombre: "salud y bienestar", nichoId: "salud", keys: ["clinica", "dental", "odontolog", "medico", "fisioter", "psicolog"] },
  { id: "profesionales", nombre: "servicio profesional", nichoId: "profesionales", keys: ["abogado", "contador", "consultor", "asesor", "arquitecto"] },
  { id: "educacion", nombre: "educación", nichoId: "educacion", keys: ["universidad", "universit", "colegio", "escuela", "instituto", "estudiantes", "carreras", "pregrado", "posgrado", "curso", "clases", "coaching", "coach", "enseño", "academia"] },
  { id: "inmobiliaria", nombre: "bienes raíces", nichoId: "inmobiliaria", keys: ["inmobiliaria", "casas", "apartamentos", "arriendo", "propiedades"] },
  { id: "sensible", nombre: "un nicho con reglas especiales", keys: ["suplemento", "vitamina", "multinivel", "red de mercadeo", "cripto", "inversi", "trading", "apuestas"] },
];

// Detecta el nicho desde texto libre ("tengo una universidad…" → educación).
export function detectNicho(texto: string): NichoHint | null {
  const t = ` ${texto.toLowerCase()} `;
  return NICHO_HINTS.find((n) => n.keys.some((k) => t.includes(k))) || null;
}

const OBJ_HINTS: { nombre: string; keys: string[] }[] = [
  { nombre: "vender más", keys: ["vender mas", "vender más", "ventas", "vendo", "quiero vender"] },
  { nombre: "conseguir clientes", keys: ["clientes", "conseguir", "atraer"] },
  { nombre: "crecer", keys: ["crecer", "escalar", "expandir"] },
  { nombre: "empezar bien", keys: ["empezar", "emprender", "nuevo", "abrir"] },
];
const BLOQUEO = ["no se como", "no sé cómo", "no se qué", "no puedo", "dificil", "difícil", "frustr", "preocup", "estancad", "perdid", "no consigo", "no logro", "no llegan", "sin clientes", "no tengo clientes"];

export function escuchaPara(qid: string, texto: string): Escucha | null {
  const t = ` ${texto.toLowerCase()} `;
  if (qid === "negocio") {
    const nicho = detectNicho(texto);
    const obj = OBJ_HINTS.find((o) => o.keys.some((k) => t.includes(k)));
    const bloqueo = BLOQUEO.some((b) => t.includes(b));
    const que = nicho ? `un negocio de ${nicho.nombre}` : "tu negocio";
    const meta = obj ? ` y tu meta es ${obj.nombre}` : "";
    return {
      reflejo: `Te escuché bien: tienes ${que}${meta}. ${bloqueo ? "Y me lo dices con total honestidad: aún no sabes cómo lograrlo." : "Gracias por contarlo con tus palabras."}`,
      alivio: bloqueo
        ? "Respira tranquilo: casi todos los negocios que llegan aquí están en el mismo punto, y te digo algo importante — casi nunca es 'todo', casi siempre son 2 o 3 frenos concretos. Ya empezamos a encontrarlos. Estoy contigo."
        : "Qué bueno que estás aquí buscando respuestas: eso ya te pone por delante de quien espera a que las cosas cambien solas. Vamos a encontrar tus frenos juntos.",
      siguiente: nicho
        ? `Creo que tu nicho va por ${nicho.nombre} — me lo confirmas en la siguiente pantalla. Seguimos a tu ritmo: avanzamos solo cuando tú me digas.`
        : "Seguimos a tu ritmo: avanzamos solo cuando tú me digas con el botón Seguir.",
    };
  }
  if (qid === "intentos") {
    return {
      reflejo: `Anotado lo que ya probaste: "${texto.slice(0, 110)}${texto.length > 110 ? "…" : ""}". Eso vale oro.`,
      alivio: "Nada de lo que hiciste fue en vano: ahora sabemos qué NO repetir. Esa es la diferencia entre un consultor y un formulario: yo aprendo de tu historia.",
      siguiente: "Con esto evito recomendarte lo que ya falló. Seguimos cuando quieras.",
    };
  }
  if (qid === "dolor") {
    return {
      reflejo: `Tu freno, en tus palabras: "${texto.slice(0, 120)}${texto.length > 120 ? "…" : ""}". Queda marcado como el centro de tu plan.`,
      alivio: "Ponerle nombre al problema es el 50% de la solución. Ya no es 'algo anda mal': es esto, y tiene solución concreta.",
      siguiente: "El consultor de marketing está disponible por separado si quieres trabajar una idea de contenido. Seguimos con tu diagnóstico.",
    };
  }
  if (qid === "pais") {
    return {
      reflejo: `Perfecto: operas en ${texto}. El contexto local cambia los canales que rinden.`,
      alivio: "Buen dato: con esto tu plan deja de ser genérico y se vuelve de tu ciudad. Seguimos.",
      siguiente: "Avanzamos cuando me digas.",
    };
  }
  return null;
}

