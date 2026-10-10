"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "../../lib/session";
import { scoreAnswers, saludGeneral, infraIndice, flujoIndice, detectarCuellos, aida, journey, dofa } from "../../lib/scoring";
import { evaluateRules } from "../../lib/rules";
import { FACTORES } from "../../lib/factors";
import { SOLUTIONS, COST_LABEL, solutionById } from "../../lib/solutions";
import { Radar15, Bars } from "../../components/charts";
import { getGroqKey } from "../../lib/settings";
import GroqKeyField from "../../components/groq-key";
import Simulador from "../../components/simulador";
import { nichoById, veredictoCanales, ideasContenido } from "../../lib/nichos";
import { guionPorCierre } from "../../lib/guiones";
import Icon, { sinEmojis } from "../../components/icon";

export default function Dashboard() {
  const [s, setS] = useState<any>(null);
  const [ai, setAi] = useState<any>(null);
  const refetchAi = (sess: any, answers: any) => {
    setAi(null);
    fetch("/tuconsultor/api/diagnose", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ perfil: sess.perfil, answers, groqKey: getGroqKey() || undefined, scores: (sess as any).scores || undefined }) }).then((r) => r.json()).then(setAi).catch(() => setAi({ fallback: true }));
  };
  useEffect(() => {
    const sess = loadSession();
    if (!sess) { setS({ demo: true }); return; }
    const answers = { ...sess.answers, etapa: sess.perfil.etapa, presupuesto: sess.perfil.presupuesto };
    const scores = (sess as any).scores || scoreAnswers(answers);
    setS({ sess, answers, scores, salud: saludGeneral(scores), infra: infraIndice(answers), flujo: flujoIndice(scores), cuellos: detectarCuellos(scores), aida: aida(scores), journey: journey(scores), dofa: dofa(answers, scores), rules: evaluateRules(answers) });
    refetchAi(sess, answers);
  }, []);

  if (!s) return <div className="card text-center muted animate-fade-up" role="status" aria-live="polite">Analizando tu negocio…</div>;
  if (s.demo) return (<div className="card-hero animate-fade-up"><h2 className="text-xl font-bold">Aún no hay diagnóstico</h2><p className="mt-2 text-sm text-brand-100">Inicia tu diagnóstico para ver tu dashboard 360°.</p><Link href="/diagnostico" className="btn-gold mt-4">Iniciar →</Link></div>);

  const radar = FACTORES.map((f) => ({ factor: f.nombre.split(" ")[0], v: s.scores[f.id] }));
  const plan = (p: string) => s.rules.filter((r: any) => r.priority === p);
  const costW: Record<string, number> = { gratis: 0, bajo: 1, medio: 2, avanzado: 3 };
  const lowBudget = s.answers.presupuesto === "cero" || s.answers.presupuesto === "bajo";
  const sols = SOLUTIONS.filter((sol) => s.rules.some((r: any) => r.solutions.includes(sol.solution_id))).sort((a, b) => (lowBudget ? costW[a.cost_level] - costW[b.cost_level] : 0));
  const CAMPOS: [string, string][] = [["negocio", "Negocio"], ["nicho", "Nicho"], ["objetivo", "Objetivo"], ["canales", "Canales"], ["flujo", "Flujo"], ["frecuencia", "Contenido"], ["resenas", "Reseñas"], ["oferta", "Oferta"], ["seguimiento", "Seguimiento"], ["presupuesto", "Presupuesto"]];
  const tieneCampo = (id: string) => id === "negocio" ? !!s.sess.perfil.negocio : id === "canales" ? (s.answers.canales || []).length > 0 : !!s.answers[id];
  const faltan = CAMPOS.filter(([id]) => !tieneCampo(id)).map(([, l]) => l);
  const nicho = nichoById(s.answers.nicho || "otro");
  const ver = veredictoCanales(s.answers.nicho || "otro", s.answers.canales || []);
  const ideas = ideasContenido(s.answers.nicho || "otro", s.sess.perfil.negocio || "");
  const guion = guionPorCierre(s.answers.cierre);

  return (
    <div className="space-y-4">
      <div className="grid items-start gap-3 sm:grid-cols-2 md:grid-cols-4">
        <div className="stat flex flex-col gap-1 text-center">
          <div className="stat-label">SALUD GENERAL</div>
          <div className={`stat-value ${s.salud < 45 ? "text-red-600 animate-pulse" : s.salud < 65 ? "text-gold-700" : "text-brand-700"}`}>{s.salud}</div>
          <div className="tiny">/100 · {s.salud < 45 ? "Crítico" : s.salud < 65 ? "En revisión" : "Estable"}</div>
        </div>
        <div className="stat flex flex-col gap-1 text-center">
          <div className="stat-label">MADUREZ DIGITAL (infra)</div>
          <div className="stat-value">{s.infra}</div>
          <div className="tiny">/100 · existe→funciona→optimizado→integrado→resultados</div>
        </div>
        <div className="stat flex flex-col gap-1 text-center">
          <div className="stat-label">FLUJO COMERCIAL</div>
          <div className="stat-value">{s.flujo}</div>
          <div className="tiny">/100 · descubrimiento→venta→fidelización</div>
        </div>
        <div className="card card-tight card-mist flex flex-col gap-1 text-sm">
          <div className="font-bold ts-sub"><Icon name="bulb" className="w-4 h-4 inline-block" aria-hidden="true" /> Interpretación IA {ai?.fallback ? "(modo local)" : "(Groq)"}</div>
          <p className="text-ink-700">{sinEmojis(ai?.resumen || "Analizando contexto…")}</p>
          {ai?.log && <p className="tiny">Trazabilidad: {ai.log.model} · {ai.log.ms}ms</p>}
          <div className="mt-1"><GroqKeyField compact onChange={() => { const sess = loadSession(); if (sess && s?.sess) refetchAi(sess, s.answers); }} /></div>
        </div>
      </div>

      <div className="card card-tight flex flex-wrap items-center gap-2 text-sm">
        <b className="ts-sub"><Icon name="shield" className="w-4 h-4 inline-block text-brand-700" aria-hidden="true" /> Integridad del diagnóstico: {CAMPOS.length - faltan.length}/{CAMPOS.length}</b>
        <span className="tiny">{faltan.length === 0 ? "Completo: todas las áreas tienen datos reales." : `Basado en tus respuestas reales. Para afinar: ${faltan.join(", ")}.`}</span>
      </div>

      {s.cuellos.length > 0 && (<div className="card card-edge card-edge-bad"><h3 className="font-bold"><Icon name="alert" className="w-5 h-5 inline-block text-red-600" aria-hidden="true" /> Cuellos de botella (lo que realmente te frena)</h3>{s.cuellos.map((c: any, i: number) => (<p key={i} className="mt-2 text-sm"><b>{c.factor} ({c.score})</b> — {c.mensaje}</p>))}</div>)}

      <Simulador conversionActual={Math.round((s.scores.conversion + s.scores.proceso_comercial) / 2)} />

      <div className="card card-edge">
        <div className="flex flex-wrap items-center gap-2"><h3 className="font-bold"><Icon name="target" className="w-5 h-5 inline-block" aria-hidden="true" /> Tu nicho: {nicho.label}</h3>{nicho.sensible && <span className="chip chip-warn"><Icon name="alert" className="w-3 h-3 inline-block" aria-hidden="true" /> nicho sensible</span>}</div>
        {ver.alerta && <p className="card-edge card-edge-warn mt-2 rounded-2xl p-3 text-sm text-gold-700">{ver.alerta}</p>}
        {s.answers.dolor && <p className="mt-2 text-sm text-ink-700"><Icon name="chat" className="w-4 h-4 inline-block" aria-hidden="true" /> En tus palabras: “{s.answers.dolor}”</p>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
          <div className="panel bg-brand-mist p-3"><b className="text-brand-700 ts-sub">Dónde sí ({ver.bien.length})</b>{ver.bien.map((c, i) => <p key={i} className="text-xs mt-1"><b>{c.canal}:</b> {c.por_que}</p>)}{ver.bien.length === 0 && <p className="tiny mt-1">Aún no aprovechas tus canales estrella.</p>}</div>
          <div className="panel bg-sand-mist p-3"><b className="ts-sub">Te falta</b>{ver.faltan.map((c, i) => <p key={i} className="text-xs mt-1"><b>{c.canal}:</b> {c.por_que}</p>)}{ver.faltan.length === 0 && <p className="tiny mt-1">Cubres lo esencial de tu nicho.</p>}</div>
          <div className="card-edge card-edge-bad rounded-2xl p-3"><b className="text-red-600 ts-sub">Esfuerzo mal puesto</b>{ver.mal.map((c, i) => <p key={i} className="text-xs mt-1"><b>{c.canal}:</b> {c.por_que}</p>)}{ver.mal.length === 0 && <p className="tiny mt-1">Sin fugas en canales débiles.</p>}</div>
        </div>
        <p className="tiny mt-2"><Icon name="money" className="w-4 h-4 inline-block" aria-hidden="true" /> Mejor cierre: {nicho.mejor_cierre} · Ciclo: {nicho.ciclo}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card"><h3 className="font-bold"><Icon name="bulb" className="w-5 h-5 inline-block" aria-hidden="true" /> 3 ideas de contenido para tu nicho</h3>
          {ideas.map((it, i) => (<div key={i} className="panel mt-2 bg-sand-50 p-3 text-sm"><b className="ts-sub">{i + 1}. {it.gancho}</b><p className="tiny">{it.formato}</p><p className="text-xs mt-1">{it.desarrollo}</p><p className="text-xs mt-1"><b>CTA:</b> {it.cta}</p></div>))}
        </div>
        <div className="card"><h3 className="font-bold"><Icon name="chat" className="w-5 h-5 inline-block" aria-hidden="true" /> Tu guion de cierre: {guion.titulo}</h3>
          {guion.pasos.map((p, i) => (<details key={i} className="panel card-hover mt-1 bg-sand-50 p-2 text-sm"><summary className="cursor-pointer font-semibold ts-sub">{p.nombre}</summary><p className="text-xs text-ink-700 mt-1">{sinEmojis(p.texto)}</p></details>))}
          <p className="tiny mt-2">[Corchetes] = complétalo con tus datos. Cópialo a tu WhatsApp o CRM.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold"><Icon name="chart" className="w-5 h-5 inline-block" aria-hidden="true" /> Monitor de procesos <span className="text-xs font-normal text-ink-500">· qué está consumiendo tu crecimiento (en vivo)</span></h3>
        <div className="panel-flat mt-2 overflow-hidden p-0 shadow-sunken text-sm">
          {FACTORES.map((f) => ({ f, v: s.scores[f.id] })).sort((a, b) => a.v - b.v).map(({ f, v }, i) => (
            <div key={f.id} className={`flex items-center gap-2 px-3 py-1.5 ${i % 2 ? "bg-cream" : "bg-white"}`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${v < 45 ? "bg-red-500 animate-pulse" : v < 65 ? "bg-gold-500" : "bg-brand-500"}`} aria-hidden="true" />
              <span className="w-36 sm:w-48 truncate text-xs">{f.n}. {f.nombre}</span>
              <div className="flex-1 h-2 bg-sand-200/70 rounded-full overflow-hidden"><div className={`h-2 rounded-full ${v < 45 ? "bg-red-500" : v < 65 ? "bg-gold-500" : "bg-brand-500"}`} style={{ width: `${v}%` }} /></div>
              <b className="w-8 text-right num">{v}</b>
              <span className={`chip ${v < 45 ? "chip-bad" : v < 65 ? "chip-warn" : "chip-good"} !px-2 !py-0.5 !text-[10px]`}>{v < 45 ? "Crítico" : v < 65 ? "Alerta" : "Estable"}</span>
            </div>
          ))}
        </div>
        <p className="tiny mt-1">Como el administrador de tareas: arriba lo que más recursos te come. Eso se arregla primero.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card"><h3 className="font-bold">Radar · 15 factores</h3><Radar15 data={radar} ariaLabel="Radar · 15 factores" />
          <div className="grid sm:grid-cols-2 gap-1 mt-2 text-xs">{FACTORES.map((f) => (<div key={f.id} className="flex justify-between border-b border-sand-200/70 py-1"><span>{f.n}. {f.nombre}</span><b className={`num ${s.scores[f.id] < 45 ? "text-red-600" : s.scores[f.id] >= 65 ? "text-brand-700" : ""}`}>{s.scores[f.id]}</b></div>))}</div></div>
        <div className="space-y-4">
          <div className="card"><h3 className="font-bold">AIDA — ¿dónde está la fuga?</h3><Bars data={s.aida} ariaLabel="Gráfica de barras del embudo AIDA" /></div>
          <div className="card"><h3 className="font-bold">Customer Journey</h3><Bars data={s.journey} ariaLabel="Gráfica de barras del customer journey" /></div>
        </div>
      </div>

      <div className="card"><h3 className="font-bold">DOFA automática</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-sm">
          <div className="panel bg-brand-mist p-3"><b className="text-brand-700 ts-sub">Fortalezas</b><ul className="list-disc ml-4">{s.dofa.fortalezas.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
          <div className="card-edge card-edge-bad rounded-2xl p-3"><b className="text-red-600 ts-sub">Debilidades</b><ul className="list-disc ml-4">{s.dofa.debilidades.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
          <div className="panel bg-sand-mist p-3"><b className="ts-sub">Oportunidades</b><ul className="list-disc ml-4">{s.dofa.oportunidades.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
          <div className="panel bg-sand-50 p-3"><b className="ts-sub">Amenazas</b><ul className="list-disc ml-4">{s.dofa.amenazas.map((x: string, i: number) => <li key={i}>{x}</li>)}</ul></div>
        </div>
      </div>

      <div className="card"><h3 className="font-bold"><Icon name="clipboard" className="w-5 h-5 inline-block" aria-hidden="true" /> Plan de acción · Impacto vs esfuerzo</h3>
        {(["ahora", "proximo", "despues"] as const).map((p) => (
          <div key={p} className="mt-3"><span className={`chip ${p === "ahora" ? "chip-bad" : p === "proximo" ? "chip-warn" : "chip-good"}`}>{p.toUpperCase()}</span>
            {plan(p).length === 0 && <p className="tiny mt-1">Sin acciones en este nivel. Bien.</p>}
            {plan(p).map((r: any, i: number) => (<div key={i} className="panel mt-2 p-3 text-sm">
              <div className="tiny">{r.rule}</div>
              <b className="ts-sub">{r.need}</b> — {r.reason}
              <div className="mt-1 flex flex-wrap gap-1">{r.solutions.map((id: string) => { const sol = solutionById(id); return sol ? <span key={id} className="chip chip-neutral">{sol.name} · {COST_LABEL[sol.cost_level]}</span> : null; })}</div>
            </div>))}
          </div>
        ))}
        <Link href="/informe" className="btn-primary mt-4">Ver informe estratégico →</Link>
      </div>

      <div className="card"><h3 className="font-bold"><Icon name="layers" className="w-5 h-5 inline-block" aria-hidden="true" /> Soluciones detectadas (solo las que necesitas)</h3>
        <p className="muted">Una herramienta se recomienda solo si responde a una necesidad diagnosticada.</p>
        {lowBudget && <p className="tiny mt-1">Ordenadas de menor a mayor costo según tu presupuesto.</p>}
        <div className="grid md:grid-cols-2 gap-2 mt-2">{sols.map((sol) => (
          <div key={sol.solution_id} className="panel p-3 text-sm"><b className="ts-sub">{sol.name}</b> <span className="chip chip-good ml-1">{COST_LABEL[sol.cost_level]}</span>
            <p className="text-ink-700 mt-1">{sol.description}</p>
            <p className="text-xs mt-1"><b>Úsala cuando:</b> {sol.when_to_use}</p><p className="text-xs"><b>No la uses cuando:</b> {sol.when_not_to_use}</p>
            <p className="tiny">KPIs: {sol.kpis.join(" · ")}</p>
            {sol.sources.length > 0 && <p className="tiny mt-1">Fuente oficial: {sol.sources.slice(0, 2).map((f, j) => (<span key={j}>{j > 0 && " · "}<a className="link-soft" href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a></span>))}</p>}</div>))}
        </div>
        <div className="card-mist mt-4 p-3 text-sm"><b>tuConsultor detectó estas necesidades.</b> Si deseas implementarlas, <b>Soluciones Digitales</b> puede ayudarte — sin venta agresiva: primero el plan, después la implementación.</div>
      </div>
    </div>
  );
}

