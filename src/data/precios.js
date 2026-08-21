// ════════════════════════════════════════════════════════════════
// FUENTE ÚNICA DE PRECIOS
// Los precios se cambian SOLO aquí. Todas las landings y el catálogo
// (tienda + producto) los importan y se actualizan automáticamente.
// ════════════════════════════════════════════════════════════════

export const PRECIOS = {
  // ── SITIOS WEB ─────────────────────────────────────────────
  vitrina: {
    display: '$750.000',
    original: '$1.500.000',
    nota: 'Inversión única · antes $1.500.000 (-50%)'
  },
  ecosistema: {
    display: '$1.200.000',
    original: '$2.400.000',
    nota: 'Inversión única · antes $2.400.000 (-50%) · MÁS POPULAR'
  },
  hub: {
    display: '$1.800.000',
    original: '$3.600.000',
    nota: 'Inversión única · antes $3.600.000 (-50%)'
  },
  tarjeta: {
    display: '$720.000',
    precio: '$720.000',
    nota: 'Inversión única · de por vida · Modelo PLUS'
  },

  // ── INTELIGENCIA ARTIFICIAL ─────────────────────────────────
  probador: {
    display: 'A consultar',
    nota: 'Precio de instalación a consultar'
  },
  pilotoPro: {
    display: '$55.000/mes',
    mensual: '$55.000',
    trimestral: '$110.000',
    mensualTxt: '55.000',
    trimestralTxt: '110.000',
    nota: 'o $110.000 trimestral (ahorras $55.000) · Licencia por período · Funciona en tu PC'
  },
  chatbot: {
    display: '$210.000/3 meses',
    precio: '$210.000',
    nota: 'Un solo plan · 3 meses · sin permanencia mínima'
  },

  // ── WHATSAPP AUTOMATION ─────────────────────────────────────
  envioMasivo: {
    display: '$135.000/3 meses',
    precio: '$135.000',
    nota: 'Inversión única · 3 meses · todo incluido'
  },
  calentador: {
    display: '$35.000/mes',
    precio: '$35.000',
    mensual: '$35.000',
    mensualTxt: '35.000',
    nota: 'Tarifa mensual · cancela cuando quieras'
  },

  // ── MINERÍA DE DATOS B2B ────────────────────────────────────
  extradata: {
    display: '$135.000 / 3 meses',
    nota: 'Licencia trimestral',
    mensual: '55,000',
    trimestral: '135,000',
    semestral: '190,000'
  },

  // ── AUDITORÍA ───────────────────────────────────────────────
  auditor: {
    display: 'A consultar',
    nota: 'Diagnóstico completo por especialista'
  }
};
