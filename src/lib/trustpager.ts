/**
 * TrustPager wiring for the portfolio (Personal Jobs workspace).
 * All values here are public-safe: the anon key is workspace-scoped via
 * site_key, and the Turnstile site key is the widget's public key.
 */

export const SUPABASE_URL = "https://ucqwijexmjctglmrxlej.supabase.co";
export const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcXdpamV4bWpjdGdsbXJ4bGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjEyMzcsImV4cCI6MjA3MTk5NzIzN30.u7VUzE4nPZUGhPTnP69aCrW7U7svE5LXsbiiMuBFv6M";
/** websites.site_key - routes public calls into the Jobs workspace */
export const SITE_KEY = "0baeb992-ded0-457b-a16f-1c653e99bc32";
/** Turnstile widget public key (managed by TrustPager Bot Protection) */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAD8RQxIZQ8hIEPbv";

/**
 * Exchange a solved Turnstile token for a short-lived trust token
 * (server-side verification). The trust token then authorises the
 * lead-form submission and the contact-details reveal.
 */
export async function verifyTurnstile(
  turnstileToken: string
): Promise<string | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/turnstile-public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "verify",
        site_key: SITE_KEY,
        surface: "lead_form",
        turnstile_token: turnstileToken,
      }),
    });
    const json = await res.json();
    return res.ok && json?.trust_token ? (json.trust_token as string) : null;
  } catch {
    return null;
  }
}

export type LeadFields = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

/** Repeat submissions update the same CRM records via cached public ids */
const CRM_KEYS = ["customer_public_id", "contact_public_id", "deal_public_id"];
const crmKey = (k: string) => `crm_${k}_${SITE_KEY}`;

function getCrmIds(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  for (const k of CRM_KEYS) {
    const v = window.localStorage.getItem(crmKey(k));
    if (v) out[k] = v;
  }
  return out;
}

function saveCrmIds(result: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  for (const k of CRM_KEYS) {
    const v = result?.[k];
    if (typeof v === "string" && v) window.localStorage.setItem(crmKey(k), v);
  }
}

/** Submit the lead form into the Job Opportunities pipeline. */
export async function submitLead(
  fields: LeadFields,
  trustToken: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/automation_website_trigger`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({
          site_key: SITE_KEY,
          operation: "send_email",
          data: {
            email: fields.email,
            fullName: fields.fullName,
            phone: fields.phone || undefined,
            company_name: fields.company || undefined,
            trust_token: trustToken,
            ...getCrmIds(),
            tags: [{ name: "Portfolio Lead", color: "#f8bc58" }],
            notes: [
              {
                activity_type: "message",
                subject: "Portfolio enquiry",
                description: fields.message,
              },
            ],
            templateData: {
              name: fields.fullName,
              email: fields.email,
              phone: fields.phone ?? "",
              company: fields.company ?? "",
              message: fields.message,
              subject: "Portfolio enquiry",
            },
          },
        }),
      }
    );
    const json = await res.json();
    if (res.ok && json?.success) {
      saveCrmIds(json);
      return { ok: true };
    }
    return {
      ok: false,
      error:
        json?.error?.message ??
        json?.error ??
        "Something went wrong. Please try again.",
    };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
