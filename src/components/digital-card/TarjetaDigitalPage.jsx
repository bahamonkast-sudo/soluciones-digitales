import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { glowPulseKeyframes, COLORS, FONTS } from './shared';
import { getDistUrl } from '../../utils/env';
import Section01Anclaje from './Section01Anclaje';
import Section02Propuesta from './Section02Propuesta';
import Section03Diagnostico from './Section03Diagnostico';
import Section04QuienesSomos from './Section04QuienesSomos';
import Section05Ecosistema from './Section05Ecosistema';
import Section06Metodologia from './Section06Metodologia';
import Section07Blindaje from './Section07Blindaje';
import Section08Conversion from './Section08Conversion';
import SectionPricing from './SectionPricing';
import SectionIndispensable from './SectionIndispensable';
import SectionFinalCTA from './SectionFinalCTA';
import SectionFooter from './SectionFooter';
import SEO from '../SEO';
import { SEO_CONFIG } from '../../config/seoConfig';
import { SCHEMAS } from '../../config/schemas';

export default function TarjetaDigitalPage({ onClose, isModal = false }) {
  const [activeTab, setActiveTab] = useState('agencia');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isModal) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Force Lenis to recognize the new height
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'agencia', label: 'La Agencia', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg> },
    { id: 'ecosistema', label: 'El Ecosistema', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> },
    { id: 'metodologia', label: 'Metodología', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-10V2z"/></svg> },
    { id: 'contacto', label: 'Planes & Contacto', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg> },
  ];

  const renderContent = (tabId) => {
    if (tabId === 'agencia') return <div style={{ animation: 'dgFadeUp 0.5s ease both' }}><Section02Propuesta /><Section04QuienesSomos /></div>;
    if (tabId === 'ecosistema') return <div style={{ animation: 'dgFadeUp 0.5s ease both' }}><Section03Diagnostico /><Section05Ecosistema /></div>;
    if (tabId === 'metodologia') return <div style={{ animation: 'dgFadeUp 0.5s ease both' }}><Section06Metodologia /><Section07Blindaje /></div>;
    if (tabId === 'contacto') return <div style={{ animation: 'dgFadeUp 0.5s ease both' }}><SectionPricing /><SectionIndispensable /><Section08Conversion /><SectionFinalCTA /></div>;
    return null;
  };

  return (
    <div className="td-root" style={{ background: '#0C0C0C', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      {!isModal && <SEO {...SEO_CONFIG.tarjeta} structuredData={SCHEMAS.tarjeta} />}
      <style>{`
        body { background: #07111e !important; font-family: 'Raleway', sans-serif !important; }
        .td-root, .td-root div, .td-root span, .td-root p, .td-root h1, .td-root h2, .td-root h3, .td-root h4 { font-family: 'Raleway', sans-serif !important; }
        .td-root h1, .td-root h2, .td-root h3, .td-root h4 { font-family: 'Raleway', sans-serif !important; font-weight: 750 !important; letter-spacing: -0.035em; }
        .td-intro { display:grid; grid-template-columns:1.05fr .95fr; gap:36px; align-items:center; padding:44px; min-height:410px; border-radius:30px; border:1px solid rgba(126,232,255,.2); background:linear-gradient(125deg,#101d2e 0%,#101724 55%,#101c28 100%); box-shadow:0 32px 80px rgba(0,0,0,.35); }
        .td-intro-media { position:relative; min-height:290px; border-radius:22px; overflow:hidden; background:#07111e; border:1px solid rgba(126,232,255,.16); }
        .td-intro-media video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:contrast(1.05) saturate(.9); }
        .td-intro-media::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,rgba(7,17,30,.06),rgba(7,17,30,.12) 55%,rgba(7,17,30,.5)); pointer-events:none; }
        .td-intro-kicker { display:inline-flex; align-items:center; gap:9px; padding:8px 12px; border:1px solid rgba(126,232,255,.18); background:rgba(126,232,255,.06); color:#9ceeff; border-radius:999px; font-size:10px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; }
        .td-intro-copy { color:#bdc9d8; font-size:15px; line-height:1.8; max-width:510px; margin:18px 0 24px; }
        .td-intro-action { min-height:48px; display:inline-flex; align-items:center; justify-content:center; gap:10px; padding:0 22px; border-radius:14px; background:#7ee8ff; color:#07111e; text-decoration:none; font-size:12px; font-weight:800; letter-spacing:.04em; box-shadow:0 10px 28px rgba(72,207,237,.18); transition:transform .2s,background .2s; }
        .td-intro-action:hover { transform:translateY(-2px); background:#b4f3ff; }
        @media(max-width:700px) { .td-intro { grid-template-columns:1fr; gap:22px; padding:24px; min-height:0; border-radius:23px; } .td-intro-media { min-height:215px; order:2; } .td-intro-copy { font-size:14px; } }
        .td-tabs-container::-webkit-scrollbar {
          display: none;
        }
        ${glowPulseKeyframes}
        @media (prefers-reduced-motion: reduce) {
          .td-root *, .td-root *::before, .td-root *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 100,
            background: 'rgba(26,26,31,0.8)', border: '1px solid #3a3118',
            color: '#c1963c', width: 44, height: 44, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            fontSize: 24, paddingBottom: 4
          }}
          aria-label="Cerrar"
        >
          &times;
        </button>
      )}
      
      {/* Fondo sutil para romper la monotonía del negro absoluto */}
      <div style={bgImageStyle} />
      <div style={bgOverlayStyle} />

      {/* HERO: presentación editorial, separada del contenido de la tarjeta */}
      <header style={{ position: 'relative', zIndex: 1, padding: '28px 20px 8px', maxWidth: 1180, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div className="td-intro">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="td-intro-kicker"><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} /> Cero plantillas · 100% a medida</span>
            <h1 style={{ margin: '22px 0 0', color: '#fff', fontSize: 'clamp(2.3rem,5vw,4.5rem)', lineHeight: .98, maxWidth: 560 }}>
              Soluciones digitales<span style={{ color: '#7ee8ff' }}>.</span>
              <span style={{ display: 'block', marginTop: 7, fontSize: '.44em', lineHeight: 1.2, color: '#8fa4bc', letterSpacing: '.13em', textTransform: 'uppercase' }}>ai.studio</span>
            </h1>
            <p className="td-intro-copy"><strong style={{ color: '#fff' }}>Construimos ecosistemas de conversión.</strong> Infraestructura web + automatización WhatsApp + IA conversacional para escalar sin fricción.</p>
            <a href="https://wa.me/573115893220?text=Hola%20Guillermo%2C%20vi%20la%20tarjeta%20digital%20y%20quiero%20activarla" target="_blank" rel="noopener noreferrer" className="td-intro-action">Activar mi tarjeta <span aria-hidden="true">↗</span></a>
          </div>
          <div className="td-intro-media" aria-label="Presentación audiovisual de Soluciones Digitales">
            <video autoPlay muted loop playsInline preload="metadata" poster={getDistUrl('365/SOLUCIONES.png')}>
              <source src={getDistUrl('365/el_robot_esta_teclenado_sobre.mp4')} type="video/mp4" />
              <source src="https://res.cloudinary.com/b1ozfqjn/video/upload/v1787332603/el_robot_esta_teclenado_sobre.mp4" type="video/mp4" />
            </video>
            <span style={{ position: 'absolute', zIndex: 1, left: 16, bottom: 14, color: '#d4e2f0', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase' }}>Diseño · Tecnología · Conversión</span>
          </div>
        </div>
      </header>

      <Section01Anclaje />
      
      {/* Sticky Tab Navigation (Desktop Only) */}
      {!isMobile && (
        <div style={{
          position: 'sticky', top: 0, zIndex: 50, background: 'rgba(12, 12, 12, 0.85)',
          backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(193,150,60,0.15)',
          padding: '12px 16px', display: 'flex', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          <div className="td-tabs-container" style={{
            display: 'flex', gap: 8, overflowX: 'auto', maxWidth: 854, width: '100%',
            paddingBottom: 4, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            justifyContent: 'center'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isModal) {
                    const modal = document.querySelector('.overflow-y-auto');
                    if (modal) modal.scrollTo({ top: 380, behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }
                }}
                style={{
                  background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(193,150,60,0.15) 0%, transparent 100%)' : 'transparent',
                  border: `1px solid ${activeTab === tab.id ? COLORS.gold : '#2e2e3a'}`,
                  color: activeTab === tab.id ? COLORS.gold : '#c8c0b4',
                  padding: '8px 18px', borderRadius: 30, fontFamily: FONTS.raleway,
                  fontSize: 12, fontWeight: 600, letterSpacing: 1, whiteSpace: 'nowrap',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 0 12px rgba(193,150,60,0.2)' : 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}
              >
                <span style={{ display: 'inline-flex', flexShrink: 0 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      {!isMobile ? (
        <div style={{ minHeight: '50vh', animation: 'dgFadeUp 0.5s ease', paddingBottom: 40, position: 'relative', zIndex: 1 }}>
          {renderContent(activeTab)}
        </div>
      ) : (
        <div style={{ width: '100%', paddingBottom: 40, position: 'relative', zIndex: 1 }}>
          {tabs.map(tab => (
            <div key={tab.id} style={{ borderBottom: '1px solid rgba(193,150,60,0.15)', background: '#0C0C0C' }}>
              <button
                onClick={() => {
                   const newTab = activeTab === tab.id ? '' : tab.id;
                   setActiveTab(newTab);
                   // Si abre el tab, escrolear un poco hacia abajo suavemente para mostrar contenido
                   if (newTab) {
                     setTimeout(() => {
                       if (isModal) {
                         const modal = document.querySelector('.overflow-y-auto');
                         if (modal) modal.scrollBy({ top: 150, behavior: 'smooth' });
                       } else {
                         window.scrollBy({ top: 150, behavior: 'smooth' });
                       }
                     }, 150);
                   }
                }}
                style={{
                  width: '100%', padding: '24px 20px', 
                  background: activeTab === tab.id ? 'linear-gradient(90deg, rgba(193,150,60,0.08) 0%, transparent 100%)' : 'transparent',
                  border: 'none', color: activeTab === tab.id ? COLORS.gold : '#e0dbd3',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', outline: 'none', transition: 'all 0.3s ease'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: FONTS.cinzel, fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>
                  <span style={{ display: 'inline-flex', color: activeTab === tab.id ? COLORS.gold : '#8a8378' }}>{tab.icon}</span>
                  {tab.label}
                </span>
                <span style={{ fontSize: 28, fontWeight: 300, color: activeTab === tab.id ? COLORS.gold : '#5a5650', transition: 'transform 0.3s ease', transform: activeTab === tab.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>
              {activeTab === tab.id && (
                <div>
                  {renderContent(tab.id)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <SectionFooter />
    </div>
  );
}

const bgImageStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  backgroundImage: `url(${getDistUrl('ecosistema_bg.webp')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.05,
};

const bgOverlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  background: 'radial-gradient(circle at 50% 30%, transparent 0%, rgba(12,12,12,0.72) 100%)',
};
