import { NextResponse } from "next/server";
import { SUPABASE_URL, SITE_KEY } from "@/lib/trustpager";

/**
 * Server-side human check. Receives a solved Turnstile token, verifies it
 * with TrustPager's turnstile-public endpoint (which holds the widget
 * secret), and only on success releases:
 *  - the trust_token (authorises the lead-form submission), and
 *  - the contact details (email + phone), which live in server-only Vercel
 *    env vars and are NEVER shipped in the client bundle.
 *
 * Env vars (Vercel -> Project Settings -> Environment Variables, mirrored in
 * .env.local for local dev):
 *   email_address   e.g. simon@finalpiece.ai
 *   phone_number    e.g. 0431377068  (AU mobile; tel: + display are derived)
 *
 * LinkedIn/GitHub are intentionally NOT here: they're already public (site
 * footer), so they stay client-side and need no env var.
 */

/** Derive an E.164 tel: value and a spaced display value from the raw phone
 *  env. Falls back to the raw string for anything that isn't a plain AU
 *  10-digit 0-prefixed mobile. */
function formatPhone(raw: string): { e164: string; display: string } {
  const cleaned = raw.trim();
  const digits = cleaned.replace(/[^\d]/g, "");
  let e164 = cleaned.replace(/[^\d+]/g, "");
  if (!e164.startsWith("+")) {
    if (e164.startsWith("0")) e164 = "+61" + e164.slice(1);
    else if (e164.startsWith("61")) e164 = "+" + e164;
  }
  const display = /^0\d{9}$/.test(digits)
    ? digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
    : cleaned;
  return { e164, display };
}

export async function POST(req: Request) {
  let token: string | undefined;
  try {
    const body = await req.json();
    token = body?.turnstile_token;
  } catch {
    // fall through to the 400 below
  }
  if (!token) {
    return NextResponse.json(
      { error: "turnstile_token is required" },
      { status: 400 }
    );
  }

  const res = await fetch(`${SUPABASE_URL}/functions/v1/turnstile-public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "verify",
      site_key: SITE_KEY,
      surface: "lead_form",
      turnstile_token: token,
    }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.trust_token) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 403 }
    );
  }

  const { e164, display } = formatPhone(process.env.phone_number ?? "");
  return NextResponse.json({
    trust_token: json.trust_token,
    contact: {
      email: process.env.email_address ?? "",
      phone: e164,
      phoneDisplay: display,
    },
  });
}
