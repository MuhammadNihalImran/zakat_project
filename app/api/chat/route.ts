import { NextResponse } from "next/server";
import { sendChatMessageToGemini, ChatMessageInput } from "@/lib/api/gemini";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { message, history } = body || {};

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Message is required." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, message: "Message exceeds maximum length of 1000 characters." },
        { status: 400 }
      );
    }

    const safeHistory: ChatMessageInput[] = Array.isArray(history) ? history : [];

    const result = await sendChatMessageToGemini(message, safeHistory);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.message.includes("configuration") ? 500 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Sorry, I'm unable to answer right now. Please try again later." },
      { status: 500 }
    );
  }
}
