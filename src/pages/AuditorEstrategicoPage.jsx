import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, Search, ChevronRight, CheckCircle2, Shield, Bot, User, Phone, Mail, FileText, AlertTriangle, Building, Target, Globe, DollarSign, TrendingUp, Presentation, Megaphone, Building2, Key, Loader2, MapPin } from 'lucide-react';
import { fetchGroqCompletion } from '../services/groqService';
import { buildSystemInstruction, buildUserPrompt } from '../services/auditorPromptService';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import { SCHEMAS } from '../config/schemas';
import GroqTutorialModal from '../components/GroqTutorialModal';
import AccessPassGate from '../components/AccessPassGate';
import { getPageUrl } from '../utils/env';
import { getPassSessionKey } from '../services/accessPassService';
import { trackLead } from '../services/trackingEvents';

const API_BASE_URL = import.meta.env.VITE_AUDITOR_URL || 'http://localhost:3006/api';
const ADMIN_WHATSAPP = '573115893220'; // Número del admin
const SAMPLE_SUMMARY = `El caso muestra una brecha entre el interés que puede generar el negocio en redes y la claridad con la que conduce a una compra. Antes de invertir más en difusión, conviene revisar si la oferta, el precio y el siguiente paso se entienden en pocos segundos.\n\nLa guía completa propone ordenar ese recorrido, aprovechar los canales que ya usa el negocio y medir dónde se pierden las oportunidades. Es un ejemplo ilustrativo, no un diagnóstico de tu empresa.`;
const SAMPLE_EBOOK = `# Ejemplo de guía de acción comercial

> Ejemplo ilustrativo: emprendimiento artesanal que muestra productos en redes, vende con presupuesto limitado y atiende pedidos por WhatsApp. Supuestos del ejemplo: no se conocen producto exacto, precio, tiempos de entrega ni diferenciador; por eso aparecen campos entre corchetes. Este no es un diagnóstico real.

## Lectura estratégica

Publicar más no garantiza vender más. En este ejemplo hay que comprobar si cada publicación ayuda a elegir y si el cliente encuentra un camino claro desde que descubre el producto hasta que confirma el pedido. El primer trabajo no es abrir otro canal: es presentar una oferta concreta, facilitar la consulta y registrar qué ocurre con ella.

## Plan de acción: empieza aquí

### 1. Convierte un producto en una oferta fácil de elegir

**Hoy, en 30 minutos:** escoge un producto que puedas entregar de forma consistente. Completa esta ficha: “Para [tipo de persona] que necesita [ocasión o problema], ofrecemos [producto concreto], elaborado con [material o técnica real]. Se puede personalizar con [opción disponible]. Para pedirlo, [paso de compra]. Tiempo de preparación: [dato real]. Precio o cotización: [dato real]”. No publiques hasta completar los campos entre corchetes y confirmar que son ciertos.

**Por qué va primero:** si alguien no entiende qué compra, para quién sirve o cómo pedirlo, más alcance puede producir más preguntas sin cerrar. **Comprueba:** pide a tres personas que no conozcan el negocio que lean la oferta y te digan qué venden y cómo comprar; corrige las partes que no entiendan.

### 2. Usa publicaciones que ayuden a decidir

“Contenido de valor” aquí significa resolver dudas que frenan la compra: cómo se usa el producto, qué opciones existen, cómo se personaliza, cuánto tarda, cómo se entrega y qué debe hacer el comprador. No significa publicar frases motivacionales sin relación con la oferta.

**Pieza lista para adaptar (carrusel o publicación):**

> ¿Buscas un regalo hecho especialmente para [ocasión]?
> Esta pieza [nombre del producto] se elabora con [material/técnica real] y puedes elegir [opciones reales].
> Para recomendarte una opción, cuéntanos: ¿para quién es y para qué fecha la necesitas?
> Escríbenos “REGALO” por mensaje y te compartimos disponibilidad, precio y tiempo de preparación.

Antes de publicarla, sustituye cada corchete, agrega fotos propias del producto y quita cualquier opción que no ofrezcas.

**Tres ideas para la misma oferta:**

1. **Demostración:** video corto mostrando el proceso real de elaboración; texto sobreimpreso: “Así personalizamos [producto] para [ocasión]”; CTA: “¿Qué nombre o detalle te gustaría incluir?”.
2. **Ayuda para elegir:** carrusel “Tres preguntas para escoger un regalo artesanal”; cada lámina responde una duda real sobre destinatario, uso y fecha de entrega; CTA: “Cuéntanos la ocasión y te orientamos”.
3. **Confianza:** foto o video de un pedido terminado, con autorización del cliente; explica qué pidió, qué opción eligió y cómo se entregó, sin inventar un testimonio; CTA: “Consulta las opciones disponibles”.

### 3. Atiende consultas con un proceso, no con respuestas improvisadas

**Guion adaptable para WhatsApp:**

- **Inicio:** “¡Hola, [nombre]! Gracias por escribirnos. Para recomendarte bien, ¿la pieza es para ti o para regalo? ¿Para qué fecha la necesitas?”
- **Ajuste:** “Por lo que me cuentas, podría servirte [producto/opción real] porque [característica comprobable relacionada con su necesidad]. ¿Prefieres [opción A] o [opción B, si existen]?”
- **Información de compra:** “La opción [selección] cuesta [precio/cómo se cotiza], se prepara en [plazo real] y la entrega funciona así: [condición real]. ¿Quieres que revisemos disponibilidad para [fecha]?”
- **Si responde ‘lo voy a pensar’:** “Claro. ¿Qué dato te ayudaría a decidir: opciones, precio, personalización o entrega? Te lo aclaro y tú decides con calma.”
- **Seguimiento:** solo si la persona acepta que la contacten o dejó una gestión pendiente; retoma el contexto y pregunta una vez si desea continuar. No la agregues a campañas ni insistas sin permiso.

Registra cada consulta con fecha, producto, origen, estado (respondida, cotizada, pedido, no avanzó) y motivo conocido. No adivines el motivo si el cliente no lo dijo.

## Plan semanal ligero

- **Lunes (20 min):** elige una oferta de la semana y verifica precio, existencias y fecha posible de entrega.
- **Martes (30 min):** toma fotos propias y publica la pieza de ayuda para elegir.
- **Miércoles (15 min):** responde consultas pendientes con el guion; anota su estado.
- **Jueves (30 min):** publica una demostración real del proceso o del producto terminado.
- **Viernes (15 min):** cuenta consultas, cotizaciones y pedidos; revisa qué duda se repitió y conviértela en la próxima publicación.

Es una carga de ejemplo, no una obligación. Si el negocio dispone de menos tiempo, conserva dos tareas: presentar una oferta clara y atender/registrar las consultas.

## Auditoría orgánica inspirada en criterios de calidad

Google Ads y Meta Ads son subastas pagadas: Google considera CTR esperado, relevancia del anuncio y experiencia de destino en su diagnóstico de calidad; Meta describe la puja, la tasa de acción estimada y la calidad del anuncio. **Eso no es una fórmula de alcance orgánico.** Para este ejemplo usamos esos conceptos solo como preguntas prácticas de calidad:

- **Intención y relevancia:** ¿la publicación responde una duda concreta de quien compra un regalo? Si no, cambia “hecho con amor” por información útil: personalización disponible, ocasión y forma de elegir.
- **Interés de la publicación:** ¿la primera frase y la imagen muestran qué producto y situación resuelven? Abre el video con el producto terminado y la ocasión; mide consultas pertinentes, no solo “me gusta”.
- **Experiencia de destino:** al llegar al perfil o enlace, ¿se encuentran opciones, forma de pedir y entrega? Ordena una publicación fijada o un enlace con catálogo breve, pasos de compra y contacto. Compruébalo desde un teléfono.
- **Originalidad y elegibilidad:** ¿las fotos son propias y la cuenta puede recomendar contenido según su estado/políticas? Usa material propio, evita copiar publicaciones y revisa el estado y las recomendaciones de la cuenta en las herramientas de Meta.

**Google Search, si más adelante hay una web:** escribe una página por oferta o intención clara; usa un título que describa exactamente qué vendes; responde dudas reales con experiencia propia; enlaza páginas relacionadas y revisa que el contenido se pueda abrir y leer bien en móvil. Si no hay sitio, este punto no concluye “debes crear una web”: primero organiza la información de compra en el perfil que ya tienes.

Este marco se inspira en documentación pública de calidad de anuncios y prácticas orgánicas de Google/Meta; no predice posiciones ni alcance. Google Ads mide calidad de anuncios pagados; Google Search prioriza contenido útil para personas. Meta no publica una fórmula completa del alcance orgánico.

Fuentes para profundizar: [calidad de Google Ads](https://support.google.com/google-ads/answer/6167118?hl=es), [contenido útil de Google Search](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [prácticas esenciales de Google Search](https://developers.google.com/search/docs/essentials), [subasta de anuncios de Meta](https://ai.meta.com/blog/advertising-fairness-variance-reduction-system-vrs/) y [recomendaciones de Meta](https://about.fb.com/ltam/news/2020/08/nuestras-directrices-para-hacer-recomendaciones/).

## Cómo saber dónde está el freno

Anota por semana: consultas recibidas; consultas que corresponden al cliente buscado; cotizaciones enviadas; pedidos confirmados; motivo de no compra cuando se conozca. Calcula **conversión de cotización a pedido = pedidos confirmados ÷ cotizaciones enviadas**. Si hay pocas consultas pertinentes, revisa oferta y contenido; si consultan pero no piden precio, revisa claridad y CTA; si reciben cotización y no compran, pregunta con respeto qué información faltó y revisa precio, confianza, plazo o ajuste de la oferta. No cambies todo a la vez: modifica una cosa y observa el siguiente ciclo.

## Plan de un mes, semana a semana

**Semana 1 — Aclara la oferta:** completa la ficha con un producto real, verifica precio, opciones y entrega; pide a tres personas que expliquen qué entendieron. Entregable: una oferta clara que se pueda presentar en una publicación y por mensaje.

**Semana 2 — Publica para ayudar a elegir:** usa la pieza escrita en esta guía y una demostración real. Responde consultas con el guion y registra de dónde llegó cada una. Entregable: dos publicaciones y registro inicial de consultas.

**Semana 3 — Revisa el recorrido:** sigue cada consulta hasta cotización o pedido; identifica en qué punto se detuvo y qué duda quedó sin resolver. Entregable: lista de objeciones reales y una mejora prioritaria.

**Semana 4 — Ajusta y decide:** modifica una parte de la oferta o del contenido según lo observado, repite la prueba y compara consultas pertinentes, cotizaciones y pedidos con las semanas anteriores. Entregable: decisión documentada sobre qué mantener y qué probar después.

## Herramientas que podrían apoyar

Si hoy la oferta y los canales de compra están dispersos, una [tarjeta digital profesional](https://soluciones-digitales.ai.studio/tarjeta-digital.html) podría reunirlos en un solo enlace. Si ya existe un proceso y el reto pasa a ser organizar seguimientos autorizados, la [plataforma independiente de WhatsApp Marketing](https://soluciones-wa.ai.studio/) puede ser pertinente. Primero valida el flujo manual; una herramienta no compensa una oferta confusa ni garantiza ventas.

## Próximo paso

Completa la ficha de oferta con un producto real y úsala en la siguiente publicación. Después registra qué preguntas y pedidos genera. Esta muestra ilustra el nivel de detalle esperado; una guía personalizada debe reemplazar los campos editables con datos confirmados del cuestionario.`;

