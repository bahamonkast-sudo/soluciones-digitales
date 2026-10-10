"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "../../lib/session";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../lib/scoring";
import { evaluateRules } from "../../lib/rules";
import { solutionById } from "../../lib/solutions";
import { retrieveKnowledge } from "../../lib/knowledge";
import { nichoById } from "../../lib/nichos";
import { buildPlan7, loadPlanDone, togglePlanDone } from "../../lib/plan7";
import { generarCodigo, guardarCodigo, leerCodigo, codigoEsperado, validarCodigo, marcarDesbloqueado, estaDesbloqueado, mensajeSolicitudInforme } from "../../lib/codigos";
import Icon from "../../components/icon";

const TIPO_LABEL: Record<string, string> = { oficial: "Oficial", academica: "Académica", buena_practica: "Buena práctica", recomendacion: "tuConsultor", estudio: "Estudio" };

export default function Informe() {
  const [s, setS] = useState<any>(null);
  const [done, setDone] = useState<number[]>([]);
  // Compuerta del informe completo: un código estable por navegador.
  const [codigo, setCodigo] = useState("");
  const [pegado, setPegado] = useState("");
  const [errCode, setErrCode] = useState("");
  const [desbloqueado, setDesbloqueado] = useState(false);
  useEffect(() => {
    const sess = loadSession();
    if (!sess) return;
    const answers = { ...sess.answers, etapa: sess.perfil.etapa };
    const sc = (sess as any).scores || scoreAnswers(answers);
    setS({ sess, answers, salud: saludGeneral(sc), cuellos: detectarCuellos(sc), rules: evaluateRules(answers) });
    setDone(loadPlanDone());
    const existente = leerCodigo();
    const c = existente || generarCodigo();
    if (!existente) guardarCodigo(c);
    setCodigo(c);
    setDesbloqueado(estaDesbloqueado(c));
  }, []);
  const validar = () => {
    if (!codigo) return;
    if (validarCodigo(codigo, pegado)) {
      marcarDesbloqueado(codigo);
      setDesbloqueado(true);
      setErrCode("");
    } else {
      setErrCode("Ese código no coincide. Pídelo por WhatsApp o revisa que lo hayas pegado completo.");
    }
  };
  if (!s) return (
    <div className="mx-auto max-w-2xl card animate-fade-up">
      <p className="eyebrow">Informe personalizado · tuConsultor</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">Tu informe estará disponible después del diagnóstico</h1>
      <p className="lead mt-4">Esta pantalla reúne el análisis personalizado, que requiere un diagnóstico previo. Mientras tanto, puedes abrir el consultor de marketing desde el botón flotante en cualquier página; responde sin depender de este informe.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/diagnostico">Empezar el diagnóstico <span aria-hidden>→</span></Link>
        <Link className="btn-ghost" href="/chequeo">Prefiero medir mis números</Link>
      </div>
    </div>
  );

  const plan = buildPlan7(s.rules);
  const pct = Math.round((done.length / plan.length) * 100);
  const waText = encodeURIComponent(`Hola Soluciones Digitales, hice mi diagnóstico en tuConsultor.\nNegocio: ${s.sess.perfil.negocio || "—"}\nSalud: ${s.salud}/100\nFreno principal: ${s.cuellos[0]?.factor || "—"}\nPrioridad: ${s.rules.filter((r: any) => r.priority === "ahora").map((r: any) => r.need).slice(0, 3).join(" | ")}\nQuiero que me ayuden a implementarlo.`);
  // Dolores recopilados: es lo que viaja en el mensaje de WhatsApp.
  const dolores: string[] = s.rules.map((r: any) => r.need);
  const nicho = nichoById(s.answers.nicho || "otro");
  const nivelNicho = nicho.nivel || (nicho.sensible ? "restringido" : "libre");
  const waInforme = encodeURIComponent(
    mensajeSolicitudInforme({
      negocio: s.sess.perfil.negocio || "tu negocio",
      sector: nicho.label,
      etapa: s.answers.etapa || s.sess.perfil.etapa,
      salud: s.salud,
      freno: s.cuellos[0] ? `${s.cuellos[0].factor} (${s.cuellos[0].score}/100)` : undefined,
      prioridades: s.rules.map((r: any) => ({ need: r.need, prioridad: r.priority })),
      dolores,
      kpis: ["Contactos/semana", "Tiempo de respuesta", "% seguimiento <24h", "Reseñas nuevas", "Conversión contacto→venta", "Recompra"],
      restriccion:
        nivelNicho === "libre"
          ? undefined
          : `${nivelNicho === "prohibido" ? "no se puede promocionar" : "con restricciones"} — ${nicho.camino || nicho.alerta || ""}`.slice(0, 200),
      codigo,
    })
  );
  const fuentes = (() => {
    try {
      const seen: string[] = [];
      s.rules.forEach((r: any) => ((r.solutions || []) as string[]).forEach((id: string) => {
        const t = String(id).split("_")[0];
        if (!seen.includes(t)) seen.push(t);
      }));
      return retrieveKnowledge(seen, 6);
    } catch { return []; }
  })();

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="card animate-fade-up" id="informe">
          <span className="chip chip-good">INFORME ESTRATÉGICO tuConsultor</span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">Plan de crecimiento para {s.sess.perfil.negocio || "tu negocio"}</h1>
          <p className="muted mt-1">Salud general {s.salud}/100 · {new Date(s.sess.createdAt).toLocaleString()}</p>
          <hr className="rule my-4" />
          <section className="section text-sm">
            <h2 className="font-bold">1. Resumen: qué está pasando</h2>
            <p>{s.cuellos[0]?.mensaje || "Negocio con bases para escalar; prioriza conversión y seguimiento."} Tu problema no parece ser falta de herramientas, sino generar flujo hacia ellas y cerrar el interés.</p>
            <h2 className="font-bold rule-brand pt-2">2. Principales problemas y causas</h2>
            {s.rules.slice(0, 5).map((r: any, i: number) => (<p key={i}>• <b>{r.need}:</b> {r.reason}</p>))}
            <h2 className="font-bold rule-brand pt-2">3. Qué hacer primero (Ahora / Próximo / Después)</h2>
            {s.rules.map((r: any, i: number) => (<p key={i} className="panel p-2">[{r.priority.toUpperCase()}] {r.need} → {r.solutions.map((id: string) => solutionById(id)?.name).filter(Boolean).join(", ")}</p>))}
            <h2 className="font-bold rule-brand pt-2">4. KPIs a observar</h2>
            <p>Contactos/semana · tiempo de respuesta · % seguimiento &lt;24h · reseñas nuevas · conversión contacto→venta · recompra.</p>
          </section>
          <section className="section mt-4 text-sm">
            <h2 className="font-bold rule-brand pt-2">5. Fuentes que respaldan tu plan</h2>
            <p className="tiny">Toda afirmación importante cita su origen: son fuentes oficiales y verificadas. Los enlaces se entregan con tu informe completo.</p>
            {fuentes.map((d, i) => (<p key={i} className="text-xs mt-1"><span className="chip chip-neutral">{TIPO_LABEL[d.tipo] || d.tipo}</span> <b className="ts-sub">{d.titulo}</b> — {d.resumen}</p>))}
            <p className="tiny mt-3 flex items-start gap-2 rounded-xl border border-sand-200/70 bg-sand-50/60 p-2.5">
              <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
              <span>Los enlaces a las fuentes, los videos explicativos y tu ebook por dolores vienen en el <b className="font-semibold text-ink-700">informe completo</b>: solicítalo por WhatsApp más abajo.</span>
            </p>
          </section>
          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={() => window.print()} className="btn-ghost"><Icon name="printer" className="w-4 h-4 inline-block" aria-hidden="true" /> Imprimir / PDF</button>
          </div>
        </div>

      </div>

      {/* ================================================================ */}
      {/* COMPUERTA · el informe completo se solicita por WhatsApp          */}
      {/* ================================================================ */}
      <div className="card-edge card-edge-warn">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Informe completo · por WhatsApp</p>
            <h2 className="mt-2 text-xl sm:text-2xl">Esto es el preliminar. El informe completo te lo enviamos por WhatsApp</h2>
            <p className="lead mt-4">
              Incluye el detalle de cada dolor con su teoría, los <b className="font-semibold text-ink-900">videos explicativos</b>, las <b className="font-semibold text-ink-900">fuentes oficiales enlazadas</b> y tu <b className="font-semibold text-ink-900">ebook por dolores</b>, con un capítulo por cada punto de tu diagnóstico.
            </p>
            <ol className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex gap-3">
                <span className="marker-quiet !h-6 !w-6 !text-2xs">1</span>
                <span className="pt-0.5">Pulsa el botón: se abre WhatsApp con <b className="font-semibold text-ink-900">tus {dolores.length} dolores</b> ya escritos y tu código.</span>
              </li>
              <li className="flex gap-3">
                <span className="marker-quiet !h-6 !w-6 !text-2xs">2</span>
                <span className="pt-0.5">Te respondemos con tu autorización.</span>
              </li>
              <li className="flex gap-3">
                <span className="marker-quiet !h-6 !w-6 !text-2xs">3</span>
                <span className="pt-0.5">Pégala aquí abajo y se desbloquea tu ebook completo.</span>
              </li>
            </ol>
            <p className="tiny mt-5">
              Sin ese paso no verás los videos ni las fuentes: es un informe que se entrega conversando, porque cada negocio necesita ajustes que una máquina no adivina.
            </p>
          </div>

          <div className="w-full max-w-xs shrink-0 rounded-2xl border border-gold-300 bg-white/85 p-5 shadow-soft">
            <p className="stat-label">Tu código</p>
            <p className="num mt-1 font-mono text-xl font-bold tracking-widest text-ink-900">{codigo || "…"}</p>
            <p className="tiny mt-2">Viaja dentro del mensaje. Es el mismo código que abre tu ebook.</p>

            <a className="btn-gold mt-5 w-full" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${waInforme}`}>
              <Icon name="send" className="h-4 w-4" /> Solicitar mi informe
            </a>

            {desbloqueado ? (
              <>
                <p className="chip chip-good mt-4">
                  <Icon name="check" className="h-3 w-3" /> Desbloqueado
                </p>
                <Link className="btn-primary mt-3 w-full" href={`/ebook?codigo=${encodeURIComponent(codigoEsperado(codigo))}`}>
                  <Icon name="book" className="h-4 w-4" /> Ver mi ebook
                </Link>
                <p className="tiny mt-3">Ya puedes leer el informe completo y el ebook con todos los capítulos y videos.</p>
              </>
            ) : (
              <div className="mt-5 space-y-2.5">
                <label className="field-label" htmlFor="codigo-autorizacion">Pega aquí la autorización que te enviemos</label>
                <input
                  id="codigo-autorizacion"
                  value={pegado}
                  onChange={(e) => setPegado(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && validar()}
                  placeholder="Pega aquí la autorización completa"
                  aria-label="Pega aquí la autorización completa"
                  className="field font-mono"
                />
                <button onClick={validar} className="btn-primary w-full">Desbloquear mi ebook</button>
                {errCode && <p role="alert" className="tiny text-red-600">{errCode}</p>}
                <p className="tiny">La autorización es tu código más el sufijo que te enviamos por WhatsApp.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PLAN 7 DÍAS */}
      <div className="card">
        <div className="section-head">
          <h2 className="font-bold"><Icon name="calendar" className="w-5 h-5 inline-block" aria-hidden="true" /> Tu semana de arranque (acciones de 15–40 min)</h2>
          <span className="chip chip-good num">{done.length}/{plan.length} · {pct}%</span>
        </div>
        <div className="h-2 bg-sand-200/70 rounded-full mt-2"><div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-300 ease-smooth" style={{ width: `${pct}%` }} /></div>
        <div className="grid md:grid-cols-2 gap-2 mt-3">
          {plan.map((t) => {
            const on = done.includes(t.dia);
            return (<button key={t.dia} onClick={() => setDone(togglePlanDone(t.dia))} className={`panel card-hover text-left p-3 text-sm ${on ? "border-brand-400 bg-brand-50" : "border-sand-200/80 bg-white hover:border-brand-300 hover:bg-sand-50"}`}>
              <div className="flex gap-2"><span className={`w-5 h-5 rounded-md border-2 grid place-items-center shrink-0 mt-0.5 ${on ? "bg-brand-600 border-brand-600 text-white" : "border-ink-200 bg-white"}`} aria-hidden="true">{on && <Icon name="check" className="w-3 h-3" />}</span><div>
                <b className="ts-sub">Día {t.dia} · {t.titulo}</b> <span className="tiny">({t.minutos} min)</span>
                <p className="text-ink-700 text-xs mt-0.5">{t.detalle}</p>
                <p className="tiny mt-0.5">KPI: {t.kpi}{t.solucion ? ` · ${t.solucion}` : ""}</p>
              </div></div>
            </button>);
          })}
        </div>
        {pct === 100 && <div className="card-hero mt-3 !p-3 text-sm"><Icon name="check" className="w-4 h-4 inline-block" aria-hidden="true" /> Semana completa. Vuelve a medir y genera un nuevo diagnóstico — o <a className="font-bold underline decoration-2 underline-offset-2" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${waText}`}>pide que Soluciones Digitales escale lo que funcionó</a>.</div>}
      </div>
    </div>
  );
}









