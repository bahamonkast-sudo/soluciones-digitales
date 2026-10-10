"use client";
import { useState } from "react";
import { METAS, TIPOS, PLATS, TipoNegocio, Plataforma, ETAPAS_CTX, NIVELES_CTX, CIERRES_CTX } from "../../lib/metas";
import { NICHOS, nichoById } from "../../lib/nichos";
import { solutionById, COST_LABEL, CostLevel } from "../../lib/solutions";
import { evaluateRules } from "../../lib/rules";
import { saveSession } from "../../lib/session";
import Icon from "../../components/icon";
import Link from "next/link";
import { serviceReferralForIds } from "../../lib/service-referral";
import { useRouter } from "next/navigation";

// Experiencia "empieza por tu meta": un recorrido de 4 pantallas —
// 1) eliges metas, 2) tu negocio, 3) tu momento, 4) tu plan compilado.
// Toda la lógica es la misma que antes; lo que cambia es la estructura.
const CANALES = [["google", "Google"], ["facebook", "Facebook"], ["instagram", "Instagram"], ["tiktok", "TikTok"], ["whatsapp", "WhatsApp"], ["web", "Web"], ["marketplace", "Marketplace"], ["ninguno", "En ningún lado"]];

const PASOS = ["Elige tus metas", "Tu negocio", "Tu momento", "Tu plan"];

// Estilos compartidos de las opciones seleccionables de los formularios.
const opcionBase = "text-left rounded-xl border px-3.5 py-2.5 text-sm transition-colors";
const opcionOn = "border-brand-600 bg-brand-50 text-brand-900";
const opcionOff = "border-ink-100 bg-white text-ink-700 hover:border-ink-200 hover:bg-ink-50/50";
const chipBase = "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors";
const chipOn = "bg-ink-900 text-white";
const chipOff = "border border-ink-200 text-ink-600 hover:border-ink-300 hover:text-ink-900";

/** Nota de instrucción: qué es ese control y para qué sirve. */
function Nota({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`tiny ${className}`}>{children}</p>;
}

/**
 * Recorrido de 4 pasos. Es navegable de verdad: los pasos ya hechos se pueden
 * tocar para volver. Antes era solo un adorno numerado.
 */
