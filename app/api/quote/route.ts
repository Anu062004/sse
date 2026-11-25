import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildQuoteEmail } from "@/lib/quote-email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";
import { validateQuote } from "@/lib/validation";

export const runtime = "nodejs";

/** Largest body the form can legitimately send (all fields at max length). */
const MAX_BODY_BYTES = 8 * 1024;
/** Quote requests allowed per visitor in each window. */
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** Only accept posts made from this site's own pages. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  const limit = rateLimit(`quote:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes, or call or WhatsApp us." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;

  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    payload = JSON.parse(body);
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
