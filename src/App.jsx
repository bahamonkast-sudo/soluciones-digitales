import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  CheckCircle2, ChevronDown, User, Phone, Edit3, Search, Code,
  Facebook, Twitter, Youtube, Instagram, ArrowRight, Zap, Globe, MessageCircle, Database, MessageSquare, X,
  CreditCard, Download, Mail, Smartphone, Layers, Sparkles, Target, TrendingUp
} from 'lucide-react';

import Navbar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import ActivityMonitor from './components/ActivityMonitor';
import { pushGlobalLog } from './hooks/useNetworkStatus';
import { WEBGOBOT_URL, getDistUrl, getPageUrl } from './utils/env';
import SEO from './components/SEO';
import { SEO_CONFIG } from './config/seoConfig';
import ChatBotBrochure from './components/ChatBotBrochure';
import caseWhatsapp from './assets/case-whatsapp.webp';
import caseB2bMining from './assets/case-b2b-mining.webp';
import caseWebUx from './assets/case-web-ux.webp';

// ─── MARQUEE GIF IMAGES ─────────────────────────────────────────
const GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-digital-epoch-preview-B85ezqXO.gif'
];

const HERO_PORTRAIT = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

// ─── REUSABLE COMPONENTS ────────────────────────────────────────

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollTop}
          aria-label="Subir al inicio"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', damping: 14, stiffness: 220 }}
          className="fixed bottom-24 right-7 z-[70] w-12 h-12 rounded-2xl flex items-center justify-center text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(41,98,255,0.35), rgba(41,98,255,0.15))',
            border: '1px solid rgba(41,98,255,0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 0 24px rgba(41,98,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <ChevronDown size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function Magnet({ children, padding = 150, strength = 3, className = "" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState("transform 0.6s ease-in-out");

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.hypot(dx, dy);
    if (distance < padding) {
      setTransition("transform 0.3s ease-out");
      setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0px)`);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setTransition("transform 0.6s ease-in-out");
    setTransform("translate3d(0px, 0px, 0px)");
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} onMouseLeave={handleMouseLeave} className={className} style={{ transform, transition, willChange: 'transform' }}>
      {children}
    </div>
  );
}

function AnimatedText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] });
  const words = text.split(" ");

  const opacities = words.map((_, index) => {
    const start = index / words.length;
    const end = (index + 1) / words.length;
    return useTransform(scrollYProgress, [start, end], [0.15, 1]);
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block mr-[0.3em] last:mr-0">
          <motion.span style={{ opacity: opacities[index] }}>{word}</motion.span>
        </span>
      ))}
    </p>
  );
}

// Premium CTA Button
function CTAButton({ label = "Acción", onClick, href, size = "md" }) {
  const sizes = {
    sm: "px-6 py-2.5 text-[11px]",
    md: "px-6 py-3 text-[10.5px] whitespace-nowrap sm:px-10 sm:py-4 sm:text-sm",
    lg: "px-10 py-4 sm:px-14 sm:py-5 text-sm sm:text-base"
  };
  const [ripples, setRipples] = useState([]);

  const arrow = (
    <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="currentColor"></path>
        <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="currentColor"></path>
        <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="currentColor"></path>
      </g>
    </svg>
  );

  const shared = {
    onClick: (e) => {
      if (e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter(r => r.id !== id));
        }, 600);
      }
      if (onClick) onClick(e);
    },
    whileHover: {
      y: -3,
      scale: 1.02
    },
    whileTap: {
      y: 1,
      scale: 0.97
    }
  };

  const ripplesEl = ripples.map((ripple) => (
    <span
      key={ripple.id}
      style={{
        position: 'absolute',
        left: ripple.x,
        top: ripple.y,
        transform: 'translate(-50%, -50%)',
        width: '10px',
        height: '10px',
        background: 'rgba(255, 255, 255, 0.35)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'ripple-expand 0.6s ease-out',
        zIndex: 2
      }}
    />
  ));

  const inner = (
    <>
      {ripplesEl}
      <span>{label}</span>
      {arrow}
    </>
  );

  if (href) {
    return (
      <motion.a href={href} className={`cta ${sizes[size]}`} {...shared}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={`cta ${sizes[size]}`} {...shared}>
      {inner}
    </motion.button>
  );
}

// ─── SCROLL PROGRESS BAR ────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #1532cb 0%, #2962ff 50%, #4d7fff 100%)',
        boxShadow: '0 0 8px rgba(41,98,255,0.9), 0 0 16px rgba(41,98,255,0.4)',
        zIndex: 9999,
      }}
    />
  );
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(41,98,255,0.3)]"
      animate={{
        x: position.x - (isHovering ? 32 : 8),
        y: position.y - (isHovering ? 32 : 8),
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        backgroundColor: isHovering ? 'rgba(41,98,255,0.65)' : 'rgba(255,255,255,0.8)',
        backdropFilter: isHovering ? 'blur(4px)' : 'none',
        WebkitBackdropFilter: isHovering ? 'blur(4px)' : 'none',
        mixBlendMode: isHovering ? 'normal' : 'difference'
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[8px] font-black text-white/90 uppercase tracking-widest text-center leading-tight drop-shadow-md"
          >
            Clic<br/>aquí
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
// ─── ANIMATED COUNTER ────────────────────────────────────────────
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('');
  const [triggered, setTriggered] = useState(false);

  // Parse: prefix (+ or -), number, suffix (%)
  const prefix = value.startsWith('+') ? '+' : value.startsWith('-') ? '-' : '';
  const suffix = value.endsWith('%') ? '%' : value.endsWith('k') ? 'k' : '';
  const raw = value.replace(/[+\-k%]/g, '');
  const num = parseFloat(raw);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1400;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;
    setDisplay(`${prefix}0${suffix}`);
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * num * 10) / 10;
      setDisplay(`${prefix}${suffix === 'k' ? val.toFixed(val % 1 ? 1 : 0) : Math.round(val)}${suffix}`);
      if (current >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [triggered]);

  return <span ref={ref}>{display || `${prefix}0${suffix}`}</span>;
}

// ─── NOSOTROS VARIANTS ───────────────────────────────────────────
const nosotrosContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } }
};
const nosotrosLetterVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.75 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 10, stiffness: 140 } }
};

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('websd-cookie-consent');
  });
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return !localStorage.getItem('websd-cookie-consent');
  });

  const acceptCookies = () => {
    localStorage.setItem('websd-cookie-consent', 'accepted');
    setCookieConsent('accepted');
    setShowCookieBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('websd-cookie-consent', 'rejected');
    setCookieConsent('rejected');
    setShowCookieBanner(false);
  };

  const videoRef = useRef(null);
  const videoPlayCount = useRef(0);
  const handleVideoEnded = () => {
    videoPlayCount.current += 1;
    if (videoPlayCount.current >= 2) return;
    videoRef.current?.play();
  };

  // Typewriter and Sound
  const [line, setLine] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    const text = "SOLUCIONES\nDIGITALES IA";
    let index = 0;
    let active = true;
    setLine("");

    const playTypingSound = () => {
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        // Small sci-fi typing click
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'square';
        // Random frequency for mechanical feel
        osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch (e) {}
    };

    const type = () => {
      if (!active) return;
      if (index <= text.length) {
        if (index < text.length) {
          const char = text[index];
          if (char !== ' ' && char !== '\n') {
            playTypingSound();
          }
        }
        setLine(text.slice(0, index));
        index++;
        // Slight randomization in typing speed for realism
        const nextDelay = Math.random() * 30 + 10;
        setTimeout(type, nextDelay);
      }
    };
    const t = setTimeout(type, 300);
    return () => { active = false; clearTimeout(t); };
  }, []);

  // Navigation activity logger (section visibility)
  const navSections = ['inicio', 'quienes-somos', 'productos', 'casos', 'registro'];
  useEffect(() => {
    const sectionLog = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !sectionLog.has(entry.target.id)) {
          sectionLog.add(entry.target.id);
          pushGlobalLog({ type: 'navigation', message: `Sección visible: ${entry.target.id}`, status: 'visible' });
        }
      });
    }, { threshold: 0.3 });

    navSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when chatbot or modals are open
  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [chatOpen]);

  // Listen for closeChat from legacy chat widget (no longer used, kept for safety)
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data === 'closeChat') {
        setChatOpen(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Form
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Marquee
  const marqueeRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!marqueeRef.current) return;
      const rect = marqueeRef.current.getBoundingClientRect();
      const offset = (window.scrollY - (rect.top + window.scrollY) + window.innerHeight) * 0.28;
      setScrollOffset(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !whatsapp.trim() || !mensaje.trim()) return;
    setLoading(true);
    const textMsg = `Quiero coordinar una sesión.\n\n*Nombre:* ${nombre.trim()}\n*WhatsApp de contacto:* ${whatsapp.trim()}\n*Detalles del negocio:* ${mensaje.trim()}`;
    window.open(`https://wa.me/573115893220?text=${encodeURIComponent(textMsg)}`, '_blank');
    setLoading(false);
    setFormSent(true);
    setNombre(''); setWhatsapp(''); setMensaje('');
  };

  // Sticky stacking
  const projectContainerRef = useRef(null);

  const productsList = [
    { num: "01", icon: Globe, name: "Desarrollo Web UX/UI", desc: "Ingeniería de alto rendimiento que transforma la información de tu negocio en entornos digitales impecables: rápidos, claros y que convierten." },
    { num: "02", icon: MessageCircle, name: "Suite Conversacional con IA", desc: "Un agente artificial que comprende lenguaje natural, escucha notas de voz y responde con la fluidez de tu mejor empleado. Disponibilidad 24/7." },
    { num: "03", icon: Zap, name: "WhatsApp Automation", desc: "Infraestructura que escala y prospeta emulando comportamiento humano —con delays y pausas— para proteger tus líneas y maximizar el alcance." },
    { num: "04", icon: Database, name: "Minería de Datos B2B", desc: "Descubrimiento automatizado de oportunidades comerciales. Recopila registros públicos en tiempo real por nicho y zona geográfica." },
    { num: "05", icon: CreditCard, name: "Tarjeta Digital Profesional", desc: "Sustituye el papel por una experiencia interactiva que guarda tus datos directamente en la agenda de tus clientes." }
  ];

  const projectsData = [
    {
      num: "01",
      category: "Artículos Promocionales",
      name: "Dey Mercadeo Eficiente",
      challenge: "El portafolio de artículos promocionales se manejaba con catálogos físicos y cotizaciones por correo: los pedidos tardaban días y los clientes se perdían por falta de seguimiento inmediato.",
      solution: "Creamos una tienda web con cotizador en línea y un agente de WhatsApp que toma pedidos, confirma inventario y da seguimiento automático hasta la entrega.",
      metricValue: "+52%",
      metricLabel: "Ventas recurrentes recuperadas con respuesta inmediata",
      progress: 30,
      progressLabel: "Automatización de pedidos",
      img: caseWebUx
    },
    {
      num: "02",
      category: "Educación",
      name: "Bright English Academy",
      challenge: "La matrícula era presencial y caótica en temporada alta: por la gran afluencia de interesados, las familias hacían fila y el instituto perdía muchas consultas digitales que llegaban por redes.",
      solution: "Implementamos un embudo digital con web explicativa, examen de nivel en línea y un agente de IA que agenda reservas de clase y responde por WhatsApp las 24 horas.",
      metricValue: "+38%",
      metricLabel: "Matrículas nuevas gestionadas desde el canal digital",
      progress: 45,
      progressLabel: "Captación por canal digital",
      img: caseWhatsapp
    },
    {
      num: "03",
      category: "Servicios Jurídicos",
      name: "Bufete Luis Muñoz",
      challenge: "El abogado atendía consultas por teléfono a cualquier hora y sin registro, generando una agenda caótica y perdiendo casos nuevos por falta de calificación de urgencia.",
      solution: "Diseñamos su web institucional con evaluación de consultas por WhatsApp y agenda automática que clasifica cada caso por urgencia para optimizar las horas facturables.",
      metricValue: "2x",
      metricLabel: "Consultas atendidas con más horas facturables al mes",
      progress: 60,
      progressLabel: "Optimización de agenda",
      img: caseB2bMining
    }
  ];

  const navLinks = [
    { label: 'Nosotros', href: '#quienes-somos' },
    { label: 'Servicios', href: '#productos' },
    { label: 'Casos', href: '#casos' },
    { label: 'Contacto', href: '#registro' },
  ];

  const whatsappContacts = [
    { label: 'Ventas', number: '573138137910', msg: 'Hola, quiero información sobre sus servicios digitales' },
    { label: 'Soporte', number: '573115893220', msg: 'Hola, requiero soporte' },
    { label: 'Atención al Usuario', number: '573206972677', msg: 'Hola, necesito atención al usuario' }
  ];

  return (
    <main className="relative w-full text-[#D7E2EA] font-sans pb-20 overflow-x-clip" style={{ backgroundColor: '#0B0B0F' }}>
      <SEO {...SEO_CONFIG.home} structuredData={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Soluciones Digitales IA",
        "url": window.location.origin
      }} />

      {/* ── GLOBAL EFFECTS ──────────────────────────────────────── */}
      <CustomCursor />
      <ScrollProgressBar />

      {/* ── RIGHT FLOATING BUTTONS (Chat) ──────────── */}
      <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-center gap-3">

        {/* Chat Button */}
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#2962ff] shadow-[0_10px_25px_rgba(41,98,255,0.45)] cursor-pointer relative"
          style={{
            background: 'linear-gradient(135deg, #2962ff 0%, #1532cb 100%)',
          }}
        >
          {chatOpen ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
          <span className="absolute -top-1 -right-1 bg-amber-400 text-[#0B0B0F] font-black text-[9px] px-1.5 py-0.5 rounded-full tracking-wider border border-[#0B0B0F]">
            IA
          </span>
        </motion.button>
      </div>

      {/* ── WHATSAPP FLOATING BUTTON WITH CONTACT PICKER ──────────── */}
      <div className="fixed bottom-6 left-6 z-[120] flex flex-col items-start gap-3">
        {/* Contact popup */}
        <AnimatePresence>
          {whatsappOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-[240px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              style={{ background: 'rgba(11,11,15,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            >
              <div className="px-4 py-3 border-b border-white/5">
                <span className="text-[9px] tracking-[0.25em] uppercase text-emerald-400 font-semibold">Elige un destino</span>
              </div>
              <div className="flex flex-col">
                {whatsappContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={`https://wa.me/${contact.number}?text=${encodeURIComponent(contact.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 border-b border-white/5 last:border-b-0"
                    onClick={() => setWhatsappOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-emerald-500/30" style={{ background: 'rgba(16,185,129,0.1)' }}>
                      <MessageCircle size={12} className="text-emerald-400" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-white tracking-wide">{contact.label}</span>
                      <span className="text-[9px] text-neutral-500 tracking-wider">{contact.number.replace('57', '+57 ').replace('(', '').replace(')', '')}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating button */}
        <button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-[0_10px_25px_rgba(16,185,129,0.45)] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          }}
        >
          <MessageCircle size={20} className="text-white" />
        </button>
      </div>

      {/* ── BOTWEB SLIDE OVER DRAWER ──────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <>
            {/* Backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-[#000] z-40 cursor-pointer"
            />
            {/* Chat container panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed inset-0 h-full w-full bg-[#0F0F12] z-50 flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.95)]"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#13131b]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2962ff] animate-pulse" />
                  <span className="font-bold text-sm tracking-wide text-white">Asistente Virtual</span>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat container */}
              <div className="flex-1 min-h-0 bg-[#090910] relative overflow-hidden">
                <ChatBotBrochure onClose={() => setChatOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── COOKIE CONSENT BANNER ───────────────────────────────────── */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[115] p-4 sm:p-5 sm:pb-6 pb-[110px]"
          >
            <div className="max-w-7xl mx-auto neomorph-relief rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <p className="text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                  Usamos cookies y tecnologías similares para mejorar tu experiencia, analizar tráfico y personalizar contenido.
                  Al hacer clic en "Aceptar", consientes su uso. Puedes personalizar o rechazar en cualquier momento desde nuestra{' '}
                  <button onClick={() => { window.dispatchEvent(new CustomEvent('websd:openLegalModal', { detail: 'cookiePolicy' })); setShowCookieBanner(false); }} className="text-[#2962ff] underline hover:no-underline">
                    Política de Cookies
                  </button>
                  . Consulta nuestra{' '}
                  <button onClick={() => { window.dispatchEvent(new CustomEvent('websd:openLegalModal', { detail: 'dataPolicy' })); setShowCookieBanner(false); }} className="text-[#2962ff] underline hover:no-underline">
                    Política de Datos
                  </button>
                  .
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={rejectCookies}
                  className="px-4 py-2 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-5 py-2 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider text-white font-semibold border border-[#2962ff] bg-[#2962ff]/10 hover:bg-[#2962ff]/20 transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>




      <Navbar activePage="home" />

      {/* ── HERO SECTION (No spaces at the top) ────────────────────────── */}
      <section id="inicio" className="min-h-[100dvh] w-full relative flex flex-col justify-between overflow-x-clip z-10 pb-10 pt-0 wp-full-breakout">

        {/* Ambient halos for more light */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#2962ff]/20 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[150px] pointer-events-none" />
        <div className="architectural-lines" />

        {/* Full-width background video with dark overlay and bottom blend mask */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0" style={{ minHeight: '100dvh' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover opacity-100 filter contrast-110 brightness-125"
            style={{ width: '100%', height: '100dvh' }}
          >
            <source
              src={getDistUrl('365/el_robot_esta_teclenado_sobre.mp4')}
              type="video/mp4"
            />
          </video>
          {/* Subtle gradient overlay to fade edges and ensure legibility, with strong bottom blend to page background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/20 to-[#0B0B0F] opacity-100" />
        </div>

        {/* Hero Heading - Pushed down below the robot's face */}
        <div className="w-full flex flex-col items-center justify-start relative px-4 md:px-8 overflow-visible mt-[32vh] md:mt-[40vh]" style={{ zIndex: 30 }}>
          <div className="w-full text-center">
            <h1 className="hero-heading text-[clamp(2.3rem,12vw,5.5rem)] sm:text-[clamp(2.6rem,11vw,6rem)] md:text-[clamp(3rem,10.5vw,7rem)] font-black uppercase tracking-tighter leading-[0.82] w-full select-none break-words">
              {line ? (
                line.split("\n").map((lineText, idx, arr) => {
                  const isLastLine = idx === arr.length - 1;
                  let prevLength = 0;
                  for (let i = 0; i < idx; i++) prevLength += arr[i].length + 1;
                  return (
                    <React.Fragment key={idx}>
                      {idx > 0 && <br />}
                      <span className={`relative inline-block ${isLastLine && showCursor ? 'hero-cursor pr-1' : ''}`}>
                        {lineText.split("").map((char, charIdx) => {
                          const globalIdx = prevLength + charIdx;
                          const isIA = globalIdx >= 21;
                          
                          if (isIA) {
                            return (
                              <span 
                                key={charIdx} 
                                className="inline-block" 
                                style={{ 
                                  color: '#2962ff',
                                  WebkitTextFillColor: '#2962ff',
                                  filter: 'drop-shadow(0 0 18px rgba(41,98,255,0.9))'
                                }}
                              >
                                {char === " " ? "\u00A0" : char}
                              </span>
                            );
                          }

                          // SOLUCIONES DIGITALES - Solid with border + shadow
                          return (
                            <span 
                              key={charIdx} 
                              className="inline-block"
                              style={{ 
                                color: '#ffffff',
                                WebkitTextFillColor: '#ffffff',
                                WebkitTextStroke: '4px #ffffff',
                                textShadow: '0 0 8px rgba(0,0,0,0.9)',
                                display: 'inline-block',
                              }}
                            >
                              {char === " " ? <span style={{ display: 'inline-block', width: '0.6em' }}>&nbsp;</span> : char}
                            </span>
                          );
                        })}
                      </span>
                    </React.Fragment>
                  );
                })
              ) : (
                <span>
                  SOLUCIONES<br />
                  DIGITALES <span className="text-transparent" style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px #2962ff', filter: 'drop-shadow(0 0 10px rgba(41,98,255,1))' }}>IA</span>
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Bottom Bar: Value proposition pushed down */}
        <div className="px-6 md:px-12 flex flex-col items-center justify-center z-10 w-full gap-8 relative pb-12 md:pb-16 mt-[12vh] md:mt-[15vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[780px] group"
          >
            {/* Sombra Cyan */}
            <div className="absolute -inset-[1px] bg-cyan-500 rounded-2xl opacity-10 blur-md group-hover:opacity-30 transition duration-700"></div>
            
            {/* Main Card */}
            <div 
              className="relative p-4 md:p-5 rounded-2xl border border-white/10 text-center flex items-center justify-center"
              style={{ 
                background: 'rgba(11, 11, 15, 0.55)', 
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
              }}
            >
              <p 
                className="font-light tracking-wide leading-relaxed text-neutral-300 mx-auto max-w-[700px]" 
                style={{ fontSize: '15px', fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
              >
                <strong className="text-white font-black uppercase tracking-wider mr-1">Cero Plantillas.</strong>
                <strong className="text-cyan-400 font-bold uppercase tracking-wider mr-2">100% Libertad Creativa.</strong> 
                Dominamos el código desde cero para construir entornos digitales que se adaptan exactamente a la identidad de tu marca, sin limitaciones. <strong className="text-cyan-400 font-semibold">Si puedes imaginarlo, podemos programarlo.</strong>
              </p>
            </div>
          </motion.div>
          
          <FadeIn delay={0.5} y={20} className="flex flex-col items-center gap-6 self-center md:self-end">
            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="hidden sm:flex flex-col items-center gap-1 opacity-45 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => document.getElementById('quienes-somos').scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-[9px] tracking-widest text-neutral-400 font-semibold uppercase">Deslizar</span>
              <ChevronDown size={14} className="text-[#2962ff]" />
            </motion.div>
          </FadeIn>
        </div>

      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────── */}
      <section ref={marqueeRef} className="pt-20 sm:pt-28 pb-8 overflow-hidden relative z-10" style={{ backgroundColor: '#0B0B0F' }}>
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 z-10" style={{ background: 'linear-gradient(90deg, #0B0B0F 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-32 z-10" style={{ background: 'linear-gradient(-90deg, #0B0B0F 0%, transparent 100%)' }} />

        <div className="flex gap-3 mb-3 whitespace-nowrap transition-transform duration-100 ease-out" style={{ transform: `translateX(${scrollOffset - 300}px)`, willChange: 'transform' }}>
          {[...GIFS.slice(0, 11), ...GIFS.slice(0, 11), ...GIFS.slice(0, 11)].map((gif, idx) => (
            <img key={idx} src={gif} loading="lazy" alt="" className="w-[380px] h-[240px] rounded-2xl object-cover shrink-0 filter grayscale brightness-60 hover:grayscale-0 hover:brightness-90 transition-all duration-500" />
          ))}
        </div>
        <div className="flex gap-3 whitespace-nowrap transition-transform duration-100 ease-out" style={{ transform: `translateX(${-(scrollOffset - 300)}px)`, willChange: 'transform' }}>
          {[...GIFS.slice(11), ...GIFS.slice(11), ...GIFS.slice(11)].map((gif, idx) => (
            <img key={idx} src={gif} loading="lazy" alt="" className="w-[380px] h-[240px] rounded-2xl object-cover shrink-0 filter grayscale brightness-60 hover:grayscale-0 hover:brightness-90 transition-all duration-500" />
          ))}
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-divider my-0" />

      {/* ── NOSOTROS (REDESIGNED) ────────────────────────────────────────────── */}
      <section id="quienes-somos" className="relative z-20 py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 overflow-hidden" style={{ backgroundColor: '#0B0B0F' }}>
        
        {/* Dynamic Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#2962ff]/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="architectural-lines opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Bold Statement */}
          <div className="flex-1 flex flex-col gap-8 w-full">
            <FadeIn>
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[#2962ff]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#2962ff] font-bold">Nuestra Identidad</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.05] tracking-tight">
                No hacemos webs.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                  Construimos ecosistemas de conversión.
                </span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl">
                Dejamos atrás las vitrinas estáticas y el diseño sin propósito. Implementamos sistemas autónomos de prospección, atención multicanal y estrategias persuasivas diseñadas exclusivamente para una sola cosa: escalar tus ventas y dominar tu nicho sin multiplicar tu carga operativa.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="pt-2">
              <CTAButton
                label="Conoce nuestra historia"
                size="md"
                onClick={() => window.location.href = getPageUrl('quienes-somos')}
              />
            </FadeIn>
          </div>

          {/* Right Column: Pillars / Bento layout */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {/* Center glow for the grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#2962ff]/10 blur-[80px] pointer-events-none rounded-full" />
            
            <FadeIn delay={0.4} className="sm:mt-12">
              <div className="hud-identidad rounded-3xl p-8 flex flex-col gap-5 h-full relative group transition-all duration-300 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#2962ff] group-hover:bg-[#2962ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,98,255,0.5)] transition-all duration-300">
                  <Layers size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">Arquitectura</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">Sistemas modulares escalables que crecen al mismo ritmo que tu demanda comercial.</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <div className="hud-identidad rounded-3xl p-8 flex flex-col gap-5 h-full relative group transition-all duration-300 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#2962ff] group-hover:bg-[#2962ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,98,255,0.5)] transition-all duration-300">
                  <Sparkles size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">Inteligencia Artificial</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">Automatización de prospección y atención 24/7 sin depender de intervención humana.</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6} className="sm:col-span-2">
              <div className="hud-identidad rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative group transition-all duration-300 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-[#2962ff] group-hover:bg-[#2962ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,98,255,0.5)] transition-all duration-300 shrink-0">
                  <Target size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">Ecosistema Modular</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">Cada aplicación está diseñada para funcionar sola o en conjunto. Sin paquetes obligatorios, sin compromisos. Reconoces tu etapa del proceso, eliges la herramienta que la resuelve y la integras a tu flujo de trabajo existente.</p>
                </div>
              </div>
            </FadeIn>
          </div>
          
        </div>
      </section>

      {/* ── PROCESO ─────────────────────────────────────────────── */}
      <section id="proceso" className="relative z-20 py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
          backgroundImage: `url('${getDistUrl('365/Gemini_Generated_Image_rocqilrocqilrocq.png')}')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'contrast(1.25) brightness(0.65)'
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{ 
          background: 'rgba(11,11,15,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }} />
        <div className="orb-blob w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-600/10" style={{ top: '20%', right: '-10%' }} />
        <div className="architectural-lines opacity-30" />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-16">
          <div className="hud-section">
            <FadeIn className="hud-container">
              <span className="hud-subtitle">Metodología</span>
              <h2 className="hud-title">Cómo trabajamos</h2>

              <div className="hud-grid">
                <FadeIn delay={0.1}>
                  <div className="hud-panel">
                    <span className="hud-frame">
                      <i className="hud-line hud-line--t" />
                      <i className="hud-line hud-line--r" />
                      <i className="hud-line hud-line--b" />
                      <i className="hud-line hud-line--l" />
                    </span>
                    <span className="hud-step">01</span>
                    <span className="hud-icon"><Search size={24} /></span>
                    <h3 className="hud-card-title">Diagnóstico</h3>
                    <p className="hud-card-text">Analizamos tu situación actual, identificamos oportunidades de mejora y definimos juntos el alcance del proyecto.</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="hud-panel active">
                    <span className="hud-frame">
                      <i className="hud-line hud-line--t" />
                      <i className="hud-line hud-line--r" />
                      <i className="hud-line hud-line--b" />
                      <i className="hud-line hud-line--l" />
                    </span>
                    <span className="hud-step">02</span>
                    <span className="hud-icon"><Edit3 size={24} /></span>
                    <h3 className="hud-card-title">Diseño</h3>
                    <p className="hud-card-text">Diseñamos la solución a tu medida: arquitectura, flujos, interfaces y experiencia de usuario centrada en resultados.</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <div className="hud-panel">
                    <span className="hud-frame">
                      <i className="hud-line hud-line--t" />
                      <i className="hud-line hud-line--r" />
                      <i className="hud-line hud-line--b" />
                      <i className="hud-line hud-line--l" />
                    </span>
                    <span className="hud-step">03</span>
                    <span className="hud-icon"><Code size={24} /></span>
                    <h3 className="hud-card-title">Implementación</h3>
                    <p className="hud-card-text">Construimos por fases, probamos cada módulo y lanzamos garantizando el resultado prometido con métricas medibles.</p>
                  </div>
                </FadeIn>
              </div>

              <span className="hud-footer-text">De principio a fin</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS ───────────────────────────────────────────── */}
      <section id="productos" className="relative z-20 py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 overflow-hidden" style={{ backgroundColor: '#0B0B0F' }}>
        {/* Animated Background Blob */}
        <div className="orb-blob w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-cyan-500/05" style={{ bottom: '-10%', left: '-15%', filter: 'blur(130px)' }} />
        <div className="architectural-lines opacity-50" />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-16 sm:gap-20 md:gap-24">

          <FadeIn delay={0} className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2962ff] mb-4 font-semibold">Nuestros servicios</p>
            <h2 className="productos-heading text-[clamp(2.5rem,8vw,85px)] leading-none">
              Productos
            </h2>
          </FadeIn>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">
            
            {/* Bento Card 1: Web Dev UX/UI (Col span 4, Row span 2) */}
            <FadeIn delay={0.1} className="md:col-span-4 md:row-span-2">
              <motion.a
                href={getPageUrl('sitios-web')}
                className="product-glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-full group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: "0 0 20px rgba(0,255,255,0.04), 0 24px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)", borderColor: "rgba(0,255,255,0.16)" },
                  hover: { y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.95), 0 0 0 2px rgba(0,255,255,0.45), 0 0 40px rgba(0,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(0,255,255,0.6)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                }}>
                <span className="card-shimmer" />
                
                {/* Hyper-realistic Background Image Layer */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundImage: `url(${getDistUrl('web_dev_bento_bg.webp')})`, filter: 'contrast(1.1) brightness(1.1)' }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />
                <div className="absolute inset-0 z-0 bg-[#0B0B0F]/10" />

                <div className="flex justify-between items-start relative z-10">
                  <span className="font-black text-5xl md:text-6xl text-white/35 select-none transition-all duration-300 group-hover:text-white/70">01</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#2962ff]/35 bg-[#2962ff]/10 group-hover:bg-[#2962ff] group-hover:shadow-[0_0_20px_rgba(41,98,255,0.6)] transition-all duration-300">
                    <Globe size={18} className="text-[#2962ff] group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 relative z-10 mt-auto">
                  <h3 className="font-bold text-xl md:text-3xl text-white tracking-wide">{productsList[0].name}</h3>
                  <p className="font-light leading-relaxed text-sm md:text-base text-neutral-300 max-w-xl">{productsList[0].desc}</p>
                </div>
              </motion.a>
            </FadeIn>

            {/* Bento Card 2: Suite Conversacional IA (Col span 2) */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <motion.a
                href={getPageUrl('chatbot')}
                className="product-glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-full group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: "0 0 20px rgba(0,255,255,0.04), 0 24px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)", borderColor: "rgba(0,255,255,0.16)" },
                  hover: { y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.95), 0 0 0 2px rgba(0,255,255,0.45), 0 0 40px rgba(0,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(0,255,255,0.6)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <span className="card-shimmer" />
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-black text-5xl md:text-6xl text-white/35 select-none transition-all duration-300 group-hover:text-white/70">02</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#2962ff]/35 bg-[#2962ff]/10 group-hover:bg-[#2962ff] group-hover:shadow-[0_0_20px_rgba(41,98,255,0.6)] transition-all duration-300">
                    <MessageCircle size={18} className="text-[#2962ff] group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 relative z-10 mt-auto">
                  <h3 className="font-bold text-xl md:text-2xl text-white tracking-wide">{productsList[1].name}</h3>
                  <p className="font-light leading-relaxed text-sm text-neutral-400">{productsList[1].desc}</p>
                </div>
              </motion.a>
            </FadeIn>

            {/* Bento Card 3: WhatsApp Automation (Col span 2) */}
            <FadeIn delay={0.3} className="md:col-span-2">
              <motion.a
                href={getPageUrl('fanpage-envio-masivo')}
                className="product-glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-full group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: "0 0 20px rgba(0,255,255,0.04), 0 24px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)", borderColor: "rgba(0,255,255,0.16)" },
                  hover: { y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.95), 0 0 0 2px rgba(0,255,255,0.45), 0 0 40px rgba(0,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(0,255,255,0.6)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <span className="card-shimmer" />
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-black text-5xl md:text-6xl text-white/35 select-none transition-all duration-300 group-hover:text-white/70">03</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#2962ff]/35 bg-[#2962ff]/10 group-hover:bg-[#2962ff] group-hover:shadow-[0_0_20px_rgba(41,98,255,0.6)] transition-all duration-300">
                    <Zap size={18} className="text-[#2962ff] group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 relative z-10 mt-auto">
                  <h3 className="font-bold text-xl md:text-2xl text-white tracking-wide">{productsList[2].name}</h3>
                  <p className="font-light leading-relaxed text-sm text-neutral-400">{productsList[2].desc}</p>
                </div>
              </motion.a>
            </FadeIn>

            {/* Bento Card 4: Mineria de Datos B2B (Col span 2) */}
            <FadeIn delay={0.4} className="md:col-span-2">
              <motion.a
                href={getPageUrl('guardian-difusion')}
                className="product-glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-full group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: "0 0 20px rgba(0,255,255,0.04), 0 24px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)", borderColor: "rgba(0,255,255,0.16)" },
                  hover: { y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.95), 0 0 0 2px rgba(0,255,255,0.45), 0 0 40px rgba(0,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(0,255,255,0.6)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <span className="card-shimmer" />
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-black text-5xl md:text-6xl text-white/35 select-none transition-all duration-300 group-hover:text-white/70">04</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#2962ff]/35 bg-[#2962ff]/10 group-hover:bg-[#2962ff] group-hover:shadow-[0_0_20px_rgba(41,98,255,0.6)] transition-all duration-300">
                    <Database size={18} className="text-[#2962ff] group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 relative z-10 mt-auto">
                  <h3 className="font-bold text-xl md:text-2xl text-white tracking-wide">{productsList[3].name}</h3>
                  <p className="font-light leading-relaxed text-sm text-neutral-400">{productsList[3].desc}</p>
                </div>
              </motion.a>
            </FadeIn>

            {/* Bento Card 5: Tarjeta Digital Profesional (Col span 4) */}
            <FadeIn delay={0.5} className="md:col-span-4">
              <motion.a
                href={getPageUrl('solucionesdigitales')}
                className="product-glass rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-full group"
                whileHover="hover"
                initial="rest"
                animate="rest"
                variants={{
                  rest: { y: 0, boxShadow: "0 0 20px rgba(0,255,255,0.04), 0 24px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)", borderColor: "rgba(0,255,255,0.16)" },
                  hover: { y: -8, boxShadow: "0 30px 60px rgba(0,0,0,0.95), 0 0 0 2px rgba(0,255,255,0.45), 0 0 40px rgba(0,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)", borderColor: "rgba(0,255,255,0.6)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <span className="card-shimmer" />
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-black text-5xl md:text-6xl text-white/35 select-none transition-all duration-300 group-hover:text-white/70">05</span>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#2962ff]/35 bg-[#2962ff]/10 group-hover:bg-[#2962ff] group-hover:shadow-[0_0_20px_rgba(41,98,255,0.6)] transition-all duration-300">
                    <CreditCard size={18} className="text-[#2962ff] group-hover:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 relative z-10 mt-auto">
                  <h3 className="font-bold text-xl md:text-2xl text-white tracking-wide">{productsList[4].name}</h3>
                  <p className="font-light leading-relaxed text-sm text-neutral-400">{productsList[4].desc}</p>
                </div>
              </motion.a>
            </FadeIn>

            {/* Bento Card 6: 'Tu idea es el punto de partida' Large Bento Card (Col span 6) */}
            <FadeIn delay={0.6} className="md:col-span-6 mt-4">
              <motion.div
                className="glass rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row gap-10 items-center justify-between cursor-default border border-white/5 relative overflow-hidden"
                whileHover={{ borderColor: "rgba(41,98,255,0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
              >
                {/* Highlight Glow orbe inside */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="flex flex-col gap-5 max-w-2xl">
                  <h3 className="font-black text-xl sm:text-3xl md:text-4xl leading-tight text-white">
                    Tu idea es el punto de partida,<br />
                    <span className="text-[#2962ff]" style={{ textShadow: "0 0 20px rgba(41,98,255,0.4)" }}>
                      el resultado nuestra responsabilidad.
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
                    No ejecutamos proyectos a ciegas. Cada solución nace de entender lo que tienes en mente y se construye de forma impecable bajo un proceso estructurado: <strong>analizamos</strong> tu realidad, <strong>diseñamos</strong> a tu medida, <strong>implementamos</strong> por fases y <strong>lanzamos</strong> garantizando el resultado.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto items-stretch sm:items-center">
                  <CTAButton
                    label="Agendar Sesión de Diseño"
                    size="md"
                    onClick={() => document.getElementById('registro').scrollIntoView({ behavior: 'smooth' })}
                  />
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest text-center mt-1">Sin costo inicial</span>
                </div>
              </motion.div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-divider" />

      {/* ── CASOS ───────────────────────────────────────────────── */}
      <section
        ref={projectContainerRef}
        id="casos"
        className="relative z-30 pt-24 pb-48 px-5 sm:px-8 md:px-10 flex flex-col gap-20"
        style={{ backgroundColor: '#0B0B0F' }}
      >
        <div className="text-center relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#2962ff] mb-4 font-semibold">Resultados reales</p>
          <h2 className="hero-heading font-black text-[clamp(2.5rem,8vw,85px)] leading-none">
            Casos
          </h2>
        </div>

        {/* Sticky stacking cards */}
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-[32vh] md:gap-[38vh]">
          {projectsData.map((project, idx) => {
            const targetScale = 1 - (projectsData.length - 1 - idx) * 0.035;
            return (
              <div
                key={project.name}
                className="sticky w-full"
                style={{ top: `${idx * 24 + 90}px` }}
              >
                <div className="case-glass rounded-[40px] sm:rounded-[50px] p-6 sm:p-8 md:p-10 flex flex-col gap-8 md:gap-10 relative overflow-hidden group">
                  {/* Shimmer sweep effect */}
                  <span className="card-shimmer" />
                  {/* Light orb */}
                  <div className="case-orb -top-24 -right-24" />

                  {/* Top row */}
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-4xl sm:text-5xl md:text-6xl text-white/10 leading-none select-none">{project.num}</span>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-[#2962ff] font-bold mb-0.5">{project.category}</span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">{project.name}</h3>
                      </div>
                    </div>

                    {/* Progress gauge */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] tracking-widest text-neutral-500 font-semibold">{project.progressLabel} — {project.progress}%</span>
                      <div className="w-28 sm:w-36 h-1.5 rounded-full overflow-hidden neomorph-inset">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-[#2962ff] rounded-full"
                          style={{ boxShadow: '0 0 12px rgba(41,98,255,0.85)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content grid */}
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 items-center">

                    {/* Left: text */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#2962ff] font-bold">El reto</span>
                        <p className="text-sm text-neutral-300 leading-relaxed">{project.challenge}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-[#2962ff] font-bold">La solución</span>
                        <p className="text-sm text-neutral-300 leading-relaxed">{project.solution}</p>
                      </div>
                      {/* Metric */}
                      <div className="rounded-2xl p-5 flex items-center gap-4 border border-[#2962ff]/20 bg-[#2962ff]/[0.06]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px rgba(41,98,255,0.08)' }}>
                        <div className="font-black text-4xl md:text-5xl text-[#2962ff] tracking-tight leading-none" style={{ textShadow: '0 0 20px rgba(41,98,255,0.5)' }}>
                          <AnimatedCounter value={project.metricValue} />
                        </div>
                        <div className="text-xs text-neutral-400 leading-snug">{project.metricLabel}</div>
                      </div>
                    </div>

                    {/* Right: image */}
                    <div className="md:col-span-5 rounded-3xl overflow-hidden h-[260px] sm:h-[300px] md:h-[340px]" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
                      <img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-divider" />

      {/* ── TECH STACK ──────────────────────────────────────────── */}
      <section className="relative z-20 py-20 sm:py-28 px-5 sm:px-8 md:px-10 overflow-hidden" style={{ backgroundColor: '#0B0B0F' }}>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-10">
          <FadeIn className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2962ff] mb-3 font-semibold">Stack tecnológico</p>
            <h2 className="hero-heading-thin text-[clamp(1.2rem,3.5vw,30px)] leading-none">
              Tecnologías que impulsan tus proyectos
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'React', 'Node.js', 'Python', 'TypeScript',
                'Tailwind CSS', 'PostgreSQL', 'MongoDB',
                'Docker', 'OpenAI', 'WhatsApp API',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 rounded-full text-xs tracking-wide font-medium text-neutral-300 border border-white/10 transition-all duration-300 hover:border-[#2962ff]/50 hover:text-white hover:scale-105 cursor-default"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-divider" />



      {/* ── FAQS + REGISTRO ─────────────────────────────────────── */}
      <section id="registro" className="relative z-30 max-w-4xl mx-auto px-6 py-24 sm:py-32 flex flex-col gap-28">
        <div className="halo-cyan" style={{ top: '10%', left: '-20%' }} />

        {/* FAQs */}
        <div className="flex flex-col gap-12 relative z-10">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2962ff] mb-3 font-semibold">Preguntas frecuentes</p>
            <h2 className="hero-heading-thin text-[clamp(1.8rem,5vw,52px)] leading-none">
              Respuestas
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { q: "¿Tengo que pagar mensualidades eternas por mi web?", a: "No. El desarrollo es un activo de tu empresa. Eres dueño absoluto de tu infraestructura y código, dándote total control presupuestal." },
              { q: "¿El Asistente Virtual suena artificial?", a: "No. Se entrena detalladamente con las políticas, respuestas e identidad de tu organización para atender de forma fluida." },
              { q: "¿Hay riesgo de suspensión de línea con WhatsApp Masivo?", a: "Toda automatización requiere precauciones. Incluimos algoritmos de delay humano y sistemas de calentamiento para proteger tus líneas." },
              { q: "¿Los datos de prospección B2B son legales?", a: "Sí, recopilamos únicamente información pública disponible en directorios comerciales y mapas, estructurándola en tiempo real." }
            ].map((faq, idx) => (
              <div key={idx} className="neomorph-relief rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left font-semibold text-white tracking-wide text-sm flex justify-between items-center outline-none gap-4"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={16} className="text-[#2962ff] shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-5 text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4 neomorph-inset mx-3 mb-3 rounded-xl">
                        <strong className="text-[#2962ff] font-semibold">La realidad:</strong> {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div id="registro" className="flex flex-col gap-14 relative z-10 max-w-5xl mx-auto w-full px-4">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.4em] text-[#2962ff] mb-5 font-bold"
            >
              ¿Listo para estructurar tu estrategia?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,6vw,64px)] font-black text-white leading-[0.95] tracking-tighter"
            >
              Hablemos de tu negocio
            </motion.h2>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="cta-glass rounded-[2.5rem] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative overflow-hidden z-10"
            >
            {/* Animated glow orbs */}
            <motion.div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${'#2962ff'}15 0%, transparent 70%)`, filter: 'blur(120px)' }}
              animate={{ x: [0, -20, 10, 0], y: [0, 10, -20, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${'#25D366'}12 0%, transparent 70%)`, filter: 'blur(100px)' }}
              animate={{ x: [0, 15, -10, 0], y: [0, -10, 15, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            />

            {/* Left text */}
            <div className="flex-1 flex flex-col justify-center gap-8 relative z-10">
              <div>
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-[1.15] mb-5">
                  ¿Cómo podemos ayudarte a implementar estas herramientas?
                </h3>
                <p className="text-base text-neutral-400 leading-relaxed">
                  Cuéntanos un poco sobre tu organización. Queremos entender tus procesos actuales para diseñar un ecosistema a medida que trabaje en segundo plano por ti.
                </p>
              </div>

              <div className="cta-check rounded-2xl p-6">
                {[
                  { icon: Zap, text: 'Diagnóstico gratuito de 15 minutos' },
                  { icon: CheckCircle2, text: 'Sin compromisos ni paquetes obligatorios' },
                  { icon: TrendingUp, text: 'Resultados medibles desde el primer mes' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 text-sm text-neutral-300 py-3 border-b border-white/[0.03] last:border-b-0"
                  >
                    <div className="cta-check w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={15} className="text-[#2962ff]" />
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 w-full relative z-10">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 p-8 min-h-[300px]">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                    <CheckCircle2 size={64} className="text-[#2962ff]" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-2">¡Mensaje listo!</h3>
                    <p className="text-base text-neutral-400 leading-relaxed">Se abrió WhatsApp con tu solicitud. Nuestro equipo la revisará y te responderá enseguida.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  {/* Nombre */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] text-neutral-500 font-semibold uppercase ml-1" htmlFor="nombre">Nombre</label>
                    <div className="relative">
                      <input
                        type="text" id="nombre" required placeholder="Ej. Juan Pérez"
                        value={nombre} onChange={(e) => setNombre(e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 focus:brightness-125"
                      />
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] text-neutral-500 font-semibold uppercase ml-1" htmlFor="whatsapp">WhatsApp</label>
                    <div className="relative">
                      <input
                        type="tel" id="whatsapp" required placeholder="+57 310 000 0000"
                        value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 focus:brightness-125"
                      />
                      <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] text-[#2962ff] font-bold uppercase ml-1" htmlFor="mensaje">¿Qué necesitas resolver?</label>
                    <div className="relative">
                      <textarea
                        id="mensaje" required rows="4"
                        placeholder="Describe brevemente tus procesos actuales o el cuello de botella que deseas automatizar..."
                        value={mensaje} onChange={(e) => setMensaje(e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:brightness-125 resize-none"
                      />
                      <Edit3 size={15} className="absolute left-4 top-4 text-[#2962ff]" />
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="cta-submit w-full rounded-xl text-sm font-bold tracking-wider py-4 px-8 flex justify-center items-center gap-3 text-white disabled:opacity-60"
                      style={{ color: '#fff' }}
                    >
                      {loading ? "Generando mensaje..." : "Iniciar Diagnóstico"}
                      {!loading && <ArrowRight size={16} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <SiteFooter />
      <BackToTop />
    </main>
  );
}
