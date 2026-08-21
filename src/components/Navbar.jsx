import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Globe, Zap, Database, Phone, Target, X } from 'lucide-react';
import { getDistUrl, getPageUrl, getFrontPageUrl, getTelegramChatUrl } from '../utils/env';

const TELEGRAM_URL = getTelegramChatUrl();

  const navCategories = [
    { name: 'Sitios Web', icon: Globe, sub: ['Vitrina de Conversión', 'Ecosistema de Autoridad', 'Hub de Negocios', 'Tarjeta Profesional de Negocios'] },
    { name: 'Inteligencia Artificial', icon: MessageCircle, sub: ['Probador Virtual IA', 'Piloto Pro - Agente IA Autónomo', 'Chatbot Multicanal Inteligente', 'Mini Apps en Telegram'] },
    { name: 'WhatsApp Automation', icon: Zap, sub: ['Plataforma de Envío Masivo', 'Calentador Inteligente de Cuentas'] },
    { name: 'Minería en WhatsApp', icon: Database, sub: ['Extractor de datos de WhatsApp'] }
  ];


const SECTIONS = [
  { id: 'split-nucleo', label: 'Núcleo', shortLabel: 'Núcleo' },
  { id: 'split-investigacion', label: 'Investigación', shortLabel: 'I+D' },
  { id: 'split-implementacion', label: 'Implementación', shortLabel: 'Impl.' },
  { id: 'split-factor-humano', label: 'Factor Humano', shortLabel: 'Humano' },
];

