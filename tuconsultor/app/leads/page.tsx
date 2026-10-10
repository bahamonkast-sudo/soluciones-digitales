"use client";
import { useState } from "react";
import { buildSecuencia } from "../../lib/secuencias";
import Icon from "../../components/icon";
import { codigoEsperado } from "../../lib/codigos";

// Panel interno: token (LEADS_TOKEN) → ver leads, exportar CSV para tu app
// de envíos masivos y copiar la secuencia de nutrición por lead.
export default function Leads() {
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [err, setErr] = useState("");
  const [sel, setSel] = useState<any>(null);

  const cargar = async () => {
    setErr("");
    const r = await fetch(`/tuconsultor/api/lead?token=${encodeURIComponent(token)}`);
    if (!r.ok) { setErr("Token incorrecto."); return; }
    const j = await r.json();
    setLeads(j.leads || []);
  };
  const copiar = async (t: string) => { try { await navigator.clipboard.writeText(t); } catch { /* noop */ } };
  const csv = () => {
    const head = "nombre,whatsapp,codigo,autorizacion,contactos,ticket,fecha,ref";
    const rows = leads.map((l) => [l.nombre, l.whatsapp, l.codigo || "", l.codigo ? codigoEsperado(l.codigo) : "", l.contactos || "", l.ticket || "", l.at, l.ref || ""].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([[head, ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leads-tuconsultor.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="card max-w-xl">
        <h1 className="font-bold text-xl"><Icon name="lock" className="w-5 h-5 inline-block" aria-hidden="true" /> Panel de leads (interno)</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token (LEADS_TOKEN)" aria-label="Token (LEADS_TOKEN)" className="field flex-1 min-w-[12rem]" />
          <button onClick={cargar} className="btn-primary btn-sm">Ver</button>
          {leads.length > 0 && <button onClick={csv} className="btn-ghost"><Icon name="download" className="w-4 h-4 inline-block" aria-hidden="true" /> CSV</button>}
        </div>
        {err && <p className="text-red-600 tiny mt-1" role="alert">{err}</p>}
        <p className="tiny mt-1">El CSV se importa directo a tu app de envíos masivos.</p>
      </div>
      {leads.length > 0 && (
        <div className="card">
          <h2 className="font-bold num">{leads.length} leads</h2>
          <div className="mt-2 space-y-1 text-sm max-h-64 overflow-auto">
            {leads.map((l) => (
              <button key={l.id} onClick={() => setSel(l)} aria-current={sel?.id === l.id ? "true" : undefined} className={`w-full text-left rounded-xl border px-3 py-2 shadow-hairline transition-all duration-300 ease-smooth ${sel?.id === l.id ? "border-brand-400 bg-brand-50" : "border-sand-200/70 bg-white hover:-translate-y-0.5 hover:border-brand-300 hover:bg-sand-50 hover:shadow-soft"}`}>
                <b>{l.nombre}</b> · {l.whatsapp} · {new Date(l.at).toLocaleString()} {l.codigo ? <span className="chip chip-info font-mono">{l.codigo}</span> : <span className="chip chip-warn">sin código</span>} {l.ref ? `· ref: ${l.ref}` : ""}
              </button>
            ))}
          </div>
        </div>
      )}
      {sel && (
        <div className="card">
          {sel.codigo ? (
            <div className="card-edge card-edge-warn card-tight text-sm">
              <b className="ts-sub">Autorización del ebook para {sel.nombre}</b>
              <p className="tiny mt-1">Cuando te escriba por WhatsApp con su código, respóndele pegando esto:</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-xl border border-sand-200/70 bg-white px-3 py-1 font-mono font-black tracking-widest num shadow-sunken">{codigoEsperado(sel.codigo)}</span>
                <button onClick={() => copiar(codigoEsperado(sel.codigo))} className="btn-ghost !text-xs"><Icon name="clipboard" className="w-3 h-3 inline-block" aria-hidden="true" /> Copiar autorización</button>
              </div>
            </div>
          ) : (
            <p className="tiny panel-flat !p-2">Este lead aún no tiene código (se registró antes del sistema de canje).</p>
          )}
          <h2 className="font-bold mt-3"><Icon name="send" className="w-5 h-5 inline-block" aria-hidden="true" /> Secuencia para {sel.nombre} (copiar a tu app de envíos)</h2>
          {buildSecuencia({ nombre: sel.nombre, negocio: "su negocio", salud: 0, freno: "su freno principal" }).map((p, i) => (
            <div key={i} className="panel card-tight mt-2 text-sm">
              <b className="ts-sub">{p.dia} · {p.momento}</b>
              <p className="text-ink-700 mt-1 whitespace-pre-wrap">{p.texto}</p>
              <button onClick={() => navigator.clipboard.writeText(p.texto)} className="btn-ghost mt-1 !text-xs"><Icon name="clipboard" className="w-3 h-3 inline-block" aria-hidden="true" /> Copiar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

