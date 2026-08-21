export const COLORS = {
  bg: '#1a1a1f',
  card: '#1f1e24',
  gold: '#c1963c',
  goldSoft: '#e8d5a3',
  text: '#ffffff',
  textSoft: '#c8c0b4',
  textMuted: '#9a9184',
  border: '#2e2e3a',
  borderGold: '#3a3118',
  red: '#c13939',
  green: '#4caf50',
  darkBg: '#141417',
};

export const FONTS = {
  cinzel: "'Cinzel', serif",
  raleway: "'Raleway', sans-serif",
};

export const sectionWrapper = (bg = 'transparent') => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '20px 16px',
  boxSizing:       'border-box',
  background: bg,
});

export const sectionInner = {
  width: '100%',
  maxWidth: '854px',
};

export const glowPulseKeyframes = `
@keyframes dgGlowPulse {
  0%, 100% { box-shadow: 8px 8px 20px #0d0d10, -4px -4px 14px #2a2a32, inset 0 0 0 1px #2e2e3a; }
  50% { box-shadow: 8px 8px 28px #0d0d10, -4px -4px 18px #2a2a32, inset 0 0 0 1px rgba(193,150,60,0.33); }
}
@keyframes dgFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dgShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes dgPulseDot {
  0% { box-shadow: 0 0 0 0px rgba(76,175,80,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(76,175,80,0); }
  100% { box-shadow: 0 0 0 0px rgba(76,175,80,0); }
}
@keyframes dgFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes dgRotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes dgPulseBorder {
  0%, 100% { box-shadow: 0 0 0 0px rgba(193,150,60,0); }
  50% { box-shadow: 0 0 0 6px rgba(193,150,60,0.12); }
}
@keyframes dgCardPulse {
  0%, 100% { box-shadow: 4px 4px 14px #0d0d10, -2px -2px 8px #2a2a32, inset 0 0 0 1px #3a1a1a; }
  50% { box-shadow: 4px 4px 20px #0d0d10, -2px -2px 12px #2a2a32, inset 0 0 0 1px rgba(193,57,57,0.33); }
}
@keyframes dgDrawLine {
  from { height: 0; }
  to { height: 100%; }
}
@keyframes dgPulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(193,150,60,0.1); }
  50% { box-shadow: 0 0 40px rgba(193,150,60,0.2); }
}
@keyframes dgPulseGold {
  0% { box-shadow: 0 0 0 0 rgba(193,150,60,0.4); }
  70% { box-shadow: 0 0 0 15px rgba(193,150,60,0); }
  100% { box-shadow: 0 0 0 0 rgba(193,150,60,0); }
}
`;

export function glowCardStyle(extra = {}) {
  return {
    background: COLORS.bg,
    borderRadius: '28px',
    animation: 'dgGlowPulse 4s ease-in-out infinite, dgFadeUp 0.7s ease both',
    position:     'relative',
    overflow: 'hidden',
    fontFamily: FONTS.raleway,
    ...extra,
  };
}

export function tagStyle() {
  return {
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '3px',
    color: COLORS.gold,
    textTransform: 'uppercase',
    background: '#211e17',
    border: `1px solid ${COLORS.borderGold}`,
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block',
  };
}

export function goldGradientText() {
  return {
    background: 'linear-gradient(90deg, #c1963c, #e8d5a3, #c1963c)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'dgShimmer 3s linear infinite',
  };
}

export function glowBtnStyle() {
  return {
    fontFamily: FONTS.raleway,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: COLORS.gold,
    background: COLORS.card,
    border: `1px solid ${COLORS.borderGold}`,
    borderRadius: '30px',
    padding: '9px 20px',
    cursor: 'pointer',
    boxShadow: '3px 3px 8px #0f0f13, -2px -2px 6px #2d2c36',
    transition: 'all 0.25s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
  };
}
