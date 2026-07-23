"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import QuoteText from "@/components/QuoteText";

/**
 * Full-height detail drawer. Slides in from the OPPOSITE edge to the card
 * that was clicked. When the project carries a `brand`, the panel renders
 * in that platform's identity (light background, logo, brand accent);
 * otherwise it keeps the site's dark glass style. Internally scrollable;
 * `data-lenis-prevent` keeps Lenis from hijacking wheel events.
 */
export default function ProjectPanel({
  project,
  side,
  onClose,
}: {
  project: Project | null;
  side: "left" | "right";
  onClose: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Lock the page: no scrolling behind the drawer, page scrollbar hidden
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  // Wheel anywhere (backdrop included) drives the panel's scroller
  const onWheel = (e: React.WheelEvent) => {
    const body = bodyRef.current;
    if (body && !body.contains(e.target as Node)) {
      body.scrollBy({ top: e.deltaY });
    }
  };

  const fromLeft = side === "left";
  const brand = project?.brand;
  const accent = brand?.accent ?? project?.accent ?? "var(--accent-1)";

  // Light (branded) vs dark (default) palettes
  const fg = brand ? brand.foreground ?? "#0f172a" : undefined;
  const body = brand ? brand.muted ?? "#334155" : undefined;
  const subtle = brand ? "#64748b" : undefined;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50" data-lenis-prevent onWheel={onWheel}>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 w-full cursor-pointer bg-deep/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-label={project.title}
            initial={{ x: fromLeft ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: fromLeft ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`absolute inset-y-0 flex w-full md:w-[48vw] flex-col shadow-[0_0_80px_var(--shadow-deep)] ${
              fromLeft ? "left-0 border-r" : "right-0 border-l"
            } ${
              brand
                ? "border-black/10"
                : "border-white/10 bg-surface/95 backdrop-blur-xl"
            }`}
            style={
              brand
                ? {
                    background: `radial-gradient(110% 60% at 85% 0%, ${accent}14, transparent 55%), ${
                      brand.background ?? "#ffffff"
                    }`,
                  }
                : undefined
            }
          >
            {/* Header */}
            <div
              className={`flex items-start justify-between gap-4 border-b p-6 sm:p-8 ${
                brand ? "border-black/10" : "border-white/10"
              }`}
            >
              <div>
                {brand ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={brand.logo}
                    alt={`${project.title} logo`}
                    className="h-10 w-auto max-w-full object-contain object-left"
                  />
                ) : (
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    {project.title}
                  </h3>
                )}
                <p
                  className="mt-3 text-sm sm:text-base font-semibold"
                  style={{ color: accent }}
                >
                  {project.tagline}
                </p>
                <p
                  className={`mt-3 text-xs tracking-[0.25em] uppercase ${
                    brand ? "" : "text-muted"
                  }`}
                  style={{ color: subtle }}
                >
                  {project.role} · {project.period}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className={`mt-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors ${
                  brand
                    ? "border-black/15 text-slate-500 hover:border-black/40 hover:text-slate-900"
                    : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8"
            >
              {project.video && (
                <div
                  className={`mb-8 overflow-hidden rounded-xl border ${
                    brand ? "border-black/10" : "border-white/10"
                  }`}
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={project.video}
                      title={`${project.title} video`}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              <p
                className={`text-[15px] leading-relaxed ${
                  brand ? "" : "text-foreground/85"
                }`}
                style={{ color: body }}
              >
                {project.description}
              </p>

              {project.facts && (
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className={`rounded-xl border p-4 ${
                        brand
                          ? "border-black/10 bg-black/[0.03]"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <p
                        className="font-display text-xl sm:text-2xl font-bold whitespace-nowrap"
                        style={{ color: accent }}
                      >
                        {fact.value}
                      </p>
                      <p
                        className={`mt-1 text-[11px] tracking-[0.08em] uppercase ${
                          brand ? "" : "text-muted"
                        }`}
                        style={{ color: subtle }}
                      >
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {project.highlights && (
                <ul className="mt-8 space-y-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className={`flex gap-3 text-sm ${
                        brand ? "" : "text-foreground/80"
                      }`}
                      style={{ color: body }}
                    >
                      <span style={{ color: accent }} aria-hidden>
                        ◆
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {project.sections?.map((section) => (
                <section key={section.heading} className="mt-10">
                  <h4
                    className={`font-display text-xl font-semibold ${
                      brand ? "" : "text-white"
                    }`}
                    style={{ color: fg }}
                  >
                    {section.heading}
                  </h4>
                  <p
                    className={`mt-3 text-[15px] leading-relaxed ${
                      brand ? "" : "text-foreground/75"
                    }`}
                    style={{ color: body }}
                  >
                    {section.body}
                  </p>
                </section>
              ))}

              <div className="mt-10 flex flex-wrap items-center gap-2 pb-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      brand
                        ? "border-black/10 bg-black/[0.04]"
                        : "border-white/10 bg-white/[0.05] text-muted"
                    }`}
                    style={{ color: subtle }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.recommendations && (
                <div className="mt-10">
                  <h4
                    className={`font-display text-xl font-semibold ${
                      brand ? "" : "text-white"
                    }`}
                    style={{ color: fg }}
                  >
                    Recommendations
                  </h4>
                  <div className="mt-4 space-y-4 pb-2">
                    {project.recommendations.map((rec) => (
                      <a
                        key={rec.name}
                        href={rec.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group block rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 ${
                          brand
                            ? "border-black/10 bg-black/[0.03] hover:border-black/25"
                            : "border-white/10 bg-white/[0.04] hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rec.avatar}
                            alt={rec.name}
                            width={44}
                            height={44}
                            className={`h-11 w-11 shrink-0 rounded-full border object-cover ${
                              brand ? "border-black/10" : "border-white/15"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-semibold ${
                                brand ? "" : "text-white"
                              }`}
                              style={{ color: fg }}
                            >
                              {rec.name}
                            </p>
                            <p className="text-xs" style={{ color: subtle }}>
                              {rec.title} · {rec.relationship}
                            </p>
                          </div>
                          <span
                            className="hidden shrink-0 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline"
                            style={{ color: accent }}
                          >
                            {rec.linkLabel ?? "View on LinkedIn ↗"}
                          </span>
                        </div>
                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            brand ? "" : "text-foreground/80"
                          }`}
                          style={{ color: body }}
                        >
                          <QuoteText text={rec.quote} />
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer link */}
            {project.link && (
              <div
                className={`border-t p-6 sm:px-8 ${
                  brand ? "border-black/10" : "border-white/10"
                }`}
              >
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
                  style={{ background: accent }}
                >
                  Visit {project.link.label}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
