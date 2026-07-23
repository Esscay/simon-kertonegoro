"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { recommendations } from "@/data/recommendations";
import { projects } from "@/data/projects";
import ProjectPanel from "@/components/ProjectPanel";

/**
 * Compact horizontal carousel of LinkedIn recommendations, shown above
 * The Work. Clicking a card opens the Enjin story (where the full quotes
 * live, linking out to LinkedIn).
 */
export default function RecommendationsCarousel() {
  const [open, setOpen] = useState(false);
  const enjin = projects.find((p) => p.id === "enjin") ?? null;

  return (
    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs tracking-[0.35em] uppercase text-muted">
          What colleagues say
        </p>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {recommendations.map((rec, i) => (
            <motion.button
              key={rec.name}
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group w-[85%] shrink-0 snap-center cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_10px_50px_-12px_var(--glow-1-soft)] sm:w-[45%] lg:w-auto"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={rec.avatar}
                  alt={rec.name}
                  width={44}
                  height={44}
                  className="rounded-full border border-white/15"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{rec.name}</p>
                  <p className="text-xs text-muted">{rec.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/75 line-clamp-3">
                <span className="text-accent-1" aria-hidden>
                  &ldquo;
                </span>
                {rec.quote}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-accent-2 transition-colors group-hover:text-white">
                Read the Enjin story
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectPanel
        project={open ? enjin : null}
        side="right"
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
