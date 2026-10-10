import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guías de publicidad y crecimiento",
  description: "Guías prácticas en español para investigar anuncios y planear publicidad en Meta y Google.",
};

const FUENTES = {
  meta: "https://www.facebook.com/business/",
  biblioteca: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CO",
  googleObjetivos: "https://support.google.com/google-ads/answer/6238033?hl=es",
  googleMetricas: "https://support.google.com/google-ads/answer/1722036?hl=es",
};

function Fuente({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">
      {children}<span aria-hidden>↗</span>
    </a>
  );
}

function Paso({ numero, titulo, children }: { numero: string; titulo: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="marker-quiet !h-7 !w-7 !text-2xs">{numero}</span>
      <div><b className="text-sm font-semibold text-ink-900">{titulo}</b><p className="muted mt-1">{children}</p></div>
    </li>
  );
}

export default function Recursos() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 sm:space-y-20">
      <header className="max-w-3xl">
        <p className="eyebrow">TuConsultor · centro de recursos</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Ideas para anunciar con intención</h1>
        <p className="lead mt-6">Entiende qué hace cada plataforma, qué observar y cómo convertir una idea en una prueba útil para tu negocio. Esta guía está escrita por tuConsultor; no reproduce artículos ni materiales de terceros.</p>
        <nav aria-label="Secciones de esta guía" className="mt-8 flex flex-wrap gap-2">
          <a className="chip chip-neutral transition-colors hover:bg-brand-50" href="#meta">Meta Business</a>
          <a className="chip chip-neutral transition-colors hover:bg-brand-50" href="#biblioteca">Biblioteca de anuncios</a>
          <a className="chip chip-neutral transition-colors hover:bg-brand-50" href="#google">Google Ads</a>
        </nav>
      </header>

      <section id="meta" className="scroll-mt-28 card card-hover">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">01 · Descubrir y despertar interés</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Meta Business: convierte atención en conversaciones</h2>
          </div>
          <span className="chip chip-good">Facebook · Instagram · Messenger</span>
        </div>
        <p className="lead mt-5 max-w-3xl">Meta puede ayudar a presentar tu oferta a personas que todavía no la están buscando. La creatividad tiene que explicar rápido a quién ayudas, qué problema resuelves y cuál es el siguiente paso.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="panel-flat">
            <h3 className="text-base">Una forma sencilla de plantearlo</h3>
            <ol className="mt-5 space-y-5">
              <Paso numero="1" titulo="Define el resultado">Elige una sola acción principal: recibir consultas, generar reservas o vender un producto.</Paso>
              <Paso numero="2" titulo="Construye el mensaje">Muestra una necesidad concreta, tu propuesta y una prueba o razón para confiar.</Paso>
              <Paso numero="3" titulo="Mide el paso completo">Revisa cuántas consultas llegan y cuántas se convierten en ventas; el alcance por sí solo no cuenta toda la historia.</Paso>
            </ol>
          </div>
          <div className="card-quiet">
            <h3 className="text-base">Qué probar en tu negocio</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700">
              <li>• Un video corto que demuestre el producto o el proceso.</li>
              <li>• Una pieza que responda a una objeción frecuente.</li>
              <li>• Una oferta clara con llamada a la acción y destino coherente.</li>
            </ul>
            <p className="tiny mt-5">Cambia una variable por prueba —mensaje, formato u oferta— y anota el resultado antes de decidir qué repetir.</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Fuente href={FUENTES.meta}>Referencia oficial: Meta Business</Fuente>
          <Link href="/metas" className="btn-primary btn-sm">Conectar con mis metas <span aria-hidden>→</span></Link>
        </div>
      </section>

      <section id="biblioteca" className="scroll-mt-28 card card-hover">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">02 · Investigar antes de crear</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Biblioteca de anuncios: observa el mercado</h2>
          </div>
          <span className="chip chip-warn">Investigación pública</span>
        </div>
        <p className="lead mt-5 max-w-3xl">La biblioteca permite buscar anuncios visibles en las plataformas de Meta. Úsala para entender cómo distintas marcas presentan sus ofertas y qué temas aparecen en tu categoría; úsala como investigación, no como una tabla de resultados comerciales.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-[.9fr_1.1fr]">
          <div className="card-sand">
            <h3 className="text-base">Recorrido de cinco minutos</h3>
            <ol className="mt-5 space-y-5">
              <Paso numero="1" titulo="Ajusta el país">Selecciona Colombia y la categoría de todos los anuncios.</Paso>
              <Paso numero="2" titulo="Busca con intención">Prueba el nombre de una marca, una categoría o la necesidad que resuelve.</Paso>
              <Paso numero="3" titulo="Registra patrones">Anota el gancho, la oferta, la prueba, el formato y el llamado a la acción.</Paso>
              <Paso numero="4" titulo="Formula una hipótesis">Adapta el principio a tu cliente y a tu propuesta; crea una pieza propia y mide su respuesta.</Paso>
            </ol>
          </div>
          <div className="panel">
            <h3 className="text-base">Ficha para analizar un anuncio</h3>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[["A quién parece hablarle", "¿Qué situación o deseo describe?"], ["Qué promete", "¿Qué cambio concreto ofrece?"], ["Qué genera confianza", "¿Muestra proceso, evidencia o experiencia?"], ["Qué pide hacer", "¿El siguiente paso es simple y claro?"], ["A dónde conduce", "¿La página o conversación cumple la promesa?"], ["Qué adaptar", "¿Qué idea puedes reinterpretar sin copiar?" ]].map(([label, question]) => (
                <div key={label} className="rounded-xl border border-sand-200/70 bg-white/75 p-3">
                  <dt className="text-xs font-semibold text-ink-900">{label}</dt><dd className="tiny mt-1">{question}</dd>
                </div>
              ))}
            </dl>
            <p className="tiny mt-5">Que un anuncio siga activo no demuestra que sea rentable ni que tenga buenos resultados: úsalo para observar mensajes y formatos, no para adivinar su desempeño.</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Fuente href={FUENTES.biblioteca}>Abrir Biblioteca de anuncios</Fuente>
          <a href="#google" className="btn-ghost btn-sm">Comparar con búsquedas en Google <span aria-hidden>↓</span></a>
        </div>
      </section>

      <section id="google" className="scroll-mt-28 card card-hover">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="eyebrow">03 · Responder a una búsqueda</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">Google Ads: aparece cuando existe intención</h2>
          </div>
          <span className="chip chip-info">Búsqueda · video · otros formatos</span>
        </div>
        <p className="lead mt-5 max-w-3xl">En búsqueda, una persona expresa con sus palabras lo que necesita. La oportunidad está en conectar esa consulta con una solución concreta, una página pertinente y una medición de lo que ocurre después del clic.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="panel"><span className="num text-sm font-bold text-brand-700">A</span><h3 className="mt-3 text-base">Empieza por una necesidad</h3><p className="muted mt-2">Agrupa búsquedas cercanas a la misma oferta y separa las consultas que no corresponden a tu negocio.</p></div>
          <div className="panel"><span className="num text-sm font-bold text-brand-700">B</span><h3 className="mt-3 text-base">Haz coincidir el destino</h3><p className="muted mt-2">Cada anuncio debe llevar a la página o acción que responde a esa búsqueda, no a una portada genérica.</p></div>
          <div className="panel"><span className="num text-sm font-bold text-brand-700">C</span><h3 className="mt-3 text-base">Mide valor, no solo clics</h3><p className="muted mt-2">Configura la medición de contactos o ventas y compara el costo con el valor real que producen.</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Fuente href={FUENTES.googleObjetivos}>Referencia oficial: objetivos de Google Ads</Fuente>
          <Fuente href={FUENTES.googleMetricas}>Qué medir según tu objetivo</Fuente>
        </div>
      </section>

      <section className="card-hero">
        <p className="eyebrow !text-brand-200">Una decisión antes de invertir</p>
        <h2 className="mt-3 text-2xl text-white sm:text-3xl">¿La gente ya busca lo que ofreces?</h2>
        <div className="mt-6 grid gap-6 text-sm leading-relaxed text-white/80 md:grid-cols-2">
          <p><b className="text-white">Si ya lo busca:</b> prueba responder a esa intención con una página específica y una conversión medible.</p>
          <p><b className="text-white">Si aún debe descubrirlo:</b> prueba una explicación visual, una demostración o una historia que haga visible el problema y la solución.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/chequeo" className="btn-light">Medir mi negocio <span aria-hidden>→</span></Link>
          <Link href="/metas" className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">Elegir una meta</Link>
        </div>
      </section>

      <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-ink-500">Las plataformas y sus herramientas pueden cambiar. Estas notas son orientación general de tuConsultor; revisa las páginas oficiales para conocer las funciones, requisitos y condiciones vigentes.</p>
    </div>
  );
}