const createEbookCode = () => {
  const randomPart = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase()
    : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `IA-${randomPart}`;
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

const markdownToEbookHtml = (markdown) => {
  const inline = (text) => escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  let inList = false;
  const body = markdown.split('\n').map((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      if (inList) { inList = false; return '</ul>'; }
      return '';
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      if (inList) { inList = false; return `</ul><h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`; }
      return `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
    }
    if (line.startsWith('> ')) return `<blockquote>${inline(line.slice(2))}</blockquote>`;
    if (/^[-*]\s+/.test(line)) {
      const item = `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`;
      if (inList) return item;
      inList = true;
      return `<ul>${item}`;
    }
    if (inList) { inList = false; return `</ul><p>${inline(line)}</p>`; }
    return `<p>${inline(line)}</p>`;
  }).join('\n');
  return inList ? `${body}</ul>` : body;
};

const buildEbookHtml = (markdown, code) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ebook estratégico ${escapeHtml(code || '')}</title><style>body{font:16px/1.75 Georgia,serif;color:#202838;max-width:820px;margin:50px auto;padding:0 28px}h1,h2,h3{font-family:Arial,sans-serif;line-height:1.25;color:#16366d;margin-top:2em}h1{font-size:2.2em;border-bottom:3px solid #2962ff;padding-bottom:.5em}h2{font-size:1.5em}p,li{margin:.8em 0}a{color:#174bd6}blockquote{border-left:4px solid #2962ff;padding:.5em 1em;background:#f2f6ff;color:#45536a}strong{color:#101827}@media print{body{margin:0 auto;padding:0 16mm}a{color:#174bd6;text-decoration:none}h1,h2,h3{break-after:avoid}p,li,blockquote{orphans:3;widows:3}}</style></head><body>${markdownToEbookHtml(markdown)}<hr><p style="font:12px Arial;color:#6b7280">Soluciones Digitales IA Studio · Código ${escapeHtml(code || '')}</p></body></html>`;

const extractGeneratedSections = (content) => {
  const summaryStart = '<!-- MUESTRA_EJECUTIVA -->';
  const ebookStart = '<!-- EBOOK_COMPLETO -->';
  const summaryIndex = content.indexOf(summaryStart);
  const ebookIndex = content.indexOf(ebookStart);

  if (summaryIndex !== -1 && ebookIndex > summaryIndex) {
    const summary = content.slice(summaryIndex + summaryStart.length, ebookIndex).trim();
    const ebook = content.slice(ebookIndex + ebookStart.length).trim();
    if (summary && ebook) return { summary, ebook };
  }

  // Respaldo para respuestas del modelo que no respeten los marcadores.
  const cleanContent = content.replace(/<!--.*?-->/gs, '').trim();
  const paragraphs = cleanContent.split(/\n\s*\n/).filter(Boolean);
  return {
    summary: paragraphs.slice(0, 2).join('\n\n'),
    ebook: cleanContent
  };
};

const RequiredTag = () => (
  <span className="ml-2 inline-flex rounded-full border border-blue-300/20 bg-blue-300/10 px-2 py-0.5 align-middle text-[10px] font-semibold normal-case tracking-normal text-blue-200">
    Obligatoria
  </span>
);

const OptionalTag = () => (
  <span className="ml-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 align-middle text-[10px] font-medium normal-case tracking-normal text-neutral-400">
    Opcional
  </span>
);

const CATEGORIES = [
  { label: "Salud y Bienestar (Médicos, Odontólogos, Clínicas)", isDark: false },
  { label: "Bienestar, nutrición y suplementos", isDark: true },
  { label: "Servicios Profesionales (Abogados, Consultores, Contadores)", isDark: false },
  { label: "Finanzas, inversión o criptomonedas", isDark: true },
  { label: "Apuestas o juegos de azar", isDark: true },
  { label: "E-commerce / Venta de Productos Físicos", isDark: false },
  { label: "Educación (Cursos, Infoproductos, Coaching)", isDark: false },
  { label: "Marketing multinivel", isDark: true },
  { label: "Bienes Raíces / Inmobiliarias", isDark: false },
  { label: "Gastronomía / Restaurantes", isDark: false },
  { label: "Otro (Especificar más adelante)", isDark: false }
];

const DIGITAL_ASSETS = [
  "Sitio Web Institucional",
  "Tienda Online (E-commerce)",
  "Landing Pages",
  "Instagram Business",
  "Facebook Page",
  "WhatsApp Business API",
  "TikTok Empresarial",
  "YouTube Channel",
  "LinkedIn Page",
  "Email Marketing"
];

const CONTENT_TYPES = [
  "Videos cortos (Reels/TikTok/Shorts)",
  "Imágenes estáticas / Carruseles",
  "Artículos de Blog (SEO)",
  "Videos largos (YouTube)",
  "Emails / Newsletters",
  "Publicidad Paga (Ads en Meta/Google)",
  "Contenido Educativo / Webinars"
];

const CLOSING_CHANNELS = [
  "WhatsApp (Cierre manual 1 a 1)",
  "Llamada Telefónica",
  "Reunión por Zoom / Google Meet",
  "Compra directa automatizada en Web",
  "Mensajes Directos (DM) en Instagram/Facebook"
];

const ETAPAS = [
  "Idea / Emprendimiento en fase inicial (Aún no facturo)",
  "Servicios Profesionales / Consultoría (B2B o Marca Personal)",
  "Empresa de Servicios Local (Clínicas, Talleres, Estéticas, etc.)",
  "E-commerce / Venta de Productos Físicos",
  "SaaS / Software o Infoproductos",
  "Empresa Consolidada B2B (Venta mayorista o corporativa)"
];

const OBJETIVOS = [
  "Conseguir clientes",
  "Aumentar ventas",
  "Validar mi idea",
  "Escalar el negocio"
];

const PRESUPUESTOS = [
  "No tengo presupuesto",
  "Menos de 100 USD",
  "100 - 500 USD",
  "500 - 2000 USD",
  "Más de 2000 USD"
];

const NIVELES_MARKETING = [
  "No tengo presencia online",
  "Tengo redes pero no vendo",
  "Ya vendo online",
  "Tengo campañas activas"
];

const COMPETIDORES = [
  "Sí, tengo competidores claros",
  "No tengo competidores directos",
  "No estoy seguro"
];

export default function AuditorEstrategicoPage() {
  const [step, setStep] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);
  
  // Resultados del Backend
  const [reportSummary, setReportSummary] = useState(null);
  const [ebookMarkdown, setEbookMarkdown] = useState('');
  const [secretCode, setSecretCode] = useState(null);
  const [auditId, setAuditId] = useState(null);
  const [ebookClaimOpened, setEbookClaimOpened] = useState(false);

  // Form State
  const [lead, setLead] = useState({ 
    nombre: '', 
    whatsapp: '', 
    email: '',
    empresa: '', 
    apiKey: '',
    aceptaTerminos: false 
  });
  
  const [formData, setFormData] = useState({
    category: '',
    categoryOther: '',
    isDarkNiche: false,
    etapa: '',
    web: '',
    pais: '',
    ticket: '',
    objetivo: '',
    presupuesto: '',
    nivel: '',
    competidores: '',
    intentos: '',
    oferta: '',
    clienteIdeal: '',
    descripcion: '',
    digitalAssets: [],
    contentType: [],
    closingChannel: '',
    mainProblem: ''
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 15));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const downloadEbook = () => {
    if (!ebookMarkdown) return;
    const fileHtml = buildEbookHtml(ebookMarkdown, secretCode);
    const fileUrl = URL.createObjectURL(new Blob([fileHtml], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `ebook-estrategico-${secretCode || 'soluciones-digitales'}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(fileUrl);
    if (auditId && secretCode !== 'MUESTRA') {
      const timestamp = new Date().toISOString();
      const audits = JSON.parse(localStorage.getItem('websd_audits') || '[]');
      localStorage.setItem('websd_audits', JSON.stringify(audits.map(audit => audit.id === auditId
        ? { ...audit, ebookStatus: 'entregado', deliveredAt: timestamp }
        : audit)));
      const leads = JSON.parse(localStorage.getItem('websd_leads') || '[]');
      localStorage.setItem('websd_leads', JSON.stringify(leads.map(lead => lead.code === secretCode
        ? { ...lead, ebookStatus: 'descargado', deliveredAt: timestamp }
        : lead)));
    }
  };

  const openEbookInNewTab = () => {
    if (!ebookMarkdown) return;
    const fileUrl = URL.createObjectURL(new Blob([buildEbookHtml(ebookMarkdown, secretCode)], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 120000);
  };

  const openEbookSample = () => {
    setReportSummary(SAMPLE_SUMMARY);
    setEbookMarkdown(SAMPLE_EBOOK);
    setSecretCode('MUESTRA');
    setStep(17);
  };
  const abandonAudit = () => {
    setLead({ nombre: '', whatsapp: '', email: '', empresa: '', apiKey: '', aceptaTerminos: false });
    setFormData({
      category: '', categoryOther: '', isDarkNiche: false, etapa: '', web: '', pais: '', ticket: '',
      objetivo: '', presupuesto: '', nivel: '', competidores: '', intentos: '', oferta: '', clienteIdeal: '', descripcion: '',
      digitalAssets: [], contentType: [], closingChannel: '', mainProblem: ''
    });
    setReportSummary(null);
    setEbookMarkdown('');
    setSecretCode(null);
    setAuditId(null);
    setEbookClaimOpened(false);
    setError(null);
    setShowAbandonConfirm(false);
    setStep(-1);
  };

  const questionProgress = {
    1: { group: 'Tu negocio', title: 'Empecemos por entender tu actividad' },
    2: { group: 'Tu negocio', title: 'Ubicamos el momento en que estás' },
    3: { group: 'Tu presencia', title: 'Revisamos dónde te encuentran' },
    4: { group: 'Tu objetivo', title: 'Acordamos qué quieres conseguir' },
    5: { group: 'Tu objetivo', title: 'Ajustamos las ideas a tus recursos' },
    6: { group: 'Tu presencia', title: 'Vemos cómo estás haciendo marketing' },
    7: { group: 'Tu mercado', title: 'Exploramos tu entorno competitivo' },
    8: { group: 'Tu experiencia', title: 'Aprendemos de lo que ya probaste' },
    9: { group: 'Tu negocio', title: 'Conocemos qué ofreces y a quién' },
    10: { group: 'Tu presencia', title: 'Identificamos tus canales actuales' },
    11: { group: 'Tu presencia', title: 'Vemos cómo compartes tu propuesta' },
    12: { group: 'Tus ventas', title: 'Revisamos cómo llegan las ventas' },
    13: { group: 'Tus ventas', title: 'Escuchamos el reto más importante' },
  };

  useEffect(() => {
    if (step < 1 || step > 16) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('auditor-questionnaire')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [step]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('muestra') !== 'ebook') return;
    setReportSummary(SAMPLE_SUMMARY);
    setEbookMarkdown(SAMPLE_EBOOK);
    setSecretCode('MUESTRA');
    setStep(17);
  }, []);

  // 1. Validar uso previo e iniciar formulario
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    if (!lead.nombre || !lead.whatsapp || !lead.apiKey || !lead.aceptaTerminos) {
      setError("Completa tu nombre, WhatsApp y clave de Groq, y autoriza el tratamiento de datos para continuar.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // Nota: el control de uso único (una sola vez por email/teléfono)
      // se aplica al solicitar orientación, no aquí, para no bloquear
      // el análisis a usuarios legítimos.
      setStep(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(item)) return { ...prev, [field]: arr.filter(i => i !== item) };
      return { ...prev, [field]: [...arr, item] };
    });
  };

  const selectCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      category: cat.label,
      isDarkNiche: cat.isDark
    }));
  };

  // 2. Generar el resumen (ahora usando Groq directo desde React)
  const generateAudit = async () => {
    if (!formData.category || !formData.etapa || !formData.objetivo || !formData.mainProblem.trim()) {
      setError("Completa las preguntas obligatorias: sector, etapa, objetivo y principal dificultad.");
      return;
    }
    setError(null);
    setLoading(true);
    setStep(14); // Pantalla de carga
    try {
      const payload = {
        ...formData,
        category: formData.category.startsWith('Otro') && formData.categoryOther.trim()
          ? formData.categoryOther.trim()
          : formData.category,
        empresa: lead.empresa || '',
        digitalAssets: formData.digitalAssets.join(', '),
        contentType: formData.contentType.join(', '),
        userContact: `Nombre: ${lead.nombre}, WA: ${lead.whatsapp}, Email: ${lead.email}, Empresa: ${lead.empresa}`
      };
      
      const systemPrompt = buildSystemInstruction();
      const userPrompt = buildUserPrompt(payload);

      const generatedContent = await fetchGroqCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], lead.apiKey);
      const { summary: summaryStr, ebook: reportMarkdown } = extractGeneratedSections(generatedContent);
      
      const generatedAuditId = 'AUDIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const generatedEbookCode = createEbookCode();
      
      setReportSummary(summaryStr);
      setEbookMarkdown(reportMarkdown);
      setAuditId(generatedAuditId);
      setSecretCode(generatedEbookCode);
      setEbookClaimOpened(false);
      
      // Guardar auditoría en localStorage
      const savedAudits = JSON.parse(localStorage.getItem('websd_audits') || '[]');
      savedAudits.push({
        id: generatedAuditId,
        code: generatedEbookCode,
        timestamp: new Date().toISOString(),
        report: reportMarkdown,
        summary: summaryStr,
        lead: { ...payload, nombre: lead.nombre, whatsapp: lead.whatsapp, email: lead.email },
        ebookStatus: 'no_reclamado',
        claimedAt: null,
        deliveredAt: null,
        pdfSent: false
      });
      localStorage.setItem('websd_audits', JSON.stringify(savedAudits));
      trackLead('auditoria_estrategica_completada');

      setStep(15); // Pantalla de Mini Resumen
    } catch (err) {
      setError(err.message || 'Error generando reporte.');
      setStep(13); // Volver al último paso
    } finally {
      setLoading(false);
    }
  };

  // 3. Preparar el contacto de seguimiento
  const requestTeamGuidance = async () => {
    setLoading(true);
    setError(null);
    try {
      const savedLeads = JSON.parse(localStorage.getItem('websd_leads') || '[]');
      const existingLead = savedLeads.find(lead => lead.auditId === auditId);
      const code = existingLead?.code || secretCode || createEbookCode();
      const savedAudits = JSON.parse(localStorage.getItem('websd_audits') || '[]');
      const updatedAudits = savedAudits.map(audit => audit.id === auditId
        ? { ...audit, code, ebookStatus: audit.ebookStatus === 'entregado' ? 'entregado' : 'solicitud_preparada', claimPreparedAt: audit.claimPreparedAt || new Date().toISOString() }
        : audit);
      localStorage.setItem('websd_audits', JSON.stringify(updatedAudits));

      const newLead = {
        nombre: lead.nombre,
        whatsapp: lead.whatsapp,
        email: lead.email || '',
        empresa: lead.empresa || 'No especificada',
        nicho: formData.category.startsWith('Otro') && formData.categoryOther.trim()
          ? formData.categoryOther.trim()
          : (formData.category || ''),
        aceptaTerminos: lead.aceptaTerminos,
        code: code,
        timestamp: existingLead?.timestamp || new Date().toISOString(),
        registeredAt: existingLead?.registeredAt || new Date().toISOString(),
        used: existingLead?.used || false,
        ebookStatus: existingLead?.ebookStatus || 'solicitud_preparada',
        auditId
      };

      const nextLeads = existingLead
        ? savedLeads.map(item => item.auditId === auditId ? { ...item, ...newLead } : item)
        : [...savedLeads, newLead];
      localStorage.setItem('websd_leads', JSON.stringify(nextLeads));
      
      setSecretCode(code);
      setEbookClaimOpened(false);
      setStep(16); // Pantalla de Código Secreto / WhatsApp Handoff
    } catch (err) {
      setError(err.message || 'Error generando código.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case -2:
        return <AccessPassGate service="auditor" onAuthorized={() => setStep(0)} />;
      case -1:
        return (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl space-y-9">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2962ff]/30 bg-[#2962ff]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
                <Sparkles size={14} /> Soluciones Digitales IA Studio
              </span>
              <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl">
                Antes de dar el siguiente paso, entiende mejor tu negocio.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Esta autoevaluación guiada te ayuda a poner en orden tus objetivos, canales y obstáculos. Con tus respuestas,
                el Auditor Estratégico prepara una lectura inicial y te orienta sobre qué conviene revisar primero.
              </p>
              <p className="mt-3 text-sm text-neutral-500">No necesitas tener todo resuelto: responde desde tu situación actual. Las opciones describen cómo estás hoy; no son una lista de herramientas que debas tener.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Target, title: 'Aclara tu prioridad', text: 'Define qué buscas ahora: atraer clientes, vender más, validar una idea o escalar.' },
                { icon: Search, title: 'Mira tu ecosistema', text: 'Relaciona tu presencia digital, tus acciones de marketing y el principal reto que enfrentas.' },
                { icon: TrendingUp, title: 'Elige por dónde empezar', text: 'Recibe hallazgos y recomendaciones iniciales ajustadas a la información que compartas.' },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-200">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-base font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p>
                </article>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <section className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-400/[0.04] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-200"><FileText size={19} /></div>
                  <h2 className="text-lg font-bold text-white">Lo que te llevas</h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                Al terminar recibirás un resumen y se preparará tu ebook personalizado. Si quieres reclamarlo, podrás iniciar una conversación por WhatsApp usando el código que te asignaremos.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                  Es una orientación generada con IA a partir de tus respuestas; no garantiza ventas ni sustituye una auditoría técnica o asesoría profesional.
                </p>
              </section>

              <section className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Shield size={19} /></div>
                  <h2 className="text-lg font-bold text-white">Tus datos, explicados con claridad</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-400">
                  <li><strong className="text-neutral-200">Contacto:</strong> nombre y WhatsApp identifican el ebook si decides reclamarlo; el correo y el nombre del negocio son opcionales.</li>
                  <li><strong className="text-neutral-200">Respuestas:</strong> la información de tu negocio se envía a Groq para crear el análisis. Tus datos de contacto no se incluyen en esa consulta.</li>
                  <li><strong className="text-neutral-200">Clave de Groq:</strong> se usa desde tu navegador para generar el análisis y no se guarda en este sitio. El consumo depende de los límites de tu cuenta.</li>
                </ul>
                <a href={getPageUrl('politica-privacidad')} className="mt-5 inline-flex text-sm font-semibold text-blue-300 underline underline-offset-4 hover:text-white">
                  Consulta el aviso de privacidad y tus derechos
                </a>
              </section>
            </div>

            <div className="text-center">
              <button onClick={() => setStep(sessionStorage.getItem(getPassSessionKey('auditor')) === 'authorized' ? 0 : -2)} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#2962ff] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_36px_rgba(41,98,255,.3)] transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Empezar mi autoevaluación <ArrowRight size={18} />
              </button>
              <p className="mt-3 text-xs text-neutral-500">Avanza a tu ritmo; puedes volver y corregir tus respuestas.</p>
              <button onClick={openEbookSample} className="mt-5 text-sm font-semibold text-blue-300 underline decoration-blue-300/40 underline-offset-4 transition hover:text-white">
                Ver un ejemplo del resultado y del ebook
              </button>
            </div>
          </motion.div>
        );
      case 0:
        return (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleInitialSubmit} className="max-w-md mx-auto space-y-5 bg-neutral-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep(-1)} className="text-xs font-semibold text-blue-300 hover:text-white">
                ← Volver a la presentación y revisar el uso de datos
              </button>
              <button type="button" onClick={() => setShowAbandonConfirm(true)} className="text-xs font-medium text-neutral-400 underline decoration-neutral-700 underline-offset-4 transition hover:text-white">
                Abandonar evaluación
              </button>
            </div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2962ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2962ff]/20">
                <Bot size={32} className="text-[#2962ff]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Datos para comenzar</h2>
              <p className="text-neutral-400 text-sm">Son unos minutos para entender tu negocio y preparar una orientación útil. No necesitas tener todas las respuestas.</p>
              <p className="mt-3 text-xs text-neutral-500"><span className="text-blue-200">*</span> Campos obligatorios; correo y empresa son opcionales.</p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Tu Nombre *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" required value={lead.nombre} onChange={e => setLead({...lead, nombre: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. Juan Pérez" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">WhatsApp *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="tel" required value={lead.whatsapp} onChange={e => setLead({...lead, whatsapp: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="+57 300 000 0000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Email (Opcional)</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="email" value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="tucorreo@empresa.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Empresa (Opcional)</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={lead.empresa} onChange={e => setLead({...lead, empresa: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Tu negocio" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex justify-between items-center gap-2">
                  <span>Tu clave de Groq *</span>
                  <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-[#2962ff] hover:underline text-[10px] hidden sm:inline">console.groq.com/keys</a>
                </label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="password" required value={lead.apiKey} onChange={e => setLead({...lead, apiKey: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="gsk_..." />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">Esta clave es tuya: la solicitud se envía directamente a Groq desde tu navegador. Este sitio no la guarda; consulta los límites y condiciones de tu cuenta.</p>
                <div className="mt-2">
                  <button type="button" onClick={() => setShowApiKeyModal(true)} className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-400/[0.07] px-3 py-3 text-xs font-semibold text-blue-200 transition-colors hover:border-blue-300/40 hover:bg-blue-400/[0.12]">
                    <Sparkles size={14} /> ¿Necesitas ayuda para encontrar tu clave? Ver tutorial <ChevronRight size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 text-center">El acceso a este formulario no tiene costo. La generación del análisis usa tu cuenta de Groq y sus límites aplicables.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-neutral-400">
                <strong className="text-neutral-200">¿Por qué solicitamos estos datos?</strong> Usamos tu nombre y WhatsApp para identificar el ebook si lo reclamas; el correo es opcional. Las respuestas del negocio se procesan en Groq. El reporte y tus datos quedan en el almacenamiento local de este navegador; al reclamarlo se abrirá WhatsApp con un mensaje preparado para que decidas si lo envías.
              </div>

              <label className="flex items-start gap-3 p-4 bg-black/30 rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input type="checkbox" required aria-required="true" checked={lead.aceptaTerminos} onChange={e => setLead({...lead, aceptaTerminos: e.target.checked})} className="mt-1" />
                <span className="text-sm text-neutral-400">Autorizo el tratamiento de mis datos para generar esta evaluación y gestionar el informe que solicite. <span className="text-blue-200">*</span> He leído el <a href={getPageUrl('politica-privacidad')} target="_blank" rel="noreferrer" className="font-semibold text-blue-300 underline underline-offset-2">aviso de privacidad</a> y conozco los canales para ejercer mis derechos.</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#2962ff] hover:bg-[#2962ff]/90 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(41,98,255,0.3)] disabled:opacity-50">
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Comenzar Análisis'}
            </button>
          </motion.form>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-white">¿A qué categoría pertenece tu negocio?<RequiredTag /></h2>
              <p className="text-neutral-400">Así adaptamos el análisis a las características de tu sector y a las reglas que pueden afectar su promoción.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button key={cat.label} type="button" onClick={() => { selectCategory(cat); if (!cat.label.startsWith('Otro')) setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.category === cat.label ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20 hover:bg-neutral-800'}`}>
                  {cat.label}
                  {cat.isDark && <AlertTriangle size={14} className="inline ml-2 text-yellow-500" />}
                </button>
              ))}
            </div>
            {formData.category.startsWith('Otro') && (
              <div className="space-y-3">
                <input
                  value={formData.categoryOther}
                  onChange={e => setFormData(current => ({ ...current, categoryOther: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-colors focus:border-[#2962ff]"
                  placeholder="¿A qué se dedica tu negocio?"
                  aria-label="Describe el sector de tu negocio"
                />
                <button
                  type="button"
                  disabled={!formData.categoryOther.trim()}
                  onClick={nextStep}
                  className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar <ArrowRight size={16} className="ml-2 inline" />
                </button>
              </div>
            )}
            <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿En qué etapa se encuentra tu proyecto?<RequiredTag /></h2>
            <p className="text-neutral-400">Esto nos ayuda a priorizar las recomendaciones según tu madurez.</p>
            <div className="grid grid-cols-1 gap-3">
              {ETAPAS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, etapa: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.etapa === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">Tu presencia digital</h2>
            <p className="text-neutral-400">Si tienes estos datos a mano, nos ayudarán a personalizar la guía. Puedes dejar cualquiera en blanco.<OptionalTag /></p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Sitio web o red social</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={formData.web} onChange={e => setFormData({...formData, web: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="https://tusitio.com o @tuinstagram" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">País donde operas</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="text" value={formData.pais} onChange={e => setFormData({...formData, pais: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. Colombia" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Ticket promedio de venta (USD)</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input type="number" min="0" value={formData.ticket} onChange={e => setFormData({...formData, ticket: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#2962ff] transition-colors" placeholder="Ej. 50" />
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu principal objetivo ahora?<RequiredTag /></h2>
            <p className="text-neutral-400">Selecciona lo más urgente para tu negocio en este momento.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OBJETIVOS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, objetivo: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.objetivo === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuánto inviertes al mes en marketing?<OptionalTag /></h2>
            <p className="text-neutral-400">Esto nos permite recomendar estrategias realistas según tu presupuesto. Si prefieres, puedes omitirla.</p>
            <div className="grid grid-cols-1 gap-3">
              {PRESUPUESTOS.map(item => (
                <button key={item} type="button" onClick={() => { setFormData({...formData, presupuesto: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.presupuesto === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button type="button" onClick={nextStep} className="text-sm font-semibold text-blue-200 hover:text-white">Omitir esta pregunta →</button>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu nivel actual en marketing digital?<OptionalTag /></h2>
            <p className="text-neutral-400">Elige la opción que mejor describa tu situación hoy, o sáltala si no lo tienes claro.</p>
            <div className="grid grid-cols-1 gap-3">
              {NIVELES_MARKETING.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, nivel: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.nivel === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button type="button" onClick={nextStep} className="text-sm font-semibold text-blue-200 hover:text-white">Omitir esta pregunta →</button>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Tienes competidores claros?<OptionalTag /></h2>
            <p className="text-neutral-400">Saber contra quién compites nos ayuda a encontrar tu ventaja. Si no lo sabes, puedes continuar.</p>
            <div className="grid grid-cols-1 gap-3">
              {COMPETIDORES.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, competidores: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.competidores === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button type="button" onClick={nextStep} className="text-sm font-semibold text-blue-200 hover:text-white">Omitir esta pregunta →</button>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué has intentado antes en marketing?<OptionalTag /></h2>
            <p className="text-neutral-400">Cuéntanos qué has probado (anuncios, redes, agencias...) y qué pasó. Puedes dejarlo en blanco.</p>
            <textarea value={formData.intentos} onChange={e => setFormData({...formData, intentos: e.target.value})} className="w-full h-32 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Ej: Pauté en Meta por 3 meses pero no vi ventas, tuve una agencia que no me renovó..." />
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">Entendamos qué ofreces y a quién ayudas<RequiredTag /></h2>
            <p className="text-neutral-400">Estas dos respuestas dan contexto para que la guía pueda proponer ejemplos útiles para tu negocio. Si todavía no lo tienes definido, puedes indicarlo; también es una respuesta válida.</p>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-200">¿Qué producto o servicio ofreces? *</label>
                <textarea required value={formData.oferta} onChange={e => setFormData({...formData, oferta: e.target.value})} className="w-full h-28 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Explica qué vendes y qué recibe el cliente. Ej.: diseño e instalación de cocinas a medida." />
                <button type="button" onClick={() => setFormData(current => ({ ...current, oferta: 'Todavía no tengo definido qué producto o servicio ofrecer.' }))} className="mt-2 text-xs text-blue-300 underline underline-offset-4 hover:text-white">Todavía no lo tengo definido</button>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-200">¿Qué tipo de cliente quieres ayudar o atender? *</label>
                <textarea required value={formData.clienteIdeal} onChange={e => setFormData({...formData, clienteIdeal: e.target.value})} className="w-full h-28 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Piensa en quién necesita lo que ofreces, qué situación vive y dónde está. Ej.: familias de Bogotá que remodelan su primera vivienda." />
                <button type="button" onClick={() => setFormData(current => ({ ...current, clienteIdeal: 'Todavía no tengo definido a qué tipo de cliente quiero atender.' }))} className="mt-2 text-xs text-blue-300 underline underline-offset-4 hover:text-white">Todavía no lo tengo definido</button>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-200">¿Qué te diferencia o qué más deberíamos saber? <OptionalTag /></label>
                <textarea value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} className="w-full h-24 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Experiencia, forma de trabajar, zona que atiendes, ventaja real o contexto importante." />
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} disabled={!formData.oferta.trim() || !formData.clienteIdeal.trim()} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué activos digitales tienes actualmente?<OptionalTag /></h2>
            <p className="text-neutral-400">Selecciona todos los que apliquen o continúa sin seleccionar ninguno.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DIGITAL_ASSETS.map(item => (
                <button key={item} onClick={() => toggleArrayItem('digitalAssets', item)} className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${formData.digitalAssets.includes(item) ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                  {formData.digitalAssets.includes(item) && <CheckCircle2 size={18} className="text-[#2962ff]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 11:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Qué tipo de formato de contenido usas más?<OptionalTag /></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTENT_TYPES.map(item => (
                <button key={item} onClick={() => toggleArrayItem('contentType', item)} className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${formData.contentType.includes(item) ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                  {formData.contentType.includes(item) && <CheckCircle2 size={18} className="text-[#2962ff]" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-neutral-200">Siguiente</button>
            </div>
          </motion.div>
        );

      case 12:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Por dónde cierras la mayoría de tus ventas?<OptionalTag /></h2>
            <p className="text-neutral-400">Puedes elegir un canal o continuar sin responder.</p>
            <div className="grid grid-cols-1 gap-3">
              {CLOSING_CHANNELS.map(item => (
                <button key={item} onClick={() => { setFormData({...formData, closingChannel: item}); setTimeout(nextStep, 200); }} className={`p-4 rounded-xl border text-left transition-all ${formData.closingChannel === item ? 'bg-[#2962ff]/20 border-[#2962ff] text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:border-white/20'}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button type="button" onClick={nextStep} className="text-sm font-semibold text-blue-200 hover:text-white">Omitir esta pregunta →</button>
            </div>
          </motion.div>
        );

      case 13:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">¿Cuál es tu mayor problema o cuello de botella hoy?<RequiredTag /></h2>
            <p className="text-neutral-400">Esta respuesta es necesaria para que el diagnóstico se centre en algo concreto. Una frase basta.</p>
            <textarea required value={formData.mainProblem} onChange={e => setFormData({...formData, mainProblem: e.target.value})} className="w-full h-40 bg-neutral-900/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#2962ff] outline-none" placeholder="Ej: Recibo muchos mensajes pero nadie compra, Meta me bloquea las cuentas, no sé cómo automatizar..."></textarea>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-neutral-400 hover:text-white text-sm">Volver</button>
              <button onClick={generateAudit} disabled={loading || !formData.mainProblem.trim()} className="bg-[#2962ff] hover:bg-[#2962ff]/90 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(41,98,255,0.3)] flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40">
                Analizar Ecosistema <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Loader2 size={48} className="text-[#2962ff] animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-white">La IA está auditando tu ecosistema...</h2>
            <div className="max-w-sm mx-auto text-neutral-400 space-y-2 text-sm">
              <p className="animate-pulse">Relacionando tus respuestas y el contexto del negocio...</p>
              <p className="animate-pulse delay-100">Identificando prioridades y oportunidades realistas...</p>
              <p className="animate-pulse delay-200">Preparando una muestra ejecutiva y tu guía personalizada...</p>
            </div>
          </div>
        );

      case 15:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-xl mb-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                <div className="w-16 h-16 bg-[#2962ff]/10 rounded-full flex items-center justify-center border border-[#2962ff]/20">
                  <Bot size={32} className="text-[#2962ff]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Resumen Ejecutivo IA</h2>
                  <p className="text-[#2962ff]">Primeros hallazgos para {lead.empresa || lead.nombre}</p>
                </div>
              </div>

              <div className="prose prose-invert prose-blue max-w-none mb-10">
                <ReactMarkdown>{reportSummary || "No se pudo generar el resumen."}</ReactMarkdown>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 mb-6">
                  <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <div className="bg-black/50 border border-[#2962ff]/20 rounded-xl p-8 text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Tu ebook personalizado ya está preparado</h3>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                  El resumen es una muestra. Si quieres recibir el ebook completo, inicia la conversación por WhatsApp con tu código de solicitud.
                </p>
                <button onClick={requestTeamGuidance} disabled={loading} className="mt-4 inline-flex items-center gap-2 bg-[#2962ff] hover:bg-[#2962ff]/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(41,98,255,0.4)] transition-all disabled:opacity-50">
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <><ArrowRight size={22} /> Reclamar mi ebook gratis por WhatsApp</>}
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 16:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-8 bg-neutral-900/50 p-10 rounded-3xl border border-[#2962ff]/20">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Tu ebook ya tiene código</h2>
              <p className="text-neutral-400">
                Comparte este código en WhatsApp para identificar tu evaluación. Al abrir la solicitud, aquí quedará disponible la descarga del ebook.
              </p>
            </div>

            <div className="bg-black border border-dashed border-[#2962ff]/50 rounded-2xl p-6 relative group">
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Código de tu ebook</p>
              <p className="text-4xl font-mono font-bold text-[#2962ff] tracking-wider">{secretCode}</p>
            </div>

            {!ebookClaimOpened ? (
              <>
                <SlideButton
                  label="Solicitar mi ebook por WhatsApp"
                  hoverLabel="Abrir WhatsApp"
                  href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
                    `Hola, completé la autoevaluación de Soluciones Digitales IA Studio y quiero reclamar mi ebook gratuito.\n\n` +
                    `Mi código es: ${secretCode}\n` +
                    `Nombre: ${lead.nombre}\n` +
                    `Empresa: ${lead.empresa || 'No especificada'}\n` +
                    `Sector: ${formData.category.startsWith('Otro') && formData.categoryOther ? formData.categoryOther : (formData.category || 'No especificado')}\n\n` +
                    `Gracias.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setEbookClaimOpened(true);
                    const timestamp = new Date().toISOString();
                    const audits = JSON.parse(localStorage.getItem('websd_audits') || '[]');
                    localStorage.setItem('websd_audits', JSON.stringify(audits.map(audit => audit.id === auditId
                      ? { ...audit, ebookStatus: audit.ebookStatus === 'entregado' ? 'entregado' : 'solicitud_abierta', claimOpenedAt: audit.claimOpenedAt || timestamp }
                      : audit)));
                    const leads = JSON.parse(localStorage.getItem('websd_leads') || '[]');
                    localStorage.setItem('websd_leads', JSON.stringify(leads.map(lead => lead.auditId === auditId
                      ? { ...lead, ebookStatus: lead.ebookStatus === 'descargado' ? 'descargado' : 'solicitud_abierta', claimOpenedAt: lead.claimOpenedAt || timestamp }
                      : lead)));
                  }}
                  className="w-full"
                  width="100%"
                />
                <p className="text-xs text-neutral-500">Se abrirá WhatsApp con el mensaje listo. Al volver a esta página podrás descargar el archivo.</p>
              </>
            ) : (
              <button onClick={downloadEbook} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-7 py-4 text-base font-bold text-white transition hover:bg-emerald-400">
                <FileText size={20} /> Descargar mi ebook
              </button>
            )}

            {ebookMarkdown && (
              <button onClick={openEbookInNewTab} className="text-sm font-semibold text-blue-300 underline underline-offset-4 hover:text-white">
                Ver ebook completo en una pestaña nueva
              </button>
            )}
            {ebookClaimOpened && <p className="text-xs text-emerald-300">La solicitud de WhatsApp se abrió. Recuerda pulsar Enviar en WhatsApp; esta página no puede verificar ese envío.</p>}
          </motion.div>
        );

      case 17:
        return (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
            <div className="mb-6 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">
              Este es un ejemplo ilustrativo para que veas el tipo de análisis y la entrega. No es un diagnóstico de tu negocio.
            </div>
            <section className="mb-6 rounded-2xl border border-blue-400/20 bg-neutral-900/70 p-7 sm:p-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-300">Muestra ejecutiva</p>
              <div className="prose prose-invert prose-blue max-w-none"><ReactMarkdown>{reportSummary || SAMPLE_SUMMARY}</ReactMarkdown></div>
            </section>
            <section className="prose prose-invert prose-blue max-w-none rounded-2xl border border-white/10 bg-neutral-900/70 p-7 sm:p-9">
              <ReactMarkdown>{ebookMarkdown || SAMPLE_EBOOK}</ReactMarkdown>
            </section>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button onClick={downloadEbook} className="inline-flex items-center gap-2 rounded-full bg-[#2962ff] px-6 py-3 font-semibold text-white hover:bg-blue-500"><FileText size={18} /> Descargar este ejemplo</button>
              <button onClick={() => setStep(-1)} className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-300 hover:border-white/40 hover:text-white">Volver a la presentación</button>
            </div>
          </motion.div>
        );
        
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <SEO {...SEO_CONFIG.auditor} structuredData={SCHEMAS.auditor} />
      <Navbar />
      <div id="auditor-questionnaire" className="scroll-mt-24 pt-32 pb-20 px-4">
        {step >= 1 && step <= 13 && (
          <section className="mx-auto mb-8 max-w-2xl" aria-label="Progreso de la autoevaluación">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="font-semibold text-blue-200">{questionProgress[step]?.group}</p>
                <p className="mt-1 text-xs text-neutral-400">{questionProgress[step]?.title}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-neutral-300">
                  Paso {step} de 13
                </span>
                <button type="button" onClick={() => setShowAbandonConfirm(true)} className="text-xs font-medium text-neutral-400 underline decoration-neutral-700 underline-offset-4 transition hover:text-white">
                  Abandonar
                </button>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={1} aria-valuemax={13} aria-valuenow={step}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
                initial={false}
                animate={{ width: `${(step / 13) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-right text-[11px] text-neutral-500">Puedes volver y cambiar tus respuestas.</p>
          </section>
        )}
        {renderStep()}
      </div>

      <AnimatePresence>
        {showAbandonConfirm && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            onMouseDown={event => { if (event.target === event.currentTarget) setShowAbandonConfirm(false); }}
          >
            <motion.section
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14151b] p-6 shadow-2xl"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="abandon-audit-title"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Auditor Estratégico</p>
              <h2 id="abandon-audit-title" className="mt-3 text-xl font-bold text-white">¿Quieres salir de la evaluación?</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">Se borrarán las respuestas de esta sesión. Puedes quedarte y continuar donde vas.</p>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setShowAbandonConfirm(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/[0.06]">
                  Seguir con mi evaluación
                </button>
                <button type="button" onClick={abandonAudit} className="rounded-xl bg-[#2962ff] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                  Sí, abandonar
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <GroqTutorialModal isOpen={showApiKeyModal} onClose={() => setShowApiKeyModal(false)} />
      <SiteFooter />
    </div>
  );
}
