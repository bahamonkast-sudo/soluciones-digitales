"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadSession } from "../../lib/session";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../lib/scoring";
import { evaluateRules } from "../../lib/rules";
import { buildEbook, EbookData, EbookDolor, EbookSolucion } from "../../lib/ebook";
import { 
  leerCodigo, 
  guardarCodigo, 
  generarCodigo, 
  validarCodigo, 
  estaDesbloqueado, 
  marcarDesbloqueado 
} from "../../lib/codigos";
import { ESTADO_META } from "../../lib/dolores";
import { REGALO } from "../../lib/regalo";
import { Video, videoUrl, videoThumb } from "../../lib/videos";
import Icon from "../../components/icon";

const WHATSAPP_NUMERO = "573115893220";

export default function Ebook() {
  const router = useRouter();
  const [ebook, setEbook] = useState<EbookData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [bloqueado, setBloqueado] = useState(true);
  const [codigoUsuario, setCodigoUsuario] = useState("");
  const [codigoEntrada, setCodigoEntrada] = useState("");
  const [errorCanje, setErrorCanje] = useState("");

  useEffect(() => {
    // 1. Obtener o generar código del usuario
    let cod = leerCodigo();
    if (!cod) {
      cod = generarCodigo();
      guardarCodigo(cod);
    }
    setCodigoUsuario(cod);

    // 2. Verificar si viene en la URL o si ya fue desbloqueado previamente
    const paramCodigo = new URLSearchParams(window.location.search).get("codigo");
    if (paramCodigo && validarCodigo(cod, paramCodigo)) {
      marcarDesbloqueado(cod);
      setBloqueado(false);
    } else if (estaDesbloqueado(cod)) {
      setBloqueado(false);
    } else {
      setBloqueado(true);
      setCargando(false);
      return;
    }

    // 3. Cargar datos del ebook
    try {
      const sess = loadSession();
      if (!sess) {
        router.push("/diagnostico");
        return;
      }
      const answers = { ...sess.answers, etapa: sess.perfil.etapa };
      const scores = scoreAnswers(answers);
      const ctx = {
        sess,
        answers,
        salud: saludGeneral(scores),
        cuellos: detectarCuellos(scores),
        rules: evaluateRules(answers),
      };
      const lead = {
        nombre: sess.perfil.negocio,
        whatsapp: WHATSAPP_NUMERO,
        contactos: sess.answers.contactos,
        ticket: sess.answers.ticket,
      };
      const ebookData = buildEbook({
        negocio: sess.perfil.negocio,
        salud: ctx.salud,
        cuellos: ctx.cuellos,
        rules: ctx.rules,
        contactos: lead.contactos,
        ticket: lead.ticket,
        convActual: Math.round((scores.conversion + scores.proceso_comercial) / 2),
        sub: [sess.perfil.sector, sess.perfil.objetivo, sess.perfil.mercado].filter(Boolean).join(" · "),
        answers,
        scores,
      });
      setEbook(ebookData);
    } catch {
      setErrorCanje("Error al preparar los datos del ebook.");
    } finally {
      setCargando(false);
    }
  }, [router]);

  const handleDesbloquear = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCanje("");
    if (!codigoEntrada.trim()) {
      setErrorCanje("Ingresa el código de autorización recibido.");
      return;
    }

    if (validarCodigo(codigoUsuario, codigoEntrada.trim())) {
      marcarDesbloqueado(codigoUsuario);
      setBloqueado(false);
      setCargando(true);

      const sess = loadSession();
      if (!sess) {
        router.push("/diagnostico");
        return;
      }
      const answers = { ...sess.answers, etapa: sess.perfil.etapa };
      const scores = scoreAnswers(answers);
      const ctx = {
        sess,
        answers,
        salud: saludGeneral(scores),
        cuellos: detectarCuellos(scores),
        rules: evaluateRules(answers),
      };
      const ebookData = buildEbook({
        negocio: sess.perfil.negocio,
        salud: ctx.salud,
        cuellos: ctx.cuellos,
        rules: ctx.rules,
        contactos: sess.answers.contactos,
        ticket: sess.answers.ticket,
        convActual: Math.round((scores.conversion + scores.proceso_comercial) / 2),
        sub: [sess.perfil.sector, sess.perfil.objetivo, sess.perfil.mercado].filter(Boolean).join(" · "),
        answers,
        scores,
      });
      setEbook(ebookData);
      setCargando(false);
    } else {
      setErrorCanje("Código incorrecto. Verifica que corresponda exactamente al entregado por WhatsApp.");
    }
  };

  const mensajeWa = encodeURIComponent(
    `Hola Soluciones Digitales, quiero desbloquear mi Ebook personalizado. Mi código de solicitud es: ${codigoUsuario}`
  );
  const linkWa = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeWa}`;

  if (cargando) return <div className="card py-12 text-center text-ink-700">Cargando tu material...</div>;

  // ----------------------------------------------------------------
  // Muro de Desbloqueo Interactivo
  // ----------------------------------------------------------------
  if (bloqueado) {
    return (
      <div className="mx-auto max-w-xl py-10 px-4">
        <div className="card text-center p-8 shadow-xl border border-brand-100/50">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Icon name="lock" className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Ebook de Crecimiento Bloqueado</h1>
          <p className="mt-2 text-sm text-ink-600">
            Para proteger tu plan personalizado, el acceso requiere validación directa con nuestro consultor.
          </p>

          <div className="my-6 rounded-lg bg-surface-50 p-4 border border-border">
            <span className="text-xs uppercase tracking-wider font-semibold text-ink-500">Tu código de solicitud</span>
            <div className="mt-1 text-2xl font-mono font-bold tracking-widest text-brand-700">
              {codigoUsuario}
            </div>
          </div>

          <a
            href={linkWa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full py-3 inline-flex items-center justify-center gap-2 text-base font-semibold"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            Solicitar código de desbloqueo por WhatsApp
          </a>

          <form onSubmit={handleDesbloquear} className="mt-6 pt-6 border-t border-border text-left">
            <label className="block text-xs font-semibold uppercase text-ink-700 mb-1">
              Ingresa el código de autorización recibido:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: TC-XXX-XXX-SD-980"
                value={codigoEntrada}
                onChange={(e) => setCodigoEntrada(e.target.value)}
                className="input-text flex-1 font-mono uppercase text-sm"
              />
              <button type="submit" className="btn-secondary px-5 whitespace-nowrap font-semibold">
                Desbloquear
              </button>
            </div>
            {errorCanje && <p className="mt-2 text-xs text-rose-600 font-medium">{errorCanje}</p>}
          </form>

          <div className="mt-6">
            <Link href="/diagnostico" className="text-xs text-ink-500 hover:underline">
              ← Volver al diagnóstico
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="card py-10 text-center">
        <p className="text-ink-700">No hay datos de sesión disponibles para este ebook.</p>
        <Link className="btn-primary mt-5" href="/diagnostico">Iniciar diagnóstico</Link>
      </div>
    );
  }

  const r = ebook.resumenDolores;
  const solucionesDelPlan = new Set(ebook.dolores.flatMap((d) => d.soluciones.map((s) => s.id)));
  const necesitaDigital = ["web", "landing", "seo_local", "facebook", "instagram", "tiktok", "youtube", "linkedin", "contenido", "publicidad", "google_business", "telegram"].some((id) => solucionesDelPlan.has(id));
  const necesitaWhatsApp = ["whatsapp", "bot", "catalogo"].some((id) => solucionesDelPlan.has(id));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="card-hero text-center">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative">
          <p className="eyebrow text-brand-100">Plan de crecimiento personalizado · Soluciones Digitales</p>
          <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight">Plan de Crecimiento</h1>
          <h2 className="mt-1 text-2xl font-bold text-brand-100">{ebook.negocio}</h2>
          <p className="mt-2 text-brand-100">
            {ebook.negocio} · Salud {ebook.salud}/100 · {ebook.fecha}
          </p>
          {ebook.sub ? <p className="mt-1 text-sm text-brand-200">{ebook.sub}</p> : null}
          <p className="mt-1 text-2xs text-brand-200">Corto, mediano y largo plazo · Elaborado por tuConsultor · Soluciones Digitales</p>

          {r.total > 0 ? (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="chip bg-white/15 text-white">Ficha general: {r.total} puntos revisados</span>
              {r.criticos > 0 ? <span className="chip bg-red-500/25 text-white">{r.criticos} con prioridad alta</span> : null}
              {r.alertas > 0 ? <span className="chip bg-gold-500/25 text-white">{r.alertas} a mejorar</span> : null}
              {r.bien > 0 ? <span className="chip bg-white/20 text-white">{r.bien} en buen estado</span> : null}
            </div>
          ) : null}
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Cómo leer el plan + índice                                       */}
      {/* ---------------------------------------------------------------- */}
      {ebook.dolores.length > 0 ? (
        <>
          <section className="card-quiet no-print">
            <div className="flex flex-wrap items-center gap-2">
              <Icon name="book" className="h-5 w-5 text-brand-700" />
              <h2 className="text-base font-bold">Cómo leer este plan</h2>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li className="flex gap-2.5">
                <Icon name="layers" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>Cada sección es <b className="font-semibold text-ink-800">un punto que evaluamos contigo</b>: su pregunta, tu respuesta y qué significa para tu negocio.</span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="clipboard" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>Las secciones con <b className="font-semibold text-ink-800">prioridad alta</b> son las que más te cuestan hoy: empieza por ahí.</span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="download" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>Al descargar en PDF, <b className="font-semibold text-ink-800">cada punto sale en su propia hoja</b> para que puedas trabajarlo por separado.</span>
              </li>
            </ul>
          </section>

          <section className="card">
            <div className="section-head">
              <h2 className="text-lg">Índice de tu plan</h2>
              <span className="eyebrow-ink">{ebook.indice.length} secciones</span>
            </div>
            <ol className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {ebook.indice.map((it) => (
                <li key={it.id}>
                  <a className="toc-item" href={`#dolor-${it.id}`}>
                    <span className="num w-5 shrink-0 text-xs font-bold text-ink-400">{it.orden}</span>
                    <span className="min-w-0 flex-1 truncate" title={it.pregunta}>{it.pregunta}</span>
                    <span className={`chip ${ESTADO_META[it.estado].chip} shrink-0 !px-2 !py-0.5 !text-2xs`}>{it.estadoLabel}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Resumen ejecutivo                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="card-edge card-edge-bad">
        <div className="flex flex-wrap items-center gap-2">
          <Icon name="alert" className="h-5 w-5 text-red-600" />
          <h2 className="text-lg">Lo que más te frena</h2>
        </div>
        <div className="mt-3 space-y-2.5">
          {ebook.cuellos.map((c, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink-700">
              <b className="font-semibold text-ink-900">{c.factor} ({c.score}/100):</b> {c.mensaje}
            </p>
          ))}
        </div>
        {ebook.perdidaMensual ? (
          <div className="stat mt-4">
            <span className="stat-label">Estimación de oportunidad no capturada</span>
            <p className="stat-value">${ebook.perdidaMensual.toLocaleString("es")} <span className="text-sm font-semibold text-ink-500">/mes</span></p>
            <p className="tiny mt-1">Cálculo con tus propios números: mismos contactos, mejor cierre. Proyección ilustrativa, no promesa.</p>
          </div>
        ) : null}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* UNA SECCIÃ“N POR DOLOR                                            */}
      {/* ---------------------------------------------------------------- */}
      {ebook.dolores.map((d) => (
        <SeccionDolor key={d.id} d={d} />
      ))}

      {/* ---------------------------------------------------------------- */}
      {/* Lo que NO necesitas todavía                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="card bg-brand-50/60">
        <h2 className="text-lg">Lo que NO necesitas todavía</h2>
        <div className="mt-3 space-y-2">
          {ebook.noNecesitas.map((n, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink-700">
              <b className="font-semibold text-ink-900">{n.name}:</b> {n.reason}
            </p>
          ))}
        </div>
        <p className="tiny mt-3">Te lo decimos aunque nos cueste la venta: primero el plan, después la implementación.</p>
      </section>

      <section className="card-quiet overflow-hidden">
        <div className="max-w-2xl">
          <p className="eyebrow">Apoyo para implementar · opcional</p>
          <h2 className="mt-2 text-2xl">Si quieres llevar estas ideas a la práctica</h2>
          <p className="muted mt-2">El plan y sus guías son tuyos. Si te hace falta apoyo especializado, aquí puedes conocer las dos líneas de servicio de Soluciones Digitales.</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <a href="https://soluciones-digitales.ai.studio" target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
            <div className="bg-[#e9f1e9] px-5 pt-4">
              <svg viewBox="0 0 320 148" role="img" aria-label="Ilustración de una página web en una pantalla" className="mx-auto h-32 w-full max-w-xs">
                <rect x="42" y="12" width="236" height="116" rx="12" fill="#fff" stroke="#b9cbb9" strokeWidth="2" />
                <path d="M42 28a16 16 0 0 1 16-16h204a16 16 0 0 1 16 16v8H42z" fill="#dbe8da" />
                <circle cx="58" cy="23" r="3" fill="#64836a" /><circle cx="69" cy="23" r="3" fill="#9ab09b" /><circle cx="80" cy="23" r="3" fill="#c3d2c2" />
                <rect x="58" y="49" width="94" height="61" rx="7" fill="#edf3ed" />
                <rect x="70" y="60" width="58" height="5" rx="2.5" fill="#335c3c" /><rect x="70" y="71" width="67" height="3" rx="1.5" fill="#a5b7a5" /><rect x="70" y="79" width="55" height="3" rx="1.5" fill="#c0cdc0" /><rect x="70" y="92" width="38" height="10" rx="5" fill="#315c3a" />
                <rect x="163" y="51" width="92" height="8" rx="4" fill="#6f8d72" /><rect x="163" y="67" width="79" height="4" rx="2" fill="#b5c4b5" /><rect x="163" y="76" width="87" height="4" rx="2" fill="#d1dbd0" /><rect x="163" y="91" width="39" height="16" rx="8" fill="#e4eee3" />
                <path d="M132 128h56l8 10h-72z" fill="#aabbaa" /><rect x="117" y="138" width="86" height="5" rx="2.5" fill="#809781" />
              </svg>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-bold">Soluciones Digitales</h3>{necesitaDigital && <span className="chip chip-good">Relacionado con tu plan</span>}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">Conoce la opción para proyectos de sitios web y presencia en redes sociales, como Facebook o Telegram.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Visitar el sitio <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
            </div>
          </a>
          <a href="https://soluciones-wa.ai.studio/" target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-[#c8ddd1] bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">
            <div className="bg-[#eaf3ee] px-5 pt-4">
              <svg viewBox="0 0 320 148" role="img" aria-label="Ilustración de una conversación de atención por WhatsApp" className="mx-auto h-32 w-full max-w-xs">
                <rect x="66" y="8" width="188" height="132" rx="19" fill="#fff" stroke="#bdd4c5" strokeWidth="2" />
                <path d="M66 27a19 19 0 0 1 19-19h150a19 19 0 0 1 19 19v14H66z" fill="#2d6a46" />
                <circle cx="91" cy="26" r="11" fill="#d9e9dc" /><path d="M85 26h12m-6-6v12" stroke="#2d6a46" strokeWidth="2" strokeLinecap="round" />
                <rect x="110" y="19" width="91" height="5" rx="2.5" fill="#fff" /><rect x="110" y="28" width="57" height="3" rx="1.5" fill="#c6dbc9" />
                <path d="M84 55h126a9 9 0 0 1 9 9v14a9 9 0 0 1-9 9h-76l-13 9v-9H84a9 9 0 0 1-9-9V64a9 9 0 0 1 9-9" fill="#edf4ee" />
                <rect x="88" y="64" width="89" height="4" rx="2" fill="#6d8873" /><rect x="88" y="73" width="111" height="4" rx="2" fill="#afc1b1" />
                <path d="M126 96h111a9 9 0 0 1 9 9v13a9 9 0 0 1-9 9h-72l-12 8v-8h-27a9 9 0 0 1-9-9v-13a9 9 0 0 1 9-9" fill="#d9ebdc" />
                <rect x="139" y="105" width="73" height="4" rx="2" fill="#557b5b" /><rect x="139" y="114" width="51" height="4" rx="2" fill="#91ad95" />
              </svg>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-bold">Soluciones WA</h3>{necesitaWhatsApp && <span className="chip chip-good">Relacionado con tu plan</span>}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">Conoce la línea de servicios enfocada en WhatsApp para negocios que atienden o venden por conversación.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Visitar el sitio <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span></span>
            </div>
          </a>
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* Presencia web con plan previo                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="card-edge bg-brand-50">
        <h2 className="flex items-center gap-2 text-lg">
          <Icon name="globe" className="h-5 w-5 text-brand-700" /> Presencia web: sí, pero con plan previo
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-700">Un sitio web sin estrategia de tráfico es un gasto, no una inversión. Tu plan incluye:</p>
        <ol className="mt-3 space-y-2 text-sm text-ink-700">
          {[
            "Definir objetivo del web (captar leads, vender, informar)",
            "Estructura SEO desde el día 1 (títulos, URLs, velocidad)",
            "Contenido que responda dudas reales de tu cliente",
            "Un solo CTA visible sin scroll (WhatsApp, formulario, agenda)",
            "Medición: GA4 + Search Console desde el día 1",
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="marker-quiet !h-6 !w-6 !text-xs">{i + 1}</span>
              <span className="pt-0.5">{t}</span>
            </li>
          ))}
        </ol>
        <p className="tiny mt-3">Tu plan de crecimiento ya prioriza qué viene primero: visibilidad â†’ oferta â†’ web optimizada.</p>
              {necesitaDigital && <a className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card" href="https://soluciones-digitales.ai.studio" target="_blank" rel="noopener noreferrer"><Icon name="globe" className="h-4 w-4" /> Conocer Soluciones Digitales para sitios web y redes ↗</a>}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Obsequio + acciones                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="card border-2 !border-gold-300 text-center">
        <h2 className="flex items-center justify-center gap-2 text-lg">
          <Icon name="gift" className="h-5 w-5 text-gold-700" /> {REGALO.titulo}
        </h2>
        <p className="muted mt-2">{REGALO.descripcion}</p>
      </section>

      <div className="no-print flex flex-wrap justify-center gap-3">
        <button onClick={() => window.print()} className="btn-primary">
          <Icon name="printer" className="inline-block h-5 w-5" /> Descargar PDF
        </button>
        <Link className="btn-ghost self-center" href="/informe">Volver a mi informe</Link>
      </div>
   </div>
  );
}

// ---------------------------------------------------------------------------
// Una sección = un dolor. Cada una es un "pantallazo" independiente y, al
// imprimir, empieza en su propia hoja.
// ---------------------------------------------------------------------------
function SeccionDolor({ d }: { d: EbookDolor }) {
  const meta = ESTADO_META[d.estado];
  return (
    <section id={`dolor-${d.id}`} className="dolor-section card card-flush avoid-break">
      {/* Cabecera del pantallazo */}
      <header className="relative overflow-hidden border-b border-sand-200/70 bg-brand-mist px-7 py-7 sm:px-9 sm:py-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="marker">{d.orden}</span>
          <span className="eyebrow">{d.momento}</span>
          <span className={`chip ${meta.chip}`}>
            <Icon name={meta.icono} className="h-3.5 w-3.5" />
            {d.estadoLabel}
          </span>
          <span className="chip chip-outline">{d.fase}</span>
        </div>

        <h2 className="mt-3 text-xl sm:text-2xl">{d.pregunta}</h2>
        <p className="muted mt-1">{d.porQue}</p>

        <div className="mt-4 rounded-xl border border-sand-200 bg-white/85 px-4 py-3">
          <span className="stat-label">Tu respuesta</span>
          <p className="mt-0.5 font-semibold leading-snug text-ink-800">{d.respuesta}</p>
        </div>

        {d.factor ? (
          <div className="mt-3">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold text-ink-700">
                Factor {d.factor.n}: {d.factor.nombre}
              </span>
              <span className="num font-bold text-ink-800">{d.factor.score}/100</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-200">
              <div
                className={`h-full rounded-full ${d.factor.score < 45 ? "bg-red-500" : d.factor.score < 65 ? "bg-gold-500" : "bg-brand-600"}`}
                style={{ width: `${d.factor.score}%` }}
              />
            </div>
            <p className="tiny mt-1">{d.factor.descripcion}</p>
          </div>
        ) : null}
      </header>

      {/* Cuerpo del dolor */}
      <div className="space-y-7 p-7 sm:p-9">
        <Bloque titulo="Qué mide esta pregunta" icono="search">
          <p className="text-sm leading-relaxed text-ink-700">{d.queMedimos}</p>
        </Bloque>

        <div className="card-edge card-edge-warn !p-5">
          <span className="eyebrow-ink">Lectura de tu caso</span>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{d.diagnostico}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Bloque titulo="Por qué ocurre" icono="bulb">
            <Lista items={d.causas} />
          </Bloque>
          <Bloque titulo="Qué te está costando" icono="trend">
            <Lista items={d.efectos} />
          </Bloque>
        </div>

        {d.senales.length > 0 ? (
          <Bloque titulo="Señales de que te está pasando" icono="eye">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {d.senales.map((s) => (
                <li key={s} className="flex gap-2 rounded-xl bg-ink-50/70 px-3 py-2 text-sm text-ink-700">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </Bloque>
        ) : null}

        <Bloque titulo="Cómo se resuelve" icono="check">
          <ol className="space-y-2.5">
            {d.practicas.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="marker-quiet !h-6 !w-6 !text-xs">{i + 1}</span>
                <span className="pt-0.5 text-sm leading-relaxed text-ink-700">{p}</span>
              </li>
            ))}
          </ol>
        </Bloque>

        {d.evitar.length > 0 ? (
          <div className="rounded-2xl border border-red-100 bg-red-50/70 p-5 shadow-soft">
            <span className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-kicker text-red-700">
              <Icon name="xcircle" className="h-4 w-4" /> Evita esto
            </span>
            <ul className="mt-2.5 space-y-2">
              {d.evitar.map((e) => (
                <li key={e} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {d.soluciones.length > 0 ? (
          <Bloque titulo="Soluciones concretas para este dolor" icono="layers">
            <div className="space-y-3">
              {d.soluciones.map((s) => (
                <TarjetaSolucion key={s.id} s={s} />
              ))}
            </div>
          </Bloque>
        ) : null}

        {d.teoria.length > 0 ? (
          <Bloque titulo="Teoría verificada" icono="book">
            <ul className="space-y-2.5">
              {d.teoria.map((t) => (
                <li key={t.titulo} className="panel-flat">
                  <div className="flex flex-wrap items-center gap-2">
                    <b className="text-sm font-semibold text-ink-800">{t.titulo}</b>
                    <span className="chip chip-outline !px-2 !py-0.5 !text-2xs">{t.tipo}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{t.resumen}</p>
                  {t.url ? (
                    <a className="link-soft mt-1 inline-block text-xs" href={t.url} target="_blank" rel="noreferrer">
                      Ver fuente oficial
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </Bloque>
        ) : null}

        {d.fuentes.length > 0 ? (
          <Bloque titulo="Fuentes que respaldan esta sección" icono="shield">
            <ul className="space-y-1.5">
              {d.fuentes.map((f) => (
                <li key={f.url} className="text-sm">
                  <a className="link-soft break-words" href={f.url} target="_blank" rel="noreferrer">
                    {f.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </Bloque>
        ) : null}

        {d.kpis.length > 0 ? (
          <Bloque titulo="Cómo medir la mejora" icono="chart">
            <div className="flex flex-wrap gap-2">
              {d.kpis.map((k) => (
                <span key={k} className="chip chip-neutral">{k}</span>
              ))}
            </div>
          </Bloque>
        ) : null}

        <div className="rounded-2xl border border-brand-200 bg-brand-mist p-5 shadow-soft">
          <span className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-kicker text-brand-800">
            <Icon name="arrow" className="h-4 w-4" /> Tu siguiente paso
          </span>
          <p className="mt-2 text-sm font-medium leading-relaxed text-ink-800">{d.siguientePaso}</p>
        </div>

        {d.noAplica ? (
          <p className="tiny border-t border-sand-200/70 pt-3">
            <b className="font-semibold text-ink-600">Cuándo esto no aplica:</b> {d.noAplica}
          </p>
        ) : null}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Piezas reutilizables
// ---------------------------------------------------------------------------
function Bloque({ titulo, icono, children }: { titulo: string; icono: string; children: React.ReactNode }) {
  return (
    <div className="avoid-break">
      <h3 className="flex items-center gap-2 text-sm font-bold text-ink-900">
        <Icon name={icono} className="h-4 w-4 text-brand-700" />
        {titulo}
      </h3>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-sm leading-relaxed text-ink-700">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function TarjetaSolucion({ s }: { s: EbookSolucion }) {
  return (
    <article className="avoid-break panel">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-base font-bold text-ink-900">{s.name}</h4>
        <span className="chip chip-info">{s.costo}</span>
        <span className="chip chip-outline">{s.tiempo}</span>
        <span className="chip chip-outline">Dificultad {s.dificultad}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.description}</p>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="stat-label">Cuándo usarla</dt>
          <dd className="text-ink-700">{s.cuandoUsar}</dd>
        </div>
        <div>
          <dt className="stat-label">Cuándo NO usarla</dt>
          <dd className="text-ink-700">{s.cuandoNo}</dd>
        </div>
        <div>
          <dt className="stat-label">Resultado esperado</dt>
          <dd className="text-ink-700">{s.resultados}</dd>
        </div>
        {s.condiciones.length > 0 ? (
          <div>
            <dt className="stat-label">Necesitas antes</dt>
            <dd className="text-ink-700">{s.condiciones.join(" · ")}</dd>
          </div>
        ) : null}
        {s.ejemplo ? (
          <div>
            <dt className="stat-label">Ejemplo real</dt>
            <dd className="italic text-ink-600">{s.ejemplo}</dd>
          </div>
        ) : null}
      </dl>

      {s.kpis.length > 0 ? (
        <div className="mt-3">
          <span className="stat-label">Cómo se mide</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {s.kpis.map((k) => (
              <span key={k} className="chip chip-neutral !px-2.5 !py-0.5 !text-2xs">{k}</span>
            ))}
          </div>
        </div>
      ) : null}

      {s.fuentes.length > 0 ? (
        <div className="mt-3">
          <span className="stat-label">Fuentes</span>
          <ul className="mt-1 space-y-1">
            {s.fuentes.map((f) => (
              <li key={f.url || f.titulo} className="text-xs">
                {f.url ? (
                  <a className="link-soft break-words" href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a>
                ) : (
                  <span className="text-ink-600">{f.titulo}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <VideoSlot video={s.video} />
    </article>
  );
}

function VideoSlot({ video }: { video: Video | null }) {
  if (!video) {
    return (
      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-dashed border-sand-300 bg-sand-50/70 p-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand-100">
          <Icon name="lock" className="h-5 w-5 text-ink-500" />
        </span>
        <span>
          <span className="block text-xs font-semibold">Video explicativo bloqueado</span>
          <span className="block text-2xs text-ink-500">Se desbloquea con tu código de WhatsApp.</span>
        </span>
      </div>
    );
  }
  return (
    <a
      href={videoUrl(video)}
      target="_blank"
      rel="noreferrer"
      className="mt-3 flex items-center gap-3 rounded-xl border border-sand-200/70 bg-sand-50/70 p-2.5 text-left shadow-hairline transition-colors hover:border-brand-300 hover:bg-brand-50"
    >
      <img src={videoThumb(video)} alt="" loading="lazy" className="h-14 w-24 shrink-0 rounded-lg object-cover" />
      <span className="min-w-0">
        <span className="block text-xs font-semibold leading-snug text-ink-800">{video.titulo}</span>
        <span className="block text-2xs text-ink-500">{video.canal} · {video.peso}</span>
      </span>
    </a>
  );
}






