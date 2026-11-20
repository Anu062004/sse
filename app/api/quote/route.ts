import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteEmail } from "@/lib/quote-email";
import { site } from "@/lib/site";
import { validateQuote } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }

  const result = validateQuote(payload);

  if (!result.ok) {
    return NextResponse.json(
      {
        errors: result.errors,
        error: "Check the highlighted fields and try again.",
      },
      { status: 422 },
    );
  }

  const data = result.data;

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        error:
          "Email is not configured. Please call or WhatsApp us to send the request.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { subject, text, html } = buildQuoteEmail(data);

  const { error } = await resend.emails.send({
    from:
      process.env.QUOTE_FROM_EMAIL ??
      "SSE Website <onboarding@resend.dev>",
    to: process.env.QUOTE_TO_EMAIL ?? site.email,
    subject,
    text,
    html,
    ...(data.email ? { replyTo: data.email } : {}),
  });

  if (error) {
    console.error("Quote email failed:", error.message);
    return NextResponse.json(
      {
        error:
          "Could not send the request. Please call or WhatsApp us and we will respond directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
