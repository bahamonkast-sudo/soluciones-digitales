import { useState } from 'react';
import { ArrowRight, CheckCircle2, KeyRound, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  getPassServiceName,
  getPassSessionKey,
  redeemAccessPass,
} from '../services/accessPassService';

const ADMIN_WHATSAPP = '573115893220';

export default function AccessPassGate({ service, onAuthorized, className = '' }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const serviceName = getPassServiceName(service);
  const requestMessage = `Hola, solicito autorización para usar una vez el demo de ${serviceName}.`;

  const handleRedeem = async (event) => {
    event.preventDefault();
    if (!code.trim() || loading) return;
    setLoading(true);
    setError('');
    try {
      await redeemAccessPass(service, code);
      sessionStorage.setItem(getPassSessionKey(service), 'authorized');
      onAuthorized?.();
    } catch (err) {
      setError(err.message || 'No se pudo validar el pase. Revisa el código e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`mx-auto max-w-2xl rounded-3xl border border-white/10 bg-[#11131a] p-6 shadow-2xl sm:p-9 ${className}`}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
        <ShieldCheck size={27} />
      </div>
      <div className="mt-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Acceso autorizado</p>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Solicita tu pase para {serviceName}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
          Escríbenos por WhatsApp. Cuando revisemos tu solicitud, te enviaremos un código de un solo uso para abrir este demo.
        </p>
      </div>

      <a
        href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(requestMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-500"
      >
        <MessageCircle size={19} /> Solicitar autorización por WhatsApp <ArrowRight size={17} />
      </a>

      <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
        <span className="h-px flex-1 bg-white/10" />
        Ya recibí mi pase
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleRedeem} className="space-y-3">
        <label htmlFor={`access-pass-${service}`} className="block text-xs font-semibold text-neutral-300">Código de acceso</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <KeyRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              id={`access-pass-${service}`}
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              autoComplete="one-time-code"
              autoCapitalize="characters"
              spellCheck="false"
              placeholder="AUD-XXXX-XXXX-XXXX-XXXX"
              disabled={loading}
              className="min-h-12 w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-11 pr-4 font-mono text-sm tracking-wider text-white outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-neutral-600 focus:border-blue-400/60 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!code.trim() || loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <CheckCircle2 size={17} />}
            Validar pase
          </button>
        </div>
        {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
      </form>
      <p className="mt-5 text-center text-xs leading-relaxed text-neutral-600">El código se marca como usado en este navegador. No escribas aquí tu nombre, correo ni teléfono.</p>
    </section>
  );
}
