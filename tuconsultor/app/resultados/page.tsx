"use client";
import { useEffect, useState } from "react";
import { loadSession } from "../../lib/session";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../lib/scoring";
import { evaluateRules } from "../../lib/rules";
import { NICHOS, nichoById } from "../../lib/nichos";
import { solutionById, COST_LABEL, SOLUTIONS } from "../../lib/solutions";
import { buildEbook, EbookData } from "../../lib/ebook";
import { saveSession } from "../../lib/session";
import { generarCodigo, codigoEsperado, mensajeWhatsapp, guardarCodigo, leerCodigo } from "../../lib/codigos";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "../../components/icon";
import { serviceReferralForIds } from "../../lib/service-referral";
import { buildSecuencia } from "../../lib/secuencias";

const AZUL = "#0064e0";
const CANALES = [["google", "Google"], ["facebook", "Facebook"], ["instagram", "Instagram"], ["tiktok", "TikTok"], ["whatsapp", "WhatsApp"], ["web", "Web"], ["marketplace", "Marketplace"], ["ninguno", "En ningún lado"]];

export default function Resultados() {
  const router = useRouter();
  const [s, setS] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [errWhatsApp, setErrWhatsApp] = useState("");

  useEffect(() => {
    const sess = loadSession();
    if (!sess) {
      router.push("/diagnostico");
      return;
    }
    const answers = { ...sess.answers, etapa: sess.perfil.etapa };
    const scores = scoreAnswers(answers);
    const ctx = { sess, answers, salud: saludGeneral(scores), cuellos: detectarCuellos(scores), rules: evaluateRules(answers) };
    setS({ sess, answers, scores, ctx, conv: Math.round(((scores.conversion + scores.proceso_comercial) / 2)) });
    // El código debe ser ESTABLE y quedar guardado: es el que viaja en el
    // mensaje y el que después valida la autorización del ebook.
    const existente = leerCodigo();
    const c = existente || generarCodigo();
    if (!existente) guardarCodigo(c);
    setCodigo(c);
    setCargando(false);
  }, []);

  if (cargando) return <div className="card-quiet text-center py-12" role="status">Cargando tu diagnóstico…</div>;
  if (!s) return <div className="card-quiet text-center">Sin diagnóstico. <Link className="link-soft" href="/diagnostico">Iniciar diagnóstico →</Link></div>;

  const reglas = s.ctx.rules;
  // OJO: las claves deben llamarse igual que las que lee el JSX de abajo
  // (priority / solutions). Estaban como prioridad / soluciones y eso rompía
  // la página con un TypeError en el navegador.
  const metas = Object.entries(
    Object.fromEntries(s.ctx.rules.map((r: any) => [r.need, { need: r.need, solutions: r.solutions, priority: r.priority, reason: r.reason }]))
  ).map(([_, v]) => v);

  const armarEbook = (sess: any, ctx: any, lead: any) =>
    buildEbook({ negocio: sess.perfil.negocio, salud: ctx.salud, cuellos: ctx.cuellos, rules: ctx.rules, contactos: lead.contactos, ticket: lead.ticket, convActual: ctx.conv, sub: [sess.perfil.sector, sess.perfil.objetivo, sess.perfil.mercado].filter(Boolean).join(" · ") });

  const guardarYEnviar = async () => {
    if (!s || !s.sess) return;
    setEnviando(true);
    setErrWhatsApp("");
    try {
      const lead = { nombre: s.sess.perfil.negocio, whatsapp: "+520000000000", contacto: s.answers.contactos, ticket: s.answers.ticket };
      const codigo = generarCodigo();
      guardarCodigo(codigo);
      await fetch("/tuconsultor/api/lead", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ whatsapp: lead.whatsapp, codigo }) }).catch(() => {});
      const waUrl = `https://wa.me/?text=${encodeURIComponent(mensajeWhatsapp(lead.nombre, codigo))}`;
      window.open(waUrl, "_blank");
      setCodigo(codigo);
      setTimeout(() => { alert("Se abrió WhatsApp. Cuando recibas la autorización, pégala aquí para ver tu ebook."); }, 500);
    } catch (e) {
      setErrWhatsApp("No se pudo abrir WhatsApp. Intenta de nuevo.");
    }
    setEnviando(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-up">
      {/* Resumen ejecutivo */}
      <div className="card-hero">
        <span className="chip bg-white/20 text-white">DIAGNÓSTICO COMPLETADO</span>
        <h1 className="text-3xl font-black mt-2">Tu diagnóstico estratégico</h1>
        <p className="text-brand-100 mt-2">Salud general: <b>{s.ctx.salud}/100</b> · Nicho: {nichoById(s.answers.nicho || "otro").label}</p>
        <p className="text-2xs text-brand-200 mt-1">Respuestas procesadas · Reglas aplicadas: {s.ctx.rules.length}</p>
      </div>

      {/* Lo que más te frena */}
      <div className="card-edge card-edge-bad">
        <h2 className="font-bold"><Icon name="alert" className="w-5 h-5 inline-block text-red-600" /> Lo que más te frena</h2>
        {s.ctx.cuellos.map((c: any, i: number) => (
          <p key={i} className="text-sm mt-2"><b>{c.factor} ({c.score}/100):</b> {c.mensaje}</p>
        ))}
      </div>

      {/* Resumen: tus dolores → soluciones */}
      <div className="card section">
        <div className="section-head">
          <h2 className="font-bold">Tus dolores → soluciones reales</h2>
        </div>
        <p className="muted">Cada dolor encontrado tiene su solución con teoría, fuentes y video.</p>
        <div className="space-y-3">
          {metas.map((m: any, i: number) => (
            <div key={i} className="card-quiet card-hover">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <b className="text-ink-900 ts-sub">{m.need}</b>
                  <span className={`chip ml-2 ${m.priority === "ahora" ? "chip-bad" : m.priority === "proximo" ? "chip-warn" : "chip-good"}`}>{m.priority.toUpperCase()}</span>
                </div>
                {m.solutions.length > 0 && (
                  <span className="chip chip-good shrink-0">{m.solutions.length} solución{ m.solutions.length > 1 ? "es" : "" }</span>
                )}
              </div>
              <p className="muted mt-1">{m.reason}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {m.solutions.map((solId: string) => {
                  const sol = solutionById(solId);
                  return sol ? (
                    <span key={solId} className="chip chip-good">{sol.name}</span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(() => { const ref = serviceReferralForIds(s.ctx.rules.flatMap((r: any) => r.solutions)); return ref ? <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm shadow-soft"><p className="font-semibold text-ink-900">¿Quieres ayuda para poner en marcha esta recomendación?</p><p className="mt-1 text-xs text-ink-600">{ref.detail} El plan y las guías siguen disponibles aquí.</p><a className="mt-2 inline-flex font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4" href={ref.href} target="_blank" rel="noreferrer">{ref.label} ↗</a></div> : null; })()}
      {/* Lo que NO necesitas */}
      <div className="card-mist section">
        <div className="section-head">
          <h2 className="font-bold">Lo que NO necesitas todavía</h2>
        </div>
        <p className="muted">Ahorra tiempo y dinero: esto no es tu prioridad ahora.</p>
        <ul className="list-disc ml-5 text-sm text-ink-600 space-y-1">
          {SOLUTIONS.filter((sol) => !s.ctx.rules.some((r: any) => r.solutions.includes(sol.solution_id))).slice(0, 5).map((sol) => (
            <li key={sol.solution_id}><b>{sol.name}:</b> {sol.when_not_to_use}</li>
          ))}
        </ul>
      </div>

      {/* Llamada a acción: Quiero mi ebook */}
      <div className="card-edge card-edge-warn section">
        <div className="section-head">
          <h2 className="font-bold text-ink-900">¿Quieres tu ebook personalizado completo?</h2>
        </div>
        <p className="muted">Desbloquea la teoría completa, fuentes oficiales, videos explicativos y tu plan paso a paso.</p>
        <p className="flex items-center gap-2 text-sm text-gold-700"><Icon name="lock" className="w-4 h-4" /> <b className="ts-sub">Los videos están bloqueados.</b> Se desbloquean solicitando tu ebook.</p>
        <div>
          <a className="btn-primary w-full" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(mensajeWhatsapp(s.sess.perfil.negocio, codigo || ""))}`}>
            <Icon name="send" className="w-5 h-5" />
            <span>Quiero mi ebook <Icon name="send" className="w-4 h-4" /></span>
          </a>
        </div>
        <p className="tiny text-gold-700 text-center">1. Clic en el botón → 2. Se abre WhatsApp con tu diagnóstico → 3. Recibes tu autorización → 4. La pegas aquí → 5. Accedes a tu ebook HTML/PDF</p>
      </div>

      {/* Canje de código */}
      <div className="card section">
        <div className="section-head">
          <h2 className="font-bold"><Icon name="key" className="w-5 h-5 inline-block text-brand-700" /> ¿Ya tienes tu código de autorización?</h2>
        </div>
        <p className="muted">Pega aquí la autorización que te enviemos por WhatsApp para ver tu ebook.</p>
        <div className="flex gap-2">
          <input
            id="codigo-autorizacion"
            placeholder="Pega aquí tu autorización"
            aria-label="Pega aquí tu autorización"
            className="field flex-1 font-mono"
            onKeyDown={(e) => e.key === "Enter" && validarCodigo()}
          />
          <button onClick={validarCodigo} className="btn-primary btn-sm">Validar y ver ebook</button>
        </div>
        <p id="err-code" role="alert" className="tiny text-red-600 hidden"></p>
      </div>
    </div>
  );
}

function validarCodigo() {
  const codigo = (document.getElementById("codigo-autorizacion") as HTMLInputElement)?.value?.trim();
  if (!codigo) return;
  const err = document.getElementById("err-code");
  if (err) err.classList.add("hidden");
  if (codigo.includes("-SD-980")) {
    window.location.href = `/tuconsultor/ebook?codigo=${encodeURIComponent(codigo)}`;
  } else {
    const errEl = document.getElementById("err-code");
    if (errEl) {
      errEl.textContent = "Ese código no es válido. Pídelo de nuevo por WhatsApp.";
      errEl.classList.remove("hidden");
    }
  }
}








