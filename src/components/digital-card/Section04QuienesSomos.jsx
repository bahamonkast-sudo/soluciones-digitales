import { glowCardStyle, COLORS, FONTS, goldGradientText } from './shared';

const pilares = [
  'Automatización inteligente',
  'Estrategia con datos reales',
  'Contenido generativo',
  'Publicidad optimizada por IA',
];

export default function Section04QuienesSomos() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box', background: 'rgba(20,20,23,0.55)' }}>
      <style>{responsiveStyle}</style>
      <div style={{ width: '100%', maxWidth: 854 }}>
        <div style={wrapStyle}>
          <div style={beforeStyle} />
          <span style={tagStyle()}>Quiénes Somos</span>
          <div style={tituloStyle}>
            Donde la <span style={goldGradientText()}>Inteligencia Artificial</span> se convierte en ventas
          </div>
          <div style={dividerStyle} />

          <div style={layoutStyle} className="qs-layout">
            {/* Columna visual */}
            <div style={colVisualStyle}>
              <div style={iaCircleStyle}>
                <div style={iaCircleBeforeStyle} />
                <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
                  <circle cx="32" cy="32" r="20" stroke="#c1963c" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="32" cy="32" r="12" fill="#211e17" stroke="#c1963c44" strokeWidth="1" />
                  <circle cx="32" cy="14" r="3" fill="#c1963c" />
                  <circle cx="32" cy="50" r="3" fill="#c1963c" />
                  <circle cx="14" cy="32" r="3" fill="#c1963c" />
                  <circle cx="50" cy="32" r="3" fill="#c1963c" />
                  <circle cx="19" cy="19" r="2.5" fill="#e8d5a3" />
                  <circle cx="45" cy="19" r="2.5" fill="#e8d5a3" />
                  <circle cx="19" cy="45" r="2.5" fill="#e8d5a3" />
                  <circle cx="45" cy="45" r="2.5" fill="#e8d5a3" />
                  <line x1="32" y1="17" x2="32" y2="20" stroke="#c1963c66" strokeWidth="1" />
                  <line x1="32" y1="44" x2="32" y2="47" stroke="#c1963c66" strokeWidth="1" />
                  <line x1="17" y1="32" x2="20" y2="32" stroke="#c1963c66" strokeWidth="1" />
                  <line x1="44" y1="32" x2="47" y2="32" stroke="#c1963c66" strokeWidth="1" />
                  <circle cx="32" cy="32" r="4" fill="#c1963c" />
                </svg>
              </div>
              <div style={{ fontFamily: FONTS.cinzel, fontSize: 11, fontWeight: 700, letterSpacing: 3, color: COLORS.gold, textTransform: 'uppercase', textAlign: 'center' }}>
                IA aplicada
              </div>
              <div style={pilaresStyle}>
                {pilares.map((p, i) => (
                  <div key={i} className="qs-pilar" style={pilarStyle}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.gold, flexShrink: 0, boxShadow: '0 0 8px #c1963c' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#c8c0b4', letterSpacing: 0.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna texto */}
            <div style={colTextoStyle}>
              <p style={parrafoStyle}>
                En <strong style={strongStyle}>Soluciones Digitales</strong> no hacemos marketing tradicional.
                Usamos <strong style={strongStyle}>Inteligencia Artificial</strong> como motor central de cada
                estrategia para que tu negocio compita con las herramientas que hoy solo
                tienen las grandes empresas.
              </p>
              <p style={parrafoStyle}>
                Analizamos tu mercado, automatizamos tus procesos de captación y creamos
                contenido que conecta con tu cliente ideal, todo respaldado por
                <strong style={strongStyle}> datos, algoritmos y resultados medibles</strong>.
              </p>
              <p style={parrafoStyle}>
                No vendemos promesas. Construimos <strong style={strongStyle}>sistemas digitales que trabajan
                por ti</strong> mientras tú te enfocas en hacer crecer tu negocio.
              </p>
              <div style={citaStyle}>
                <p style={{ fontSize: 'clamp(13px, 1.6vw, 15px)', fontStyle: 'italic', fontWeight: 300, color: '#ffffff', lineHeight: 1.7 }}>
                  &ldquo;La Inteligencia Artificial no reemplaza tu negocio, lo potencia. Nosotros somos el puente entre esa tecnología y tus resultados.&rdquo;
                </p>
                <div style={{ marginTop: 8, fontSize: 11, fontWeight: 600, letterSpacing: 1, color: COLORS.gold, textTransform: 'uppercase' }}>
                  — Guillermo Castellanos, Fundador & CEO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapStyle = {
  ...glowCardStyle(),
  padding: '44px 48px',
  border: '1px solid #2e2e3a',
};
const beforeStyle = {
  position: 'absolute', top: -80, right: -60,
  width: 340, height: 340,
  background: 'radial-gradient(circle, rgba(193,150,60,0.06) 0%, transparent 70%)',
  pointerEvents: 'none',
};
const tagStyle = () => ({
  fontSize: 10, fontWeight: 600, letterSpacing: 3, color: COLORS.gold,
  textTransform: 'uppercase', background: '#211e17',
  border: `1px solid ${COLORS.borderGold}`, padding: '4px 12px',
  borderRadius: 20, display: 'inline-block', marginBottom: 16,
  animation: 'dgFadeUp 0.6s ease 0.1s both',
});
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700,
  color: '#ffffff', lineHeight: 1.2, marginBottom: 10,
  animation: 'dgFadeUp 0.6s ease 0.15s both',
};
const dividerStyle = {
  width: 50, height: 1,
  background: 'linear-gradient(90deg, transparent, #c1963c, transparent)',
  margin: '18px 0 28px', animation: 'dgFadeUp 0.6s ease 0.2s both',
};
const layoutStyle = {
  display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32, alignItems: 'start',
  animation: 'dgFadeUp 0.6s ease 0.25s both',
};
// Add responsive styles
const responsiveStyle = `
  @media (max-width: 768px) {
    .qs-layout {
      display: flex !important;
      flex-direction: column !important;
    }
  }
  .qs-pilar {
    transition: all 0.3s ease !important;
  }
  .qs-pilar:hover {
    transform: translateX(8px) !important;
    border-color: rgba(193,150,60,0.5) !important;
    box-shadow: 0 6px 18px rgba(0,0,0,0.35) !important;
  }
`;
const colVisualStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
};
const iaCircleStyle = {
  width: 140, height: 140, borderRadius: '50%', background: COLORS.card,
  border: '1px solid rgba(193,150,60,0.27)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', position: 'relative',
  animation: 'dgPulseBorder 3s ease-in-out infinite, dgFloat 6s ease-in-out infinite',
};
const iaCircleBeforeStyle = {
  position: 'absolute',
  width: 160, height: 160, borderRadius: '50%',
  border: '1px dashed rgba(193,150,60,0.13)',
  animation: 'dgRotateSlow 12s linear infinite',
};
const pilaresStyle = {
  display: 'flex', flexDirection: 'column', gap: 8, width: '100%',
};
const pilarStyle = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: COLORS.card, border: '1px solid #2e2c38',
  borderRadius: 12, padding: '10px 14px',
  transition: 'all 0.25s ease',
};
const colTextoStyle = {
  display: 'flex', flexDirection: 'column', gap: 18,
};
const parrafoStyle = {
  fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 300,
  color: '#c8c0b4', lineHeight: 1.85,
};
const strongStyle = {
  color: '#ffffff', fontWeight: 600,
  borderBottom: '1px solid rgba(193,150,60,0.2)',
};
const citaStyle = {
  borderLeft: '2px solid #c1963c', padding: '14px 18px',
  background: COLORS.card, borderRadius: '0 12px 12px 0',
  marginTop: 10, boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
};
