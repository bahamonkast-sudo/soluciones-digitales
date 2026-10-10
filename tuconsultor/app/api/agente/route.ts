import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Groq from "groq-sdk";
import { turnoLocal, preguntaDe, respondidas, ORDEN, etiquetaValor, mensajeLocal } from "../../../lib/agente";

// El flujo (patch + siguiente) SIEMPRE lo decide el motor local verificable.
// El TEXTO del turno: Groq lo redacta completo si hay clave; si no, voz
// local variada. La solución corta siempre sale de reglas (cero humo).
const Turno = z.object({ mensaje: z.string().max(600) });

async function turnoGroq(args: { apiKey: string; historial: string; acuseBase: string; solucion: { titulo: string; texto: string } | null; pregunta: string; ejemplo: string; aclarar: boolean }): Promise<string | null> {
  try {
    const groq = new Groq({ apiKey: args.apiKey });
    const c: any = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL_FAST || process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.7, max_tokens: 350,
      messages: [
        { role: "system", content: "Eres el consultor de tuConsultor charlando por WhatsApp: cálido, humano, tuteo, 2-4 frases cortas, sin emojis ni emoticones. Une todo en UN solo mensaje fluido: 1) acuse con tus palabras (misma idea del ACUSE, nunca lo contradigas), 2) si hay SOLUCIÓN menciónala en UNA línea sin repetirla literal (va en tarjeta aparte), 3) cierra con la PREGUNTA de forma natural, como seguiría un amigo consultor (usa su EJEMPLO solo si ayuda). PROHIBIDO: consejos nuevos, datos, cifras, promesas, saludos repetidos ('¡Hola!' solo si es lo primero). Devuelve JSON {mensaje}." },
        { role: "user", content: `Historial: ${args.historial}\nACUSE: ${args.acuseBase}\nSOLUCIÓN: ${args.solucion ? args.solucion.titulo + " — " + args.solucion.texto : "ninguna"}\nPREGUNTA: ${args.pregunta}\nEJEMPLO: ${args.ejemplo}\n¿ACLARAR?: ${args.aclarar}\nDevuelve JSON.` },
      ],
      response_format: { type: "json_object" } as any,
    });
    const p = Turno.safeParse(JSON.parse(c.choices?.[0]?.message?.content || "{}"));
    return p.success && p.data.mensaje.length > 20 ? p.data.mensaje : null;
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const answers = (body?.answers || {}) as Record<string, any>;
  const message = String(body?.message || "").slice(0, 500);
  const history = Array.isArray(body?.history) ? body.history.slice(-6).map((m: any) => `${m.de === "user" ? "Cliente" : "Consultor"}: ${String(m.texto || "").slice(0, 200)}`).join("\n") : "";
  const groqKey = typeof body?.groqKey === "string" ? body.groqKey : undefined;
  if (!message.trim()) return NextResponse.json({ ok: false }, { status: 400 });

  const turno = turnoLocal(answers, message);
  const nuevas = { ...answers, ...turno.patch };

  const metaResp = Object.keys(turno.patch)[0] || null;
  const valorTxt = metaResp ? etiquetaValor(metaResp, (turno.patch as any)[metaResp]) : "";
  const sig = turno.siguiente ? preguntaDe(turno.siguiente) : null;

  let mensaje = mensajeLocal(nuevas, message, metaResp, valorTxt, turno.siguiente);
  let fallback = true;
  const apiKey = process.env.GROQ_API_KEY || groqKey;
  if (apiKey) {
    const g = await turnoGroq({
      apiKey, historial: history, acuseBase: turno.acuse, solucion: turno.solucion,
      pregunta: sig ? sig.titulo : "ver el diagnóstico final",
      ejemplo: sig ? sig.ejemplo : "", aclarar: turno.aclarar,
    });
    if (g) { mensaje = g; fallback = false; }
  }

  return NextResponse.json({
    ok: true, patch: turno.patch, mensaje, solucion: turno.solucion,
    siguiente: sig ? { id: sig.id, kind: sig.kind === "multi" ? "multi" : "chips", chips: (sig.options || []).map((o) => ({ value: o.value, label: o.label })), omitible: !!sig.opcional } : null,
    respondidas: respondidas(nuevas), total: ORDEN.length, listo: turno.siguiente === null, fallback,
  });
}

