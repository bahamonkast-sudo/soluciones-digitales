import { COLORS, FONTS } from './shared';

const garantias = [
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Acompañamiento 1 a 1',
    desc: 'No te entregamos una herramienta y nos vamos. Tienes soporte directo para asegurar que la implementación sea perfecta.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
    title: 'Garantía de Funcionamiento',
    desc: 'Certificamos que cada chatbot, flujo y embudo opere sin fallos técnicos, garantizando la fluidez de tus prospectos.',
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>,
    title: 'Optimización de Activos',
    desc: 'Tu inversión se traduce en activos digitales de tu propiedad que incrementan el valor comercial de tu marca día a día.',
  },
];

export default function Section07Blindaje() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '36px 16px', boxSizing: 'border-box', background: 'rgba(20,20,23,0.55)' }}>
      <style>{`
        .blind-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .blind-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(193,150,60,0.5) !important;
          box-shadow: 0 18px 35px rgba(0,0,0,0.45), 0 0 30px rgba(193,150,60,0.08) !important;
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <span style={tagStyle}>El Blindaje</span>
            <h2 style={tituloStyle}>Garantías y <span style={spanStyle}>Soporte Elite</span></h2>
          </div>
          <div style={gridStyle}>
            {garantias.map((g, i) => (
              <div key={i} className="blind-card" style={{ ...cardStyle, animationDelay: `${0.1 + i * 0.1}s` }}>
                <div style={iconBoxStyle}>{g.icon}</div>
                <h3 style={{ fontFamily: FONTS.cinzel, fontSize: 18, color: COLORS.goldSoft, marginBottom: 12 }}>{g.title}</h3>
                <p style={{ fontSize: 14, color: '#c8c0b4', lineHeight: 1.6, fontWeight: 300 }}>{g.desc}</p>
              </div>
            ))}
          </div>
          <div style={corresponsabilidadStyle}>
            <h4 style={{ fontFamily: FONTS.cinzel, fontSize: 16, color: COLORS.gold, letterSpacing: 2, marginBottom: 15, textTransform: 'uppercase' }}>
              Compromiso de Resultados
            </h4>
            <p style={{ fontSize: 15, color: '#ffffff', lineHeight: 1.8, maxWidth: 700, margin: '0 auto', fontWeight: 300 }}>
              Entendemos la tecnología como un multiplicador. Nuestra labor es entregarte la <strong style={{ color: COLORS.goldSoft, fontWeight: 600 }}>maquinaria digital de mayor precisión</strong>, pero el éxito rotundo depende de una alianza:
              la <strong style={{ color: COLORS.goldSoft, fontWeight: 600 }}>constancia</strong> en tus canales, la <strong style={{ color: COLORS.goldSoft, fontWeight: 600 }}>calidad de tu contenido</strong> y la <strong style={{ color: COLORS.goldSoft, fontWeight: 600 }}>presentación impecable</strong> de tus servicios en redes son el combustible que hace que este motor genere ventas exponenciales.
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
  textAlign: 'center', marginBottom: 50, animation: 'dgFadeUp 0.8s ease both',
};
const tagStyle = {
  fontSize: 11, fontWeight: 600, letterSpacing: 4, color: COLORS.gold,
  textTransform: 'uppercase', marginBottom: 12, display: 'block',
};
const tituloStyle = {
  fontFamily: FONTS.cinzel, fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, lineHeight: 1.2,
};
const spanStyle = { color: COLORS.gold };
const gridStyle = {
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 25, marginBottom: 50,
};
const cardStyle = {
  background: '#1a1a1f', border: '1px solid #2e2e3a', borderRadius: 24,
  padding: 30, position: 'relative', transition: 'all 0.3s ease',
  animation: 'dgFadeUp 0.8s ease both',
};
const iconBoxStyle = {
  width: 50, height: 50, background: 'rgba(193,150,60,0.1)', borderRadius: 12,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: COLORS.gold, marginBottom: 20,
};
const corresponsabilidadStyle = {
  background: 'linear-gradient(145deg, #1f1e24 0%, #141417 100%)',
  border: '1px solid rgba(193,150,60,0.2)', borderRadius: 24,
  padding: 40, textAlign: 'center',
  animation: 'dgFadeUp 1s ease 0.4s both',
  position: 'relative', overflow: 'hidden',
};
