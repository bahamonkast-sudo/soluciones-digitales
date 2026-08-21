import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import Lenis from 'lenis';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView, useMotionTemplate, useScroll, useSpring } from 'framer-motion';
import { Palette, Rocket, Lock, Smartphone, Globe, Code, ArrowRight, MousePointerClick, TrendingUp, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
import { PRECIOS } from '../data/precios';

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isFloat = value.includes('.');
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => {
    return (isFloat ? latest.toFixed(2) : Math.round(latest)) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      animate(count, numValue, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, numValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function SpotlightCard({ children, className }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden bg-white border border-neutral-100 rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 27, 27, 0.08),
              transparent 80%
            )
          `
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9998] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-[#f51b1b] origin-left"
        style={{ scaleX: progress / 100, transformOrigin: '0% 50%' }}
      />
    </div>
  );
}

/* ── Magnetic Button ─────────────────────────────────────────── */
function MagneticButton({ children, className, onClick, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ── Tilt 3D Card ───────────────────────────────────────────── */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const sry = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(-py * 12);
  };
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Clip-path Reveal Title ─────────────────────────────────── */
function RevealText({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      {isHovering && <span className="text-[5px] font-bold text-black tracking-widest uppercase">Ver</span>}
    </motion.div>
  );
}

const HERO_IMG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const metodologia9s = [
  {
    num: '01',
    titulo: 'El Anclaje',
    subtitulo: 'Identidad de Poder',
    objetivo: 'Generar una primera impresion de autoridad y confianza.',
    fundamento: 'El cerebro humano evalua en pocos segundos si una empresa parece profesional, confiable y competente. Por eso, el inicio de la pagina debe transmitir credibilidad inmediata.',
    elementos: ['Imagen o identidad de autoridad', 'Nombre de la empresa', 'Propuesta de valor clara', 'Botones de contacto visibles'],
  },
  {
    num: '02',
    titulo: 'El Disparador',
    subtitulo: 'Diagnostico del Dolor',
    objetivo: 'Hacer que el visitante reconozca el problema que tiene.',
    fundamento: 'Las personas actuan con mayor rapidez para evitar una perdida que para obtener un beneficio. Mostrar las consecuencias de no resolver el problema incrementa la necesidad de actuar.',
    elementos: ['Problemas frecuentes', 'Riesgos', 'Costos de no actuar', 'Situaciones con las que el cliente se identifique'],
  },
  {
    num: '03',
    titulo: 'La Credibilidad',
    subtitulo: 'Autoridad / Quienes Somos',
    objetivo: 'Reducir el escepticismo.',
    fundamento: 'Antes de confiar, el usuario necesita saber quien esta detras de la solucion y por que deberia creer en esa empresa.',
    elementos: ['Historia', 'Experiencia', 'Certificaciones', 'Equipo', 'Trayectoria'],
  },
  {
    num: '04',
    titulo: 'La Solucion',
    subtitulo: 'Ecosistema de Valor',
    objetivo: 'Explicar claramente que ofrece la empresa.',
    fundamento: 'El cliente necesita visualizar como la solucion resolvera su problema y que beneficios obtendra.',
    elementos: ['Productos', 'Servicios', 'Videos', 'Casos de uso', 'Beneficios'],
  },
  {
    num: '05',
    titulo: 'La Logica',
    subtitulo: 'Metodologia (El Como)',
    objetivo: 'Explicar el proceso de trabajo.',
    fundamento: 'Cuando las personas entienden como funciona un servicio, perciben menos riesgo y aumentan su confianza.',
    elementos: ['Paso 1', 'Paso 2', 'Paso 3', 'Cronograma', 'Flujo del servicio'],
  },
  {
    num: '06',
    titulo: 'La Prueba',
    subtitulo: 'Evidencia Visual',
    objetivo: 'Demostrar que la solucion realmente funciona.',
    fundamento: 'Las imagenes, ejemplos y resultados generan una validacion mucho mas poderosa que cualquier promesa.',
    elementos: ['Fotografias', 'Antes y despues', 'Videos', 'Portafolio', 'Casos de exito'],
  },
  {
    num: '07',
    titulo: 'Los Datos',
    subtitulo: 'Estadisticas / KPIs',
    objetivo: 'Respaldar la propuesta con informacion cuantificable.',
    fundamento: 'Los numeros reducen la incertidumbre y fortalecen la credibilidad.',
    elementos: ['Anos de experiencia', 'Clientes atendidos', 'Proyectos realizados', 'Nivel de satisfaccion', 'Indicadores de desempeno'],
  },
  {
    num: '08',
    titulo: 'El Blindaje',
    subtitulo: 'Garantias y Soporte',
    objetivo: 'Eliminar el miedo a tomar la decision.',
    fundamento: 'Cuando el cliente percibe que el riesgo disminuye, aumenta significativamente la probabilidad de compra.',
    elementos: ['Garantias', 'Soporte', 'Acompanamiento', 'Politicas', 'Compromisos'],
  },
  {
    num: '09',
    titulo: 'La Conversion',
    subtitulo: 'Cierre Logistico',
    objetivo: 'Facilitar que el usuario realice la accion deseada.',
    fundamento: 'Si el proceso para contactar o comprar es complicado, la tasa de conversion disminuye. La accion debe ser inmediata y sencilla.',
    elementos: ['Boton de contacto', 'Formulario', 'WhatsApp', 'Direccion', 'Google Maps', 'Agenda de citas'],
  },
];

const svcDetail = [
  {
    id: 'vitrina',
    num: '01',
    nombre: 'Vitrina de Conversion',
    aka: 'Landing Page',
    tagline: 'Una pagina. Un objetivo. Resultados medibles.',
    desc: 'Landing page de alto impacto disenada para convertir visitantes en leads o clientes. Sin distracciones, sin navegacion compleja. Un solo objetivo, un solo mensaje, una sola accion.',
    features: [
      'Diseno persuasivo centrado en conversion',
      'CTAs estrategicos en puntos clave',
      'Formularios optimizados para captura',
      'Velocidad de carga ultra-rapida',
      'Integracion con Google Ads y redes',
      'Analytics y tracking de conversiones',
      'Responsive design perfecto',
      'Pruebas A/B incluidas',
    ],
    beneficios: [
      'Convierte hasta 3 veces mas que un sitio web tradicional al eliminar distracciones y enfocar al visitante en una sola accion',
      'Maximiza el ROI de tu inversion en publicidad digital - cada clic pagado llega a una pagina disenada para convertir',
      'Resultados medibles en tiempo real: sabes exactamente cuantos visitantes se convierten en clientes y en que paso del proceso',
      'Reduce el ciclo de ventas: el visitante entiende tu propuesta de valor en segundos y toma accion de inmediato',
      'Escalable: una misma landing puede servir para multiples campanas con solo ajustar el mensaje y la oferta',
    ],
    para: [
      'Campanas de publicidad digital',
      'Lanzamiento de productos o servicios',
      'Webinars y eventos online',
      'Descarga de contenido (ebooks, guias)',
      'Registro a membresias o suscripciones',
    ],
  },
  {
    id: 'ecosistema',
    num: '02',
    nombre: 'Ecosistema de Autoridad',
    aka: 'Sitio Corporativo',
    tagline: 'Tu presencia digital profesional en 5 secciones.',
    desc: 'Sitio web corporativo completo que establece tu autoridad digital. Disenado para empresas, consultores y profesionales que quieren una presencia digital solida y profesional.',
    features: [
      '5 secciones personalizadas',
      'Blog integrado con CMS',
      'Galeria de proyectos o portafolio',
      'Formulario de contacto inteligente',
      'SEO on-page completo',
      'Integracion con redes sociales',
      'Mapas y ubicacion',
      'Velocidad y rendimiento optimizados',
    ],
    beneficios: [
      'Genera confianza instantanea: el 75% de los usuarios juzga la credibilidad de una empresa por el diseno de su sitio web (Stanford University)',
      'Disponibilidad 24/7: tu negocio nunca cierra. Atiende consultas, recibe leads y muestra tu trabajo mientras duermes',
      'Te posiciona como autoridad en tu industria: un sitio profesional te diferencia de competidores que aun no tienen presencia digital',
      'Atrae clientes sin pagar publicidad: el SEO organico genera trafico constante y calificado a largo plazo',
      'Centraliza tu comunicacion: blog, redes, contacto y portafolio en un solo lugar que puedes actualizar tu mismo',
    ],
    para: [
      'Empresas de servicios profesionales',
      'Consultorias y despachos',
      'Clinicas y consultorios',
      'Restaurantes y hoteles',
      'Artistas y creativos',
    ],
  },
  {
    id: 'hub',
    num: '03',
    nombre: 'Hub de Negocios',
    aka: 'E-Commerce',
    tagline: 'Tu tienda abierta 24/7 sin limite de clientes.',
    desc: 'Tienda online completa con todo lo necesario para vender en internet. Catalogo, carrito de compras, pasarela de pagos y gestion de pedidos integrados en una sola plataforma.',
    features: [
      'Catalogo de productos ilimitado',
      'Carrito de compras inteligente',
      'Pasarela de pagos (Nequi, Daviplata, Tarjetas)',
      'Gestion de inventario en tiempo real',
      'Notificaciones de pedidos automaticas',
      'Dashboard de ventas y analytics',
      'Cupones y descuentos',
      'Envios y logistica integrada',
    ],
    beneficios: [
      'Vende sin horarios ni limites geograficos: tu tienda acepta pedidos 24/7 desde cualquier lugar del pais',
      'Automatiza tus ventas: el cliente compra, paga y recibe confirmacion sin intervencion humana',
      'Multiplica tus ingresos: un e-commerce bien disenado convierte entre 2.5% y 3% de sus visitantes (Unbounce 2024), y cada punto porcentual adicional representa ingresos significativos',
      'Conoce a tus clientes: analytics integrados te muestran que productos venden mas, quienes compran y quando',
      'Escalable: empieza con 10 productos y llega a miles sin cambiar de plataforma',
    ],
    para: [
      'Tiendas de ropa y accesorios',
      'Productos digitales (cursos, software)',
      'Suscripciones y membresias',
      'Venta de alimentos y bebidas',
      'Productos artesanales',
    ],
  },
  {
    id: 'tarjeta',
    num: '04',
    nombre: 'Tarjeta Profesional',
    aka: 'Digital Card',
    tagline: 'Tu informacion de contacto en un solo enlace.',
    desc: 'Tarjeta digital inteligente que concentra toda tu informacion profesional en un solo lugar. Comparte tu contacto, portafolio, redes sociales y mas con un solo clic.',
    features: [
      'Enlace unico y personalizado',
      'Foto de perfil y datos de contacto',
      'Redes sociales integradas',
      'Boton directo a WhatsApp',
      'Portafolio o galeria de trabajos',
      'CV o hoja de vida integrada',
      'Estadisticas de visitas',
      'Actualizacion en tiempo real',
    ],
    beneficios: [
      'Causa una impresion profesional inmediata: compartes un enlace limpio y moderno en lugar de una foto de pantalla o un PDF',
      'Actualiza tu informacion al instante: cambias tu telefono, portafolio o precios y se refleja al segundo siguiente',
      'Mide tu impacto: sabes cuantas personas vieron tu tarjeta y desde donde, algo imposible con una tarjeta fisica',
      'Unifica tu presencia digital: LinkedIn, WhatsApp, Instagram, portafolio y CV en un solo enlace que puedes poner en tu bio, firma de correo o codigo QR',
      'Sustituye las tarjetas fisicas: ahorra en impresion y nunca mas te quedes sin tarjetas en un evento de networking',
    ],
    para: [
      'Profesionales independientes',
      'Freelancers y consultores',
      'Ejecutivos y directivos',
      'Agentes inmobiliarios',
      'Conferencistas y speakers',
    ],
  },
];

const theoryStats = [
  { num: '94%', label: 'de las primeras impresiones dependen del diseno', src: 'Stanford University' },
  { num: '75%', label: 'juzga la credibilidad por el diseno del sitio', src: 'Stanford / WebFX' },
  { num: '0.05s', label: 'tarda un usuario en formarse una opinion', src: 'Google Research' },
  { num: '88%', label: 'no vuelve tras una mala experiencia', src: 'Econsultancy' },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setMobile(mq.matches);
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

function useStaggeredReveal(count, threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  const getAnimStyle = useCallback((index) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  }), [visible]);
  return { containerRef: ref, getAnimStyle };
}

function SplashScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const timer = setInterval(() => {
      if (cancelled) return;
      setCount((prev) => {
        if (prev >= 100) { clearInterval(timer); return 100; }
        return prev + 1;
      });
    }, 20);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);
  useEffect(() => {
    if (count < 100) return;
    const t1 = setTimeout(() => setExiting(true), 200);
    const t2 = setTimeout(() => { setMounted(false); onComplete(); }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [count, onComplete]);
  if (!mounted) return null;
  return (
    <div className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">
        {count}
      </div>
    </div>
  );
}

function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative">
      {/* Parallax image layer */}
      <motion.div
        style={{ y, backgroundImage: `url(${HERO_IMG})`, backgroundSize: 'cover', backgroundPosition: '65% center' }}
        className="absolute inset-0 md:[background-position:center_center] will-change-transform"
      />
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.35,
        }}
      />
      <div className="absolute inset-0 bg-white/15 z-[2]" />
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-64 z-[3] pointer-events-none" style={{ background: 'linear-gradient(to top, white 0%, transparent 100%)' }} />

      {/* Text content */}
      <motion.div style={{ y: textY, opacity }} className="absolute bottom-5 left-3 md:bottom-14 md:left-8 z-[4]">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="block text-black/60 text-xs md:text-sm font-semibold mb-1 md:mb-3 uppercase tracking-[0.25em]"
        >Tu competencia ya está en Google. ¿Tú dónde estás?</motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="text-black text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight [text-shadow:4px_4px_0_#e5e5e5,8px_8px_0_#d4d4d4]"
        >
          Web<br />UI/UX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-black/70 text-[11px] md:text-sm font-semibold leading-snug max-w-[260px] md:max-w-[380px] mt-2 md:mt-4"
        >No diseñamos sitios. <span className="text-[#f51b1b]">Construimos tu ecosistema de autoridad.</span></motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 right-5 md:bottom-14 md:right-10 z-[4] flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest hidden md:block">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 md:h-16 bg-black/25 origin-top"
        />
      </motion.div>
    </div>
  );
}

function ScrubTitle() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return (
    <motion.h2
      ref={ref}
      style={{ scale, opacity: opacity2 }}
      className="text-6xl md:text-9xl font-bold leading-none tracking-tight text-neutral-900 pb-2 md:pb-6 pt-2"
    >
      RESULTADOS
    </motion.h2>
  );
}

function MarqueeText() {
  return (
    <div className="relative w-full bg-[#f51b1b] py-6 md:py-8 overflow-hidden flex items-center transform -skew-y-2 origin-left my-24 z-10 border-y-[6px] border-black shadow-xl">
      <div className="whitespace-nowrap flex w-max animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-5xl md:text-8xl font-black text-black uppercase px-4 tracking-tighter">
            DISEÑO WEB • UI/UX • CONVERSIÓN • DESARROLLO •
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

function FlipText({ text }) {
  return (
    <div className="relative inline-block" style={{ perspective: '2000px' }}>
      <div 
        className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateX(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="block" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          {text}
        </span>
        <span className="absolute top-0 left-0 block w-full text-[#f51b1b]" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
          {text}
        </span>
      </div>
    </div>
  );
}

const pricingPlans = [
  {
    name: 'VITRINA DE CONVERSIÓN',
    subtitle: 'LANDING PAGE',
    price: PRECIOS.vitrina.display,
    originalPrice: PRECIOS.vitrina.original,
    popular: false,
    features: [
      '1 Página de Alto Impacto',
      'Formulario CRM',
      'Botón WhatsApp',
      'SEO On-page'
    ],
    details: [
      'Copywriting persuasivo orientado a ventas.',
      'Diseño UI/UX adaptado a tu identidad visual.',
      'Velocidad de carga ultra-rápida (Google PageSpeed).',
      'Estructura probada para alta conversión.',
      'Optimización total para dispositivos móviles.'
    ]
  },
  {
    name: 'ECOSISTEMA DE AUTORIDAD',
    subtitle: 'SITIO PRO DE 5 SECCIONES',
    price: PRECIOS.ecosistema.display,
    originalPrice: PRECIOS.ecosistema.original,
    popular: true,
    features: [
      '5 Secciones de Prestigio',
      'SEO Avanzado',
      'Chatbot IA Básico',
      'Diseño UI/UX de Élite'
    ],
    details: [
      'Arquitectura de información corporativa completa.',
      'Blog o sección de noticias integrado.',
      'Configuración de Google Analytics y Search Console.',
      'Chatbot inteligente pre-entrenado con tus FAQ.',
      'Posicionamiento de marca imponente y profesional.'
    ]
  },
  {
    name: 'HUB DE NEGOCIOS',
    subtitle: 'E-COMMERCE COMPLETO',
    price: PRECIOS.hub.display,
    originalPrice: PRECIOS.hub.original,
    popular: false,
    features: [
      'Productos Ilimitados',
      'Pasarela de Pagos',
      'Panel de Control',
      'Gestión Automatizada'
    ],
    details: [
      'Tienda virtual robusta y escalable.',
      'Integración con pagos (MercadoPago, PayU, Wompi).',
      'Gestión automática de inventarios y notificaciones.',
      'Carrito de compras optimizado para evitar abandonos.',
      'Módulo de cupones y promociones integrado.'
    ]
  }
];

function PricingCard({ plan }) {
  const [open, setOpen] = useState(false);
  
  return (
    <TiltCard className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'border-[#ef4444]/50 bg-[#111111] shadow-[0_0_40px_rgba(239,68,68,0.05)]' : 'border-neutral-800 bg-[#0a0a0a] hover:bg-[#111]'} flex flex-col h-full`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ef4444] text-white text-[10px] font-bold rounded-full tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.4)] whitespace-nowrap">
          MÁS POPULAR
        </div>
      )}
      <div className="absolute -top-3 right-6 px-3 py-1 bg-white text-[#ef4444] text-[10px] font-bold rounded-full tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.4)] transform rotate-3">
        -50% OFF
      </div>
      <div className="mb-6 md:mb-8 mt-2 md:mt-0">
        <h3 className={`text-lg md:text-xl font-bold mb-1 ${plan.popular ? 'text-[#ef4444]' : 'text-white'}`}>{plan.name}</h3>
        <p className="text-neutral-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{plan.subtitle}</p>
      </div>
      <div className="mb-8">
        <div className="text-neutral-500 line-through text-sm md:text-base font-semibold mb-1">{plan.originalPrice}</div>
        <div className="flex items-baseline">
          <span className={`text-4xl md:text-5xl font-bold ${plan.popular ? 'text-[#ef4444]' : 'text-white'}`}>{plan.price}</span>
          <span className="text-neutral-500 text-xs md:text-sm ml-2">COP</span>
        </div>
        <div className="text-[#ef4444]/90 text-[10px] mt-2 font-bold uppercase tracking-widest">
          * DESCUENTO YA APLICADO (TIEMPO LIMITADO)
        </div>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? '#ef4444' : '#ffffff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
            <span className="text-xs md:text-sm font-semibold text-neutral-300">{f}</span>
          </li>
        ))}
      </ul>
      
      <div className="mb-6 mt-auto">
        <button onClick={() => setOpen(!open)} className={`w-full py-4 px-5 flex items-center justify-between rounded-xl transition-colors border ${plan.popular ? 'bg-neutral-900 border-[#ef4444]/20 hover:bg-neutral-800' : 'bg-[#151515] hover:bg-neutral-800 border-neutral-800'}`}>
          <span className={`text-[10px] md:text-xs font-bold tracking-widest ${plan.popular ? 'text-[#ef4444]' : 'text-white'}`}>DETALLES</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: 'anticipate' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? '#ef4444' : '#ffffff'} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="p-4 md:p-5 mt-2 bg-[#151515] rounded-xl border border-neutral-800">
                <ul className="space-y-3">
                  {plan.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`shrink-0 mt-0.5 ${plan.popular ? 'text-[#ef4444]' : 'text-neutral-500'}`}>•</span>
                      <span className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MagneticButton>
        <SlideButton
          label="Seleccionar"
          hoverLabel="Contratar por WhatsApp"
          onClick={() => window.open(`https://wa.me/573115893220?text=${encodeURIComponent('Hola, me interesa el plan ' + plan.name + ' por ' + plan.price)}`, '_blank', 'noopener')}
          icon={Rocket}
          width="100%"
          className="w-full"
        />
      </MagneticButton>
    </TiltCard>
  )
}

