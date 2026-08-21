import { glowCardStyle, COLORS, FONTS, goldGradientText, tagStyle } from './shared';

const pains = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="11"/><line x1="11" y1="14" x2="11.01" y2="14"/></svg>,
    pregunta: '¿Tu equipo pierde horas respondiendo mensajes manuales sin cerrar ventas?',
    desc: 'La atención manual quema el tiempo de tu equipo. Sin un Agente Autónomo que califique y venda 24/7, estás perdiendo prospectos en las madrugadas o por demoras.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    pregunta: '¿Las cuentas de WhatsApp de tu empresa sufren bloqueos constantes?',
    desc: 'Hacer difusión sin una estrategia de calentamiento e Inteligencia Artificial te cuesta números bloqueados y campañas que nunca llegan al cliente final.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#c1963c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    pregunta: '¿Te faltan prospectos B2B reales con presupuesto para invertir?',
    desc: 'Esperar a que el cliente llegue es el camino lento. Quien no extrae datos (Minería B2B) y busca agresivamente a los dueños de negocios, se queda atrás.',
  },
];

export default function Section03Diagnostico() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box' }}>
      <style>{`
        .diag-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .diag-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          border-color: #c1963c !important;
          box-shadow: 0 15px 30px rgba(193,150,60,0.15) !important;
          z-index: 10;
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 854 }}>
        <div style={wrapStyle}>
          <div style={beforeStyle} />
          <div style={afterStyle} />

          <div style={headerStyle}>
            <span style={tagStyle()}>Diagnóstico del Dolor</span>
            <div style={tituloStyle}>¿Tu negocio existe en internet... o solo crees que sí?</div>
            <div style={dividerStyle} />
            <p style={subtituloStyle}>
              Cada día que pasa sin <strong style={shimmerStyle}>visibilidad real</strong>, tu competencia
              te está quitando los clientes que deberían ser tuyos.
            </p>
          </div>

          <div style={gridStyle}>
            {pains.map((p, i) => (
              <div key={i} className="diag-card" style={{ ...cardStyle, animationDelay: `${i * 0.8}s` }}>
                <div style={cardIconStyle}>{p.icon}</div>
                <div style={cardPreguntaStyle}>{p.pregunta}</div>
                <div style={cardDescStyle}>{p.desc}</div>
                <div style={cardLineStyle} />
              </div>
            ))}
          </div>

          <div style={ctaWrapStyle}>
            <p style={ctaTextStyle}>
              Si te identificaste con alguna de estas situaciones,{' '}
              <strong style={{ color: COLORS.gold, fontWeight: 600, fontStyle: 'normal' }}>
                tu negocio necesita una solución ahora
              </strong>, no mañana.
            </p>
            <a style={ctaBtnStyle} href="tel:+573115893220">
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              Hablemos ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapStyle = {
  ...glowCardStyle(),
  padding: '44px 48px',
};
const beforeStyle = {
  position: 'absolute', top: -80, right: -60,
  width: 320, height: 320,
  background: 'radial-gradient(circle, rgba(193,150,60,0.06) 0%, transparent 70%)',
  pointerEvents: 'none',
};
const afterStyle = {
  position: 'absolute', bottom: -60, left: -40,
  width: 240, height: 240,
  background: 'radial-gradient(circle, rgba(193,150,60,0.04) 0%, transparent 70%)',
  pointerEvents: 'none',
};
const headerStyle = { marginBottom: 32, animation: 'dgFadeUp 0.6s ease 0.1s both' };
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700,
  color: '#ffffff', lineHeight: 1.2, marginBottom: 10,
};
const dividerStyle = {
  width: 50, height: 1,
  background: 'linear-gradient(90deg, transparent, #c1963c, transparent)',
  margin: '20px 0 32px',
};
const subtituloStyle = {
  fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 300, color: '#c8c0b4',
  lineHeight: 1.7, maxWidth: 580,
};
const shimmerStyle = { ...goldGradientText(), fontWeight: 600 };
const gridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 16, animation: 'dgFadeUp 0.6s ease 0.3s both',
};
const cardStyle = {
  background: COLORS.card, borderRadius: 20, padding: '28px 22px',
  border: '1px solid #3a2a1a',
  position: 'relative', overflow: 'hidden',
  display: 'flex', flexDirection: 'column', gap: 14,
  cursor: 'default',
};
const cardIconStyle = {
  width: 40, height: 40, borderRadius: 12, background: 'rgba(193,150,60,0.08)',
  border: '1px solid rgba(193,150,60,0.3)', display: 'flex',
  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
const cardPreguntaStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(13px, 1.5vw, 15px)',
  fontWeight: 700, color: '#ffffff', lineHeight: 1.4,
};
const cardDescStyle = {
  fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: 300,
  color: '#c8c0b4', lineHeight: 1.7,
};
const cardLineStyle = {
  height: 2, borderRadius: 2,
  background: 'linear-gradient(90deg, #c1963c, transparent)',
  marginTop: 'auto',
};
const ctaWrapStyle = {
  marginTop: 32, display: 'flex', alignItems: 'center',
  justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
  animation: 'dgFadeUp 0.6s ease 0.5s both',
};
const ctaTextStyle = {
  fontSize: 'clamp(13px, 1.6vw, 15px)', fontWeight: 300, fontStyle: 'italic',
  color: '#c8c0b4', maxWidth: 480, lineHeight: 1.6,
};
const ctaBtnStyle = {
  fontFamily: FONTS.raleway, fontSize: 11, fontWeight: 600,
  letterSpacing: 1.5, textTransform: 'uppercase', color: COLORS.gold,
  background: COLORS.card, border: `1px solid ${COLORS.borderGold}`,
  borderRadius: 30, padding: '10px 24px', cursor: 'pointer',
  boxShadow: '3px 3px 8px #0f0f13, -2px -2px 6px #2d2c36',
  transition: 'all 0.25s ease', textDecoration: 'none',
  display: 'inline-flex', alignItems: 'center', gap: 8,
  whiteSpace: 'nowrap',
};
