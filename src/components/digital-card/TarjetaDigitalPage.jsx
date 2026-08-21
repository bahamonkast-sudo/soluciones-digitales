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
      <style>{`
        body {
          background: #0C0C0C !important;
          font-family: 'Raleway', sans-serif !important;
        }
        .td-root, .td-root div, .td-root span, .td-root p, .td-root h1, .td-root h2, .td-root h3, .td-root h4 {
          font-family: 'Raleway', sans-serif !important;
        }
        .td-root h1, .td-root h2, .td-root h3, .td-root h4 {
          font-family: 'Cinzel', serif !important;
          font-weight: 700 !important;
        }
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