const faqData = [
  {
    q: "¿Dónde puedo ver su portafolio de clientes?",
    a: "Por acuerdos de estricta confidencialidad (NDA) protegemos las estrategias de conversión de nuestros clientes corporativos, por lo que no los exhibimos públicamente. Además, no reciclamos plantillas. En lugar de mostrarte lo que hicimos para otros, te mostramos lo que podemos hacer por ti: diseñamos un prototipo UI de alta fidelidad exclusivo para tu marca antes de que tomes la decisión final."
  },
  {
    q: "¿Ustedes redactan los textos persuasivos?",
    a: "Sí. No te pedimos que nos envíes 'la información'. Nuestro equipo realiza un análisis de tu mercado y redacta el copywriting estratégico orientado a ventas incluido en todos nuestros ecosistemas."
  },
  {
    q: "¿En cuánto tiempo entregan el ecosistema listo?",
    a: "Un ecosistema de autoridad toma entre 2 a 4 semanas dependiendo de la complejidad. Sin embargo, en la primera semana te presentamos el prototipo de diseño para asegurar que estamos alineados con tu visión corporativa."
  },
  {
    q: "¿Cuántos proyectos aceptan por mes?",
    a: "Para garantizar la calidad obsesiva que nos caracteriza, solo aceptamos 3 proyectos nuevos por mes. Si estás leyendo esto, puede que aún haya cupos disponibles. Te recomendamos no esperar."
  },
  {
    q: "¿Qué pasa si no me gusta el resultado?",
    a: "Antes de escribir una sola línea de código, te presentamos el prototipo visual completo para tu aprobación. Si en ese momento hay ajustes, los hacemos. No avanzamos a producción hasta que estés 100% conforme con el diseño. Nunca has tenido menos riesgo al contratar un servicio de diseño web."
  },
  {
    q: "¿El sitio queda en un servidor de ustedes o en el mío?",
    a: "En el tuyo. Siempre. Lo instalamos directamente en tu hosting para que seas el dueño absoluto. No hay mensualidades forzadas, no hay dependencias. Nosotros construimos, tú eres el dueño del 100%."
  }
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-neutral-500 text-sm md:text-base">Claridad absoluta antes de dar el siguiente paso.</p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:border-neutral-300 transition-colors">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-bold text-black pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-neutral-600 text-sm md:text-base leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const techs = ["React", "Node.js", "TailwindCSS", "AWS", "Figma", "Vercel", "Stripe", "Next.js", "GraphQL", "Framer Motion"];
  return (
    <div className="w-full py-10 md:py-14 bg-white overflow-hidden border-t border-neutral-100 flex items-center relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex w-max animate-[marquee_20s_linear_infinite] opacity-50">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
            {techs.map((tech, j) => (
              <span key={j} className="text-xl md:text-2xl font-bold text-neutral-800 uppercase tracking-widest">{tech}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineProcess() {
  const steps = [
    { num: '01', title: 'Descubrimiento & Estrategia', desc: 'Análisis profundo de tu negocio, mercado y objetivos para estructurar el embudo de conversión perfecto.' },
    { num: '02', title: 'Prototipo de Alta Fidelidad', desc: 'Diseño visual completo y redacción de copy persuasivo. No programamos hasta que apruebes cada pixel.' },
    { num: '03', title: 'Ingeniería & Desarrollo', desc: 'Construcción con tecnologías modernas, optimización de velocidad extrema y configuración de SEO técnico.' },
    { num: '04', title: 'Lanzamiento & Escalabilidad', desc: 'Instalación en tu propio hosting, auditoría final de calidad y entrega de tu ecosistema de autoridad.' }
  ];
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <div className="text-xs md:text-sm font-bold text-neutral-400 tracking-widest uppercase mb-4">Cronograma de Trabajo</div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">El Camino hacia el Lanzamiento</h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Transparencia total. Un proceso de 4 a 6 semanas diseñado para minimizar fricciones y maximizar la calidad.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
          <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-neutral-100" />
          {steps.map((step, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: '-80px' });
            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16,1,0.3,1] }}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg mb-6 ring-8 ring-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50"
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-neutral-800 transition-colors border border-neutral-700 hover:scale-110 active:scale-95"
            aria-label="Volver arriba"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GuaranteeBanner() {
  return (
    <section className="bg-black py-16 md:py-24 px-4 md:px-8 text-center border-b-4 border-[#ef4444]">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block bg-[#ef4444]/15 text-[#ef4444] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-[#ef4444]/30">
          La Oferta de Riesgo Cero
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
          Entregado en tu hosting.<br/>
          <span className="text-[#ef4444]">Cero mensualidades forzadas.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 text-left">
          <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
            <div className="w-10 h-10 bg-[#ef4444]/15 rounded-full flex items-center justify-center mb-4 text-[#ef4444]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h3 className="text-white font-bold mb-2">100% Tuyo</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Lo instalamos directamente en tu propio servicio de hosting. Eres el dueño absoluto de tu ecosistema.</p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
            <div className="w-10 h-10 bg-[#ef4444]/15 rounded-full flex items-center justify-center mb-4 text-[#ef4444]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-white font-bold mb-2">-50% Vitalicio</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Accede a esta tarifa especial descontada para siempre, sin sorpresas ni incrementos futuros.</p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
            <div className="w-10 h-10 bg-[#ef4444]/15 rounded-full flex items-center justify-center mb-4 text-[#ef4444]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 9.36l-7.1 7.1a1 1 0 0 1-1.4 0l-2.8-2.8a1 1 0 0 1 0-1.4l7.1-7.1a6 6 0 0 1 9.36-7.94l-3.77 3.77z"/></svg>
            </div>
            <h3 className="text-white font-bold mb-2">Pagas lo que usas</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">No hay igualas ni membresías forzadas de mantenimiento. Solo nos llamas cuando necesitas una actualización.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const arquitecturas = [
  {
    id: '01',
    title: 'Landing Page de Alta Conversión',
    desc: 'Arquitectura diseñada para un único objetivo: capturar leads o generar ventas directas. Eliminamos distracciones, optimizamos la velocidad de carga al extremo y utilizamos estructuras de copywriting (AIDA/PAS) para guiar al usuario hacia la acción.',
    features: ['Estructura de embudo (Funnel)', 'Llamados a la acción (CTA) magnéticos', 'Optimización de velocidad (Core Web Vitals)'],
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: '02',
    title: 'Ecosistema Corporativo PRO',
    desc: 'El centro neurálgico de tu marca en internet. Un diseño multi-sección que transmite autoridad instantánea, educa a tus clientes sobre tus servicios y posiciona a tu empresa como líder del sector mediante SEO técnico.',
    features: ['Arquitectura de información profunda', 'Sección de Casos de Éxito / Trust', 'Integración de Blog / Noticias SEO'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '03',
    title: 'Hub de Negocios (E-Commerce)',
    desc: 'Mucho más que una tienda virtual. Es una máquina transaccional diseñada para minimizar el abandono de carritos, cruzar ventas (upsells) y gestionar el inventario de forma automatizada.',
    features: ['Pasarela de pagos integrada', 'Fichas de producto persuasivas', 'Panel de gestión de inventario automatizado'],
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: '04',
    title: 'Tarjeta Profesional Digital',
    desc: 'Desarrollamos una herramienta de alto impacto diseñada bajo tus requerimientos. Sin distracciones, enfocada en proyectar autoridad, confianza y presencia digital profesional mediante nuestro Modelo PLUS.',
    features: ['Foto / Logo VIP', 'Identidad Corporativa', 'Cargo Estratégico', 'Enlaces de Acción', 'Mapa Integrado', 'Redes Sociales'],
    color: 'from-red-500 to-rose-400'
  }
];

function ArquitecturasGallery() {
  return (
    <section className="bg-white py-24 md:py-40 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-20 md:mb-32">
          <div className="text-xs md:text-sm font-semibold text-neutral-400 mb-4 tracking-widest uppercase">Nuestros Estándares</div>
          <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight mb-6 max-w-4xl">
            No usamos plantillas. <br className="hidden md:block"/>
            <span className="text-neutral-300">Diseñamos Arquitecturas.</span>
          </h2>
          <p className="text-neutral-500 text-base md:text-xl max-w-2xl leading-relaxed">
            Protegemos la confidencialidad de nuestros clientes corporativos. Por eso, en lugar de un portafolio tradicional, te mostramos los estándares técnicos y visuales con los que construimos cada proyecto.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 relative">
          
          <div className="md:w-5/12 md:sticky md:top-40 md:h-[calc(100vh-200px)] flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">La ingeniería detrás del diseño.</h3>
            <p className="text-neutral-500 text-base md:text-lg leading-relaxed mb-8">
              Cada tipo de negocio requiere una estructura diferente. No es lo mismo vender un curso digital que posicionar una firma de abogados. Adaptamos la arquitectura web al modelo de negocio para maximizar el ROI.
            </p>
            <div className="hidden md:flex gap-4 items-center text-sm font-bold text-black">
              <span>Haz scroll para explorar</span>
              <svg className="animate-bounce" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
          </div>

          <div className="md:w-7/12 flex flex-col gap-12 md:gap-32 w-full pb-10 md:pb-20">
            {arquitecturas.map((arq, i) => (
              <div key={i} className="bg-neutral-50 rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-neutral-300 transition-colors">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${arq.color} opacity-5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="text-[8rem] md:text-[12rem] font-black text-neutral-100 absolute -bottom-10 -right-10 leading-none pointer-events-none select-none">
                  {arq.id}
                </div>

                <div className="relative z-10">
                  <h4 className="text-2xl md:text-4xl font-bold text-black mb-6 leading-tight max-w-sm">{arq.title}</h4>
                  <p className="text-neutral-600 text-sm md:text-lg leading-relaxed mb-8 max-w-md">
                    {arq.desc}
                  </p>
                  
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-neutral-400 tracking-widest uppercase mb-4">Características Clave</h5>
                    {arq.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${arq.color}`} />
                        <span className="text-sm md:text-base font-semibold text-neutral-800">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function SitiosWebPage() {
  const [splashDone, setSplashDone] = useState(false);
  const [active9s, setActive9s] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const [entering, setEntering] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [showBusinessCard, setShowBusinessCard] = useState(false);
  const isMobile = useIsMobile();
  const section1Ref = useRef(null);
  const s1Reveal = useStaggeredReveal(1);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateService = useCallback((index) => {
    setEntering(true);
    setActiveService(index);
    setTimeout(() => setEntering(false), 600);
    const el = document.getElementById('servicios');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  const closeService = useCallback(() => {
    setActiveService(null);
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && activeService !== null) closeService(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeService, closeService]);

  const openWa = useCallback((text) => {
    window.open(`https://wa.me/573115893220?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }, []);

  return (
    <div className="bg-white font-sans min-h-screen text-black cursor-none md:cursor-auto">
      <CustomCursor />
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <Navbar activePage="sitios-web" />

      <section ref={(el) => { section1Ref.current = el; s1Reveal.containerRef.current = el; }} className="h-screen w-full overflow-hidden pt-14 md:pt-16 px-3 md:px-5 pb-3 md:pb-5">
        <HeroParallax />
      </section>

      <section id="metodologia" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden z-0">
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="text-xs md:text-sm font-semibold text-neutral-700 mb-3">Metodologia 9s</div>
            <div className="text-center mb-2">
              <div className="text-xs md:text-sm font-semibold text-neutral-600 tracking-[0.3em] mb-3">EL CAMINO A LOS</div>
              <ScrubTitle />
              <div className="w-12 h-0.5 bg-neutral-400 mx-auto mt-4" />
            </div>
            <p className="text-neutral-700 text-sm md:text-base max-w-xl mx-auto">Cada sitio web que construimos sigue estos 9 principios fundamentales. Selecciona cada uno para ver su explicacion.</p>
          </div>

          <div 
            className="flex overflow-x-auto hide-scrollbar md:flex-wrap justify-start md:justify-center gap-4 mb-10 pb-4 md:pb-0 snap-x max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {metodologia9s.map((m, i) => (
              <button
                key={i}
                onClick={() => setActive9s(i)}
                className={`relative px-5 py-3 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 snap-center whitespace-nowrap shrink-0 ${
                  active9s === i
                    ? 'bg-black text-white border-black shadow-md'
                    : 'text-neutral-600 border-neutral-200 bg-transparent hover:bg-neutral-100 hover:text-black hover:border-neutral-300'
                }`}
              >
                <span className="relative z-10 hidden md:inline">{m.titulo}</span>
                <span className="relative z-10 md:hidden">{m.num} {m.titulo}</span>
              </button>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white border border-neutral-200 p-6 md:p-10 relative overflow-hidden min-h-[400px] shadow-sm">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active9s}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative z-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-2xl font-bold text-black">
                    {metodologia9s[active9s].num}
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-black">{metodologia9s[active9s].titulo}</div>
                    <div className="text-xs md:text-sm text-neutral-600 font-semibold">{metodologia9s[active9s].subtitulo}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                  <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5 md:p-6">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#f51b1b] uppercase">Objetivo</span>
                    <p className="text-sm md:text-base text-neutral-900 font-medium mt-2 leading-relaxed">{metodologia9s[active9s].objetivo}</p>
                  </div>
                  
                  <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-5 md:p-6">
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#f51b1b] uppercase">Fundamento</span>
                    <p className="text-sm md:text-base text-neutral-900 font-medium mt-2 leading-relaxed">{metodologia9s[active9s].fundamento}</p>
                  </div>
                </div>

                <div className="mt-8 pt-8">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-700 uppercase mb-4 block">Elementos sugeridos</span>
                  <div className="flex flex-wrap gap-3">
                    {metodologia9s[active9s].elementos.map((el, j) => (
                      <span key={j} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs md:text-sm font-semibold text-neutral-800 shadow-sm">
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 p-4 md:p-6 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs md:text-sm text-neutral-700">
              <span>Captar la atencion con autoridad</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Mostrar el problema</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Construir confianza</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Presentar la solucion</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Explicar el proceso</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Demostrar resultados</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Respaldar con datos</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Reducir el riesgo</span>
              <span className="text-neutral-400 hidden md:inline">•</span>
              <span>Facilitar la accion</span>
            </div>
          </div>
        </div>
      </section>

      <TimelineProcess />

      <section className="py-24 md:py-32 px-4 md:px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xs md:text-sm font-semibold text-neutral-400 mb-3">La Ciencia del Diseno Web</div>
          <h2 className="text-4xl md:text-6xl font-bold text-black leading-[0.95] mb-6">Por que el diseno web <br className="hidden md:block" /><span className="text-neutral-400">define el exito de tu negocio</span></h2>
          <p className="text-neutral-500 text-sm md:text-base max-w-2xl mx-auto mb-12">El diseno web no es solo estetica. Es psicologia aplicada, optimizacion de procesos y construccion de confianza. Estos datos explican por que.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {theoryStats.map((s, i) => (
                <SpotlightCard key={i} className="p-5 md:p-8">
                  <div className="text-3xl md:text-5xl font-bold text-black leading-none mb-2 md:mb-3">
                    <Counter value={s.num} />
                  </div>
                  <p className="text-xs md:text-sm text-neutral-500 leading-snug">{s.label}</p>
                  <span className="inline-block mt-2 md:mt-3 text-[10px] md:text-xs text-neutral-300 font-medium">{s.src}</span>
                </SpotlightCard>
              ))}
          </div>
        </div>
      </section>

      <MarqueeText />

      <ArquitecturasGallery />

      <TechMarquee />

      <GuaranteeBanner />

      <FaqAccordion />

      <section className="relative py-32 md:py-48 px-4 md:px-8 bg-black text-center overflow-hidden z-0">
        <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <RevealText className="text-4xl md:text-6xl font-bold text-white leading-[1.0] mb-6">
            No diseñamos sitios, <br /><span className="text-[#f51b1b]">construimos tu ecosistema de autoridad</span>
          </RevealText>
          <RevealText delay={0.15} className="text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-medium">
            Si tu negocio no está en internet, tu negocio es el secreto mejor guardado y <strong className="text-white">los secretos no facturan...</strong>
          </RevealText>
          <MagneticButton>
            <SlideButton
              label="Ver valor de la inversión"
              hoverLabel="Conoce nuestros planes"
              onClick={() => setIsPricingOpen(true)}
              icon={ArrowRight}
              width={320}
            />
          </MagneticButton>
        </div>
      </section>

      <AnimatePresence>
        {isPricingOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
          >
            <div className="absolute inset-0 z-0" onClick={() => setIsPricingOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 w-full max-w-7xl mx-auto my-auto py-10"
            >
              <button onClick={() => setIsPricingOpen(false)} className="absolute -top-4 right-0 md:-top-10 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-800 transition-colors z-20 shadow-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-[#ef4444] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]">Oferta Inigualable</h2>
                <p className="text-neutral-400 text-xs md:text-sm mt-4 font-bold tracking-[0.2em] uppercase">* NO INCLUYE HOSTING NI DOMINIO</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                {pricingPlans.map((plan, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className={plan.popular ? "md:-mt-8 md:mb-8" : "mt-0"}
                  >
                    <PricingCard plan={plan} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />

      {/* ── FLOATING BUSINESS CARD BUTTON ────────────────────────── */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50"
        >
          <button
            onClick={() => setShowBusinessCard(true)}
            className="w-12 h-12 md:w-14 md:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-neutral-800 transition-colors border border-neutral-700 hover:scale-110 active:scale-95"
            aria-label="Tarjeta Digital"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>

      <ScrollToTopButton />

      {/* ── BUSINESS CARD MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {showBusinessCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 overflow-y-auto bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBusinessCard(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[400px] relative"
            >
              <button
                onClick={() => setShowBusinessCard(false)}
                className="absolute -top-3 -right-3 z-20 w-9 h-9 bg-black border border-neutral-700 rounded-full flex items-center justify-center text-white hover:bg-neutral-800 transition-colors shadow-xl"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="bg-white rounded-[28px] border border-neutral-200 p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#f51b1b]/5 blur-[60px] pointer-events-none" />
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.25em] text-neutral-400 uppercase">Tarjeta Digital</span>
                    <h3 className="text-xl md:text-2xl font-bold text-black mt-1 leading-tight">
                      Soluciones Digitales<br />
                      <span className="text-[#f51b1b]">IA</span>
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                </div>

                <div className="h-px bg-neutral-100 mb-6 relative z-10" />

                <div className="flex flex-col gap-2 relative z-10">
                  <a href="https://wa.me/573115893220" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-200">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">WhatsApp</span>
                      <span className="text-sm font-semibold text-black truncate">+57 311 589 3220</span>
                    </div>
                  </a>
                  <a href="tel:+573138137910" className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-200">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Teléfono</span>
                      <span className="text-sm font-semibold text-black truncate">+57 313 813 7910</span>
                    </div>
                  </a>
                  <a href="mailto:info@solucionesdigitalesia.co" className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-200">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Email</span>
                      <span className="text-sm font-semibold text-black truncate">info@solucionesdigitalesia.co</span>
                    </div>
                  </a>
                  <a href={window.location.origin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 px-4 py-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all duration-200">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">Web</span>
                      <span className="text-sm font-semibold text-black truncate">{window.location.host}</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-3 mt-6 relative z-10">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-neutral-500 tracking-wide">Bogotá, Colombia</span>
                  </div>
                  <button
                    onClick={() => {
                      const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Soluciones Digitales IA
ORG:Soluciones Digitales IA
TEL;TYPE=WORK:+57 311 589 3220
TEL;TYPE=WORK:+57 313 813 7910
EMAIL:info@solucionesdigitalesia.co
URL:${window.location.origin}
ADR:;;Bogotá;;;Colombia
END:VCARD`;
                      const blob = new Blob([vcard], { type: 'text/vcard' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'soluciones-digitales-ia.vcf';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider text-white transition-all duration-200 bg-black hover:bg-neutral-800"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Guardar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
