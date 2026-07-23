"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { stats, type Stat } from "@/data/stats";
import StoryOverlay from "@/components/StoryOverlay";

/** One dark card whose 1px border is a rotating conic gradient: two warm
 *  comets continuously travel around the edge. Massive numbers inside,
 *  counting up on scroll. Clicking the card opens the full-screen story.
 *  Data: src/data/stats.ts; colors: globals.css theme block. */
export default function Stats() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section id="shipped" className="relative z-10 -mt-5 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="conic-border shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1">
          <div
            role="button"
            tabIndex={0}
            aria-label="Read my story"
            onClick={() => setStoryOpen(true)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setStoryOpen(true)
            }
            className="group relative cursor-pointer rounded-[calc(1.5rem-1px)] bg-surface/95 backdrop-blur-xl px-6 py-14 sm:px-12 sm:py-16"
          >
            <header className="flex items-center justify-center gap-4 sm:gap-8">
              <span
                aria-hidden
                className="hidden sm:block h-px flex-1 max-w-40 bg-gradient-to-r from-transparent to-accent-1/60"
              />
              <span
                aria-hidden
                className="hidden sm:block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-1/80 shadow-[0_0_8px_var(--glow-1)]"
              />
              <h2 className="pb-2 -mb-2 text-center text-balance font-display text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent drop-shadow-[0_0_24px_var(--glow-2-soft)]">
                Code I Shipped Myself
              </h2>
              <span
                aria-hidden
                className="hidden sm:block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-2/80 shadow-[0_0_8px_var(--glow-2)]"
              />
              <span
                aria-hidden
                className="hidden sm:block h-px flex-1 max-w-40 bg-gradient-to-l from-transparent to-accent-2/60"
              />
            </header>

            <p className="mt-3 text-center text-xs tracking-[0.35em] uppercase text-muted">
              TrustPager · Since May 2025
            </p>

            <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <Counter key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            <p className="mt-12 flex items-center justify-center gap-2 text-center text-sm font-medium text-accent-2 transition-colors group-hover:text-white">
              Read the story behind the numbers
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </div>
        </div>
      </div>

      <StoryOverlay open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
  );
}

function Counter({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    stat.decimals
      ? v.toFixed(stat.decimals)
      : Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.value, {
      duration: 1.6,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, stat.value, index]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl sm:text-6xl font-bold whitespace-nowrap text-white">
        <motion.span>{rounded}</motion.span>
        {stat.suffix && (
          <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
        )}
      </p>
      <p className="mt-3 text-xs sm:text-sm tracking-[0.2em] uppercase text-muted">
        {stat.label}
      </p>
    </div>
  );
}
