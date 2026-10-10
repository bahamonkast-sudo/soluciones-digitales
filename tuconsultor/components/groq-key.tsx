"use client";
import { useEffect, useState } from "react";
import { getGroqKey, saveGroqKey, clearGroqKey } from "../lib/settings";
import Icon from "./icon";

// Campo para la API key de Groq. Estructura v1:
// - Se guarda solo en el navegador (localStorage), nunca en código ni en git.
// - Se envía únicamente a tu propio backend (/api/*), que la usa server-side.
// - Si existe GROQ_API_KEY en .env, el servidor la prefiere e ignora esta.
export default function GroqKeyField({ compact = false, onChange }: { compact?: boolean; onChange?: () => void }) {
  const [val, setVal] = useState("");
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const k = getGroqKey();
    if (k) {
      setSaved(true);
      setVal(k);
    }
  }, []);

  const guardar = () => {
    if (!val.trim()) return;
    saveGroqKey(val);
    setSaved(true);
    onChange?.();
  };
  const quitar = () => {
    clearGroqKey();
    setVal("");
    setSaved(false);
    onChange?.();
  };

  return (
    <div className={compact ? "text-sm space-y-2" : "card section"}>
      <div className="section-head items-center">
          <span className="ts-sub flex items-center gap-2 font-bold"><Icon name="key" className="w-4 h-4 shrink-0 text-brand-700" /> API key de Groq</span>
        {saved ? (
          <span className="chip chip-good">guardada en este navegador</span>
        ) : (
          <span className="chip chip-info">sin clave → modo local</span>
        )}
      </div>
      {!compact && (
        <p className="tiny">
          Activa la interpretación con IA. Consigue tu clave gratis en{" "}
          <a className="link-soft" href="https://console.groq.com/keys" target="_blank" rel="noreferrer">
            console.groq.com/keys
          </a>
          . Sin clave, la app sigue funcionando con el motor de reglas.
        </p>
      )}
      <div className="flex gap-2">
        <input
          type={show ? "text" : "password"}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="gsk_..."
          aria-label="API key de Groq"
          autoComplete="off"
          className="field flex-1"
        />
        <button onClick={() => setShow(!show)} className="btn-ghost btn-sm" title="Mostrar/ocultar">
          {show ? "Ocultar" : "Ver"}
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={guardar} disabled={!val.trim()} className="btn-primary btn-sm">
          Guardar
        </button>
        {saved && (
          <button onClick={quitar} className="btn-ghost btn-sm">
            Quitar
          </button>
        )}
      </div>
    </div>
  );
}

