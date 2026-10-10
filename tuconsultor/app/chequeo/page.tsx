"use client";
import { useState } from "react";
import { ESTACIONES, Estado } from "../../lib/chequeo";
import { Flash } from "../../lib/sflash";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../lib/scoring";
import { nichoById } from "../../lib/nichos";
import { saveSession } from "../../lib/session";
import Icon from "../../components/icon";
import { useRouter } from "next/navigation";
import Link from "next/link";
const ICONO_EST: Record<string, string> = { ficha: "clipboard", visibilidad: "map", redes: "share", whatsapp: "chat", reputacion: "star", oferta: "tag", ventas: "money", cliente: "heart" };

// Sala de chequeo: el usuario MIDE su empresa estación por estación.
// Cada lectura sale de sus números + solución inmediata. Nada de interrogatorio.
const COLOR: Record<Estado, string> = { bien: "bg-brand-500", alerta: "bg-gold-500", critico: "bg-red-500" };
const BORDE: Record<Estado, string> = { bien: "card-edge", alerta: "card-edge card-edge-warn", critico: "card-edge card-edge-bad" };
const TINTE: Record<Estado, string> = { bien: "bg-brand-50/60", alerta: "bg-gold-100/50", critico: "bg-red-50/60" };

export default function Chequeo() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [vals, setVals] = useState<Record<string, any>>({});
  const [answers, setAnswers] = useState<Record<string, any>>({ etapa: "emprendedor" });
  const [perfil, setPerfil] = useState({ negocio: "", sector: "servicios", etapa: "emprendedor", objetivo: "más clientes", presupuesto: "cero", mercado: "" });
  const [lectura, setLectura] = useState<{ estado: Estado; mensaje: string; flash: Flash | null; error?: string } | null>(null);
  const [midiendo, setMidiendo] = useState(false);
  const [estados, setEstados] = useState<Record<string, Estado>>({});
  const [final, setFinal] = useState<any>(null);

  const est = ESTACIONES[paso];
  const set = (id: string, v: any) => setVals({ ...vals, [id]: v });

  const medir = () => {
    const err = est.validar(vals);
    if (err) { setLectura({ estado: "alerta", mensaje: err, flash: null, error: err }); return; }
    setLectura(null);
    setMidiendo(true);
    setTimeout(() => {
      const r = est.leer(vals);
      setLectura({ ...r, flash: est.flashDe(vals) });
      setMidiendo(false);
    }, 900);
  };

  const seguir = () => {
    const patch = est.aRespuestas(vals, answers);
    const na = { ...answers, ...patch };
    let pf = perfil;
    if (est.id === "ficha") {
      pf = { ...perfil, negocio: String(vals.negocio || ""), sector: nichoById(vals.nicho || "otro").label.replace(" ⚠️", ""), objetivo: vals.objetivo, presupuesto: vals.presupuesto };
      try { localStorage.setItem("tuconsultor_hook", JSON.stringify({ leads: 40, ticket: 500, conv: 10 })); } catch { /* noop */ }
    }
    if (est.id === "ventas") {
      try { localStorage.setItem("tuconsultor_hook", JSON.stringify({ leads: (+vals.contactos || 0) * 4, ticket: +vals.ticket || 500, conv: Math.min(10, Math.max(0, +vals.de10 || 0)) * 10 })); } catch { /* noop */ }
    }
    setAnswers(na); setPerfil(pf);
    setEstados({ ...estados, [est.id]: lectura!.estado });
    setVals({}); setLectura(null);
    if (paso + 1 >= ESTACIONES.length) {
      const scores = scoreAnswers(na);
      const f = { na, scores, perfil: pf, salud: saludGeneral(scores), cuellos: detectarCuellos(scores) };
      setFinal(f);
    } else setPaso(paso + 1);
  };

  const verDashboard = () => {
    saveSession({ perfil: final.perfil, answers: final.na, createdAt: new Date().toISOString() });
    router.push("/dashboard");
  };

  if (final) {
    const crit = Object.values(estados).filter((e) => e === "critico").length;
    const aler = Object.values(estados).filter((e) => e === "alerta").length;
    return (
      <div className="max-w-xl mx-auto card text-center animate-fade-up">
        <span className="chip px-3.5 py-2 text-sm font-medium transition-all hover:border-emerald-600">Chequeo completo</span>
        <h1 className="text-3xl mt-2">Estado de tu empresa</h1>
        <div className="stat-value !text-6xl text-brand-700 mt-1">{final.salud}<span className="text-xl font-normal text-ink-500">/100</span></div>
        <p className="muted"><span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden /> {crit} críticos · <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-500" aria-hidden /> {aler} en alerta · <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-500" aria-hidden /> {8 - crit - aler} sanos</p>
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-left shadow-soft"><Icon name="alert" className="w-4 h-4 inline-block text-red-600" /> <b>{final.cuellos[0]?.factor}</b> — {final.cuellos[0]?.mensaje}</div>
        <button onClick={verDashboard} className="btn-primary w-full mt-4 text-lg">Ver qué requiere mi empresa →</button>
        <p className="tiny mt-2">Requerimientos priorizados + soluciones + plan + ebook</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <nav aria-label="Elige tu recorrido" className="card-quiet grid gap-3 p-4 sm:grid-cols-2">
        <div>
          <p className="eyebrow-ink">Chequeo · lectura rápida</p>
          <p className="tiny mt-1">Mide ocho señales con tus cifras actuales para detectar qué atender primero.</p>
          <span aria-current="page" className="mt-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">Estás en Chequeo</span>
        </div>
        <div>
          <p className="eyebrow-ink">Diagnóstico · análisis guiado</p>
          <p className="tiny mt-1">Explora 15 factores para comprender causas y construir un plan.</p>
          <Link href="/diagnostico" className="link-quiet mt-2 inline-flex">Empezar diagnóstico →</Link>
        </div>
      </nav>
      {/* Cuerpo: órganos que se encienden */}
      <div className="card card-tight">
        <div className="flex items-center gap-3 text-xs text-ink-500"><span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden /> Sala de chequeo · estación {paso + 1}/{ESTACIONES.length}</div>
        <svg viewBox="0 0 200 30" className="w-full h-7 mt-1" aria-hidden><polyline className="ekg" points="0,15 30,15 38,15 42,4 46,26 50,15 80,15 88,15 92,8 96,22 100,15 130,15 138,15 142,4 146,26 150,15 200,15" /></svg>
        <div className="grid grid-cols-8 gap-1 mt-2">
          {ESTACIONES.map((e, i) => (
            <div key={e.id} title={e.organo} className={`h-8 rounded-xl grid place-items-center border shadow-hairline ${i < paso ? COLOR[estados[e.id] || "bien"] + " text-white border-transparent" : i === paso ? "border-gold-500 bg-gold-100 text-gold-700" : "border-sand-200 bg-white text-ink-500"}`}><Icon name={ICONO_EST[e.id]} className="w-4 h-4" /></div>
          ))}
        </div>
        <div className="tiny mt-1">{est.organo} · {estados[est.id] ? "medido" : "midiendo…"}</div>
      </div>

      <div className="card">
        <span className="text-brand-700"><Icon name={ICONO_EST[est.id]} className="w-10 h-10" /></span>
        <h1 className="text-2xl mt-1">{est.titulo}</h1>
        <p className="muted mt-1"><Icon name="search" className="w-4 h-4 inline-block" /> <b>Haz la prueba:</b> {est.como}</p>
        <div className="mt-4 space-y-3">
          {est.inputs.map((inp) => (
            <div key={inp.id}>
              <div className="field-label">{inp.label}</div>
              {inp.tipo === "numero" && <input type="number" min={0} value={vals[inp.id] ?? ""} onChange={(e) => set(inp.id, e.target.value === "" ? undefined : +e.target.value)} placeholder="0" aria-label={inp.label} className="field w-32 mt-1 text-lg num" />}
              {inp.tipo === "texto" && <input value={vals[inp.id] || ""} onChange={(e) => set(inp.id, e.target.value)} placeholder={inp.placeholder} aria-label={inp.label} className="field mt-1" />}
              {inp.tipo === "chips" && <div className="flex flex-wrap gap-1.5 mt-1">{inp.opciones!.map((o) => (
                <button key={o.value} onClick={() => set(inp.id, o.value)} aria-pressed={vals[inp.id] === o.value} className={`chip border transition-colors ${vals[inp.id] === o.value ? "chip-good border-transparent" : "chip-outline hover:border-brand-300"}`}>{o.label}</button>))}</div>}
              {inp.tipo === "checks" && <div className="flex flex-wrap gap-1.5 mt-1">{inp.opciones!.map((o) => {
                const s: string[] = vals[inp.id] || [];
                return <button key={o.value} onClick={() => set(inp.id, s.includes(o.value) ? s.filter((x) => x !== o.value) : [...s, o.value])} aria-pressed={s.includes(o.value)} className={`chip border transition-colors ${s.includes(o.value) ? "chip-good border-transparent" : "chip-outline hover:border-brand-300"}`}>{o.label}</button>;
              })}</div>}
            </div>
          ))}
        </div>
        {!lectura || lectura.error ? (
          <div>{midiendo ? (
            <div className="scanbox h-24 mt-4 border border-sand-300 rounded-2xl bg-ink-900 grid place-items-center">
              <div className="scanline" />
              <p className="text-brand-300 text-sm font-mono">▮▮▮ midiendo signos vitales…</p>
            </div>
          ) : (
            <button onClick={medir} className="btn-primary w-full mt-4"><Icon name="chart" className="w-4 h-4 inline-block" /> Medir</button>
          )}
          {lectura?.error && <p className="text-xs text-gold-700 mt-1">{lectura.error}</p>}</div>
        ) : (
          <div className={`mt-4 p-3 ${BORDE[lectura.estado]} ${TINTE[lectura.estado]}`}>
            <p className="text-sm"><span className={`inline-block w-2.5 h-2.5 rounded-full ${COLOR[lectura.estado]}`} aria-hidden /> <b>Lectura:</b> {lectura.mensaje}</p>
            {lectura.flash && (
              <div className="mt-2 bg-white rounded-xl p-2 border border-sand-200/70 text-sm shadow-soft">
                <b className="ts-sub"><Icon name="zap" className="w-4 h-4 inline-block text-gold-500" /> Lo que tu empresa requiere: {lectura.flash.titulo}</b>
                <p className="text-xs text-ink-700 mt-1">• {lectura.flash.pasos[0]}</p>
                {lectura.flash.pasos[1] && <p className="text-xs text-ink-700">• {lectura.flash.pasos[1]}</p>}
                <p className="tiny mt-1">Pasos + texto listo en tu plan.</p>
              </div>
            )}
            <button onClick={seguir} className="btn-primary w-full mt-3">Seguir al siguiente signo →</button>
          </div>
        )}
      </div>
    </div>
  );
}

