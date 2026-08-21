import { COLORS, FONTS } from './shared';

const beneficiaries = [
  { icon: 'fa-home', text: 'Agentes Inmobiliarios' },
  { icon: 'fa-gavel', text: 'Abogados y Consultores' },
  { icon: 'fa-stethoscope', text: 'Médicos y Especialistas' },
  { icon: 'fa-briefcase', text: 'Vendedores y Ejecutivos' },
  { icon: 'fa-car', text: 'Asesores de Seguros / Autos' },
  { icon: 'fa-tools', text: 'Técnicos Especializados' },
  { icon: 'fa-laptop-code', text: 'Freelancers y Creativos' },
  { icon: 'fa-store', text: 'Dueños de Negocios Locales' },
];

const moreTags = ['Contadores', 'Arquitectos', 'Entrenadores Personales', 'Esteticistas', 'Fotógrafos', 'Psicólogos', 'Decoradores', 'Event Planner', 'Ingenieros'];

export default function SectionIndispensable() {
  return (
    <div style={containerStyle}>
      <style>{`
        .ind-item {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .ind-item:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(193,150,60,0.5) !important;
          box-shadow: 0 10px 22px rgba(0,0,0,0.4) !important;
        }
        .ind-tag:hover {
          background: rgba(193,150,60,0.12) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
      <div style={titleAreaStyle}>
        <h2 style={h2Style}>¿Por qué es indispensable?</h2>
        <p style={descStyle}>
          En la era digital, el papel se pierde o se olvida.
          Tu Tarjeta Profesional de Negocios vive en el celular de tu cliente,
          lista para generar ventas en un clic.
        </p>
      </div>
      <div style={utilityBoxStyle}>
        <i className="fas fa-rocket" style={{ fontSize: 42, color: COLORS.gold }} />
        <div>
          <strong style={{ color: COLORS.goldSoft, display: 'block', marginBottom: 8 }}>Utilidad Estratégica:</strong>
          Elimina la fricción. Con un solo botón, tus clientes pueden llamarte,
          escribirte por WhatsApp, ver tus productos o seguirte en redes sin errores de digitación.
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <h3 style={{ fontFamily: FONTS.cinzel, color: '#ffffff', fontSize: 22, textTransform: 'uppercase' }}>
          ¿A quiénes potencia esta herramienta?
        </h3>
      </div>
      <div style={gridStyle}>
        {beneficiaries.map((b, i) => (
          <div key={i} className="ind-item" style={itemStyle}>
            <i className={`fas ${b.icon}`} style={{ color: COLORS.gold, fontSize: 20, width: 30, textAlign: 'center', position: 'relative', zIndex: 2 }} />
            <span style={{ fontWeight: 600, color: '#ffffff', fontSize: 14, position: 'relative', zIndex: 2 }}>{b.text}</span>
          </div>
        ))}
      </div>
      <div style={moreStyle}>
        <span style={{ fontSize: 12, color: COLORS.gold, fontWeight: 800, letterSpacing: 2 }}>Y MUCHOS MÁS:</span>
        <div style={tagCloudStyle}>
          {moreTags.map((t, i) => (
            <span key={i} className="ind-tag" style={tagStyle}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  width: '100%', maxWidth: 850, margin: '36px auto',
  fontFamily: FONTS.raleway, color: '#ffffff',
  background: '#1a1a1f', borderRadius: 28, padding: 45,
  position: 'relative', overflow: 'hidden',
  boxShadow: '8px 8px 20px #0d0d10, -4px -4px 14px #2a2a32, inset 0 0 0 1px #2e2e3a',
};
const titleAreaStyle = {
  textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 2,
};
const h2Style = {
  fontFamily: FONTS.cinzel, fontSize: 32, fontWeight: 700,
  color: '#ffffff', lineHeight: 1.2, marginBottom: 15,
};
const descStyle = {
  color: '#c8c0b4', fontSize: 15, maxWidth: 650, margin: '0 auto',
  lineHeight: 1.8, fontWeight: 300,
};
const utilityBoxStyle = {
  background: COLORS.card, border: `1px solid ${COLORS.borderGold}`,
  padding: 28, borderRadius: 24, marginBottom: 40,
  display: 'flex', alignItems: 'center', gap: 20,
  boxShadow: '4px 4px 14px #0d0d10, -2px -2px 8px #2a2a32',
  position: 'relative', zIndex: 2,
};
const gridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 18, position: 'relative', zIndex: 2,
};
const itemStyle = {
  background: COLORS.card, padding: 22, borderRadius: 20,
  border: '1px solid #2f3138', display: 'flex', alignItems: 'center',
  gap: 15, transition: 'all 0.35s ease', position: 'relative', overflow: 'hidden',
};
const moreStyle = {
  marginTop: 35, textAlign: 'center', padding: 28,
  background: COLORS.card, borderRadius: 24,
  border: `1px solid ${COLORS.borderGold}`, position: 'relative', zIndex: 2,
};
const tagCloudStyle = {
  display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 15,
};
const tagStyle = {
  background: '#211e17', color: COLORS.gold, border: `1px solid ${COLORS.borderGold}`,
  padding: '8px 14px', borderRadius: 999, fontSize: 11,
  textTransform: 'uppercase', fontWeight: 700, letterSpacing: 1,
  transition: '0.25s ease',
};
