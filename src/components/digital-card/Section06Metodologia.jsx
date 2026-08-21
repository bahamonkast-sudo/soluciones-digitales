import { COLORS, FONTS } from './shared';

const phases = [
  {
    num: '01',
    title: 'Diagnóstico Inicial',
    items: [
      {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
        label: 'Auditoría de Ecosistema',
        desc: 'Analizamos tu presencia digital actual y detectamos fugas de clientes potenciales.',
      },
      {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 19h6"/><path d="M19 16v6"/></svg>,
        label: 'Definición de KPIs',
        desc: 'Establecemos métricas claras de éxito: ventas, leads y retorno de inversión (ROI).',
      },
    ],
  },
  {
    num: '02',
    title: 'Ejecución de Precisión',
    items: [
      {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>,
        label: 'Despliegue Tecnológico',
        desc: 'Implementación de Web UX, Chatbots y automatizaciones configuradas para tu nicho.',
      },
      {
        icon: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/></svg>,
        label: 'Optimización Algorítmica',
        desc: 'Ajuste constante basado en datos reales para maximizar la conversión día tras día.',
      },
    ],
  },
];

export default function Section06Metodologia() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box', background: 'rgba(20,20,23,0.55)' }}>
      <style>{`
        .mtd-phase {
          transition: all 0.4s ease !important;
        }
        .mtd-phase:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(193,150,60,0.5) !important;
          box-shadow: 0 18px 35px rgba(0,0,0,0.4), 0 0 25px rgba(193,150,60,0.06) !important;
        }
        @media (max-width: 768px) { .mtd-phase { padding: 24px !important; } }
      `}</style>
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <span style={tagStyle}>La Lógica</span>
            <h2 style={tituloStyle}>Nuestra <span style={spanStyle}>Metodología</span> de Precisión</h2>
          </div>
          <div style={timelineStyle}>
            {phases.map((phase, i) => (
              <div key={i} className="mtd-phase" style={{ ...phaseCardStyle, animationDelay: `${0.2 + i * 0.2}s` }}>
                <div style={phaseDotStyle} />
                <div style={phaseHeaderStyle}>
                  <span style={phaseNumberStyle}>{phase.num}</span>
                  <h3 style={phaseTitleStyle}>{phase.title}</h3>
                </div>
                <div style={phaseContentStyle}>
                  {phase.items.map((item, j) => (
                    <div key={j} style={stepItemStyle}>
                      <div style={{ color: COLORS.gold, flexShrink: 0, marginTop: 3 }}>{item.icon}</div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>{item.label}</h4>
                        <p style={{ fontSize: 13, fontWeight: 300, color: '#c8c0b4', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={safetyStyle}>
            <p style={{ fontSize: 14, color: COLORS.goldSoft, fontStyle: 'italic' }}>
              &ldquo;Un proceso documentado elimina la incertidumbre y garantiza resultados replicables.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  width: '100%', fontFamily: FONTS.raleway, color: '#ffffff',
};
const headerStyle = {
  textAlign: 'center', marginBottom: 60, animation: 'dgFadeUp 0.8s ease both',
};
const tagStyle = {
  fontSize: 11, fontWeight: 600, letterSpacing: 4, color: COLORS.gold,
  textTransform: 'uppercase', marginBottom: 12, display: 'block',
};
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, lineHeight: 1.2,
};
const spanStyle = { color: COLORS.gold };
const timelineStyle = {
  position: 'relative', display: 'flex', flexDirection: 'column', gap: 40, paddingLeft: 40,
};
const phaseCardStyle = {
  position: 'relative', background: '#1a1a1f', border: '1px solid #2e2e3a',
  borderRadius: 20, padding: 30, transition: 'all 0.4s ease',
  animation: 'dgFadeUp 0.8s ease both',
};
const phaseDotStyle = {
  position: 'absolute', left: -33, top: 35, width: 16, height: 16,
  background: '#141417', border: '2px solid #c1963c', borderRadius: '50%',
  zIndex: 2, boxShadow: '0 0 10px rgba(193,150,60,0.4)',
};
const phaseHeaderStyle = {
  display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20,
};
const phaseNumberStyle = {
  fontFamily: FONTS.cinzel, fontSize: 14, fontWeight: 700,
  color: COLORS.gold, background: 'rgba(193,150,60,0.1)',
  padding: '5px 12px', borderRadius: 8, border: '1px solid rgba(193,150,60,0.2)',
};
const phaseTitleStyle = {
  fontFamily: FONTS.cinzel, fontSize: 20, fontWeight: 700, color: COLORS.goldSoft,
};
const phaseContentStyle = {
  display: 'grid', gridTemplateColumns: '1fr', gap: 20,
};
const stepItemStyle = {
  display: 'flex', alignItems: 'flex-start', gap: 12,
};
const safetyStyle = {
  marginTop: 40, textAlign: 'center', padding: 20,
  background: 'rgba(193,150,60,0.05)',
  border: '1px dashed rgba(193,150,60,0.3)', borderRadius: 15,
  animation: 'dgFadeUp 1s ease 0.6s both',
};
