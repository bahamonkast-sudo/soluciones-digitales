import { PRECIOS } from './precios';
import { getDistUrl } from '../utils/env';

export const CATALOGO = [
  // ── SITIOS WEB ─────────────────────────────────────────────
  {
    id: 1,
    title: 'Vitrina de Conversión',
    category: 'Sitios Web',
    price: PRECIOS.vitrina.display,
    priceNote: PRECIOS.vitrina.nota,
    image: getDistUrl('tienda/Desk_with_laptop_and_coffee_202608031745.jpeg'),
    desc: 'Landing page de alto impacto con copywriting persuasivo, formulario CRM, botón WhatsApp y SEO on-page. Estructura probada para alta conversión, optimizada 100% para móviles.',
    features: ['1 Página de Alto Impacto', 'Formulario CRM', 'Botón WhatsApp', 'SEO On-page'],
    details: [
      'Copywriting persuasivo orientado a ventas.',
      'Diseño UI/UX adaptado a tu identidad visual.',
      'Velocidad de carga ultra-rápida (Google PageSpeed).',
      'Estructura probada para alta conversión.',
      'Optimización total para dispositivos móviles.'
    ],
    landing: 'sitios-web'
  },
  {
    id: 2,
    title: 'Ecosistema de Autoridad',
    category: 'Sitios Web',
    price: PRECIOS.ecosistema.display,
    priceNote: PRECIOS.ecosistema.nota,
    image: getDistUrl('tienda/Office_desk_with_laptop_202608031745.jpeg'),
    desc: 'Sitio pro de 5 secciones de prestigio con SEO avanzado, chatbot IA básico y diseño UI/UX de élite. Arquitectura corporativa completa, blog integrado, Google Analytics y Search Console.',
    features: ['5 Secciones de Prestigio', 'SEO Avanzado', 'Chatbot IA Básico', 'Diseño UI/UX de Élite'],
    details: [
      'Arquitectura de información corporativa completa.',
      'Blog o sección de noticias integrado.',
      'Configuración de Google Analytics y Search Console.',
      'Chatbot inteligente pre-entrenado con tus FAQ.',
      'Posicionamiento de marca imponente y profesional.'
    ],
    landing: 'sitios-web'
  },
  {
    id: 3,
    title: 'Hub de Negocios',
    category: 'Sitios Web',
    price: PRECIOS.hub.display,
    priceNote: PRECIOS.hub.nota,
    image: getDistUrl('tienda/Online_store_desk_with_laptop_202608031745.jpeg'),
    desc: 'E-commerce completo: catálogo ilimitado, carrito inteligente, pasarela de pagos (Nequi, Daviplata, Tarjetas), gestión de inventario en tiempo real y dashboard de ventas.',
    features: ['Productos Ilimitados', 'Pasarela de Pagos', 'Panel de Control', 'Gestión Automatizada'],
    details: [
      'Tienda virtual robusta y escalable.',
      'Integración con pagos (MercadoPago, PayU, Wompi).',
      'Gestión automática de inventarios y notificaciones.',
      'Carrito de compras optimizado para evitar abandonos.',
      'Módulo de cupones y promociones integrado.'
    ],
    landing: 'sitios-web'
  },
  {
    id: 4,
    title: 'Tarjeta Profesional de Negocios',
    category: 'Sitios Web',
    price: PRECIOS.tarjeta.display,
    priceNote: PRECIOS.tarjeta.nota,
    image: getDistUrl('tienda/Business_card_resting_on_desk_202608031745.jpeg'),
    desc: 'Tarjeta digital inteligente Modelo PLUS que concentra tu información profesional en un solo enlace. Comparte contacto, portafolio y redes con un clic. Sistema propio, sin mensualidades.',
    features: ['Foto / Logo VIP', 'Identidad Corporativa', 'Cargo Estratégico', 'Enlaces de Acción', 'Mapa Integrado', 'Redes Sociales'],
    details: [
      'Imagen de alta resolución con tratamiento profesional.',
      'Colores, tipografía y estilo alineados a tu marca.',
      'Título profesional y área de especialización visibles.',
      'Botones directos a WhatsApp, llamada, email y web.',
      'Ubicación geográfica incrustada.',
      'Instagram, Facebook, LinkedIn, YouTube en un solo lugar.'
    ],
    landing: 'solucionesdigitales'
  },

  // ── INTELIGENCIA ARTIFICIAL ─────────────────────────────────
  {
    id: 5,
    title: 'Probador Virtual IA',
    category: 'Inteligencia Artificial',
    price: PRECIOS.probador.display,
    priceNote: PRECIOS.probador.nota,
    image: getDistUrl('tienda/Person_trying_clothes_using_phone_202608031745.jpeg'),
    desc: 'Permite a tus clientes probarse productos desde su celular. 100% integrado en tu dominio, sin colas de espera y costo por uso mínimo. Aumenta el ticket promedio y baja devoluciones.',
    features: ['100% integrado en tu dominio', 'Sin colas públicas de espera', 'Aumenta el ticket promedio', 'Baja las devoluciones'],
    details: [
      'Plugin premium WordPress instalado en tu tienda.',
      'Fusión de prenda y foto en segundos con IA.'
    ],
    landing: 'probador-virtual'
  },
  {
    id: 6,
    title: 'Piloto Pro — Agente IA Autónomo',
    category: 'Inteligencia Artificial',
    price: PRECIOS.pilotoPro.display,
    priceNote: PRECIOS.pilotoPro.nota,
    image: getDistUrl('tienda/Person_working_at_home_office_202608031746.jpeg'),
    desc: 'Agente IA autónomo que responde 24/7: escucha dudas, analiza, perfila y filtra leads con sutileza. Agenda citas, califica y entrega solo contactos listos y calificados. Funciona en tu PC.',
    features: ['Responde consultas 24/7', 'Agenda y califica leads', 'Analiza y perfila contactos', 'Funciona en tu PC local', 'Cancela cuando quieras'],
    details: [
      'Instalación local en tu equipo. Sin depender de servidores externos.',
      'Cargas la información de tu negocio y aprende al instante.',
      'Responde, resuelve dudas y asiste a tus clientes automáticamente.',
      'Licencia por período contratado. Equipo local.'
    ],
    landing: 'chatbot'
  },
  {
    id: 7,
    title: 'Chatbot Multicanal Inteligente',
    category: 'Inteligencia Artificial',
    price: PRECIOS.chatbot.display,
    priceNote: PRECIOS.chatbot.nota,
    image: getDistUrl('tienda/Advisors_working_in_customer_center_202608031746.jpeg'),
    desc: 'Sistema multiagente y multicanal: un solo WhatsApp recibe todos los leads, la IA califica y distribuye inteligentemente a tu equipo de asesores con notificaciones en tiempo real.',
    features: ['1 número WhatsApp principal', 'Asistentes IA multicanales ilimitados', 'Hasta 50 asesores vinculados', 'Distribución inteligente de leads', 'Captura y calificación automática', 'Notificaciones en tiempo real', 'Dashboard de gestión y métricas'],
    details: [
      'Todos los clientes llegan a un solo WhatsApp.',
      'La IA conversa, extrae necesidades y evalúa el interés del lead.',
      'Asigna cada lead al asesor según especialidad y disponibilidad.',
      'Alertas instantáneas con todo el contexto de la conversación.',
      'Soporte técnico prioritario y sin permanencia mínima.'
    ],
    landing: 'canal1-chatbot'
  },

  // ── WHATSAPP AUTOMATION ─────────────────────────────────────
  {
    id: 8,
    title: 'Plataforma de Envío Masivo',
    category: 'WhatsApp Automation',
    price: PRECIOS.envioMasivo.display,
    priceNote: PRECIOS.envioMasivo.nota,
    image: getDistUrl('tienda/Desk_with_smartphone_and_laptop_202608031746.jpeg'),
    desc: 'Difusión a gran escala con infraestructura segura. Escudo anti-baneo, envíos escalonados en ventanas naturales, psicología aplicada y mensajes hiper-personalizados.',
    features: ['1 línea WhatsApp protegida', 'Envíos ilimitados con rotación inteligente', 'Varianza lexical + mutación de hashes', 'Calentamiento progresivo de cuenta', 'Dashboard de monitoreo en tiempo real', 'Soporte prioritario 24/7'],
    details: [
      'Infraestructura rota firmas digitales y simula comportamiento humano.',
      'Micro-conversaciones: el bot saluda, espera y responde como persona real.',
      'Rampas de volumen algorítmicas que escalan progresivamente.',
      'Cada mensaje lleva nombre, cargo o dato personalizado.',
      'Difusión segmentada para bases calientes y frías.'
    ],
    landing: 'guardian-difusion'
  },
  {
    id: 9,
    title: 'Calentador Inteligente de Cuentas',
    category: 'WhatsApp Automation',
    price: PRECIOS.calentador.display,
    priceNote: PRECIOS.calentador.nota,
    image: getDistUrl('tienda/Smartphone_on_quiet_morning_desk_202608031746.jpeg'),
    desc: 'Madura y prepara tus cuentas de WhatsApp por un tiempo amplio para asegurar una reputación impecable ante los servidores y evitar cualquier riesgo de bloqueo.',
    features: ['Calentamiento progresivo', 'Historial de confianza', 'Simulación de interacciones humanas', 'Ritmo ajustable por días'],
    details: [
      'Analiza la madurez de tu número ante los servidores.',
      'Construye historial de confianza de forma estrictamente progresiva.',
      'Inicia con interacciones humanas ligeras y aumenta el ritmo suavemente.',
      'Evita el bloqueo por comportamiento anómalo.'
    ],
    landing: 'calentador-cuentas'
  },

  // ── MINERÍA DE DATOS B2B ────────────────────────────────────
  {
    id: 10,
    title: 'Extractor de WhatsApp',
    category: 'Minería de Datos B2B',
    price: PRECIOS.extradata.display,
    priceNote: PRECIOS.extradata.nota,
    image: getDistUrl('tienda/Data_analysis_desk_with_laptop_202608031746.jpeg'),
    desc: 'Extrae miles de prospectos B2B calificados desde fuentes públicas en segundos. Barrido por nicho y zona, minería de grupos activos y exportación directa a Excel.',
    features: ['Datos por zona y nicho', 'Extracción de grupos WhatsApp', 'Contactos de grupos', 'Exportación a Excel', 'Extracción discreta'],
    components: ['Barrido Comercial por Nicho', 'Minería de Grupos Activos', 'Recuperación de Grupos Abandonados'],
    details: [
      'Segmenta por ubicación geográfica y categoría de negocio.',
      'Escanea grupos activos de WhatsApp filtrados por nicho o palabra clave.',
      'Extrae números de participantes dentro de los grupos.',
      'Todos los datos se exportan a Excel sin procesamiento adicional.',
      'Opera de forma gradual y no invasiva.'
    ],
    landing: 'extractor'
  },

  // ── AUDITORÍA ───────────────────────────────────────────────
  {
    id: 11,
    title: 'Auditor Estratégico',
    category: 'Auditoría',
    price: PRECIOS.auditor.display,
    priceNote: PRECIOS.auditor.nota,
    image: getDistUrl('tienda/Business_consultant_working_in_o_202608031747.jpeg'),
    desc: 'Diagnóstico estratégico completo de tu negocio: análisis de tu embudo, metodología recomendada, controles de medición (Google Analytics, Search Console, Meta Pixel) y plan de acción prioritario.',
    features: ['Diagnóstico del dolor principal', 'Metodología recomendada', 'Controles de medición', 'Análisis del embudo', 'Recomendaciones anti-bloqueos', 'Plan de acción prioritario'],
    details: [
      'Ebook completo con el diagnóstico de tu dolor principal.',
      'Metodología recomendada para tu etapa y categoría.',
      'Configuración de Google Analytics, Search Console y Meta Pixel.',
      'Análisis de tu embudo de conversión.',
      'Recomendaciones anti-bloqueos y plan de acción.'
    ],
    landing: 'auditor-estrategico'
  }
];
