"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Turnstile, { type TurnstileHandle } from "@/components/Turnstile";
import {
  TURNSTILE_SITE_KEY,
  verifyTurnstile,
  submitLead,
  type LeadFields,
} from "@/lib/trustpager";

/**
 * Contact block: a lead form (wired into the TrustPager Job Opportunities
 * pipeline) and a bot-gated "View Contact Details" reveal. One Turnstile
 * solve is exchanged server-side for a short-lived trust token that
 * authorises both.
 * Contact details are base64-encoded so they never appear as plain text
 * in the HTML or bundle - only rendered after the human check passes.
 */

const DETAILS = {
  email: "c2ltb25AZmluYWxwaWVjZS5haQ==", // simon@finalpiece.ai
  phone: "KzYxNDMxMzc3MDY4", // +61431377068
  phoneDisplay: "MDQzMSAzNzcgMDY4", // 0431 377 068
  linkedin: "aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2Vzc2NheS8=",
  github: "aHR0cHM6Ly9naXRodWIuY29tL0Vzc2NheQ==",
};
const decode = (v: string) => atob(v);

export default function ContactSection() {
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [trustToken, setTrustToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<LeadFields>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const onToken = async (token: string) => {
    setVerifying(true);
    const trust = await verifyTurnstile(token);
    setTrustToken(trust);
    setVerifying(false);
  };

  const set =
    (key: keyof LeadFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trustToken) {
      setError("Please complete the verification below first.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = await submitLead(fields, trustToken);
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTrustToken(null);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent-1/60";

  return (
    <section id="contact" className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="conic-border shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)]">
          <div className="rounded-[calc(1.5rem-1px)] bg-surface/95 px-8 py-14 backdrop-blur-xl sm:px-12 sm:py-16">
            {/* Heading */}
            <header className="flex items-center justify-center gap-5 sm:gap-8">
              <span
                aria-hidden
                className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent to-accent-1/60"
              />
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-accent-1/80 shadow-[0_0_8px_var(--glow-1)]"
              />
              <h2 className="pb-2 -mb-2 font-display text-3xl sm:text-4xl font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent drop-shadow-[0_0_24px_var(--glow-2-soft)]">
                Get in Touch
              </h2>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-accent-2/80 shadow-[0_0_8px_var(--glow-2)]"
              />
              <span
                aria-hidden
                className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent to-accent-2/60"
              />
            </header>
            <p className="mt-3 text-center text-xs tracking-[0.35em] uppercase text-muted">
              Book a call about a role or a project
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
              {/* Lead form */}
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
                  <p className="font-display text-2xl font-bold text-white">
                    Thanks, I&apos;ve got it.
                  </p>
                  <p className="mt-3 max-w-md text-sm text-foreground/75">
                    Your message just landed in my pipeline and my inbox.
                    I&apos;ll get back to you within a day.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Your name *"
                      value={fields.fullName}
                      onChange={set("fullName")}
                      className={inputClass}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      value={fields.email}
                      onChange={set("email")}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      placeholder="Phone"
                      value={fields.phone}
                      onChange={set("phone")}
                      className={inputClass}
                    />
                    <input
                      placeholder="Company"
                      value={fields.company}
                      onChange={set("company")}
                      className={inputClass}
                    />
                  </div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about the role or project *"
                    value={fields.message}
                    onChange={set("message")}
                    className={inputClass}
                  />
                  {error && (
                    <p className="text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <button
                      type="submit"
                      disabled={submitting || verifying || !trustToken}
                      className="cursor-pointer rounded-full bg-gradient-to-r from-accent-1 to-accent-2 px-7 py-3 text-sm font-semibold text-deep transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Send message"}
                    </button>
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onToken={onToken}
                      onExpire={() => setTrustToken(null)}
                    />
                  </div>
                </form>
              )}

              {/* Contact details reveal */}
              <aside className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="font-display text-xl font-semibold text-white">
                  Prefer direct?
                </p>
                <p className="mt-2 text-sm text-muted">
                  Email, phone, LinkedIn and GitHub, behind a quick human
                  check.
                </p>
                <button
                  type="button"
                  disabled={verifying || !trustToken}
                  onClick={() => trustToken && setModalOpen(true)}
                  className="mt-6 cursor-pointer rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-accent-1 transition-colors hover:border-accent-1/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {verifying
                    ? "Verifying..."
                    : trustToken
                      ? "View Contact Details"
                      : "Complete the check first"}
                </button>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Contact details modal */}
      <AnimatePresence>
        {modalOpen && trustToken && (
          <div className="fixed inset-0 z-50" data-lenis-prevent>
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 w-full cursor-pointer bg-deep/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="absolute left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-surface p-8 shadow-[0_0_80px_var(--shadow-deep)]"
              role="dialog"
              aria-label="Contact details"
            >
              <h3 className="font-display text-2xl font-bold text-white">
                Contact details
              </h3>
              <div className="mt-6 space-y-4 text-sm">
                <a
                  href={`mailto:${decode(DETAILS.email)}`}
                  className="block rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-foreground transition-colors hover:border-accent-1/50"
                >
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    Email
                  </span>
                  <span className="mt-1 block font-medium text-accent-1">
                    {decode(DETAILS.email)}
                  </span>
                </a>
                <a
                  href={`tel:${decode(DETAILS.phone)}`}
                  className="block rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-foreground transition-colors hover:border-accent-1/50"
                >
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    Phone
                  </span>
                  <span className="mt-1 block font-medium text-accent-1">
                    {decode(DETAILS.phoneDisplay)}
                  </span>
                </a>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={decode(DETAILS.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center font-medium text-accent-2 transition-colors hover:border-accent-2/50 hover:text-white"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href={decode(DETAILS.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center font-medium text-accent-2 transition-colors hover:border-accent-2/50 hover:text-white"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
