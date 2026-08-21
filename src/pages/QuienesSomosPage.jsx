import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, Brain, RefreshCw, Heart, Quote, ArrowRight, MessageCircle, Phone, Search, Code, MessageSquare, X, Target, Lightbulb, Layers, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { getFrontPageUrl, getDistUrl } from '../utils/env';

/* ─── REUSABLE SUB-COMPONENTS ──────────────────────────── */

function FadeIn({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-px bg-[#2962ff]" />
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#2962ff] font-semibold">{text}</span>
    </div>
  );
}

function CTAButton({ label = "Acción", onClick, size = "md" }) {
  const sizes = {
    sm: "px-6 py-2.5 text-[11px]",
    md: "px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm",
    lg: "px-10 py-4 sm:px-14 sm:py-5 text-sm sm:text-base"
  };
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter(r => r.id !== id)), 600);
    if (onClick) onClick(e);
  };
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        y: -3, scale: 1.02,
        boxShadow: "0 20px 40px rgba(41,98,255,0.55), 0 8px 16px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.35), inset -2px -2px 4px rgba(0,0,0,0.4)"
      }}
      whileTap={{ y: 1, scale: 0.98, boxShadow: "0 4px 8px rgba(41,98,255,0.3), inset 3px 3px 6px rgba(0,0,0,0.55)" }}
      className={`tracking-widest font-black text-white cursor-pointer border-2 border-[#2962ff] transition-colors duration-200 relative overflow-hidden rounded-full ${sizes[size]}`}
      style={{
        background: 'linear-gradient(135deg, #3a74ff 0%, #1532cb 100%)',
        boxShadow: '0 8px 24px rgba(41,98,255,0.4), 0 4px 8px rgba(0,0,0,0.35), inset 2px 2px 5px rgba(255,255,255,0.28), inset -2px -2px 5px rgba(0,0,0,0.4)',
        textShadow: '0 1px 2px rgba(0,0,0,0.4)'
      }}
    >
      {ripples.map((r) => (
        <span key={r.id} style={{
          position: 'absolute', left: r.x, top: r.y,
          transform: 'translate(-50%, -50%)', width: '10px', height: '10px',
          background: 'rgba(255,255,255,0.4)', borderRadius: '50%',
          pointerEvents: 'none', animation: 'ripple-expand 0.6s ease-out'
        }} />
      ))}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress, transformOrigin: '0%',
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, #1532cb 0%, #2962ff 50%, #4d7fff 100%)',
        boxShadow: '0 0 8px rgba(41,98,255,0.9), 0 0 16px rgba(41,98,255,0.4)',
        zIndex: 9999,
      }}
    />
  );
}

function ParallaxSection({ children, image, overlay = true, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {image && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${image}')`,
            y,
            filter: 'contrast(1.25) brightness(0.7)'
          }}
        />
      )}
      {image && overlay && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'rgba(11,11,15,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }} />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/* ─── LETTER ANIMATION VARIANTS ──────────────────────────── */
const letterContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } }
};
const letterVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.75 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 10, stiffness: 140 } }
};

/* ─── ANIMATED TEXT ──────────────────────────────────────── */
function AnimatedTextBlock({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = (index + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
        return (
          <span key={index} className="inline-block mr-[0.3em] last:mr-0">
            <motion.span style={{ opacity }}>{word}</motion.span>
          </span>
        );
      })}
    </p>
  );
}

