/** @type {import('tailwindcss').Config} */
// ============================================================================
// ESTILO tuConsultor — "Cálido y elevado"
// ----------------------------------------------------------------------------
// Tres reglas que gobiernan todo:
//  1. PROFUNDIDAD CÁLIDA: las cajas no llevan borde duro; flotan sobre crema
//     con dos sombras superpuestas (contacto + difusión) teñidas de marrón
//     cálido, nunca de negro puro. Eso da volumen sin parecer "corporativo".
//  2. TÍTULOS CON RELIEVE: los titulares llevan un brillo de 1 px y un halo
//     cálido, como letra impresa en papel grueso. En superficies oscuras el
//     halo pasa a negro para dar profundidad.
//  3. AMABILIDAD: radios generosos, verde de marca con moderación, acento
//     dorado para destacar, y micro-movimiento (elevarse al pasar el ratón).
// ============================================================================
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#0b3a22",
          950: "#04190f",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        cream: "#F3F0E8",
        ivory: "#FFFDF8",
        sand: {
          50: "#FEFBF6",
          100: "#FBF3E6",
          200: "#F1E5D2",
          300: "#E8D5B0",
          400: "#EFC57F",
        },
        gold: {
          100: "#FDF0D5",
          300: "#E7C777",
          500: "#C99524",
          700: "#8A6512",
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.1rem' }],
      },
      letterSpacing: {
        tightest: '-0.035em',
        kicker: '0.18em',
      },
      borderRadius: {
        xl2: '1.25rem',
        '4xl': '2rem',
      },
      // Dos capas por sombra: una de contacto (nítida y corta) y otra de
      // difusión (amplia y suave). Tinte cálido rgba(122,92,44) en vez de negro.
      boxShadow: {
        hairline: '0 0 0 1px rgba(122,92,44,.07)',
        'ring-hairline': '0 0 0 1px rgba(122,92,44,.07)',
        soft: '0 1px 2px rgba(122,92,44,.06), 0 10px 26px -14px rgba(122,92,44,.28)',
        card: '0 1px 2px rgba(122,92,44,.07), 0 6px 14px -8px rgba(122,92,44,.16), 0 24px 48px -26px rgba(122,92,44,.22)',
        'card-hover': '0 1px 2px rgba(122,92,44,.08), 0 12px 26px -12px rgba(122,92,44,.22), 0 40px 72px -32px rgba(122,92,44,.28)',
        lift: '0 2px 6px rgba(122,92,44,.08), 0 30px 60px -30px rgba(122,92,44,.30)',
        sunken: 'inset 0 1px 2px rgba(122,92,44,.10), inset 0 -1px 0 rgba(255,255,255,.6)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.7)',
        panel: '0 40px 80px -40px rgba(4,25,15,.55), 0 2px 6px -2px rgba(4,25,15,.20)',
        glow: '0 0 0 1px rgba(22,101,52,.12), 0 18px 44px -22px rgba(22,101,52,.40)',
        gold: '0 1px 2px rgba(122,92,44,.10), 0 16px 34px -18px rgba(201,149,36,.45)',
      },
      backgroundImage: {
        'brand-deep': 'linear-gradient(155deg, #062b17 0%, #0b3a22 55%, #04190f 100%)',
        panel: 'linear-gradient(155deg, #062a1a 0%, #0a3a24 58%, #041a10 100%)',
        'brand-mist': 'linear-gradient(180deg, #f4fbf6 0%, #ffffff 78%)',
        'sand-mist': 'linear-gradient(180deg, #FEFBF6 0%, #ffffff 80%)',
        // Superficie de tarjeta: blanco con una gota de calor abajo.
        cardface: 'linear-gradient(180deg, #ffffff 0%, #FFFDF8 62%, #FEFBF6 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(160%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
        sheen: 'sheen 2.4s ease-in-out infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22,.61,.36,1)',
        spring: 'cubic-bezier(.34,1.4,.64,1)',
      },
    },
  },
  plugins: [],
};
