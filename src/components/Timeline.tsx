"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";

/**
 * Interactive vertical timeline. Data lives in src/data/projects.ts -
 * array order = render order. Cards reveal on scroll, expand on click.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.9"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-white">
            Project Timeline
          </h2>
        </motion.header>

        <div ref={ref} className="relative">
          {/* Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          <motion.div
            style={{ scaleY: spineScale }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-neon-pink via-white/80 to-neon-cyan shadow-[0_0_12px_rgba(255,79,216,0.6)]"
          />

          <ol className="space-y-16 md:space-y-24">
            {projects.map((project, i) => (
              <TimelineEntry key={project.id} project={project} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const accent = project.accent ?? "var(--neon-pink)";
  const left = index % 2 === 0; // desktop: even entries left, odd right

  return (
    <li className="relative">
      {/* Node on the spine, pops as its card lands */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 }}
        className="absolute left-4 md:left-1/2 top-8 z-10 block h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-deep"
        style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
      />
      {/* Period label on the opposite side (desktop only) */}
      <motion.span
        initial={{ opacity: 0, x: left ? 16 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className={`hidden md:block absolute top-7 text-sm font-display tracking-widest text-muted ${
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
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group w-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_10px_50px_-12px_rgba(79,216,255,0.25)]"
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
            {project.highlights && (
              <span
                className={`mt-2 shrink-0 text-muted transition-transform duration-300 ${
                  expanded ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            )}
          </div>

          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-muted">
            {project.role}
          </p>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-foreground/80">
            {project.description}
          </p>

          <AnimatePresence initial={false}>
            {expanded && project.highlights && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="mt-3 first:mt-5 flex gap-3 text-sm text-foreground/75"
                  >
                    <span style={{ color: accent }} aria-hidden>
                      ◆
                    </span>
                    {h}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neon-cyan hover:text-white transition-colors"
            >
              {project.link.label}
              <span aria-hidden>↗</span>
            </a>
          )}
        </button>
      </motion.div>
    </li>
  );
}
