import { NextRequest, NextResponse } from "next/server";
import { groqMarketingAssistant, MarketingChatMessage } from "../../../lib/groq";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const history = (Array.isArray(body.history) ? body.history : [])
      .filter((message: any) =>
        (message?.role === "user" || message?.role === "assistant") &&
        typeof message.content === "string",
      )
      .slice(-12)
      .map((message: any) => ({
        role: message.role,
        content: message.content.slice(0, 3000),
      })) as MarketingChatMessage[];

    if (!history.some((message) => message.role === "user")) {
      return NextResponse.json({ error: "Escribe una pregunta para comenzar." }, { status: 400 });
    }

    const result = await groqMarketingAssistant(
      history,
      typeof body.groqKey === "string" ? body.groqKey : undefined,
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "No pude procesar el mensaje. Inténtalo de nuevo." }, { status: 400 });
  }
}

