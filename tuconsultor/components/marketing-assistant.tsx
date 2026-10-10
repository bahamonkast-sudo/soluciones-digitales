"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Icon from "./icon";
import GroqKeyField from "./groq-key";
import { getGroqKey } from "../lib/settings";

type Message = { role: "user" | "assistant"; content: string; local?: boolean };
const STORAGE_KEY = "tuconsultor_marketing_chat_v1";
const STARTERS = [
  "Dame ideas de contenido para mi negocio",
  "Ayúdame a escribir una publicación",
  "Revisa este texto y hazlo más convincente",
];

export default function MarketingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* El chat sigue disponible aunque el navegador no permita guardar. */ }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24))); } catch { /* almacenamiento opcional */ }
  }, [messages]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, busy]);

  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = draft.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/tuconsultor/api/marketing-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: next.map(({ role, content }) => ({ role, content })),
          groqKey: getGroqKey() || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No pude responder ahora.");
      setMessages([...next, { role: "assistant", content: data.reply, local: data.fallback }]);
    } catch (e) {
      setDraft(question);
      setError(e instanceof Error ? e.message : "No pude conectar. Inténtalo otra vez.");
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  return (
    <div className="no-print fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          id="marketing-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="marketing-assistant-title"
          className="flex h-[min(76dvh,42rem)] w-[min(25rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-brand-900/10 bg-cream shadow-[0_22px_70px_rgba(28,42,31,.22)] animate-fade-up"
        >
          <header className="flex items-start justify-between gap-3 border-b border-sand-200/80 bg-white/85 px-4 py-4">
            <div>
              <p className="eyebrow">Consultoría independiente</p>
              <h2 id="marketing-assistant-title" className="mt-1 text-lg">Tu consultor de marketing</h2>
              <p className="mt-1 text-xs text-ink-500">Contenido, ideas y decisiones prácticas. No necesitas un diagnóstico.</p>
            </div>
            <div className="flex shrink-0 gap-1">
              {messages.length > 0 && <button type="button" onClick={() => { setMessages([]); setError(""); }} className="btn-ghost btn-sm !px-2 text-xs" title="Limpiar conversación" aria-label="Limpiar conversación">Limpiar</button>}
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost btn-sm !px-2" aria-label="Cerrar asistente"><span aria-hidden>×</span></button>
            </div>
          </header>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-brand-100 bg-white p-4 text-sm leading-relaxed text-ink-700 shadow-soft">
                  Cuéntame qué vendes y qué quieres comunicar. Puedo proponer ángulos distintos, escribir un borrador o ayudarte a mejorarlo. Si falta contexto, te preguntaré lo mínimo para aterrizarlo.
                </div>
                <div className="flex flex-col gap-2">
                  {STARTERS.map((starter) => <button key={starter} type="button" onClick={() => { setDraft(starter); inputRef.current?.focus(); }} className="rounded-xl border border-sand-200 bg-white/80 px-3 py-2.5 text-left text-xs text-ink-700 transition hover:border-brand-300 hover:bg-brand-50">{starter} <span aria-hidden className="float-right text-brand-700">↗</span></button>)}
                </div>
              </div>
            ) : messages.map((message, index) => (
              <div key={`${index}-${message.role}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={message.role === "user" ? "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-800 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-soft" : "max-w-[94%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-sand-200/80 bg-white px-3.5 py-3 text-sm leading-relaxed text-ink-800 shadow-soft"}>
                  {message.content}
                  {message.role === "assistant" && <span className="mt-2 block text-[10px] font-medium uppercase tracking-wide text-ink-400">{message.local ? "Orientación local" : "Consultor de marketing"}</span>}
                </div>
              </div>
            ))}
            {busy && <p className="text-xs text-ink-500" role="status">Estoy pensando una respuesta útil…</p>}
            {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800" role="alert">{error} <button type="button" className="ml-1 font-semibold underline" onClick={() => void send()}>Reintentar</button></div>}
          </div>

          <form onSubmit={send} className="border-t border-sand-200/80 bg-white/85 p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-sand-300 bg-white p-2 shadow-hairline focus-within:border-brand-500">
              <textarea ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} rows={2} maxLength={3000} placeholder="¿Qué contenido quieres trabajar?" aria-label="Escribe tu consulta de marketing" className="max-h-28 min-h-12 flex-1 resize-y bg-transparent px-1 py-1 text-sm text-ink-900 outline-none placeholder:text-ink-400" />
              <button type="submit" disabled={!draft.trim() || busy} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-800 text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Enviar mensaje"><Icon name="send" className="h-4 w-4" /></button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[10px] text-ink-400">Enter envía · Shift+Enter nueva línea</span>
              <details className="group relative">
                <summary className="cursor-pointer list-none text-[10px] font-medium text-ink-500 underline underline-offset-2">Ajustes de IA</summary>
                <div className="absolute bottom-6 right-0 z-10 w-72 rounded-2xl border border-sand-200 bg-white p-3 shadow-card"><GroqKeyField compact /></div>
              </details>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="marketing-assistant-panel"
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center gap-2.5 rounded-full border border-white/80 bg-brand-800 py-3 pl-3.5 pr-5 text-sm font-semibold text-white shadow-[0_10px_32px_rgba(24,54,34,.26)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_14px_38px_rgba(24,54,34,.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Icon name={open ? "xcircle" : "chat"} className="h-5 w-5" /></span>
        <span>{open ? "Cerrar consultor" : "Consultor de marketing"}</span>
      </button>
    </div>
  );
}