function NavLink({ href, active, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative text-[15px] tracking-[0.2em] uppercase font-semibold transition-colors duration-200 ${
        active
          ? 'text-white after:absolute after:-bottom-[6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2962ff] after:rounded-full'
          : 'text-neutral-400 hover:text-white'
      }`}
    >
      {children}
    </a>
  );
}

export default function Navbar({ activePage = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);
  const typedSeqRef = useRef('');
  const typedTimerRef = useRef(null);

  const navigateToAdmin = () => {
    const adminPath = isDev ? '/admin-auditor.html' : getPageUrl('admin-auditor');
    window.location.href = adminPath;
  };

  useEffect(() => {
    const handleSecretTyping = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      typedSeqRef.current = (typedSeqRef.current + e.key).toLowerCase();
      clearTimeout(typedTimerRef.current);
      typedTimerRef.current = setTimeout(() => { typedSeqRef.current = ''; }, 3000);
      if (typedSeqRef.current.includes('admin')) {
        typedSeqRef.current = '';
        navigateToAdmin();
      }
    };
    document.addEventListener('keydown', handleSecretTyping);
    return () => {
      document.removeEventListener('keydown', handleSecretTyping);
      clearTimeout(typedTimerRef.current);
    };
  }, []);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClickAndEsc = (e) => {
      if (e.type === 'keydown' && e.key === 'Escape') {
        setProductosOpen(false);
      } else if (e.type === 'mousedown' && menuRef.current && !menuRef.current.contains(e.target)) {
        setProductosOpen(false);
      }
    };
    
    if (productosOpen) {
      document.addEventListener('mousedown', handleOutsideClickAndEsc);
      document.addEventListener('keydown', handleOutsideClickAndEsc);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClickAndEsc);
      document.removeEventListener('keydown', handleOutsideClickAndEsc);
    };
  }, [productosOpen]);

  // Detect if we are on development server
  const isDev = import.meta.env.DEV;
  const homePath = isDev ? '/index.html' : getFrontPageUrl();
  const qsPath = isDev ? '/quienes-somos.html' : getPageUrl('quienes-somos');
  const blogPath = isDev ? '/blog.html' : getPageUrl('blog');
  const prodPath = isDev ? '/index.html#productos' : getFrontPageUrl() + '#productos';
  const tiendaPath = isDev ? '/tienda.html' : getPageUrl('tienda');
  const ecoPath = isDev ? '/ecosistema.html' : getPageUrl('ecosistema');

  const isHome = activePage === 'home';
  const isQuienesSomos = activePage === 'quienes-somos';

  const getSubLink = (catName, subName) => {
    if (catName === 'Sitios Web') {
      if (subName === 'Tarjeta Profesional de Negocios') return isDev ? '/solucionesdigitales.html' : getPageUrl('solucionesdigitales');
      return isDev ? '/sitios-web.html' : getPageUrl('sitios-web');
    }
    if (subName.includes('IA Autónomo')) return isDev ? '/chatbot.html' : getPageUrl('chatbot');
    if (subName.includes('Multicanal')) return isDev ? '/canal1-chatbot.html' : getPageUrl('canal1-chatbot');
    if (subName.includes('Probador Virtual')) return isDev ? '/probador-virtual.html' : getPageUrl('probador-virtual');
    if (subName.includes('Mini Apps en Telegram')) return isDev ? '/telegram/index.html' : TELEGRAM_URL;
    if (subName === 'Calentador Inteligente de Cuentas') return isDev ? '/calentador-cuentas.html' : getPageUrl('calentador-cuentas');
    if (subName === 'Extractor de datos de WhatsApp' || subName === 'Extractor PLUS') return isDev ? '/extractor.html' : getPageUrl('extractor');
    if (subName === 'Plataforma de Envío Masivo') return isDev ? '/guardian-difusion.html' : getPageUrl('guardian-difusion');
    if (subName === 'Auditor Estratégico') return isDev ? '/auditor-estrategico.html' : getPageUrl('auditor-estrategico');
    return prodPath;
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setProductosOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-14 md:h-16">
        {/* Left: Logo + Desktop Menu + Phone */}
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <a href={homePath} className="flex items-center shrink-0">
            <img
              src={getDistUrl('365/SOLUCIONES.png')}
              alt="Soluciones Digitales IA"
              className="h-7 sm:h-8 md:h-10 w-auto object-contain"
              style={{ height: '40px', width: 'auto', display: 'block', maxWidth: '280px' }}
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            <NavLink href={homePath} active={isHome}>Inicio</NavLink>

            {/* Productos dropdown */}
            <div className="" ref={menuRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setProductosOpen(!productosOpen);
                }}
                className="relative flex items-center gap-1 text-[15px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white font-semibold transition-colors duration-200"
              >
                Productos
                <ChevronDown size={11} className={`transition-transform duration-300 ${productosOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productosOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="fixed top-14 md:top-16 left-1/2 -translate-x-1/2 mt-3 w-[95vw] max-w-[1100px] rounded-2xl p-6 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl"
                    style={{ background: 'rgba(11,11,15,0.94)' }}
                  >
                    <button 
                      onClick={() => setProductosOpen(false)}
                      className="absolute top-4 right-4 p-1.5 text-neutral-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
                      aria-label="Cerrar menú"
                    >
                      <X size={16} />
                    </button>

                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6">
                      {navCategories.map((cat, index) => (
                        <div 
                          key={cat.name}
                          className={`relative ${index < navCategories.length - 1 ? 'xl:after:content-[""] xl:after:absolute xl:after:-right-3 xl:after:top-0 xl:after:bottom-0 xl:after:w-px xl:after:bg-white/5' : ''}`}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <cat.icon size={14} className="text-white" />
                            <h4 className="text-[14px] uppercase tracking-[0.2em] text-white font-bold">{cat.name}</h4>
                          </div>
                          <ul className="flex flex-col gap-1.5 pl-[20px]">
                            {cat.sub.map((sub) => {
                              const linkHref = getSubLink(cat.name, sub);
                              return (
                                <li key={sub}>
                                  <a href={linkHref} className="text-[14px] text-neutral-400 hover:text-white transition-colors duration-200 tracking-wide">
                                    {sub}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-500 tracking-wider">Explora todas nuestras soluciones</span>
                      <a href={prodPath} className="text-[14px] tracking-widest text-white font-semibold hover:text-neutral-300 transition-colors" onClick={() => setProductosOpen(false)}>Ver todos →</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href={tiendaPath}>Tienda</NavLink>
            <NavLink href={ecoPath}>Ecosistema</NavLink>
            <NavLink href={blogPath}>Blog</NavLink>
            <NavLink href={qsPath} active={isQuienesSomos}>Quiénes Somos</NavLink>

            {isQuienesSomos && (
              <>
                <div className="h-4 w-px bg-white/10" />
                {SECTIONS.map((s) => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {s.shortLabel}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Right section: Phone + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+573115893220"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-[11px] tracking-wider text-neutral-300 hover:text-white transition-colors"
            style={{ background: 'rgba(11,11,15,0.5)' }}
          >
            <Phone size={11} className="text-emerald-400" />
            +57 311 589 3220
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] group" aria-label="Menú">
            <span className={`block h-[1.5px] w-5 bg-neutral-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-neutral-300 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-neutral-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - portal para escapar del containing block del backdrop-filter */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 bg-black/70 z-[60] md:hidden" onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="flex h-full w-full max-w-[320px] flex-col border-r border-white/5 bg-[#0b0b0f]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0 border-b border-white/5">
                <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Menú</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 pb-6">
                <div className="flex flex-col gap-1">
                  <a
                    href={homePath}
                    className={`py-2 text-[17px] tracking-[0.2em] uppercase font-semibold transition-colors border-b border-white/5 ${isHome ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
                    onClick={() => { setMenuOpen(false); setProductosOpen(false); if (isDev) { scrollTo('inicio'); } }}
                  >
                    Inicio
                  </a>

                  <div className="border-b border-white/5 py-1">
                    <button onClick={() => setProductosOpen(!productosOpen)} className="flex items-center justify-between w-full py-2 text-[17px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white transition-colors font-semibold">
                      <span>Productos</span>
                      <ChevronDown size={13} className={`transition-transform duration-300 ${productosOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {productosOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 py-2 flex flex-col gap-4">
                            {navCategories.map((cat) => (
                              <div key={cat.name}>
                                <div className="flex items-center gap-2 mb-2">
                                  <cat.icon size={12} className="text-[#2962ff]" />
                                  <h4 className="text-[15px] uppercase tracking-[0.18em] text-[#2962ff] font-bold">{cat.name}</h4>
                                </div>
                                <ul className="flex flex-col gap-0.5 pl-5 border-l border-white/5">
                                  {cat.sub.map((sub) => {
                                    const linkHref = getSubLink(cat.name, sub);
                                    return (
                                      <li key={sub}>
                                        <a
                                          href={linkHref}
                                          className="block py-1.5 text-[15px] text-neutral-400 leading-snug hover:text-white transition-colors tracking-wide"
                                          onClick={() => { setMenuOpen(false); if (isDev && linkHref.startsWith("#")) { scrollTo('productos'); } }}
                                        >
                                          {sub}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <a href={tiendaPath} className="py-2 text-[17px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white transition-colors font-semibold border-b border-white/5" onClick={() => { setMenuOpen(false); setProductosOpen(false); }}>
                    Tienda
                  </a>
                  <a href={ecoPath} className="py-2 text-[17px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white transition-colors font-semibold border-b border-white/5" onClick={() => { setMenuOpen(false); setProductosOpen(false); }}>
                    Ecosistema
                  </a>
                  <a href={blogPath} className="py-2 text-[17px] tracking-[0.2em] uppercase text-neutral-300 hover:text-white transition-colors font-semibold border-b border-white/5" onClick={() => { setMenuOpen(false); setProductosOpen(false); }}>
                    Blog
                  </a>
                  <a
                    href={qsPath}
                    className={`py-2 text-[17px] tracking-[0.2em] uppercase font-semibold transition-colors border-b border-white/5 ${isQuienesSomos ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
                    onClick={() => { setMenuOpen(false); setProductosOpen(false); if (isDev) { scrollTo('quienes-somos'); } }}
                  >
                    Quiénes Somos
                  </a>

                  {isQuienesSomos && (
                    <div className="py-2 flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-semibold mb-1">En esta página</span>
                      {SECTIONS.map((s) => (
                        <button key={s.id} onClick={() => scrollTo(s.id)}
                          className="py-1.5 text-[13px] text-neutral-400 hover:text-white transition-colors font-semibold text-left"
                        >
                          {s.shortLabel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="shrink-0 px-5 py-5 border-t border-white/5 flex flex-col gap-2.5">
                <a
                  href="tel:+573115893220"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-emerald-500/30 text-xs tracking-wider text-neutral-200 hover:text-white hover:border-emerald-500/60 transition-colors"
                  style={{ background: 'rgba(16,185,129,0.06)' }}
                  onClick={() => { setMenuOpen(false); setProductosOpen(false); }}
                >
                  <Phone size={12} className="text-emerald-400" />
                  Llamar · +57 311 589 3220
                </a>
                <a
                  href="https://wa.me/573115893220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-[11px] tracking-widest font-bold text-white border border-emerald-500 flex items-center justify-center gap-2 hover:bg-emerald-500/10 transition-colors"
                  style={{ background: 'rgba(16,185,129,0.14)' }}
                  onClick={() => { setMenuOpen(false); setProductosOpen(false); }}
                >
                  <MessageCircle size={13} />
                  Contáctanos
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}
