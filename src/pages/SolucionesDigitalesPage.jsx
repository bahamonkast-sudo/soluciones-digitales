import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SlideButton from '../components/SlideButton';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, Globe, MapPin, Sparkles } from 'lucide-react';
import TarjetaDigitalPage from '../components/digital-card/TarjetaDigitalPage';
import { getDistUrl } from '../utils/env';

/* ── Reveal Text ────────────────────────────────────────────── */
function RevealText({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Magnetic Button ─────────────────────────────────────────── */
function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) { setPos({ x: 0, y: 0 }); return; }
    const handleMouse = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isHovered]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={className}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  );
}

/* ── Section Wrapper: 3-column layout ────────────────────────── */
function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`w-full bg-white ${className}`}>
      <div className="max-w-[720px] mx-auto px-5 md:px-8">
        {children}
      </div>
    </section>
  );
}

/* ── Counter ────────────────────────────────────────────────── */
function Counter({ value }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const steps = 60;
    const interval = dur / steps;
    let i = 0;
    const t = setInterval(() => {
      i++;
      const p = i / steps;
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * num));
      if (i >= steps) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, [inView, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Feature Item ───────────────────────────────────────────── */
const featuresData = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: 'Foto / Logo VIP',
    desc: 'Imagen de alta resolución con tratamiento profesional para proyectar la mejor versión de tu marca o rostro.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Identidad Corporativa',
    desc: 'Colores, tipografía y estilo visual alineados con la identidad de tu negocio para generar reconocimiento inmediato.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Cargo Estratégico',
    desc: 'Título profesional y área de especialización visibles para que tus clientes sepan exactamente a quién contactan.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    title: 'Enlaces de Acción',
    desc: 'Botones directos a WhatsApp, llamada telefónica, email y sitio web. Un clic y la conexión es inmediata.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Mapa Integrado',
    desc: 'Ubicación geográfica incrustada para que tus clientes lleguen sin pérdida a tu oficina o punto de atención.'
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f51b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    title: 'Redes Sociales',
    desc: 'Instagram, Facebook, LinkedIn, YouTube y todas tus redes en un solo lugar. Tu ecosistema digital completo.'
  }
];

const profesionalesList = [
  'Agentes Inmobiliarios', 'Abogados y Consultores', 'Médicos y Especialistas',
  'Vendedores y Ejecutivos', 'Asesores de Seguros / Autos', 'Técnicos Especializados',
  'Freelancers y Creativos', 'Dueños de Negocios Locales'
];

const otrosList = ['Contadores', 'Arquitectos', 'Entrenadores Personales', 'Esteticistas', 'Fotógrafos', 'Psicólogos', 'Decoradores', 'Event Planner', 'Ingenieros'];

