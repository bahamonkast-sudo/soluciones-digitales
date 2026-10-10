import Link from "next/link";
import GroqKeyField from "../components/groq-key";
import Icon from "../components/icon";
import Radar360 from "../components/radar360";
import HomeGuide from "../components/home-guide";
import { FACTORES } from "../lib/factors";

export default function Home() {
  return (
    <div className="home-page space-y-20 sm:space-y-28">
      {/* ------------------------------------------------------------------ */}
      {/* HERO — aire, una sola acción principal                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-10">
        <div className="pt-2">
          <p className="eyebrow">TuConsultor · ruta guiada</p>
          <h1 className="mt-5 max-w-2xl text-4xl leading-[1.02] sm:text-5xl lg:text-[3.65rem]">Entiende qué frena tus ventas y qué hacer primero</h1>
          <p className="lead mt-5 max-w-xl">En unos minutos identificarás tus principales oportunidades y recibirás acciones priorizadas para atraer clientes, convertir consultas y dar seguimiento. Elige una ruta y construye un plan que puedas medir.</p>
          <HomeGuide />
          <p className="tiny mt-4">No necesitas una clave de IA para comenzar. El recorrido funciona desde tu celular y puedes retomarlo por el camino que prefieras.</p>
        </div>
        <aside aria-label="Vista previa del diagnóstico 360 grados" className="relative isolate overflow-hidden rounded-[2rem] border border-brand-900/10 bg-gradient-to-br from-[#e9f1e9] via-[#f5f2e9] to-[#e9eee7] p-5 shadow-card sm:p-7 lg:mt-2">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Así funciona</p><h2 className="mt-2 text-2xl sm:text-3xl">Un recorrido. Un plan accionable.</h2></div><span className="chip chip-good">≈ 5 minutos</span></div>
          <div className="mt-5 grid grid-cols-3 gap-2">{[["01", "Entender"], ["02", "Priorizar"], ["03", "Actuar"]].map(([n, label]) => <div key={n} className="rounded-xl border border-white/80 bg-white/65 px-3 py-2.5 shadow-hairline"><span className="num text-2xs font-bold text-brand-700">{n}</span><p className="mt-1 text-xs font-semibold text-ink-800">{label}</p></div>)}</div>
          <div className="relative my-4 rounded-3xl border border-white/80 bg-white/35 px-3 pb-2 pt-12 sm:my-5 sm:px-4">
            <div className="flex justify-center"><Radar360 /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-soft"><p className="eyebrow-ink">Qué revisamos</p><p className="mt-1.5 text-sm font-semibold text-ink-900">15 factores del negocio</p><p className="tiny mt-1">Desde tu oferta y visibilidad hasta conversión y seguimiento.</p></div>
            <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-soft"><p className="eyebrow-ink">Qué te llevas</p><p className="mt-1.5 text-sm font-semibold text-ink-900">Un plan con prioridades y medidas</p><p className="tiny mt-1">Acciones para Ahora, Próximo y Después, con indicadores sencillos para revisar avances.</p></div>
          </div>
          <p className="mt-4 rounded-xl border-l-2 border-brand-600 bg-white/55 px-4 py-3 text-sm leading-relaxed text-ink-700"><b className="text-ink-900">Ejemplo:</b> si llegan consultas pero pocas ventas, revisaremos respuesta y seguimiento; puedes medir el tiempo de respuesta y cuántas consultas terminan en venta antes de invertir más en publicidad.</p>
        </aside>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SOLUCIONES DIGITALES */}
      <section id="soluciones-digitales" aria-labelledby="soluciones-digitales-title" className="border-t border-sand-200/70 pt-12 sm:pt-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Cuando quieras llevarlo a la práctica</p>
          <h2 id="soluciones-digitales-title" className="mt-3 text-3xl sm:text-4xl">Conoce nuestras soluciones digitales</h2>
          <p className="lead mt-4">Después de definir tu siguiente paso, explora los servicios que pueden acompañar tus necesidades de presencia web y comunicación.</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <a href="https://soluciones-digitales.ai.studio" target="_blank" rel="noopener noreferrer" className="group card-quiet card-hover block overflow-hidden p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
            <div className="overflow-hidden border-b border-brand-100 bg-[#eaf1e9] px-5 pt-5 sm:px-8 sm:pt-7">
              <svg viewBox="0 0 520 230" role="img" aria-label="Ilustración de un sitio web conectado con canales sociales" className="mx-auto h-48 w-full max-w-xl transition-transform duration-500 group-hover:scale-[1.025] sm:h-56">
                <ellipse cx="260" cy="211" rx="180" ry="10" fill="#d5e1d4" />
                <rect x="71" y="20" width="377" height="177" rx="16" fill="#fff" stroke="#c6d6c5" strokeWidth="2" />
                <path d="M71 37a17 17 0 0 1 17-17h343a17 17 0 0 1 17 17v16H71z" fill="#dce8db" />
                <circle cx="91" cy="36" r="4" fill="#6b8c70" /><circle cx="106" cy="36" r="4" fill="#9eb29e" /><circle cx="121" cy="36" r="4" fill="#bdccbb" />
                <rect x="93" y="72" width="178" height="100" rx="10" fill="#edf3ec" />
                <rect x="111" y="89" width="113" height="8" rx="4" fill="#315b39" /><rect x="111" y="105" width="136" height="5" rx="2.5" fill="#aabbaa" /><rect x="111" y="116" width="118" height="5" rx="2.5" fill="#c2cec1" /><rect x="111" y="139" width="71" height="18" rx="9" fill="#3e7147" />
                <rect x="289" y="75" width="129" height="12" rx="6" fill="#78977b" /><rect x="289" y="96" width="113" height="5" rx="2.5" fill="#b5c5b4" /><rect x="289" y="108" width="121" height="5" rx="2.5" fill="#d1dbcf" />
                <rect x="289" y="127" width="57" height="45" rx="8" fill="#e6eee4" /><rect x="355" y="127" width="63" height="45" rx="8" fill="#f1eee5" />
                <path d="M311 151h13m-6-6 6 6-6 6" fill="none" stroke="#3e7147" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="376" cy="150" r="10" fill="#d7e2d4" /><path d="M370 150h12m-6-6v12" stroke="#648269" strokeWidth="2" strokeLinecap="round" />
                <path d="M170 198h176l13 13H157z" fill="#a9bba8" /><rect x="145" y="211" width="226" height="6" rx="3" fill="#829982" />
              </svg>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl">Soluciones Digitales</h3><span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">Explora servicios para sitios web y presencia en redes como Facebook y Telegram. Puede ser un siguiente paso cuando tu estrategia necesite una sede digital o fortalecer esos canales.</p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-kicker text-brand-700">Visitar soluciones-digitales.ai.studio ↗</span>
            </div>
          </a>

          <a href="https://soluciones-wa.ai.studio/" target="_blank" rel="noopener noreferrer" className="group card-quiet card-hover block overflow-hidden p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700">
            <div className="overflow-hidden border-b border-emerald-100 bg-[#eaf3ed] px-5 pt-5 sm:px-8 sm:pt-7">
              <svg viewBox="0 0 520 230" role="img" aria-label="Ilustración de conversaciones organizadas en un teléfono" className="mx-auto h-48 w-full max-w-xl transition-transform duration-500 group-hover:scale-[1.025] sm:h-56">
                <ellipse cx="260" cy="212" rx="156" ry="10" fill="#d5e3d8" />
                <rect x="177" y="8" width="166" height="208" rx="27" fill="#fff" stroke="#b8d1bf" strokeWidth="2.5" />
                <rect x="191" y="26" width="138" height="174" rx="17" fill="#f5f8f4" />
                <path d="M191 43a17 17 0 0 1 17-17h104a17 17 0 0 1 17 17v22H191z" fill="#356b48" />
                <circle cx="216" cy="46" r="12" fill="#d9e9dd" /><path d="M210 46h12m-6-6v12" stroke="#356b48" strokeWidth="2" strokeLinecap="round" />
                <rect x="237" y="39" width="70" height="5" rx="2.5" fill="#fff" /><rect x="237" y="49" width="47" height="3" rx="1.5" fill="#c6ddcc" />
                <path d="M207 82h91a9 9 0 0 1 9 9v24a9 9 0 0 1-9 9h-48l-12 9v-9h-31a9 9 0 0 1-9-9V91a9 9 0 0 1 9-9" fill="#e3eee5" />
                <rect x="218" y="94" width="64" height="5" rx="2.5" fill="#698970" /><rect x="218" y="105" width="76" height="4" rx="2" fill="#a9bdac" />
                <path d="M222 136h90a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9h-41l-12 9v-9h-37a9 9 0 0 1-9-9v-22a9 9 0 0 1 9-9" fill="#cee2d1" />
                <rect x="233" y="147" width="62" height="5" rx="2.5" fill="#4d7656" /><rect x="233" y="158" width="47" height="4" rx="2" fill="#84a18a" />
                <circle cx="91" cy="82" r="27" fill="#dceadd" /><path d="M79 82h24m-12-12v24" stroke="#5e8465" strokeWidth="3" strokeLinecap="round" />
                <circle cx="421" cy="151" r="34" fill="#e6eee3" /><path d="m408 151 9 9 18-20" fill="none" stroke="#54785a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M126 93c18-6 27-3 40 8m230 25c-19-5-29-2-40 9" fill="none" stroke="#a8c1aa" strokeWidth="2" strokeDasharray="5 7" />
              </svg>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl">Soluciones WA</h3><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-800 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span></div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">Conoce la propuesta de Soluciones WA, enfocada en WhatsApp. Es una opción para explorar si ese canal forma parte de la atención y comunicación de tu negocio.</p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-kicker text-brand-700">Visitar soluciones-wa.ai.studio ↗</span>
            </div>
          </a>
        </div>
      </section>
      {/* 5 RESPUESTAS — índice editorial, sin cajas                          */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Las cinco respuestas que te llevas" className="border-t border-sand-200/70 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["¿Qué pasa con mi negocio?", "¿Cuáles son mis problemas?", "¿Por qué ocurren?", "¿Qué hago primero?", "¿Qué herramientas necesito?"].map((t, i) => (
            <div key={t} className="card-quiet flex flex-col p-5">
              <span className="num text-2xl font-light tracking-tight text-brand-300">{String(i + 1).padStart(2, "0")}</span>
              <p className="ts-sub mt-3 text-sm font-semibold leading-snug text-ink-800">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 15 FACTORES — lista con hairlines                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-sand-200/70 pt-12 sm:pt-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Diagnóstico sobre 15 factores reales</h2>
          <p className="lead mt-5">El diagnóstico revisa estos 15 aspectos para entender cómo se relacionan en tu negocio. Cada factor explica qué observar, qué efecto puede tener y por dónde empezar.</p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-x-14 sm:grid-cols-2 lg:grid-cols-3">
          {FACTORES.map((f) => (
            <div key={f.id} className="card-quiet card-hover flex gap-4 p-5 sm:p-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 num text-xs font-semibold text-brand-700">{f.n}</span>
              <div>
                <dt className="ts-sub text-sm font-semibold text-ink-900">{f.nombre}</dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-ink-500">{f.descripcion}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CÓMO FUNCIONA                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-sand-200/70 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {[["check", "1. Eliges tu meta", "Elige una meta concreta y recibe una ruta de acciones acorde con ella."], ["chart", "2. Mides tu estado", "Revisa señales de tu negocio con tus cifras actuales y detecta qué atender primero."], ["target", "3. Recibes el plan", "Ordena acciones por impacto, esfuerzo y presupuesto para avanzar paso a paso."], ["chat", "4. Te acompañamos", "Consulta tu informe y ebook, organiza un plan semanal y pregunta al asistente de marketing."]].map(([ic, t, d]) => (
            <div key={t as string} className="card-quiet card-hover p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <Icon name={ic as string} className="h-5 w-5 shrink-0 text-brand-700" />
                <span aria-hidden className="h-px flex-1 bg-sand-200" />
              </div>
              <b className="ts-sub mt-6 block text-base font-semibold text-ink-900">{t}</b>
              <p className="muted mt-2.5">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MODOS + CLAVE                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="grid grid-cols-1 gap-16 border-t border-sand-200/70 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl sm:text-4xl">Hecho para tu realidad</h2>
          <ul className="mt-8 grid gap-4 text-sm text-ink-700">
            <li className="card-quiet card-hover flex gap-4 p-5">
              <Icon name="store" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <span className="leading-relaxed"><b className="font-semibold text-ink-900">Modo emprendedor:</b> si empiezas, nada de CRM empresarial: propuesta, cliente, oferta, WhatsApp y catálogo primero.</span>
            </li>
            <li className="card-quiet card-hover flex gap-4 p-5">
              <Icon name="money" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <span className="leading-relaxed"><b className="font-semibold text-ink-900">Con o sin presupuesto:</b> el plan se adapta a gratis, bajo, medio o avanzado.</span>
            </li>
            <li className="card-quiet card-hover flex gap-4 p-5">
              <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <span className="leading-relaxed"><b className="font-semibold text-ink-900">Sin humo y sin miedo:</b> hasta los nichos sensibles tienen plan con cumplimiento. La IA interpreta, las reglas deciden, las fuentes respaldan.</span>
            </li>
          </ul>
        </div>
        <GroqKeyField />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ — acordeón con hairlines                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-sand-200/70 pt-12 sm:pt-16">
      {/* GUÍAS EXTERNAS, EXPLICADAS EN TUCONSULTOR */}
      <section className="border-t border-sand-200/70 pt-12 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="eyebrow">Recursos prácticos</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Aprende a investigar y anunciar</h2>
            <p className="lead mt-4">Guías originales en español para aprovechar Meta Business, explorar anuncios y entender cuándo usar Google Ads.</p>
          </div>
          <Link href="/recursos" className="btn-ghost">Ver todas las guías <span aria-hidden>→</span></Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Meta Business", "Cómo conectar una campaña con una acción real del cliente.", "/recursos#meta"],
            ["02", "Biblioteca de anuncios", "Una ficha sencilla para estudiar mensajes y formatos sin copiar.", "/recursos#biblioteca"],
            ["03", "Google Ads", "Cómo responder a búsquedas con intención y medir el resultado.", "/recursos#google"],
          ].map(([n, title, desc, href]) => (
            <Link key={title} href={href} className="card-quiet card-hover group block">
              <span className="num text-xs font-semibold tracking-kicker text-brand-700">{n}</span>
              <h3 className="mt-3 text-lg">{title}</h3>
              <p className="muted mt-2">{desc}</p>
              <span className="link-quiet mt-5">Explorar guía <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </div>
      </section>
        <h2 className="text-3xl sm:text-4xl">Preguntas frecuentes</h2>

        <div className="mt-12 max-w-3xl border-t border-sand-200/70">
          <details className="group border-b border-sand-200/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-base font-medium text-ink-900">
              ¿Necesito la API key para usar tuConsultor?
              <span aria-hidden className="shrink-0 text-lg font-light text-ink-300 transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="pb-7 pr-8 text-sm leading-relaxed text-ink-600">
              No. Sin clave funciona el motor de reglas con recomendaciones verificadas. Con clave de Groq se activa la interpretación personalizada con IA.
            </p>
          </details>

          <details className="group border-b border-sand-200/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-base font-medium text-ink-900">
              ¿La aplicación me va a recomendar servicios?
              <span aria-hidden className="shrink-0 text-lg font-light text-ink-300 transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="pb-7 pr-8 text-sm leading-relaxed text-ink-600">
              El diagnóstico prioriza primero qué puedes hacer. Si una necesidad concreta tiene relación con sitios web, redes o WhatsApp, verás una referencia opcional al servicio correspondiente. Puedes continuar usando la guía sin contratar nada.
            </p>
          </details>

          <details className="group border-b border-sand-200/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-base font-medium text-ink-900">
              ¿Cuánto tarda?
              <span aria-hidden className="shrink-0 text-lg font-light text-ink-300 transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="pb-7 pr-8 text-sm leading-relaxed text-ink-600">Unos 5 minutos. Puedes hacerlo desde el celular.</p>
          </details>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA FINAL                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-3xl bg-panel px-8 py-20 text-center shadow-panel sm:px-16 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/[.13] blur-3xl" />
        <p className="relative mx-auto max-w-3xl text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
          Saldrás diciendo: “Ahora entiendo mi negocio y sé qué hacer primero.”
        </p>
        <Link href="/metas" className="btn-light relative mt-12">
          <Icon name="target" className="h-4 w-4" /> Empezar ahora
        </Link>
      </section>
    </div>
  );
}







