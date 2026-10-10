import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SiteNav from "../components/site-nav";
import MarketingAssistant from "../components/marketing-assistant";
import RadarNav from "../components/radar-nav";
import EmbeddedBridge from "../components/embedded-bridge";

const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2316a34a'/%3E%3Ctext x='50' y='70' font-size='54' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'%3EtC%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: { default: "TuConsultor — Consultoría de marketing", template: "%s · TuConsultor" },
  description: "Orientación práctica de marketing para entender prioridades, mejorar contenido y tomar mejores decisiones para tu negocio.",
  applicationName: "TuConsultor",
  authors: [{ name: "Soluciones Digitales" }],
  icons: { icon: ICON },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Soluciones Digitales · TuConsultor",
    title: "TuConsultor — Consultoría de marketing",
    description: "Orientación práctica para decidir qué hacer primero en el marketing de tu negocio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F0E8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col">
        <EmbeddedBridge />
        <SiteNav />
        <MarketingAssistant />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:px-8 sm:py-8">
          <div className="mb-8"><RadarNav /></div>
          {children}
        </main>
        <footer className="no-print mt-24 border-t border-sand-200/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
            <p className="max-w-xl text-xs leading-relaxed text-ink-500">
              <b className="font-semibold text-ink-800">TuConsultor · Soluciones Digitales</b> — orientación práctica de marketing para entender prioridades y convertirlas en acciones medibles.
            </p>
            <nav aria-label="Navegación secundaria" className="flex shrink-0 flex-wrap gap-x-8 gap-y-3 text-xs">
              <Link href="/metas" title="Elegir tus metas y compilar tu plan" className="text-ink-500 transition-colors hover:text-ink-900">Metas</Link>
              <Link href="/chequeo" title="Medir el estado real de tu negocio" className="text-ink-500 transition-colors hover:text-ink-900">Chequeo</Link>
              <Link href="/diagnostico" title="Diagnóstico conversacional" className="text-ink-500 transition-colors hover:text-ink-900">Diagnóstico</Link>
              <Link href="/informe" title="Tu informe de diagnóstico" className="text-ink-500 transition-colors hover:text-ink-900">Informe</Link>
              <Link href="/recursos" title="Guías de publicidad y crecimiento" className="text-ink-500 transition-colors hover:text-ink-900">Guías</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