export default function SolucionesDigitalesPage() {
  const [showBusinessCard, setShowBusinessCard] = useState(false);
  const [lenisInst, setLenisInst] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    setLenisInst(lenis);
    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowBusinessCard(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showBusinessCard) {
      if (lenisInst) lenisInst.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenisInst) lenisInst.start();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showBusinessCard, lenisInst]);

  const openWa = useCallback((text) => {
    window.open(`https://wa.me/573115893220?text=${encodeURIComponent(text)}`, '_blank');
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white font-sans text-black">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
      <Navbar activePage="productos" />

      {/* ══════════════════════════════════════════════════════════
         HERO  -  Tarjeta Digital
         ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Background décor */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#f51b1b]/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full bg-[#2962ff]/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-16">
          {/* LEFT — copy */}
          <div>
            <RevealText>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f51b1b]/5 border border-[#f51b1b]/15 text-[#f51b1b] text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase mb-6">
                <Sparkles size={13} />
                Tarjeta Digital · 3 Modelos
              </div>
            </RevealText>

            <RevealText delay={0.05}>
              <h1 className="text-[clamp(2.4rem,7vw,4.6rem)] font-black text-black leading-[0.98] tracking-tight mb-5">
                Tu negocio, siempre
                <br />
                <span className="text-[#f51b1b]">al alcance de un toque.</span>
              </h1>
            </RevealText>

            <RevealText delay={0.1}>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-[480px] mb-8">
                Convierte tu tarjeta de presentación en una{' '}
                <strong className="text-black">experiencia digital</strong>: perfil, WhatsApp,
                redes, ubicación y llamada en un solo lugar. Siempre en el celular de tu cliente.
              </p>
            </RevealText>

            <RevealText delay={0.15}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <SlideButton
                  label="Activar mi tarjeta"
                  hoverLabel="Escríbenos por WhatsApp"
                  href="https://wa.me/573115893220?text=Hola%20Guillermo%2C%20quiero%20activar%20mi%20Tarjeta%20Digital%20de%20Negocios."
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MessageCircle}
                  width="100%"
                  className="w-full sm:w-auto"
                  color={{ start: '#f51b1b', end: '#c11213', circle: '#f51b1b' }}
                />
                <button
                  onClick={() => setShowBusinessCard(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-[15px] md:py-[15px] rounded-full border border-neutral-300 text-neutral-800 font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 hover:border-[#f51b1b] hover:text-[#f51b1b] hover:-translate-y-0.5 w-full sm:w-auto min-h-12"
                >
                  Ver tarjeta demo
                </button>
              </div>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-9 text-[11px] md:text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {['Pago único', 'Sin mensualidades', 'Instalación rápida'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f51b1b]" />
                    {t}
                  </span>
                ))}
              </div>
            </RevealText>
          </div>

          {/* RIGHT — phone mockup */}
          <div className="relative flex items-center justify-center" style={{ animation: 'float 5s ease-in-out infinite' }}>
            <div className="w-full max-w-[290px] sm:max-w-[330px] rounded-[2.8rem] bg-white p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              <div className="rounded-[2.2rem] bg-[#0b0a0e] overflow-hidden relative">
                {/* notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                <div className="pt-12 px-5 pb-6">
                  {/* avatar */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <span
                        className="absolute inset-0 rounded-full bg-[#f51b1b]/40"
                        style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                      />
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f51b1b] to-[#7c0a0b] flex items-center justify-center text-white font-black text-xl ring-4 ring-[#f51b1b]/20 shadow-lg">
                        GC
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-base">Guillermo Castellanos</h3>
                    <p className="text-neutral-500 text-[10px] mt-0.5 font-semibold uppercase tracking-wider mb-5">
                      Infraestructura Digital & Soluciones IA
                    </p>
                  </div>

                  {/* actions */}
                  <div className="space-y-2.5">
                    <a
                      href="https://wa.me/573115893220"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#25D366] text-[#050508] font-bold text-xs px-4 py-3 rounded-xl"
                    >
                      <MessageCircle size={16} />
                      WhatsApp me
                      <span className="ml-auto text-[9px] opacity-60 font-semibold uppercase tracking-wider">Disponible 24/7</span>
                    </a>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { icon: Phone, label: 'Llamar' },
                        { icon: Mail, label: 'Correo' },
                        { icon: Globe, label: 'Web' },
                      ].map(({ icon: Ic, label }) => (
                        <a
                          key={label}
                          href="https://wa.me/573115893220"
                          target="_blank" rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1.5 bg-white/[0.06] border border-white/10 text-neutral-300 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Ic size={16} />
                          <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
                        </a>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-3 rounded-xl">
                      <MapPin size={15} className="text-[#f51b1b] shrink-0" />
                      <span className="text-[10px] text-neutral-400">Bogotá, Colombia — 365 Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chip */}
            <div
              className="hidden sm:flex absolute -left-4 sm:-left-8 top-10 bg-white rounded-2xl px-4 py-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 flex items-center gap-3"
              style={{ animation: 'float 4s ease-in-out 0.6s infinite' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#f51b1b] relative">
                <span className="absolute inset-0 rounded-full bg-[#f51b1b]" style={{ animation: 'pulse-ring 1.8s ease-out infinite' }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-black uppercase tracking-wider">Respuesta rápida</p>
                <p className="text-[9px] text-neutral-500 font-medium">WhatsApp ATENC...</p>
              </div>
            </div>
            <div
              className="hidden sm:block absolute -right-2 sm:-right-6 bottom-12 bg-[#f51b1b] text-white rounded-xl px-4 py-3 shadow-[0_20px_40px_-12px_rgba(245,27,27,0.5)]"
              style={{ animation: 'float 4.5s ease-in-out 1.2s infinite' }}
            >
              <p className="text-[10px] font-black uppercase tracking-wider">$</p>
              <p className="text-[9px] font-semibold opacity-90">Pago único · 1 vez</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         FEATURES GRID
         ══════════════════════════════════════════════════════════ */}
      <Section className="pb-14 md:pb-20 relative z-10">
        <RevealText delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {featuresData.map((f, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(245,27,27,0.08)] hover:border-[#f51b1b]/30 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:border-[#f51b1b]/30">
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-black mb-1 group-hover:text-[#f51b1b] transition-colors">{f.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealText>
      </Section>

      {/* ══════════════════════════════════════════════════════════
         PRICING
         ══════════════════════════════════════════════════════════ */}
      <Section className="pb-14 md:pb-20">
        <RevealText>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-black leading-tight">
              Tres modelos, <span className="text-[#f51b1b]">un solo propósito</span>
            </h2>
            <p className="text-neutral-500 text-sm md:text-base mt-3">
              Pago único · De por vida · Diseño personalizado
            </p>
          </div>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              nombre: 'Básico',
              precio: '$280.000',
              url: 'tarjeta-digital.html',
              destacado: false,
              nota: 'Tu tarjeta de presentación digital lista en módulos esenciales.'
            },
            {
              nombre: 'Estándar',
              precio: '$360.000',
              url: 'vcard/index.html',
              destacado: true,
              nota: 'El portafolio corporativo completo con tu identidad integral.'
            },
            {
              nombre: 'Premium',
              precio: '$420.000',
              url: 'multidrink/index.html',
              destacado: false,
              nota: 'Experiencia full: tienda online con máximo 10 productos y pagos por WhatsApp o PSE.'
            }
          ].map((plan) => (
            <div
              key={plan.nombre}
              className={`relative flex flex-col h-full min-h-[320px] md:min-h-[360px] overflow-visible rounded-[24px] border p-6 md:p-8 text-center transition-all duration-500 hover:-translate-y-2 ${
                plan.destacado
                  ? 'bg-gradient-to-b from-white to-neutral-50 border-[#f51b1b]/40 shadow-[0_25px_50px_-15px_rgba(245,27,27,0.35)] pt-10 md:pt-11'
                  : 'bg-white border-neutral-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18)]'
              }`}
            >
                {plan.destacado && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#f51b1b] text-white text-[9px] font-black tracking-[0.2em] uppercase shadow-[0_8px_20px_rgba(245,27,27,0.45)] whitespace-nowrap z-10">
                    Recomendado
                  </div>
                )}
                <h3 className="text-sm font-black tracking-[0.25em] text-neutral-500 uppercase mb-3">{plan.nombre}</h3>
                <div className="text-[1.5rem] md:text-[1.75rem] font-black text-black mb-2 tracking-tight leading-none whitespace-nowrap">{plan.precio}</div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#f51b1b] uppercase mb-5">
                  Pago único · De por vida
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed flex-1 mb-6 max-w-full">{plan.nota}</p>
                <a
                  href={getDistUrl(plan.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                    plan.destacado
                      ? 'bg-[#f51b1b] text-white hover:bg-[#c11213]'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  Ver demo {plan.nombre}
                </a>
              </div>
          ))}
        </div>

        <RevealText delay={0.1}>
          <div className="mt-8 rounded-2xl bg-neutral-50 border border-neutral-200 p-6 text-center">
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              <strong className="text-black">Todos los modelos:</strong> pago único de por vida · no incluye hosting ni
              dominio · <strong className="text-black">mantenimiento gratuito los primeros 2 meses</strong> · diseño
              100% personalizado.
            </p>
          </div>
        </RevealText>
      </Section>

      {/* ══════════════════════════════════════════════════════════
         WHY INDISPENSABLE + AUDIENCE
         ══════════════════════════════════════════════════════════ */}
      <Section className="pb-14 md:pb-20">
        <div className="text-center mb-10">
          <RevealText>
            <h2 className="text-2xl md:text-4xl font-bold text-black leading-tight">
              ¿Por qué es <span className="text-[#f51b1b]">indispensable?</span>
            </h2>
          </RevealText>
        </div>

        <RevealText delay={0.05}>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 text-center max-w-[560px] mx-auto">
            En la era digital, el papel se pierde o se olvida. Tu Tarjeta Profesional de Negocios
            vive en el celular de tu cliente, lista para generar ventas en un clic.
          </p>
        </RevealText>

        <RevealText delay={0.1}>
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 mb-10 hover:bg-neutral-100 hover:shadow-md transition-all duration-300">
            <p className="text-neutral-700 text-sm leading-relaxed">
              <strong className="text-[#f51b1b]">Utilidad Estratégica:</strong> Elimina la fricción. Con un solo botón,
              tus clientes pueden llamarte, escribirte por WhatsApp, ver tus productos o seguirte en redes{' '}
              <strong>sin errores de digitación.</strong>
            </p>
          </div>
        </RevealText>

        <RevealText delay={0.15}>
          <h3 className="text-sm font-bold text-black text-center mb-5 tracking-wide">
            ¿A quiénes potencia esta herramienta?
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {profesionalesList.map((p, i) => (
              <span
                key={i}
                className="px-3.5 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 shadow-sm hover:bg-[#f51b1b] hover:text-white hover:border-[#f51b1b] transition-all duration-300 cursor-default hover:-translate-y-0.5"
              >
                {p}
              </span>
            ))}
          </div>
        </RevealText>

        <RevealText delay={0.2}>
          <div className="text-center">
            <p className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase mb-2">Y MUCHOS MÁS:</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{otrosList.join('  •  ')}</p>
          </div>
        </RevealText>
      </Section>

      {/* ══════════════════════════════════════════════════════════
         STATS BAND
         ══════════════════════════════════════════════════════════ */}
      <div className="w-full bg-black">
        <div className="max-w-[720px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { num: '94%', label: 'Primeras impresiones = diseño' },
              { num: '75%', label: 'Juzga credibilidad por web' },
              { num: '0.05s', label: 'Para formarse una opinión' },
              { num: '88%', label: 'No vuelve tras mala experiencia' },
            ].map((s, i) => (
              <div key={i} className="group cursor-default">
                <div className="text-3xl md:text-5xl font-black text-[#f51b1b] mb-1 group-hover:scale-110 group-hover:text-white transition-all duration-300 transform origin-center">
                  <Counter value={s.num} />
                </div>
                <p className="text-[10px] md:text-xs text-neutral-400 font-semibold leading-snug group-hover:text-neutral-300 transition-colors duration-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
         FINAL CTA
         ══════════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-28 text-center">
        <RevealText>
          <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-black text-black leading-[1.05] mb-5">
            El futuro de tu empresa <br className="hidden sm:block"/>no es manual,<br />
            <span className="text-[#f51b1b]">es automatizado.</span>
          </h2>
        </RevealText>

        <RevealText delay={0.08}>
          <p className="text-neutral-500 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Adquiere hoy la infraestructura que tu negocio necesita para escalar sin límites
            con nuestra instrucción experta.
          </p>
        </RevealText>

        <RevealText delay={0.12}>
          <MagneticButton>
            <SlideButton
              label="Contáctanos"
              hoverLabel="Escríbenos por WhatsApp"
              onClick={() => openWa('Hola, quiero conocer más sobre vuestra automatización e infraestructura')}
              width="100%"
              className="w-full sm:w-auto"
              color={{ start: '#f51b1b', end: '#c11213', circle: '#f51b1b' }}
            />
          </MagneticButton>
        </RevealText>

        <RevealText delay={0.16}>
          <p className="text-[11px] text-neutral-400 mt-4 font-medium">Instalación rápida + instrucción estratégica incluida</p>
        </RevealText>
      </Section>

      {/* ══════════════════════════════════════════════════════════
         FOOTER
         ══════════════════════════════════════════════════════════ */}
      <SiteFooter />

{/* ── FLOATING BUTTON: VER DEMO + OPCIONES ──────────────────── */}
      <div
        ref={menuRef}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex items-end gap-2"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <div className="relative">
          <AnimatePresence>
            {demoOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-0 mb-3 overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-[0_15px_40px_rgba(0,0,0,0.18)]"
              >
                {[
                  { nombre: 'Básico', precio: '$280.000', url: 'tarjeta-digital.html' },
                  { nombre: 'Estándar', precio: '$360.000', url: 'vcard/index.html' },
                  { nombre: 'Premium', precio: '$420.000', url: 'multidrink/index.html' }
                ].map((plan) => (
                  <a
                    key={plan.nombre}
                    href={getDistUrl(plan.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setTimeout(() => setDemoOpen(false), 300)}
                    className="w-64 flex items-center gap-3 px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#f51b1b] text-white flex items-center justify-center shrink-0 text-xs font-black">
                      {plan.nombre.charAt(0)}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black truncate">{plan.nombre}</span>
                        <span className="ml-auto text-[11px] font-bold text-[#f51b1b] whitespace-nowrap">{plan.precio}</span>
                      </span>
                      <span className="block text-[11px] text-neutral-500 truncate">
                        {plan.url === 'multidrink/index.html' ? '10 productos · WhatsApp o PSE' : 'Pago único · de por vida'}
                      </span>
                    </span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => { setDemoOpen((prev) => !prev); setMenuOpen(false); }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 bg-black text-white pl-5 pr-6 h-[52px] rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.35)] border border-neutral-700 hover:bg-[#f51b1b] hover:border-[#f51b1b] hover:shadow-[0_15px_40px_rgba(245,27,27,0.4)] hover:-translate-y-0.5 transition-all duration-300 group"
            aria-label="Ver demo"
          >
            <span className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">Ver demo</span>
          </motion.button>
        </div>

        <div className="relative">
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-full left-0 mb-3 overflow-hidden rounded-2xl bg-white border border-neutral-200 shadow-[0_15px_40px_rgba(0,0,0,0.18)]"
              >
                <a
                  href={getDistUrl('vcard/index.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setMenuOpen(false), 300)}
                  className="w-64 flex items-center gap-3 px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#f51b1b] text-white flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-black">Soluciones Digitales IA</span>
                    <span className="block text-[11px] text-neutral-500">Este sitio</span>
                  </span>
                </a>
                <a
                  href={getDistUrl('tarjeta-digital.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setMenuOpen(false), 300)}
                  className="w-64 flex items-center gap-3 px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-white border border-neutral-200 text-[#f51b1b] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-black">Tarjeta Digital Demo</span>
                    <span className="block text-[11px] text-neutral-500">Ver demo en vivo</span>
                  </span>
                </a>
                <a
                  href={getDistUrl('multidrink/index.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setMenuOpen(false), 300)}
                  className="w-64 flex items-center gap-3 px-4 py-3.5 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-black">Multidrink</span>
                    <span className="block text-[11px] text-neutral-500">Ir al sitio externo</span>
                  </span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => { setMenuOpen((prev) => !prev); setDemoOpen(false); }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-[52px] h-[52px] bg-white text-black rounded-full flex items-center justify-center shadow-[0_12px_35px_rgba(0,0,0,0.25)] border border-neutral-300 hover:bg-neutral-50 hover:text-[#f51b1b] hover:border-[#f51b1b] hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Más opciones"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300"
              style={{ transform: menuOpen ? 'rotate(180deg)' : 'none' }}
            >
              <circle cx="12" cy="12" r="3"/><path d="M12 5V3"/><path d="M12 21v-2"/><path d="M5 12H3"/><path d="M21 12h-2"/>
            </svg>
          </motion.button>
        </div>
      </div>
      {/* ── BUSINESS CARD MODAL ──────────────────────────────── */}
      <AnimatePresence>
        {showBusinessCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black overflow-y-auto"
            data-lenis-prevent="true"
          >
            <TarjetaDigitalPage onClose={() => setShowBusinessCard(false)} isModal={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