function Pasos({ actual, onGo }: { actual: number; onGo: (i: number) => void }) {
  return (
    <div className="border-b border-sand-200/70 pb-6">
      <ol className="flex flex-wrap items-center gap-x-7 gap-y-3">
        {PASOS.map((p, i) => {
          const hecho = i < actual;
          const aqui = i === actual;
          const interior = (
            <>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-2xs font-bold ${
                  aqui ? "bg-ink-900 text-white shadow-soft" : hecho ? "bg-brand-100 text-brand-800" : "border border-sand-200 text-ink-400"
                }`}
              >
                {hecho ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`text-xs ${aqui ? "font-semibold text-ink-900" : hecho ? "text-ink-600" : "text-ink-400"}`}>{p}</span>
            </>
          );
          return (
            <li key={p}>
              {hecho ? (
                <button
                  type="button"
                  onClick={() => onGo(i)}
                  title={`Volver al paso ${i + 1}: ${p}`}
                  className="flex items-center gap-2.5 rounded-full transition-opacity duration-200 hover:opacity-60"
                >
                  {interior}
                </button>
              ) : (
                <span className="flex items-center gap-2.5" aria-current={aqui ? "step" : undefined}>
                  {interior}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <Nota className="mt-3">
        {actual === 0
          ? "Tu recorrido son 4 pasos: eliges metas, nos cuentas tu negocio, afinas tu momento y recibes tu plan."
          : "Puedes volver a un paso anterior tocando su número."}
      </Nota>
    </div>
  );
}

export default function Metas() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [filtro, setFiltro] = useState<TipoNegocio | "todos">("todos");
  const [plat, setPlat] = useState<Plataforma | "todas">("todas");
  const [sel, setSel] = useState<string[]>([]);
  const [abierta, setAbierta] = useState<string | null>(null);
  const [nicho, setNicho] = useState("");
  const [canales, setCanales] = useState<string[]>([]);
  const [presupuesto, setPresupuesto] = useState("");
  const [negocio, setNegocio] = useState("");
  const [etapa, setEtapa] = useState("");
  const [nivel, setNivel] = useState("");
  const [cierre, setCierre] = useState("");
  const [dolor, setDolor] = useState("");

  const cards = METAS.filter((m) => (filtro === "todos" || m.tipos.includes(filtro)) && (plat === "todas" || m.plats.includes(plat)));
  const toggle = (id: string) => setSel((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  // La guía se abre en su propio panel (no dentro de la tarjeta): así la
  // retícula del catálogo no se rompe ni deja huecos.
  const abrirGuia = (id: string) => {
    const abriendo = abierta !== id;
    setAbierta(abriendo ? id : null);
    if (abriendo) setTimeout(() => document.getElementById("guia-meta")?.scrollIntoView({ behavior: "smooth", block: "start" }), 90);
  };
  const elegidas = METAS.filter((m) => sel.includes(m.id));
  const armar = () => {
    const metas = METAS.filter((m) => sel.includes(m.id));
    const answers = { nicho, canales, presupuesto, objetivo: metas[0]?.objetivo || "clientes", etapa: etapa || "emprendedor", nivel, cierre, dolor };
    const perfil = { negocio, sector: nichoById(nicho || "otro").label.replace(" ⚠️", ""), etapa: etapa || "emprendedor", objetivo: metas[0]?.objetivo || "clientes", presupuesto, mercado: "" };
    return { metas, answers, perfil };
  };
  const terminar = () => {
    const { answers, perfil } = armar();
    try { localStorage.setItem("tuconsultor_metas", JSON.stringify(sel)); } catch { /* noop */ }
    saveSession({ perfil, answers, createdAt: new Date().toISOString() });
    router.push("/dashboard");
  };
  const compilado = () => {
    const { metas, answers } = armar();
    const rules = evaluateRules(answers);
    const ahora = new Set(rules.filter((r) => r.priority === "ahora").flatMap((r) => r.solutions));
    return { metas, ahora };
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <Pasos actual={paso} onGo={setPaso} />

      {/* ================================================================ */}
      {/* 1 · ELEGIR METAS                                                  */}
      {/* ================================================================ */}
      {paso === 0 && (
        <div className="animate-fade-up space-y-14">
          {/* Portada del paso */}
          <header className="max-w-2xl">
            <p className="eyebrow">tuConsultor · Soluciones Digitales</p>
            <h1 className="mt-3 text-3xl sm:text-4xl">Tus metas están al alcance</h1>
            <p className="lead mt-5">Explora las metas, abre cada una para ver el principio, los pasos y cómo medirla. Elige las tuyas y compilamos tu plan: primero lo orgánico, la pauta cuando toque.</p>
            <div className="mt-9 max-w-2xl card-quiet">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/chequeo" className="btn-ghost">
                  Medir mi estado <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <span className="tiny">Camino alternativo, si prefieres no elegir a mano.</span>
              </div>
              <Nota className="mt-3">
                «Medir mi estado» hace un chequeo de 8 pruebas con tus números reales y deduce solo qué metas te tocan. Si ya sabes lo que quieres, baja y elige las metas tú mismo.
              </Nota>
            </div>
          </header>

          {/* Filtros, con etiqueta y estado visible */}
          <section id="metas-grid" className="scroll-mt-28 border-t border-sand-200/70 pt-10">
            <div className="max-w-2xl">
              <h2 className="text-xl sm:text-2xl">Elige tus metas</h2>
              <Nota className="mt-2">
                Toca una tarjeta para añadir esa meta a tu plan. «Ver guía» abre el detalle —por qué funciona, 3 pasos y cómo medirlo— sin elegirla.
              </Nota>
            </div>

            <div className="mt-9 flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
              <div className="space-y-5">
                <div>
                  <p className="eyebrow-ink mb-2.5">Tipo de negocio</p>
                  <div className="flex flex-wrap gap-2">
                    {TIPOS.map((t) => (
                      <button key={t.id} onClick={() => setFiltro(t.id)} aria-pressed={filtro === t.id} className={`${chipBase} ${filtro === t.id ? chipOn : chipOff}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow-ink mb-2.5">Plataforma</p>
                  <div className="flex flex-wrap gap-2">
                    {PLATS.map((t) => (
                      <button key={t.id} onClick={() => setPlat(t.id)} aria-pressed={plat === t.id} className={`${chipBase} ${plat === t.id ? chipOn : chipOff}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Nota>Los filtros solo cambian lo que ves en el catálogo; no afectan a tu plan. Toca el filtro activo otra vez para quitarlo.</Nota>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-sm text-ink-500">
                  <b className="num font-semibold text-ink-900">{cards.length}</b> metas
                </p>
                {(filtro !== "todos" || plat !== "todas") && (
                  <button onClick={() => { setFiltro("todos"); setPlat("todas"); }} className="link-quiet mt-2">
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Tarjetas */}
            <div className="mt-8 grid items-start gap-4 md:grid-cols-2">
              {cards.map((m) => {
                const on = sel.includes(m.id);
                const open = abierta === m.id;
                return (
                  <article
                    key={m.id}
                    className={`card-hover rounded-2xl border bg-white p-5 transition-all duration-200 ease-smooth ${
                      on ? "border-brand-600 ring-1 ring-brand-600/20" : "border-sand-200/80 hover:border-sand-300"
                    }`}
                  >
                    <button onClick={() => toggle(m.id)} aria-pressed={on} title={on ? "Quitar esta meta de tu plan" : "Añadir esta meta a tu plan"} aria-label={`${on ? "Quitar" : "Elegir"} la meta ${m.titulo}`} className="flex w-full items-start gap-4 text-left">
                      <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${on ? "bg-brand-50 text-brand-700" : "bg-ink-50 text-ink-400"}`}>
                        <Icon name={m.icono} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <b className="ts-sub text-base font-semibold text-ink-900">{m.titulo}</b>
                          {on && (
                            <span className="chip chip-good">
                              <Icon name="check" className="h-3 w-3" /> Elegida
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-ink-500">{m.desc}</span>
                      </span>
                      <span
                        aria-hidden
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          on ? "border-brand-700 bg-brand-700 text-white" : "border-ink-300 text-transparent"
                        }`}
                      >
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                    </button>

                    <div className="mt-4 border-t border-sand-200/70 pt-3">
                      <button onClick={() => abrirGuia(m.id)} aria-expanded={open} title="Abre la guía: por qué funciona, cómo empezar y cómo medirlo" className="link-quiet">
                        {open ? "Ocultar guía" : "Ver guía"}
                        <Icon name="arrow" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {cards.length === 0 && <p className="muted mt-6">Sin metas para ese filtro. Prueba otra combinación.</p>}

            {/* La guía vive en su propio panel: el catálogo no se deforma */}
            {abierta && (() => {
              const m = METAS.find((x) => x.id === abierta);
              if (!m) return null;
              const on = sel.includes(m.id);
              return (
                <article id="guia-meta" className="mt-10 scroll-mt-28 card">
                  <header className="flex flex-wrap items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon name={m.icono} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="eyebrow-ink">Guía de la meta</p>
                        <h3 className="mt-1 text-xl sm:text-2xl">{m.titulo}</h3>
                      </div>
                    </div>
                    <button onClick={() => setAbierta(null)} className="link-quiet shrink-0">Ocultar guía</button>
                  </header>

                  <div className="mt-8 grid gap-9 lg:grid-cols-2">
                    <div className="space-y-7">
                      <div>
                        <p className="eyebrow-ink">Por qué funciona</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{m.principio}</p>
                      </div>
                      <div>
                        <p className="eyebrow-ink">Cómo empezar</p>
                        <ol className="mt-3 space-y-3">
                          {m.pasos.map((p, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <span className="marker-quiet !h-6 !w-6 !text-2xs">{i + 1}</span>
                              <span className="pt-0.5 leading-relaxed text-ink-700">{p}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="space-y-7">
                      <div>
                        <p className="eyebrow-ink">Cómo medir</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{m.medir}</p>
                      </div>
                      <div>
                        <p className="eyebrow-ink">Pauta cuando</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{m.ads}</p>
                      </div>
                    </div>
                  </div>

                  <footer className="mt-9 border-t border-sand-200/70 pt-6">
                    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                      <button onClick={() => toggle(m.id)} aria-pressed={on} className={on ? "btn-ghost" : "btn-primary"}>
                        {on ? "Quitar" : "Elegir esta meta"}
                      </button>
                      {on && (
                        <span className="chip chip-good">
                          <Icon name="check" className="h-3 w-3" /> Elegida
                        </span>
                      )}
                    </div>
                    <Nota className="mt-3">
                      {on
                        ? "Ya forma parte de tu plan. Puedes quitarle la marca cuando quieras."
                        : "Añade esta meta a tu plan del paso 1. Todavía no se guarda nada: puedes cambiar de idea."}
                    </Nota>
                  </footer>
                </article>
              );
            })()}
          </section>

          {/* Guías por plataforma */}
          <section className="border-t border-sand-200/70 pt-10">
            <h2 className="text-xl sm:text-2xl">Guías por plataforma</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {[
                ["search", "Cómo empezar en Google", "Ficha, reseñas y búsquedas: el tráfico con más intención de compra."],
                ["share", "Cómo vender en Meta", "Fanpage, contenido y objetivos: primero orgánico, pauta con objetivo claro."],
                ["chat", "Cómo cerrar por WhatsApp", "Catálogo, respuesta en minutos y seguimiento a 24h."],
              ].map(([ic, t, d]) => (
                <div key={t as string}>
                  <Icon name={ic as string} className="h-5 w-5 text-brand-700" />
                  <b className="ts-sub mt-4 block text-base font-semibold text-ink-900">{t}</b>
                  <p className="muted mt-2">{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-sand-200/70 pt-10">
            <h2 className="text-xl sm:text-2xl">Preguntas frecuentes</h2>
            <div className="mt-8 max-w-3xl border-t border-sand-200/70">
              {[
                ["¿Empiezo por orgánico o pauta?", "Orgánico: valida oferta, mensaje y cierre sin gastar. La pauta acelera lo que ya convierte; sobre lo que no convierte, solo acelera el gasto."],
                ["¿Qué objetivo elijo al pautar?", "El que mida tu meta: ventas (compras), leads (contactos) o reconocimiento (alcance). Sin objetivo no hay campaña que optimizar."],
                ["¿Cuánto presupuesto necesito?", "Para probar: lo que puedas perder 2 semanas midiendo costo por contacto. El plan se adapta a $0 con el camino orgánico."],
                ["¿Y si mi nicho es sensible?", "Suplementos, finanzas/cripto, multinivel y apuestas tienen restricciones: el camino es educar, pedir permiso y cumplir políticas. Está incluido en tu plan."],
              ].map(([q, a]) => (
                <details key={q as string} className="group border-b border-sand-200/70">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-5 text-sm font-medium text-ink-900">
                    {q}
                    <span aria-hidden className="shrink-0 text-lg font-light text-ink-300 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-8 text-sm leading-relaxed text-ink-600">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Barra de acción: el único punto de decisión */}
          <div className="sticky bottom-0 z-30 -mx-5 mt-4 border-t border-sand-200/70 bg-white/95 px-5 py-3 shadow-[0_-12px_28px_-20px_rgba(16,24,40,.25)] backdrop-blur-md sm:-mx-8 sm:px-8 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-900">¿Listo para compilar tu plan?</p>
                <p className="tiny mt-0.5 hidden sm:block">
                  {elegidas.length === 0
                    ? "Elige tus metas y lo armamos con herramientas reales."
                    : `En tu plan: ${elegidas.map((m) => m.titulo).join(" · ")}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-x-4 gap-y-2">
                <span className={`chip ${elegidas.length ? "chip-good" : "chip-outline"}`}>{sel.length} elegida(s)</span>
                <span className="tiny hidden sm:inline">
                  {elegidas.length === 0 ? "Elige al menos 1 meta" : "«Continuar» pasa al paso 2: tu negocio."}
                </span>
                <button
                  disabled={!sel.length}
                  onClick={() => setPaso(1)}
                  title="Paso 2: nos cuentas de tu negocio para armar el plan"
                  className="btn-primary"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 2 · TU NEGOCIO                                                    */}
      {/* ================================================================ */}
      {paso === 1 && (
        <div className="animate-fade-up space-y-10">
          <header className="max-w-2xl">
            <p className="eyebrow">Paso 2 · Tu negocio</p>
            <h1 className="mt-3 text-2xl sm:text-3xl">Cuéntanos de tu negocio</h1>
            <p className="lead mt-4">Para compilar tu plan con herramientas reales, no genéricas.</p>
          </header>

          <div className="space-y-9">
            <div>
              <p className="text-sm font-semibold text-ink-900">¿Qué vendes? <span className="font-normal text-ink-500">(nichos sensibles incluidos: van con plan de cumplimiento)</span></p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {NICHOS.filter((n) => n.id !== "otro").map((n) => (
                  <button key={n.id} onClick={() => setNicho(n.id)} aria-pressed={nicho === n.id} className={`${opcionBase} ${nicho === n.id ? opcionOn : opcionOff}`}>
                    {n.label}
                    {n.sensible && <span className="ml-2 text-xs opacity-70">(sensible: con reglas)</span>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">¿Dónde existes hoy?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CANALES.map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setCanales((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))}
                    aria-pressed={canales.includes(v)}
                    className={`${chipBase} ${canales.includes(v) ? chipOn : chipOff}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">¿Cuánto puedes invertir al mes?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[["cero", "$0"], ["bajo", "Poco"], ["medio", "Medio"], ["alto", "Alto"]].map(([v, l]) => (
                  <button key={v} onClick={() => setPresupuesto(v)} aria-pressed={presupuesto === v} className={`${chipBase} ${presupuesto === v ? chipOn : chipOff}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <input value={negocio} onChange={(e) => setNegocio(e.target.value)} placeholder="Nombre de tu negocio (para tu informe)" aria-label="Nombre de tu negocio (para tu informe)" className="field max-w-md" />
          </div>

          <div className="border-t border-sand-200/70 pt-7">
            <div className="flex items-center gap-6">
              <button onClick={() => setPaso(0)} title="Vuelve al catálogo de metas sin perder lo que marcaste" className="link-quiet">Volver</button>
              <button disabled={!nicho || !presupuesto} onClick={() => setPaso(2)} title="Paso 3: tu momento y tu freno" className="btn-primary ml-auto">Seguir</button>
            </div>
            <Nota className="mt-3">
              «Volver» te devuelve al catálogo conservando tus metas elegidas. «Seguir» avanza al paso 3 y necesita que elijas qué vendes y cuánto puedes invertir.
            </Nota>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 3 · TU MOMENTO                                                    */}
      {/* ================================================================ */}
      {paso === 2 && (
        <div className="animate-fade-up space-y-10">
          <header className="max-w-2xl">
            <p className="eyebrow">Paso 3 · Tu momento</p>
            <h1 className="mt-3 text-2xl sm:text-3xl">Tu momento y tu freno</h1>
            <p className="lead mt-4">Esto afina canales, guion y prioridades.</p>
          </header>

          <div className="space-y-9">
            <div>
              <p className="text-sm font-semibold text-ink-900">¿En qué etapa estás?</p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ETAPAS_CTX.map((o) => (
                  <button key={o.value} onClick={() => setEtapa(o.value)} aria-pressed={etapa === o.value} className={`${opcionBase} ${etapa === o.value ? opcionOn : opcionOff}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">¿Tu nivel en marketing digital?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {NIVELES_CTX.map((o) => (
                  <button key={o.value} onClick={() => setNivel(o.value)} aria-pressed={nivel === o.value} className={`${chipBase} ${nivel === o.value ? chipOn : chipOff}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">¿Por dónde cierras ventas?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CIERRES_CTX.map((o) => (
                  <button key={o.value} onClick={() => setCierre(o.value)} aria-pressed={cierre === o.value} className={`${chipBase} ${cierre === o.value ? chipOn : chipOff}`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-900">¿Cuál es tu mayor freno hoy? <span className="font-normal text-ink-500">(opcional)</span></p>
              <input value={dolor} onChange={(e) => setDolor(e.target.value)} placeholder="Ej: me escriben mucho pero nadie compra" aria-label="Ej: me escriben mucho pero nadie compra" className="field mt-3 max-w-xl" />
            </div>
          </div>

          <div className="border-t border-sand-200/70 pt-7">
            <div className="flex items-center gap-6">
              <button onClick={() => setPaso(1)} title="Vuelve al paso 2: tu negocio" className="link-quiet">Volver</button>
              <button disabled={!etapa} onClick={() => setPaso(3)} title="Junta tus metas con las herramientas y muestra el plan final" className="btn-primary ml-auto">Compilar mi plan</button>
            </div>
            <Nota className="mt-3">
              «Compilar mi plan» reúne tus metas con sus herramientas y te muestra el plan final. Solo necesita que elijas tu etapa. «Volver» regresa al paso 2.
            </Nota>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 4 · TU PLAN                                                       */}
      {/* ================================================================ */}
      {paso === 3 && (() => {
        const { metas, ahora } = compilado();
        const fuentes = new Map<string, string>();
        metas.forEach((m) => m.soluciones.forEach((id) => (solutionById(id)?.sources || []).forEach((f) => { if (f.tipo === "oficial" && f.url) fuentes.set(f.titulo, f.url); })));
        return (
          <div className="animate-fade-up space-y-12">
            <header className="max-w-2xl">
              <p className="eyebrow">Tu compilado · {negocio || "tu negocio"}</p>
              <h1 className="mt-3 text-3xl sm:text-4xl">Tu plan por metas</h1>
              {dolor && <p className="lead mt-4">Tu freno (“{dolor}”) ya quedó marcado como prioridad del plan.</p>}
            </header>

            {metas.map((m) => (
              <section key={m.id} className="avoid-break border-t border-sand-200/70 pt-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={m.icono} className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl">{m.titulo}</h2>
                </div>

                <div className="mt-7 grid gap-8 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <p className="eyebrow-ink">Por qué funciona</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{m.principio}</p>
                    </div>
                    <div>
                      <p className="eyebrow-ink">Cómo empezar</p>
                      <ol className="mt-3 space-y-2.5">
                        {m.pasos.map((p, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="marker-quiet !h-6 !w-6 !text-2xs">{i + 1}</span>
                            <span className="pt-0.5 leading-relaxed text-ink-700">{p}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="eyebrow-ink">Cómo medir</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{m.medir}</p>
                    </div>
                    <div>
                      <p className="eyebrow-ink">Camino orgánico primero</p>
                      <ul className="mt-3 space-y-2">
                        {m.organico.map((o, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                            <span className="leading-relaxed text-ink-700">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="eyebrow-ink">Herramientas de esta meta</p>
                    {m.soluciones.map((id) => solutionById(id)).filter(Boolean).map((s: any) => (
                      <div key={s.solution_id} className="panel">
                        <div className="flex flex-wrap items-center gap-2">
                          <b className="ts-sub text-sm font-semibold text-ink-900">{s.name}</b>
                          <span className="chip chip-neutral">{COST_LABEL[s.cost_level as CostLevel]}</span>
                          {ahora.has(s.solution_id) && <span className="chip chip-bad">AHORA</span>}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{s.description} · {s.implementation_time}</p>
                        {serviceReferralForIds([s.solution_id]) && (() => { const ref = serviceReferralForIds([s.solution_id])!; return <a className="mt-2 inline-flex text-xs font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900" href={ref.href} target="_blank" rel="noreferrer">{ref.label} ↗ <span className="sr-only">, se abrirá en otra pestaña</span></a>; })()}
                      </div>
                    ))}
                    <p className="tiny rounded-2xl border border-brand-100 bg-brand-50/60 p-4 shadow-soft">Pauta cuando toque: {m.ads}</p>
                  </div>
                </div>
              </section>
            ))}

            {fuentes.size > 0 && (
              <section className="border-t border-sand-200/70 pt-8">
                <p className="eyebrow-ink">Fuentes oficiales de este plan</p>
                <ul className="mt-3 space-y-2">
                  {[...fuentes.entries()].map(([t, u]) => (
                    <li key={t} className="text-sm">
                      <a className="link-soft" href={u} target="_blank" rel="noreferrer">{t}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="border-t border-sand-200/70 pt-8">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button onClick={terminar} title="Guarda tu sesión en este navegador y abre tu dashboard" className="btn-primary">Guardar y ver mi diagnóstico 360°</button>
                <button onClick={() => setPaso(0)} title="Vuelve al catálogo para cambiar tus metas" className="link-quiet">Cambiar metas</button>
              </div>
              <Nota className="mt-3">
                «Guardar y ver mi diagnóstico 360°» guarda tu sesión en este navegador y abre tu dashboard con el análisis completo. «Cambiar metas» te devuelve al catálogo sin perder tus respuestas.
              </Nota>
            </div>
          </div>
        );
      })()}
    </div>
  );
}



