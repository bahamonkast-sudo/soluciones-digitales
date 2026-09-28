import { useEffect, useState } from 'react';
import { glowCardStyle, COLORS, FONTS } from './shared';
import { getDistUrl } from '../../utils/env';

const styles = {
  wrap: {
    ...glowCardStyle(),
    background: 'linear-gradient(135deg, #ffffff 0%, #f4faff 62%, #eaf7fb 100%)',
    border: '1px solid rgba(34,148,181,0.18)',
    borderRadius: 26,
    boxShadow: '0 24px 64px rgba(5,31,49,0.16)',
    animation: 'dgFadeUp 0.7s ease both',
    padding: '34px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  wrapBefore: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 320,
    height: 320,
    background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapAfter: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 220,
    height: 220,
    background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  status: {
    position: 'absolute',
    top: 24,
    right: 32,
    background: 'rgba(76,175,80,0.08)',
    border: '1px solid rgba(76,175,80,0.4)',
    borderRadius: 30,
    padding: '5px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.green,
    letterSpacing: 1,
    textTransform: 'uppercase',
    animation: 'dgFadeUp 0.5s ease 0.2s both',
  },
  dot: {
    width: 10,
    height: 10,
    background: COLORS.green,
    borderRadius: '50%',
    animation: 'dgPulseDot 2s infinite',
    flexShrink: 0,
  },
  logoBox: {
    flexShrink: 0,
    width: 220,
    height: 190,
    borderRadius: 24,
    background: '#061524',
    boxShadow: '0 16px 34px rgba(5,31,49,0.2), inset 0 0 0 1px rgba(34,211,238,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    animation: 'dgFloat 5s ease-in-out infinite',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'scale(1.18)',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    position: 'relative',
    zIndex: 1,
  },
  company: {
    fontFamily: FONTS.cinzel,
    fontSize: 'clamp(20px, 3.2vw, 32px)',
    fontWeight: 700,
    color: '#102a43',
    letterSpacing: 1,
    lineHeight: 1.1,
    animation: 'dgFadeUp 0.6s ease 0.2s both',
  },
  name: {
    fontFamily: FONTS.raleway,
    fontSize: 'clamp(13px, 1.8vw, 17px)',
    fontWeight: 600,
    color: '#087e9d',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  role: {
    fontSize: 'clamp(11px, 1.4vw, 13px)',
    fontWeight: 400,
    color: '#64748b',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    animation: 'dgFadeUp 0.6s ease 0.35s both',
  },
  divider: {
    width: 44,
    height: 1,
    background: 'linear-gradient(90deg, transparent, #7ee8ff, transparent)',
    margin: '10px 0',
    animation: 'dgFadeUp 0.6s ease 0.4s both',
  },
  slogan: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: '#475569',
    lineHeight: 1.7,
    animation: 'dgFadeUp 0.6s ease 0.45s both',
  },
};

export default function Section01Anclaje() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  useEffect(() => {
    if (!isVideoExpanded) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsVideoExpanded(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isVideoExpanded]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box' }}>
      <style>{`
        .anclaje-wrap {
          flex-direction: row;
          text-align: left;
        }
        .anclaje-info {
          align-items: flex-start;
        }
        .anclaje-divider {
          margin-left: 0;
          margin-right: auto;
        }
        .anclaje-video-frame { width: 220px; height: 190px; }
        .anclaje-expand:hover { background: rgba(255,255,255,.98) !important; transform: scale(1.06); }
        @media (max-width: 600px) {
          .anclaje-wrap {
            flex-direction: column !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .anclaje-info {
            align-items: center !important;
          }
          .anclaje-divider {
            margin: 10px auto !important;
          }
          .anclaje-video-frame { width: min(100%, 300px) !important; height: 190px !important; }
          .anclaje-status {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            margin-bottom: -10px;
            align-self: center;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 1000 }}>
        <div style={styles.wrap} className="anclaje-wrap">
          <div style={{ ...styles.wrapBefore }} />
          <div style={{ ...styles.wrapAfter }} />
          <div style={styles.status} className="anclaje-status">
            <span style={styles.dot} />
            Online
          </div>
          <figure style={{ position: 'relative', zIndex: 1, flexShrink: 0, margin: 0 }}>
            <div style={styles.logoBox} className="anclaje-video-frame">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={getDistUrl('365/Diseno-sin-titulo-24.png')}
                aria-label="Video institucional de Soluciones Digitales"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              >
                <source src="https://res.cloudinary.com/b1ozfqjn/video/upload/q_auto/f_auto/Escena_inicial_-_2026-08-03_202608021911.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption style={{ maxWidth: 220, marginTop: 9, color: '#64748b', fontFamily: FONTS.raleway, fontSize: 9, fontWeight: 700, lineHeight: 1.45, letterSpacing: 1, textAlign: 'center', textTransform: 'uppercase' }}>
              Video institucional · Infraestructura a medida · 0 plantillas
            </figcaption>
            <button
              type="button"
              className="anclaje-expand"
              onClick={() => setIsVideoExpanded(true)}
              aria-label="Ampliar video institucional"
              style={{ margin: '9px auto 0', padding: '8px 13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 999, border: '1px solid rgba(15,35,55,.12)', background: '#fff', color: '#102a43', cursor: 'pointer', boxShadow: '0 4px 14px rgba(5,31,49,.1)', transition: 'transform .2s, background .2s', fontFamily: FONTS.raleway, fontSize: 10, fontWeight: 700 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
              Ampliar video
            </button>
          </figure>
          <div style={styles.info} className="anclaje-info">
            <div style={styles.company}>Soluciones Digitales</div>
            <div style={styles.name}>Guillermo Castellanos</div>
            <div style={styles.role}>Fundador & CEO</div>
            <div style={styles.divider} className="anclaje-divider" />
            <p style={styles.slogan}>
              &ldquo;Transformamos tu presencia digital en una máquina de ventas con Inteligencia Artificial aplicada.&rdquo;
            </p>
          </div>
        </div>

      </div>
      {isVideoExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video institucional ampliado"
          onClick={() => setIsVideoExpanded(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', padding: 20, background: 'rgba(3,10,19,.88)', backdropFilter: 'blur(10px)' }}
        >
          <button
            type="button"
            onClick={() => setIsVideoExpanded(false)}
            aria-label="Cerrar video ampliado"
            style={{ position: 'absolute', top: 20, right: 20, width: 46, height: 46, borderRadius: 14, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', color: '#fff', fontSize: 28, cursor: 'pointer' }}
          >×</button>
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            onClick={(event) => event.stopPropagation()}
            style={{ width: 'min(1100px, 94vw)', maxHeight: '82vh', borderRadius: 20, background: '#000', boxShadow: '0 28px 90px rgba(0,0,0,.5)' }}
          >
            <source src="https://res.cloudinary.com/b1ozfqjn/video/upload/q_auto/f_auto/Escena_inicial_-_2026-08-03_202608021911.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
