"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectPanel from "@/components/ProjectPanel";

/**
 * Interactive vertical timeline. Data lives in src/data/projects.ts -
 * array order = render order. Clicking a card opens a full-height detail
 * drawer that slides in from the opposite edge of the screen.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.9"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const spineTip = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  // The clicked card's side decides which edge the panel enters from
  const [active, setActive] = useState<{
    project: Project;
    panelSide: "left" | "right";
  } | null>(null);

  return (
    <section id="work" className="relative pb-40">
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pt-8 pb-20 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-muted">
            The work
          </p>
          <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8">
            <span
              aria-hidden
              className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent to-accent-1/60"
            />
            <span
              aria-hidden
              className="h-1.5 w-1.5 rotate-45 bg-accent-1/80 shadow-[0_0_8px_var(--glow-1)]"
            />
            <h2 className="pb-2 -mb-2 font-display text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent drop-shadow-[0_0_24px_var(--glow-2-soft)]">
              Project Timeline
            </h2>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rotate-45 bg-accent-2/80 shadow-[0_0_8px_var(--glow-2)]"
            />
            <span
              aria-hidden
              className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent to-accent-2/60"
            />
          </div>
        </motion.header>

        <div ref={ref} className="relative">
          {/* Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          <motion.div
            style={{
              scaleY: spineScale,
              maskImage:
                "linear-gradient(to bottom, transparent 0, black 28px, black calc(100% - 28px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0, black 28px, black calc(100% - 28px), transparent)",
            }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-accent-1 via-cream/80 to-accent-2 shadow-[0_0_12px_var(--glow-1)]"
          />
          {/* Living tip riding the end of the line */}
          <motion.div
            style={{ top: spineTip }}
            className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          >
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0.7, 0.35] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-1/40 blur-md"
            />
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="block h-2 w-2 rounded-full bg-cream shadow-[0_0_10px_var(--glow-cream),0_0_18px_var(--glow-1)]"
            />
          </motion.div>

          <ol className="space-y-16 md:space-y-24">
            {projects.filter((p) => !p.hidden).map((project, i) => (
              <TimelineEntry
                key={project.id}
                project={project}
                index={i}
                onOpen={(cardOnLeft) =>
                  setActive({
                    project,
                    panelSide: cardOnLeft ? "right" : "left",
                  })
                }
              />
            ))}
          </ol>
        </div>
      </div>

      <ProjectPanel
        project={active?.project ?? null}
        side={active?.panelSide ?? "right"}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

/** First N sentences of a text, for the card blurb */
const firstSentences = (text: string, n = 2) =>
  text
    .split(/(?<=[.!?])\s+/)
    .slice(0, n)
    .join(" ");

function TimelineEntry({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (cardOnLeft: boolean) => void;
}) {
  const brand = project.brand;
  const accent = brand?.accent ?? project.accent ?? "var(--accent-1)";
  const left = index % 2 === 0; // desktop: even entries left, odd right

  return (
    <li className="relative">
      {/* Node on the spine (always gold), pops as its card lands */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 }}
        className="absolute left-4 md:left-1/2 top-8 z-10 block h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-deep"
        style={{
          background: "var(--accent-1)",
          boxShadow: "0 0 14px var(--glow-1)",
        }}
      />
      {/* Period label on the opposite side (desktop only) */}
      <motion.span
        initial={{ opacity: 0, x: left ? 16 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className={`hidden md:inline-flex absolute top-6 items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm text-[13px] font-semibold tracking-[0.18em] uppercase text-accent-1 shadow-[0_0_20px_-6px_var(--glow-1)] whitespace-nowrap ${
          left ? "left-1/2 ml-10" : "right-1/2 mr-10"
        }`}
      >
        {project.period}
      </motion.span>

      <motion.div
        initial={{
          opacity: 0,
          y: 48,
          x: left ? -48 : 48,
          scale: 0.94,
          filter: "blur(12px)",
        }}
        whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${
          left ? "" : "md:ml-auto"
        }`}
      >
        {brand ? (
          /* Branded "ad" card: the platform's logo and colors on light */
          <button
            type="button"
            onClick={() => onOpen(left)}
            aria-label={`${project.title} - view details`}
            className="group w-full cursor-pointer rounded-2xl p-7 sm:p-9 text-left transition-all duration-300 hover:-translate-y-1.5"
            style={{
              background: `radial-gradient(120% 90% at 85% 0%, ${accent}18, transparent 55%), ${
                brand.background ?? "#ffffff"
              }`,
              boxShadow: `0 24px 70px -20px ${accent}55, 0 6px 24px -10px rgba(0,0,0,0.5)`,
            }}
          >
            <p
              className="md:hidden text-xs tracking-widest uppercase"
              style={{ color: brand.muted ?? "#64748b" }}
            >
              {project.period}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              alt={`${project.title} logo`}
              className="mt-1 md:mt-0 h-9 w-auto"
            />
            <p
              className="mt-6 font-display text-2xl sm:text-[1.9rem] font-bold leading-snug"
              style={{ color: brand.foreground ?? "#0f172a" }}
            >
              {project.tagline}
            </p>
            <p
              className="mt-2 text-xs tracking-[0.2em] uppercase"
              style={{ color: brand.muted ?? "#64748b" }}
            >
              {project.role}
            </p>
            <p
              className="mt-4 text-sm sm:text-[15px] leading-relaxed"
              style={{ color: brand.muted ?? "#475569" }}
            >
              {firstSentences(project.description)}
            </p>
            <span
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: accent }}
            >
              View details
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </button>
        ) : (
          /* Default dark glass card */
          <button
            type="button"
            onClick={() => onOpen(left)}
            className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_10px_50px_-12px_var(--glow-2-soft)]"
          >
            <p className="md:hidden text-xs tracking-widest uppercase text-muted">
              {project.period}
            </p>
            <div className="mt-1 md:mt-0 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  {project.title}
                </h3>
                <p
                  className="mt-1 text-sm sm:text-base font-medium"
                  style={{ color: accent }}
                >
                  {project.tagline}
                </p>
              </div>
              <span
                aria-hidden
                className="mt-2 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
              >
                →
              </span>
            </div>

            <p className="mt-2 text-xs tracking-[0.2em] uppercase text-muted">
              {project.role}
            </p>
            <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-foreground/80">
              {firstSentences(project.description)}
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-2 transition-colors group-hover:text-white">
              View details
              <span aria-hidden>→</span>
            </span>
          </button>
        )}
      </motion.div>
    </li>
  );
}
