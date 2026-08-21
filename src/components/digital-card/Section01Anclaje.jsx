import { glowCardStyle, COLORS, FONTS, goldGradientText } from './shared';
import { getDistUrl } from '../../utils/env';

const styles = {
  wrap: {
    ...glowCardStyle(),
    padding: '40px 48px',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  wrapBefore: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 320,
    height: 320,
    background: 'radial-gradient(circle, rgba(193,150,60,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapAfter: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 220,
    height: 220,
    background: 'radial-gradient(circle, rgba(193,150,60,0.04) 0%, transparent 70%)',
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
    width: 240,
    height: 240,
    borderRadius: 22,
    background: COLORS.card,
    boxShadow: '6px 6px 16px #0d0d10, -4px -4px 12px #2a2a32, inset 0 0 0 1px rgba(193,150,60,0.2)',
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
    transform: 'scale(6.96)',
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
    color: COLORS.goldSoft,
    letterSpacing: 1,
    lineHeight: 1.1,
    animation: 'dgFadeUp 0.6s ease 0.2s both',
  },
  name: {
    fontFamily: FONTS.raleway,
    fontSize: 'clamp(13px, 1.8vw, 17px)',
    fontWeight: 600,
    ...goldGradientText(),
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  role: {
    fontSize: 'clamp(11px, 1.4vw, 13px)',
    fontWeight: 400,
    color: '#9a9184',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    animation: 'dgFadeUp 0.6s ease 0.35s both',
  },
  divider: {
    width: 44,
    height: 1,
    background: 'linear-gradient(90deg, transparent, #c1963c, transparent)',
    margin: '10px 0',
    animation: 'dgFadeUp 0.6s ease 0.4s both',
  },
  slogan: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: COLORS.textMuted,
    lineHeight: 1.7,
    animation: 'dgFadeUp 0.6s ease 0.45s both',
  },
};

export default function Section01Anclaje() {
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
          .anclaje-status {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            margin-bottom: -10px;
            align-self: center;
          }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 854 }}>
        <div style={styles.wrap} className="anclaje-wrap">
          <div style={{ ...styles.wrapBefore }} />
          <div style={{ ...styles.wrapAfter }} />
          <div style={styles.status} className="anclaje-status">
            <span style={styles.dot} />
            Online
          </div>
          <div style={styles.logoBox}>
            <img
              style={styles.logoImg}
              src={getDistUrl('365/Diseno-sin-titulo-24.png')}
              alt="Soluciones Digitales Logo"
            />
          </div>
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
    </div>
  );
}
