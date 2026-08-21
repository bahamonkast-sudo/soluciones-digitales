import { glowCardStyle, COLORS, FONTS, goldGradientText } from './shared';

const features = [
  { icon: 'fa-camera', label: 'Foto / Logo VIP' },
  { icon: 'fa-building', label: 'Identidad Corporativa' },
  { icon: 'fa-crown', label: 'Cargo Estratégico' },
  { icon: 'fa-bolt', label: 'Enlaces de Acción' },
  { icon: 'fa-map-marker-alt', label: 'Mapa Integrado' },
  { icon: 'fa-share-alt', label: 'Redes Sociales' },
];

export default function SectionPricing() {
  return (
    <div style={wrapperStyle}>
      <style>{`
        .px-feature, .px-btn {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .px-feature:hover {
          transform: translateY(-3px) !important;
          border-color: rgba(193,150,60,0.45) !important;
          box-shadow: 0 8px 20px rgba(0,0,0,0.35) !important;
        }
        .px-btn:hover {
          background: linear-gradient(135deg, #c1963c 0%, #a67c2e 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 10px 25px rgba(193,150,60,0.35) !important;
          transform: translateY(-3px) !important;
        }
      `}</style>
      <div style={pricingStyle}>
        <div style={pricingBeforeStyle} />
        <div style={pricingAfterStyle} />
        <div style={gridStyle}>
          {/* Izquierda */}
          <div>
            <span style={luxTagStyle}>Propiedad Intelectual y Comercial</span>
            <h2 style={luxTitleStyle}>
              Tarjeta Digital de <span style={goldGradientText()}>Negocios</span>
            </h2>
            <p style={luxDescStyle}>
              Desarrollamos una herramienta de alto impacto diseñada{' '}
              <strong style={{ color: COLORS.gold }}>bajo tus requerimientos</strong>.
              Sin distracciones, enfocada en proyectar autoridad,
              confianza y presencia digital profesional mediante nuestro{' '}
              <strong style={{ color: COLORS.gold }}>Modelo PLUS.</strong>
            </p>
            <div style={luxFeaturesStyle}>
              {features.map((f, i) => (
                <div key={i} className="px-feature" style={luxFeatureStyle}>
                  <i className={`fas ${f.icon}`} style={{ color: COLORS.gold }} />
                  <span style={{ color: '#fff', fontSize: 13 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Derecha */}
          <div style={luxPriceCardStyle}>
            <div style={luxBadgeStyle}>INVERSIÓN ÚNICA • DE POR VIDA</div>
            <div style={{ fontSize: 58, fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
              <span style={{ color: COLORS.gold }}>$</span>720.000
            </div>
            <div style={{ color: '#c8c0b4', fontSize: 12, letterSpacing: 1, marginBottom: 25 }}>
              SISTEMA PROPIO • SIN MENSUALIDADES
            </div>
            <a
              href="https://wa.me/573115893220?text=Hola%20Guillermo,%20quiero%20activar%20mi%20Tarjeta%20Digital%20de%20Negocios."
              target="_blank"
              rel="noopener"
              className="px-btn"
              style={luxBtnStyle}
            >
              EMPEZAR MI PROYECTO AHORA
            </a>
            <div style={{ marginTop: 18, fontSize: 12, color: '#9a9184', lineHeight: 1.6 }}>
              <i className="fas fa-shield-alt" style={{ color: COLORS.gold }} />
              {' '}Instalación rápida + instrucción estratégica incluida
            </div>
          </div>
        </div>
        <div style={luxFooterNoteStyle}>
          <strong style={{ color: COLORS.gold }}>Compromiso Soluciones Digitales:</strong>
          {' '}Estructura técnica de alta velocidad desarrollada siguiendo su visión de negocio.
          Hosting y dominio no incluidos.
        </div>
      </div>
    </div>
  );
}

const wrapperStyle = {
  width: '100%', maxWidth: 900, margin: '36px auto', padding: '0 16px',
  fontFamily: FONTS.raleway,
};
const pricingStyle = {
  ...glowCardStyle({ borderRadius: 32, padding: 50 }),
};
const pricingBeforeStyle = {
  position: 'absolute', top: -100, right: -80,
  width: 350, height: 350,
  background: 'radial-gradient(circle, rgba(193,150,60,0.06), transparent 70%)',
};
const pricingAfterStyle = {
  position: 'absolute', bottom: -80, left: -60,
  width: 250, height: 250,
  background: 'radial-gradient(circle, rgba(193,57,57,0.05), transparent 70%)',
};
const gridStyle = {
  display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 35,
  alignItems: 'center', position: 'relative', zIndex: 2,
};
const luxTagStyle = {
  display: 'inline-block', background: '#211e17',
  border: `1px solid ${COLORS.borderGold}`, color: COLORS.gold,
  padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700,
  letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20,
};
const luxTitleStyle = {
  fontFamily: FONTS.cinzel, fontSize: 34, color: '#fff',
  lineHeight: 1.2, marginBottom: 18,
};
const luxDescStyle = {
  color: '#c8c0b4', lineHeight: 1.8, fontSize: 15, marginBottom: 30,
};
const luxFeaturesStyle = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
};
const luxFeatureStyle = {
  background: COLORS.card, borderRadius: 18, padding: 14,
  border: '1px solid rgba(193,150,60,0.10)', display: 'flex',
  alignItems: 'center', gap: 10, transition: '0.3s',
};
const luxPriceCardStyle = {
  background: COLORS.card, borderRadius: 28, padding: 35,
  border: `1px solid ${COLORS.borderGold}`, textAlign: 'center',
  boxShadow: '4px 4px 14px #0d0d10, -2px -2px 8px #2a2a32',
};
const luxBadgeStyle = {
  display: 'inline-block', padding: '8px 16px', borderRadius: 999,
  background: '#211e17', border: `1px solid ${COLORS.borderGold}`,
  color: COLORS.gold, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 20,
};
const luxBtnStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  textDecoration: 'none', background: COLORS.card, color: COLORS.gold,
  border: `1px solid ${COLORS.borderGold}`, borderRadius: 999,
  padding: '16px 20px', fontSize: 12, fontWeight: 700, letterSpacing: 1,
  textTransform: 'uppercase', transition: '0.3s',
  boxShadow: '3px 3px 8px #0f0f13, -2px -2px 6px #2d2c36',
};
const luxFooterNoteStyle = {
  marginTop: 35, padding: 20, background: COLORS.card,
  borderRadius: 20, border: '1px solid rgba(193,150,60,0.12)',
  textAlign: 'center', color: '#c8c0b4', lineHeight: 1.7, fontSize: 13,
  position: 'relative', zIndex: 2,
};
