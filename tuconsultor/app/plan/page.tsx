"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "../../lib/session";
import { scoreAnswers, saludGeneral, detectarCuellos } from "../../lib/scoring";
import { evaluateRules } from "../../lib/rules";
import { buildEbook, EbookData } from "../../lib/ebook";
import LeadModal, { Lead } from "../../components/lead-modal";
import Icon from "../../components/icon";
import { generarCodigo, leerCodigo, guardarCodigo, codigoEsperado, validarCodigo, mensajeWhatsapp, estaDesbloqueado, marcarDesbloqueado } from "../../lib/codigos";
import { REGALO } from "../../lib/regalo";

// Plan de crecimiento con CANJE: sin código, el ebook es una GUÍA BLOQUEADA
// (ni títulos ni enlaces de videos: con el título lo buscarían en YouTube
// y nos saltarían). Con código autorizado, todo visible + obsequio + PDF.
export default function Plan() {
  const [s, setS] = useState<any>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [ebook, setEbook] = useState<EbookData | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [pegado, setPegado] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [errCode, setErrCode] = useState("");
  const [copiado, setCopiado] = useState(false);

  const OBJ: Record<string, string> = { clientes: "conseguir clientes", ventas: "aumentar ventas", validar: "validar la idea", escalar: "escalar" };
  const subDe = (sess: any) => [sess.perfil.sector, sess.perfil.objetivo ? `objetivo: ${OBJ[sess.perfil.objetivo] || sess.perfil.objetivo}` : "", sess.perfil.mercado].filter(Boolean).join(" · ");
  const armarEbook = (sess: any, ctx: any, l: Lead) =>
    buildEbook({ negocio: sess.perfil.negocio, salud: ctx.salud, cuellos: ctx.cuellos, rules: ctx.rules, contactos: l.contactos, ticket: l.ticket, convActual: ctx.conv, sub: subDe(sess) });

  const asegurarCodigo = (l: Lead): string => {
    let c = leerCodigo();
    if (!c) {
      c = generarCodigo();
      guardarCodigo(c);
      fetch("/tuconsultor/api/lead", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ whatsapp: l.whatsapp, codigo: c }) }).catch(() => {});
    }
    return c;
  };

  useEffect(() => {
    const sess = loadSession();
    if (!sess) return;
    const answers = { ...sess.answers, etapa: sess.perfil.etapa };
    const scores = (sess as any).scores || scoreAnswers(answers);
    const ctx = { sess, answers, salud: saludGeneral(scores), cuellos: detectarCuellos(scores), rules: evaluateRules(answers), conv: Math.round(((scores.conversion + scores.proceso_comercial) / 2)) };
    setS(ctx);
    try {
      const l = localStorage.getItem("tuconsultor_lead");
      if (l) {
        const leadObj = JSON.parse(l);
        setLead(leadObj);
        const c = asegurarCodigo(leadObj);
        setCodigo(c);
        setUnlocked(estaDesbloqueado(c));
        setEbook(armarEbook(sess, ctx, leadObj));
      }
    } catch { /* noop */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unlock = (l: Lead) => {
    setLead(l);
    const c = asegurarCodigo(l);
    setCodigo(c);
    if (s) {
      setUnlocked(estaDesbloqueado(c));
      setEbook(armarEbook(s.sess, s, l));
    }
  };

  if (!s) return <div className="card-quiet text-center">Primero completa tu diagnóstico. <Link className="link-soft" href="/diagnostico">Ir al diagnóstico →</Link></div>;
  if (!lead) return <LeadModal onDone={unlock} />;
  if (!ebook || !codigo) {
    if (s && lead && !ebook) setEbook(armarEbook(s.sess, s, lead));
    if (!codigo) {
      const c = asegurarCodigo(lead);
      setCodigo(c);
      setUnlocked(estaDesbloqueado(c));
    }
    return <div className="card-quiet text-center">Armando tu plan personalizado…</div>;
  }

  const copiar = async (t: string) => {
    try { await navigator.clipboard.writeText(t); } catch { /* noop */ }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const validar = () => {
    setErrCode("");
    if (!codigo) return;
    if (validarCodigo(codigo, pegado)) {
      marcarDesbloqueado(codigo);
      setUnlocked(true);
    } else {
      setErrCode("Ese código no coincide. Revisa que lo pegaste completo (incluye el final que te enviamos).");
    }
  };

  if (!s) return <div className="card-quiet text-center">Primero completa tu diagnóstico. <Link className="link-soft" href="/diagnostico">Ir al diagnóstico →</Link></div>;
  if (!lead || !ebook || !codigo) return <LeadModal onDone={unlock} />;

  const bloqueado = !unlocked;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(mensajeWhatsapp(lead.nombre, codigo))}`;

  const VideoSlot = ({ yt, titulo, canal, peso }: { yt?: string; titulo?: string; canal?: string; peso?: string }) => {
    if (bloqueado || !yt) {
      return (
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-dashed border-sand-200/70 bg-sand-50/60 p-2 shadow-soft">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand-100"><Icon name="lock" className="w-5 h-5 text-ink-500" /></span>
          <span>
            <span className="block text-xs font-semibold ts-sub">Video explicativo bloqueado</span>
            <span className="block text-2xs text-ink-500">Se desbloquea con tu código de WhatsApp.</span>
          </span>
        </div>
      );
    }
    return (
      <a href={`https://www.youtube.com/watch?v=${yt}`} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 rounded-2xl border border-transparent bg-sand-50/60 p-2 text-left shadow-hairline transition-colors ease-smooth hover:border-brand-300 hover:bg-brand-50">
        <img src={`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`} alt="" loading="lazy" className="h-14 w-24 shrink-0 rounded-xl object-cover" />
        <span>
          <span className="block text-xs font-semibold leading-snug ts-sub">{titulo}</span>
          <span className="block text-2xs text-ink-500">{canal} · {peso}</span>
        </span>
      </a>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-up" id="ebook">
      {bloqueado && (
        <div className="card-edge card-edge-warn text-center">
          <span className="chip chip-warn"><Icon name="lock" className="w-3 h-3 inline-block" /> Tu plan está bloqueado</span>
          <h2 className="text-xl font-black mt-2">Desbloquéalo con tu código de WhatsApp</h2>
          <p className="muted mt-1">Abajo ves la guía. Los videos, la descarga en PDF y tu obsequio se liberan con la autorización.</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="num rounded-xl border border-sand-200/70 bg-white px-4 py-2 font-mono text-xl font-black tracking-widest shadow-inset">{codigo}</span>
            <button onClick={() => copiar(codigo)} className="btn-ghost btn-sm">{copiado ? "Copiado" : "Copiar"}</button>
          </div>
          <a className="btn-primary mt-3" target="_blank" rel="noreferrer" href={waUrl}><Icon name="send" className="w-4 h-4 inline-block" /> Enviar mi código por WhatsApp</a>
          <div className="mt-3 flex gap-2 max-w-md mx-auto">
            <input value={pegado} onChange={(e) => setPegado(e.target.value)} placeholder="Pega aquí la autorización" aria-label="Pega aquí la autorización" className="field flex-1 font-mono" />
            <button onClick={validar} className="btn-primary btn-sm">Validar</button>
          </div>
          {errCode && <p role="alert" className="tiny text-red-600 mt-1">{errCode}</p>}
        </div>
      )}

      <div className="card-hero text-center">
        <p className="eyebrow text-brand-100">Plan de marketing personalizado · Soluciones Digitales</p>
        <h1 className="text-3xl font-black mt-1">Plan de crecimiento</h1>
        <h2 className="text-xl font-bold text-brand-100 mt-1">{ebook.negocio}</h2>
        <p className="text-brand-100 text-sm">Preparado para {lead.nombre} · Salud {ebook.salud}/100 · {ebook.fecha}</p>
        {ebook.sub && <p className="text-brand-200 text-xs mt-1">{ebook.sub}</p>}
        <p className="text-brand-200 text-2xs mt-1">Elaborado por tuConsultor · Soluciones Digitales · Corto, mediano y largo plazo</p>
      </div>

      <div className="card section">
        <div className="section-head">
          <h2 className="font-bold">Tus respuestas: del dolor a la solución</h2>
        </div>
        <p className="tiny">Cada dolor encontrado, con su teoría, sus fuentes y su video.</p>
        {ebook.respuestas.map((r, i) => (
          <div key={i} className="panel card-tight mt-2 text-sm">
            <div className="flex flex-wrap items-center gap-2"><b className="ts-sub">{i + 1}. {r.dolor}</b>
              <span className="chip chip-good">{r.fase}</span>
            </div>
            <VideoSlot yt={r.video?.yt} titulo={r.video ? r.video.titulo : undefined} canal={r.video?.canal} peso={r.video?.peso} />
          </div>
        ))}
      </div>

      <div className="card-edge card-edge-bad">
        <h2 className="font-bold">Lo que más te frena (con video explicativo)</h2>
        {ebook.cuellos.map((c, i) => (
          <div key={i} className="mt-2">
            <p className="text-sm"><b>{c.factor} ({c.score}/100):</b> {c.mensaje}</p>
            <VideoSlot yt={c.video?.yt} titulo={c.video ? `Míralo explicado: ${c.video.titulo}` : undefined} canal={c.video?.canal} peso={c.video?.peso} />
          </div>
        ))}
        {ebook.perdidaMensual != null && (
          <div className="mt-2 card-edge card-edge-bad card-tight text-sm">Con tus números (~{lead.contactos} contactos × ${lead.ticket}), ganar <b>+10 puntos de conversión</b> valdría aprox. <b>${ebook.perdidaMensual.toLocaleString("es")}/mes extra</b>. Proyección ilustrativa, no promesa.</div>
        )}
      </div>

      {ebook.fases.map((f, i) => (
        <div key={i} className="card section avoid-break">
          <div className="section-head">
            <span className="chip chip-good">{f.rango}</span>
          </div>
          <h2 className="font-bold text-lg">{f.titulo}</h2>
          {f.items.length === 0 && <p className="muted">Sin acciones pendientes aquí. Sigue midiendo.</p>}
          {f.items.map((it, j) => (
            <div key={j} className="panel card-tight mt-2 text-sm">
              <b className="ts-sub">{it.titulo}</b>
              <p className="text-ink-700 text-xs mt-0.5"><b>Teoría:</b> {it.detalle}</p>
              {it.fuentes.length > 0 && <p className="text-2xs text-ink-500 mt-0.5">Respaldo oficial: {it.fuentes.map((f, k) => (<span key={k}>{k > 0 && " · "}{f.url ? <a className="link-soft" href={f.url} target="_blank" rel="noreferrer">{f.titulo}</a> : f.titulo}</span>))}</p>}
              <p className="text-2xs text-ink-500 mt-1">{it.costo} · {it.tiempo}</p>
              <VideoSlot yt={it.video?.yt} titulo={it.video ? `Video: ${it.video.titulo}` : undefined} canal={it.video?.canal} peso={it.video?.peso} />
            </div>
          ))}
        </div>
      ))}

      <div className="card section">
        <div className="section-head">
          <h2 className="font-bold">Tus 6 KPIs (mídelos cada viernes)</h2>
        </div>
        <div className="flex flex-wrap gap-1">{ebook.kpis.map((k) => <span key={k} className="chip chip-neutral">{k}</span>)}</div>
      </div>

      <div className="panel-flat section">
        <div className="section-head">
          <h2 className="font-bold">Lo que NO necesitas todavía</h2>
        </div>
        {ebook.noNecesitas.map((n, i) => (<p key={i} className="text-sm mt-1"><b className="ts-sub">{n.name}:</b> {n.reason}</p>))}
        <p className="tiny mt-2">Te lo decimos aunque nos cueste la venta: primero el plan, después la implementación.</p>
      </div>

      {bloqueado ? (
        <div className="card-edge card-edge-warn card-tight">
          <h2 className="font-bold"><Icon name="lock" className="w-5 h-5 inline-block text-gold-500" /> Paso final: pega tu autorización</h2>
          <p className="muted mt-1">Envía tu código <b className="font-mono ts-sub">{codigo}</b> por WhatsApp y pega aquí lo que te devolvamos para liberar videos, PDF y obsequio.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a className="btn-primary btn-sm" target="_blank" rel="noreferrer" href={waUrl}><Icon name="send" className="w-4 h-4 inline-block" /> Enviar código</a>
          </div>
          <div className="mt-2 flex gap-2">
            <input value={pegado} onChange={(e) => setPegado(e.target.value)} placeholder="Pega aquí la autorización" aria-label="Pega aquí la autorización" className="field flex-1 font-mono" />
            <button onClick={validar} className="btn-primary btn-sm">Validar</button>
          </div>
          {errCode && <p role="alert" className="tiny text-red-600 mt-1">{errCode}</p>}
        </div>
      ) : (
        <>
          <div className="card-edge card-edge-warn text-center">
            <h2 className="font-bold"><Icon name="gift" className="w-5 h-5 inline-block text-gold-700" /> {REGALO.titulo}</h2>
            <p className="muted mt-1">{REGALO.descripcion}</p>
            {REGALO.activo && REGALO.url && <a href={REGALO.url} target="_blank" rel="noreferrer" className="btn-gold mt-2">Reclamar mi obsequio</a>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => window.print()} className="btn-primary">Descargar mi ebook (HTML / PDF)</button>
            <Link className="btn-ghost self-center" href="/informe">Volver a mi informe</Link>
          </div>
        </>
      )}
      <p className="tiny text-center">¿Te atoras implementando? <a className="link-soft" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`Hola Soluciones Digitales, soy ${lead.nombre} (${ebook.negocio}). Ya tengo mi plan de crecimiento y quiero ayuda a implementarlo.`)}`}>Soluciones Digitales te lo implementa</a></p>
    </div>
  );
}