/* ─── SECTION DATA ───────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'nucleo',
    shortLabel: 'Núcleo',
    label: 'Núcleo de Ingeniería',
    icon: Cpu,
    title: 'El Núcleo de Nuestra Ingeniería',
    subtitle: 'Arquitectura tecnológica con propósito',
    body: [
      'Somos un estudio de ingeniería digital y arquitectura tecnológica enfocado en la realidad de tu negocio. Diseñamos e implementamos la infraestructura que permite a tu organización comunicarse con claridad, atender a su público de forma inmediata y descubrir nuevas oportunidades de mercado sin perder tiempo en tareas operativas manuales.',
      'Desarrollamos soluciones a la medida de tus necesidades, asegurando que tu mensaje llegue con precisión y que tus sistemas operen de manera óptima en cada punto de contacto con tus usuarios.'
    ],
    tags: ['Ingeniería Digital', 'Arquitectura Tecnológica', 'Infraestructura Escalable', 'Optimización'],
    stat: { value: '4+', label: 'Años innovando' }
  },
  {
    id: 'investigacion',
    shortLabel: 'Investigación',
    label: 'I+D + Ciencia de Datos',
    icon: Brain,
    title: 'Investigación Continua y Ciencia de Datos',
    subtitle: 'Conocimiento que impulsa decisión',
    body: [
      'La Inteligencia Artificial avanza a ritmos exponenciales, y nuestro compromiso es mantener a tu empresa a la vanguardia. Contamos con un laboratorio interno enfocado en la investigación constante de modelos de lenguaje, algoritmos de automatización y comportamiento cognitivo del usuario.',
      'No adivinamos qué funciona; analizamos datos reales y patrones de interacción para predecir cómo responderá el mercado a tu infraestructura digital.'
    ],
    tags: ['Modelos de Lenguaje', 'Automatización Inteligente', 'Análisis Predictivo', 'Comportamiento Cognitivo'],
    stat: { value: '24/7', label: 'Investigación activa' }
  },
  {
    id: 'implementacion',
    shortLabel: 'Implementación',
    label: 'Herramientas y Evolución',
    icon: Layers,
    title: 'Implementación y Evolución de Nuevas Herramientas',
    subtitle: 'Tecnología que se anticipa',
    body: [
      'No nos quedamos estáticos con tecnologías del pasado. Evaluamos, filtramos e implementamos de manera constante las herramientas más robustas y avanzadas del ecosistema global.',
      'Modificamos nuestro propio ecosistema técnico para absorber actualizaciones de código limpio, integraciones con inteligencias autónomas y sistemas de resiliencia algorítmica. Si una nueva tecnología puede hacer tu negocio un 1% más eficiente o seguro, ya la estamos probando para integrarla en tu suite.'
    ],
    tags: ['Evaluación Continua', 'Integración Estratégica', 'Resiliencia Algorítmica', 'Vanguardia Tecnológica'],
    stat: { value: '100+', label: 'Herramientas evaluadas' }
  },
  {
    id: 'factor-humano',
    shortLabel: 'Factor Humano',
    label: 'Diseño Centrado en Personas',
    icon: Heart,
    title: 'El Factor Humano: Verdadero Interés en tus Usuarios',
    subtitle: 'Tecnología con empatía',
    body: [
      'Aunque programamos código y automatizamos flujos con precisión robótica, nuestro objetivo final es profundamente humano. Nos obsesiona la experiencia real de las personas que interactúan con tu marca.',
      'Diseñamos interfaces eliminando la fricción y la confusión porque entendemos que detrás de cada pantalla hay un usuario que busca soluciones rápidas y claras. Tu éxito comercial radica en lo cómodo, respetado y guiado que se sienta tu cliente al conectar con tus canales.'
    ],
    tags: ['Experiencia de Usuario', 'Eliminación de Fricción', 'Diseño Centrado en Personas', 'Claridad Visual'],
    stat: { value: '100%', label: 'Enfoque humano' }
  }
];

/* ─── METHODOLOGY STEPS ───────────────────────────────────── */
const METHOD_STEPS = [
  { step: '01', title: 'Diagnóstico y Análisis', desc: 'Examinamos tu operación actual, identificamos cuellos de botella y oportunidades. Definimos objetivos medibles antes de escribir una línea de código.', icon: Search },
  { step: '02', title: 'Arquitectura y Desarrollo', desc: 'Construimos la infraestructura con tecnologías modulares que se integran a tus herramientas existentes. Cada componente está diseñado para evolucionar contigo.', icon: Code },
  { step: '03', title: 'Implementación y Optimización', desc: 'Desplegamos por fases, medimos resultados en tiempo real y ajustamos en ciclos cortos. No entregamos y desaparecemos; acompañamos tu operación.', icon: RefreshCw }
];

