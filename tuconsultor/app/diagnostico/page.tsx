"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DOLORES, leerDolor, ESTADO_META } from "../../lib/dolores";
import { QUESTIONS } from "../../lib/questions";
import { NICHOS, nichoById } from "../../lib/nichos";
import { solutionById, COST_LABEL, CostLevel } from "../../lib/solutions";
import { saveSession } from "../../lib/session";
import GroqKeyField from "../../components/groq-key";
import Icon from "../../components/icon";

type Respuestas = Record<string, any>;

// Diagnóstico 360° — una pregunta por pantalla, siempre la misma mecánica:
// lees la pregunta, eliges, y en el acto ves qué significa tu respuesta y qué
// hacer esta semana. Las respuestas se acumulan para el informe y el ebook.
export default function Diagnostico() {
  const router = useRouter();
  const [intro, setIntro] = useState(true);
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<Respuestas>({});
  const [guardando, setGuardando] = useState(false);

  const total = DOLORES.length;

  // Solo mostramos las preguntas cuya condición se cumple (el resto no aplica).
  const visibles = useMemo(() => {
    const aplica = (id: string) => {
      const q = QUESTIONS.find((x) => x.id === id);
      return !q?.conditional || q.conditional(resp);
    };
    return DOLORES.filter((x) => aplica(x.id));
  }, [resp]);

  useEffect(() => {
    if (!intro && i >= visibles.length) setI(Math.max(0, visibles.length - 1));
  }, [intro, i, visibles.length]);

  const actual = visibles[Math.min(i, Math.max(0, visibles.length - 1))] || DOLORES[0];
  const q = QUESTIONS.find((x) => x.id === actual.id);
  const multi = q?.kind === "multi";
  const esTexto = (actual.modo || "valor") === "texto";
  const valor = resp[actual.id];
  const contestada = multi ? Array.isArray(valor) && valor.length > 0 : valor !== undefined && valor !== null && String(valor).trim() !== "";
  const lectura = contestada ? leerDolor(actual, valor) : null;
  const nichoElegido = actual.id === "nicho" && valor ? nichoById(String(valor)) : null;
  const meta = lectura ? ESTADO_META[lectura.estado] : null;
  const restringido = nichoElegido && nichoElegido.nivel !== "libre";

  const marcar = (v: string) => {
    if (multi) {
      const prev: string[] = Array.isArray(resp[actual.id]) ? resp[actual.id] : [];
      setResp({ ...resp, [actual.id]: prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v] });
    } else {
      setResp({ ...resp, [actual.id]: v });
    }
  };

  const terminar = (r: Respuestas) => {
    setGuardando(true);
    const nicho = r.nicho || "otro";
    saveSession({
      perfil: {
        negocio: String(r.negocio || "tu negocio"),
        sector: nichoById(nicho).label.replace(" ⚠️", ""),
        etapa: r.etapa || "emprendedor",
        objetivo: r.objetivo || "clientes",
        presupuesto: r.presupuesto,
        mercado: r.pais || "",
      },
      answers: r,
      createdAt: new Date().toISOString(),
    });
    router.push("/informe");
  };

  const omitir = () => {
    const copia = { ...resp };
    delete copia[actual.id];
    setResp(copia);
    if (i + 1 >= visibles.length) return terminar(copia);
    setI(i + 1);
  };

  /* ---------------------------------------------------------------- */
  /* PORTADA — la clave de IA encabeza, con sus instrucciones          */
  /* ---------------------------------------------------------------- */
  if (intro) {
    return (
      <div className="mx-auto max-w-4xl animate-fade-up space-y-14">
        <section className="space-y-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Antes de empezar · opcional</p>
            <h1 className="mt-3 text-2xl sm:text-3xl">Tu clave de IA (opcional, pero recomendada)</h1>
            <p className="lead mt-4">
              El diagnóstico funciona <b className="font-semibold text-ink-900">sin clave</b>: el motor de reglas te da el plan completo. La clave solo añade la capa de IA, que interpreta tus respuestas con tus propias palabras.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex gap-3">
                <Icon name="key" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span><b className="font-semibold text-ink-900">Qué es:</b> una clave gratuita de Groq, el proveedor de IA que usa tuConsultor.</span>
              </li>
              <li className="flex gap-3">
                <Icon name="bulb" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span><b className="font-semibold text-ink-900">Para qué sirve:</b> para que la interpretación de tu diagnóstico se escriba a la medida de tu caso, en vez de con plantillas.</span>
              </li>
              <li className="flex gap-3">
                <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span><b className="font-semibold text-ink-900">Dónde vive:</b> se guarda solo en este navegador. No se envía a ningún sitio ni aparece en tu informe.</span>
              </li>
              <li className="flex gap-3">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span><b className="font-semibold text-ink-900">Si no la tienes:</b> sáltala sin problema. Puedes añadirla después desde el informe sin perder nada.</span>
              </li>
            </ul>
          </div>
          <GroqKeyField />
        </section>

        <section className="border-t border-sand-200/70 pt-12">
          <div className="max-w-2xl">
            <p className="eyebrow">Diagnóstico 360°</p>
            <h2 className="mt-3 text-2xl sm:text-3xl">Una pregunta por pantalla, y en cada una tu solución</h2>
            <p className="lead mt-4">
              Sin chat y sin adivinar: eliges entre opciones claras. Al marcar, ves qué significa tu respuesta, por qué suele frenar a negocios como el tuyo y qué hacer esta semana.
            </p>
            <dl className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                ["clipboard", `${total} preguntas`, "Propuesta, cliente, canales, cierre, seguimiento, medición y rentabilidad."],
                ["clock", "6–8 minutos", "Cada respuesta te da la solución al instante; no hay que esperar al final."],
                ["book", "Informe + ebook", "Se acumula todo: informe parcial al terminar y, completo, por WhatsApp con tu código."],
              ].map(([ic, t, s]) => (
                <div key={t} className="panel">
                  <Icon name={ic} className="h-5 w-5 text-brand-700" />
                  <dt className="ts-sub mt-3 text-sm font-semibold text-ink-900">{t}</dt>
                  <dd className="tiny mt-1.5">{s}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button onClick={() => setIntro(false)} className="btn-primary">
                Empezar el diagnóstico <Icon name="arrow" className="h-4 w-4" />
              </button>
              <div className="rounded-2xl border border-sand-200 bg-white/80 p-4 shadow-soft"><p className="eyebrow-ink">¿Buscas una lectura rápida?</p><p className="tiny mt-1">El Chequeo mide ocho señales con tus cifras actuales. Este Diagnóstico profundiza con preguntas sobre 15 factores del negocio.</p><Link href="/chequeo" className="btn-secondary mt-3">Empezar chequeo <Icon name="arrow" className="h-4 w-4" /></Link></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* PREGUNTA                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <div className="animate-fade-up">
      {/* Barra de progreso */}
      <div className="sticky top-28 z-30 -mx-5 mb-8 border-b border-sand-200/70 bg-cream/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex items-center gap-4">
            <span className="num text-xs font-semibold text-ink-400">
              {Math.min(i + 1, visibles.length)} / {visibles.length}
            </span>
            <span className="chip chip-neutral">{actual.marco || actual.momento}</span>
          </div>
          <div className="flex items-center gap-5">
            {q?.opcional && (
              <button onClick={omitir} className="link-quiet" title="Esta pregunta es opcional: puedes saltarla">
                Omitir
              </button>
            )}
            <button onClick={() => (i === 0 ? setIntro(true) : setI(i - 1))} className="link-quiet" title="Volver a la pregunta anterior">
              Atrás
            </button>
          </div>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-sand-200/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 ease-smooth"
            style={{ width: `${((Math.min(i, visibles.length - 1) + (contestada ? 1 : 0)) / visibles.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        {/* La pregunta y sus opciones */}
        <section>
          <p className="eyebrow">{actual.momento}</p>
          <h1 className="mt-3 text-2xl leading-tight sm:text-3xl">{actual.pregunta}</h1>

          {actual.queMedimos && <p className="muted mt-4">{actual.queMedimos}</p>}
          {actual.limita && (
            <p className="mt-6 flex gap-3 rounded-2xl border border-sand-200/70 bg-sand-50/60 p-4 text-sm leading-relaxed text-ink-700 shadow-soft">
              <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>
                <b className="font-semibold text-ink-900">Qué suele frenar aquí:</b> {actual.limita}
              </span>
            </p>
          )}

          <div className="mt-8 space-y-2.5" role={multi ? "group" : "radiogroup"} aria-label={actual.pregunta}>
            {esTexto ? (
              <input
                value={valor || ""}
                onChange={(e) => setResp({ ...resp, [actual.id]: e.target.value })}
                placeholder={q?.ejemplo || "Escribe tu respuesta"}
                aria-label={actual.pregunta}
                className="field"
              />
            ) : actual.id === "nicho" ? (
              NICHOS.filter((n) => n.id !== "otro").map((n) => {
                const on = valor === n.id;
                const nivel = n.nivel || (n.sensible ? "restringido" : "libre");
                return (
                  <button
                    key={n.id}
                    onClick={() => marcar(n.id)}
                    role="radio"
                    aria-checked={on}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ease-smooth ${
                      on ? "border-brand-600 bg-brand-50/70 shadow-soft" : "border-sand-200/70 bg-white hover:-translate-y-0.5 hover:border-sand-300 hover:shadow-soft"
                    }`}
                  >
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${on ? "border-brand-700 bg-brand-700 text-white" : "border-sand-300"}`} aria-hidden>
                      {on && <Icon name="check" className="h-3 w-3" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <b className="text-sm font-semibold text-ink-900">{n.label}</b>
                        <span className={`chip ${nivel === "prohibido" ? "chip-bad" : nivel === "restringido" ? "chip-warn" : "chip-good"}`}>
                          {nivel === "prohibido" ? "No se puede promocionar" : nivel === "restringido" ? "Con restricciones" : "Sin restricciones"}
                        </span>
                      </span>
                      {nivel !== "libre" && (
                        <span className="tiny mt-1.5 block">{n.alerta || "Tiene reglas propias: hay camino, con condiciones."}</span>
                      )}
                    </span>
                  </button>
                );
              })
            ) : (
              (q?.options || []).map((o) => {
                const on = multi ? Array.isArray(valor) && valor.includes(o.value) : valor === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() => marcar(o.value)}
                    role={multi ? "checkbox" : "radio"}
                    aria-checked={on}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ease-smooth ${
                      on ? "border-brand-600 bg-brand-50/70 shadow-soft" : "border-sand-200/70 bg-white hover:-translate-y-0.5 hover:border-sand-300 hover:shadow-soft"
                    }`}
                  >
                    <span className={`grid h-5 w-5 shrink-0 place-items-center border ${multi ? "rounded-md" : "rounded-full"} ${on ? "border-brand-700 bg-brand-700 text-white" : "border-sand-300"}`} aria-hidden>
                      {on && <Icon name="check" className="h-3 w-3" />}
                    </span>
                    <span className="text-sm font-medium text-ink-800">{o.label}</span>
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button
              disabled={!contestada && !q?.opcional}
              onClick={() => (i + 1 >= visibles.length ? terminar(resp) : setI(i + 1))}
              className="btn-primary"
              title={i + 1 >= visibles.length ? "Guarda tus respuestas y abre tu informe parcial" : "Siguiente pregunta"}
            >
              {i + 1 >= visibles.length ? "Ver mi informe parcial" : "Siguiente"} <Icon name="arrow" className="h-4 w-4" />
            </button>
            {!contestada && !q?.opcional && <span className="tiny">Elige una opción para continuar.</span>}
            {q?.opcional && !contestada && <span className="tiny">Puedes omitirla si no aplica a tu caso.</span>}
          </div>
        </section>

        {/* La solución, al instante */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          {!lectura ? (
            <div className="card-quiet border-dashed text-center">
              <Icon name="bulb" className="mx-auto h-6 w-6 text-ink-300" />
              <p className="muted mt-3">En cuanto elijas, aquí verás qué significa tu respuesta y qué hacer esta semana.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="card-edge card-edge-warn">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`chip ${meta?.chip}`}>
                    <Icon name={meta?.icono || "check"} className="h-3.5 w-3.5" />
                    {meta?.label}
                  </span>
                  <span className="tiny">
                    Tu respuesta: <b className="font-semibold text-ink-700">{lectura.respuesta}</b>
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-800">{lectura.diagnostico}</p>
              </div>

              {restringido && nichoElegido && (
                <div className="panel">
                  <p className="eyebrow-ink">Cómo se crece en este nicho</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{nichoElegido.camino}</p>
                </div>
              )}

              <div className="panel">
                <p className="eyebrow-ink">Tu solución inmediata</p>
                <p className="ts-sub mt-2 text-sm font-semibold leading-relaxed text-ink-900">{actual.siguientePaso}</p>
              </div>

              <div className="panel">
                <p className="eyebrow-ink">Cómo se resuelve</p>
                <ol className="mt-3 space-y-2.5">
                  {actual.practicas.slice(0, 4).map((p, n) => (
                    <li key={p} className="flex gap-3 text-sm">
                      <span className="marker-quiet !h-6 !w-6 !text-2xs">{n + 1}</span>
                      <span className="pt-0.5 leading-relaxed text-ink-700">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="panel">
                <p className="eyebrow-ink">Herramientas para esto</p>
                <div className="mt-3 space-y-2.5">
                  {actual.soluciones
                    .map((id) => solutionById(id))
                    .filter(Boolean)
                    .map((s: any) => (
                      <div key={s.solution_id} className="flex flex-wrap items-center gap-2 text-sm">
                        <b className="font-semibold text-ink-900">{s.name}</b>
                        <span className="chip chip-neutral">{COST_LABEL[s.cost_level as CostLevel]}</span>
                        <span className="tiny">{s.implementation_time}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="panel">
                <p className="eyebrow-ink">Cómo medir la mejora</p>
                <ul className="mt-3 space-y-2">
                  {actual.kpis.slice(0, 3).map((k) => (
                    <li key={k} className="flex gap-2.5 text-sm">
                      <Icon name="chart" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span className="leading-relaxed text-ink-700">{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {actual.evitar.length > 0 && (
                <div className="rounded-2xl border border-red-100 bg-red-50/70 p-4 shadow-soft">
                  <p className="eyebrow-ink">Evita esto</p>
                  <ul className="mt-2 space-y-1.5">
                    {actual.evitar.slice(0, 2).map((e) => (
                      <li key={e} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {actual.noAplica && <p className="tiny">{actual.noAplica}</p>}
            </div>
          )}
        </aside>
      </div>

      {guardando && (
        <p className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ink-900 px-5 py-2.5 text-xs font-medium text-white shadow-lift" role="status">
          Guardando tu diagnóstico…
        </p>
      )}
    </div>
  );
}

