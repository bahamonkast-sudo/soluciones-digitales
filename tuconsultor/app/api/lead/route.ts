import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// Captura de leads: valida, guarda en data/leads.jsonl (1 línea por lead) y
// permite exportar con token (LEADS_TOKEN) para tu app de envíos masivos.
const LeadSchema = z.object({
  nombre: z.string().min(2).max(80),
  whatsapp: z.string().regex(/^\+?\d{8,15}$/),
  contactos: z.number().optional(),
  ticket: z.number().optional(),
  codigo: z.string().max(20).optional(),
  ref: z.string().max(60).optional(),
});

const file = () => path.join(process.cwd(), "data", "leads.jsonl");
async function readAll(): Promise<any[]> {
  try {
    const raw = await fs.readFile(file(), "utf8");
    return raw.split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  const lead = { id: crypto.randomUUID().slice(0, 8), at: new Date().toISOString(), ...parsed.data };
  await fs.appendFile(file(), JSON.stringify(lead) + "\n");
  return NextResponse.json({ ok: true, id: lead.id });
}

// PUT: asocia el código a la fila más reciente del mismo WhatsApp
// (por si el lead se registró antes del sistema de códigos).
export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = z.object({ whatsapp: z.string(), codigo: z.string().max(20) }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const leads = await readAll();
  for (let i = leads.length - 1; i >= 0; i--) {
    if (leads[i].whatsapp === parsed.data.whatsapp) {
      leads[i] = { ...leads[i], codigo: parsed.data.codigo };
      break;
    }
  }
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(file(), leads.map((l) => JSON.stringify(l)).join("\n") + (leads.length ? "\n" : ""));
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");
  if (token !== (process.env.LEADS_TOKEN || "tuconsultor-admin"))
    return NextResponse.json({ ok: false }, { status: 403 });
  return NextResponse.json({ ok: true, leads: await readAll() });
}