const bgUrl = getDistUrl('365/Gemini_Generated_Image_rocqilrocqilrocq.png');
const splitBgUrl = getDistUrl('365/Gemini_Generated_Image_d3dmj1d3dmj1d3dm-1.png');

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function QuienesSomosPage() {
  const [activeSection, setActiveSection] = useState('nucleo');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const sectionRefs = useRef({});

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`split-${id}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(`split-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // JSON-LD structured data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'websd-structured-data';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Soluciones Digitales IA",
      "url": window.location.origin,
      "description": "Estudio de ingeniería digital y arquitectura tecnológica. Investigación continua, herramientas de vanguardia y verdadero interés en los usuarios.",
      "foundingDate": "2022",
      "founder": { "@type": "Person", "name": "Antigravity" },
      "sameAs": ["https://wa.me/573115893220"],
      "knowsAbout": [
        "Ingeniería Digital", "Arquitectura Tecnológica", "Inteligencia Artificial",
        "Automatización", "Desarrollo Web", "Minería de Datos B2B",
        "IA Conversacional", "WhatsApp Automation"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Ingeniería Digital",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Desarrollo Web UX/UI" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Suite Conversacional con IA" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "WhatsApp Automation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Minería de Datos B2B" } }
        ]
      }
    });
    document.head.appendChild(script);
    return () => { const s = document.getElementById('websd-structured-data'); if (s) s.remove(); };
  }, []);

  return (
    <main className="relative w-full text-[#D7E2EA] font-sans overflow-x-clip" style={{ backgroundColor: '#0B0B0F' }} role="main" aria-label="Quiénes Somos">
      <a href="#nucleo" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#2962ff] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Saltar a contenido principal
      </a>
      <ScrollProgressBar />

      <Navbar activePage="quienes-somos" />

      {/* ════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ minHeight: '100dvh' }}>
        <div className="absolute inset-0" style={{ background: '#0B0B0F' }} />
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'contrast(1.05) brightness(0.85)' }}
        >
          <source src="https://res.cloudinary.com/ddp6ychwi/video/upload/v1/movimientos_naturales_y_armoni_online-video-cutter.com_ppvofn.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11,11,15,0.06) 30%, rgba(11,11,15,0.2) 60%, rgba(11,11,15,0.35) 85%, rgba(11,11,15,0.45) 100%)' }} />
        {/* Bottom fusion gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, #0B0B0F 0%, rgba(11,11,15,0.6) 40%, transparent 100%)' }} />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.35em] text-[#2962ff] mb-5 font-semibold"
          >
            El Núcleo de Nuestra Ingeniería
          </motion.p>
          <motion.h1
            variants={letterContainer}
            initial="hidden"
            animate="visible"
            className="hero-heading text-[clamp(2.5rem,10vw,100px)] font-black leading-[0.88] select-none"
          >
            {"QUIÉNES SOMOS".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                whileHover={{
                  scale: 1.2,
                  color: "#2962ff",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "2px #2962ff",
                  filter: "drop-shadow(0 0 14px rgba(41,98,255,0.9))",
                  transition: { duration: 0.12 }
                }}
                className="inline-block transition-all duration-300 origin-center"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <CTAButton label="Explorar" size="md" onClick={() => scrollToSection('nucleo')} />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-45 cursor-pointer hover:opacity-80 transition-opacity z-10"
          onClick={() => scrollToSection('nucleo')}
        >
          <span className="text-[8px] tracking-widest text-neutral-400 font-semibold uppercase">Deslizar</span>
          <ChevronDown size={14} className="text-[#2962ff]" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SPLIT-SCREEN SECTIONS
          ════════════════════════════════════════════════════════ */}
      <section id="split-content" className="relative z-20 flex flex-col md:flex-row scroll-mt-16" style={{ backgroundColor: '#0B0B0F' }}>

        {/* ── LEFT: STICKY NAV PANEL ─────────────────────────── */}
        <div className="md:sticky md:top-0 md:h-screen md:w-1/2 w-full relative overflow-hidden flex-shrink-0">
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url('${splitBgUrl}')`,
          }} />
          <div className="architectural-lines opacity-20" />
          <div className="orb-blob w-[300px] h-[300px] bg-sky-500/10" style={{ bottom: '-10%', left: '-10%', filter: 'blur(100px)' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full pt-14 md:pt-16 pb-10 px-6 md:px-10 lg:px-14">
            {/* Top: eyebrow + title */}
            <div className="mt-4 md:mt-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[9px] uppercase tracking-[0.35em] text-white mb-4 font-semibold"
              >
                Nuestras Dimensiones
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="hero-heading text-[clamp(1.8rem,4vw,48px)] font-black leading-[0.95] text-white"
              >
                Lo que nos
                <br />
                <span className="text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '1.5px rgba(14,165,233,0.8)' }}>
                  define
                </span>
              </motion.h2>
            </div>

            {/* Bottom: Nav buttons in glass box */}
            <div className="rounded-2xl p-3 md:p-4 border border-white/5" style={{ background: 'rgba(8,8,14,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
              <nav className="flex flex-col gap-1.5 md:gap-2" aria-label="Secciones">
                {SECTIONS.map((sec, i) => {
                  const isActive = activeSection === sec.id;
                  const Icon = sec.icon;
                  return (
                    <motion.button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-500 ${
                        isActive
                          ? 'text-white'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(41,98,255,0.18) 0%, rgba(14,165,233,0.06) 100%)'
                          : 'transparent'
                      }}
                    >
                      {/* Active indicator line - royal blue to cyan */}
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full"
                        style={{
                          background: isActive ? 'linear-gradient(180deg, #2962ff, #0ea5e9)' : 'none',
                          boxShadow: isActive ? '0 0 10px rgba(41,98,255,0.8), 0 0 10px rgba(14,165,233,0.4)' : 'none'
                        }}
                      />

                      {/* Icon container */}
                      <span className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isActive
                          ? 'neomorph-relief'
                          : 'neomorph-inset'
                      }`}>
                        <Icon size={16} className={`transition-colors duration-500 ${
                          isActive ? 'text-[#2962ff]' : 'text-neutral-500 group-hover:text-neutral-300'
                        }`} />
                      </span>

                      {/* Label */}
                      <span className="relative z-10 flex flex-col">
                        <span className={`text-[13px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${
                          isActive ? 'text-white' : 'text-neutral-400'
                        }`}>
                          {sec.shortLabel}
                        </span>
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${
                          isActive ? 'text-[#0ea5e9]' : 'text-neutral-600'
                        }`}>
                          {sec.label}
                        </span>
                      </span>

                      {/* Glow dot - cyan */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-glow"
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#0ea5e9]"
                          style={{ boxShadow: '0 0 8px rgba(14,165,233,0.9)' }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Decorative bottom bar */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                <div className="h-px flex-1 bg-gradient-to-r from-[#2962ff]/40 via-[#0ea5e9]/30 to-transparent" />
                <span className="text-[8px] tracking-[0.3em] text-neutral-600 font-mono uppercase">
                  {String(SECTIONS.findIndex(s => s.id === activeSection) + 1).padStart(2, '0')}/{String(SECTIONS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: SCROLLABLE CONTENT ──────────────────────── */}
        <div className="md:w-1/2 w-full relative z-10">
          {SECTIONS.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <section
                key={sec.id}
                id={`split-${sec.id}`}
                className="min-h-screen flex items-center py-20 md:py-24 px-6 md:px-10 lg:px-14 scroll-mt-24"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <SectionLabel text={sec.label} />

                  <div className="glass rounded-2xl p-6 sm:p-8 md:p-10">
                    {/* Header with icon */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl neomorph-relief flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-[#2962ff]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[clamp(1.3rem,3vw,32px)] font-display text-white leading-[1.15] mb-2">
                          {sec.title}
                        </h2>
                        <p className="text-[15px] uppercase tracking-[0.2em] text-[#0ea5e9]/80 font-bold">
                          {sec.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-[#2962ff]/20 via-white/5 to-transparent mb-6" />

                    {/* Body */}
                    <div className="flex flex-col gap-4 text-[15px] sm:text-base leading-relaxed text-neutral-400 mb-6">
                      {sec.body.map((p, i) => (
                        <AnimatedTextBlock key={i} text={p} className="leading-[1.9]" />
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {sec.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] uppercase tracking-widest text-neutral-500 px-3 py-1.5 rounded-lg border border-white/5 neomorph-inset"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stat highlight */}
                    <div className="neomorph-relief rounded-xl p-4 sm:p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl neomorph-inset flex items-center justify-center shrink-0">
                        <Target size={16} className="text-[#2962ff]" />
                      </div>
                      <div>
                        <span className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                          {sec.stat.value}
                        </span>
                        <span className="text-[10px] text-neutral-500 ml-2 uppercase tracking-wider">
                          {sec.stat.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section counter */}
                  <div className="flex items-center gap-4 mt-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#2962ff]/20 to-transparent" />
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-neutral-600 tracking-widest">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex gap-1.5">
                        {SECTIONS.map((s, j) => (
                          <span
                            key={s.id}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                              j === idx
                                ? 'bg-[#2962ff]'
                                : j < idx
                                  ? 'bg-white/20'
                                  : 'bg-white/5'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono text-neutral-600 tracking-widest">
                        {String(SECTIONS.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Transition spacer */}
      <div className="relative" style={{ background: '#0B0B0F' }}>
        <div className="glow-divider-thick" />
        <div className="glow-divider" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(14,165,233,0.03) 0%, transparent 50%, rgba(41,98,255,0.03) 100%)'
        }} />
      </div>

      {/* ════════════════════════════════════════════════════════
          SECTION: CÓMO TRABAJAMOS
          ════════════════════════════════════════════════════════ */}
      <ParallaxSection id="como-trabajamos" image={bgUrl} className="py-28 sm:py-36 md:py-44 px-5 sm:px-8 md:px-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionLabel text="Metodología" />
              <h2 className="hero-heading text-[clamp(2rem,7vw,70px)] font-black leading-none text-white">Cómo Trabajamos</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {METHOD_STEPS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.12}>
                <div className="flip-card group">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="flip-card-front-content">
                        <div>
                          <span className="font-black text-5xl text-white/10 select-none">{item.step}</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <item.icon size={18} className="text-[#0ea5e9]" />
                            <h3 className="font-bold text-xl text-white tracking-wide">{item.title}</h3>
                          </div>
                          <p className="text-xs leading-relaxed text-neutral-400">{item.desc.split('.')[0]}.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div className="flip-card-back-content">
                        <item.icon size={32} className="text-[#0ea5e9]" />
                        <p className="text-sm leading-relaxed text-neutral-300">{item.desc}</p>
                        <div className="w-8 h-px bg-gradient-to-r from-[#2962ff] to-[#0ea5e9]" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#0ea5e9] font-semibold">{item.step}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4} className="text-center mt-10">
            <CTAButton label="Agendar diagnóstico gratuito" size="md" />
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* Glow divider */}
      <div className="glow-divider" />

      {/* ════════════════════════════════════════════════════════
          SECTION: PERSPECTIVA
          ════════════════════════════════════════════════════════ */}
      <ParallaxSection id="perspectiva" className="py-32 sm:py-40 md:py-48 px-5 sm:px-8 md:px-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-10 sm:p-14 md:p-20 text-center relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#0ea5e9]/5 blur-[80px] pointer-events-none" />
              <Quote size={32} className="text-[#0ea5e9]/30 mx-auto mb-6" />
              <blockquote className="text-[22px] font-display text-white leading-[1.6] max-w-[700px] mx-auto">
                "La tecnología sin estrategia es solo ruido visual."
              </blockquote>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#2962ff] to-[#0ea5e9] to-transparent mx-auto my-6" />
              <p className="text-[18px] leading-relaxed text-neutral-400 max-w-[650px] mx-auto">
                A lo largo de nuestra trayectoria desarrollando arquitecturas complejas, hemos aprendido que las empresas no necesitan más herramientas para saturar sus pantallas; necesitan claridad. La automatización real no reemplaza la esencia de tu negocio, sino que la protege, dándote el control absoluto de tu tiempo y escalando tu alcance mientras tú te enfocas en las decisiones de alto nivel.
              </p>
              <FadeIn delay={0.3} y={16} className="mt-8">
                <CTAButton
                  label="Descubre cómo trabajamos"
                  size="md"
                  onClick={() => window.location.href = getFrontPageUrl()}
                />
              </FadeIn>
            </motion.div>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
