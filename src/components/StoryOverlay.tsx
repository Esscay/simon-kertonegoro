"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { stats } from "@/data/stats";

/**
 * Full-screen story reader, opened from the Track Record panel.
 * Internally scrollable with a gradient reading-progress bar; the page
 * behind is locked while open.
 */
export default function StoryOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && <StoryContent onClose={onClose} />}
    </AnimatePresence>
  );
}

/** Mounted only while open, so useScroll's container ref is always live */
function StoryContent({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const root = scrollRef;
  const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { root, once: true, margin: "-40px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-deep"
      data-lenis-prevent
    >
          {/* Ambient glows inside the reader */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent-1/10 blur-[160px]" />
            <div className="absolute -right-40 top-2/3 h-[500px] w-[500px] rounded-full bg-accent-2/10 blur-[160px]" />
            <div className="absolute left-1/3 -top-20 h-[400px] w-[600px] rounded-full bg-haze/40 blur-[140px]" />
          </div>

          {/* Reading progress */}
          <motion.div
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-gradient-to-r from-accent-1 to-accent-2"
          />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close story"
            className="absolute right-6 top-6 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-deep/60 text-white/70 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
          >
            ✕
          </button>

          {/* Scrollable story */}
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto overscroll-contain"
          >
            <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
              <motion.header {...reveal}>
                <p className="text-xs tracking-[0.35em] uppercase text-muted">
                  My story
                </p>
                <h2 className="mt-6 font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
                  I&apos;ve always believed{" "}
                  <span className="bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent">
                    art
                  </span>{" "}
                  is the most beautiful contribution people can make to this
                  world.
                </h2>
                <p className="mt-8 font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
                  <span className="bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent">
                    Science
                  </span>{" "}
                  is what makes it go round.
                </p>
                <p className="mt-8 font-display text-3xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent pb-2">
                  The work I&apos;m proudest of does both.
                </p>
              </motion.header>

              <motion.p {...reveal} className="mt-16 text-[17px] leading-relaxed text-foreground/80">
                I taught myself to code at 11, treating every website like a
                canvas. I learned to scale at Enjin, joining as a social media
                intern and leaving as VP of Marketing after helping grow it
                from <Chip>$20M</Chip> to <Chip>$4B</Chip>. Then I learned what
                the climb couldn&apos;t teach me: I built my own startup and
                lost everything. The fortune, the house, the confidence.
                Understanding the science of success means nothing until
                you&apos;ve mastered the art of your own humanity.
              </motion.p>

              <motion.p {...reveal} className="mt-8 text-[17px] leading-relaxed text-foreground/80">
                That&apos;s the lesson underneath everything I build now.
              </motion.p>

              <motion.blockquote {...reveal} className="my-16">
                <p className="font-display text-3xl sm:text-4xl font-bold leading-snug text-white">
                  Build systems that compound, and even your worst days move
                  you forward.
                </p>
              </motion.blockquote>

              <motion.p {...reveal} className="font-display text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent pb-2">
                So now I build systems.
              </motion.p>

              <motion.p {...reveal} className="mt-16 text-[17px] leading-relaxed text-foreground/80">
                Since May 2025, working solo with Claude Code, I&apos;ve built
                TrustPager: a complete Business Operating System for Australian
                service businesses. Bootstrapped from <Chip>$30,000</Chip> and
                now produces <Chip>$30,000 per quarter</Chip> with minimal
                ongoing effort. As a solo developer I shipped more code than 25
                developers would deploy in a year... equivalent to{" "}
                <Chip>$3M AUD</Chip> in dev team salary.
              </motion.p>

              {/* Stats strip */}
              <motion.div
                {...reveal}
                className="my-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
              >
                <p className="text-center text-xs tracking-[0.35em] uppercase text-muted">
                  The Results
                </p>
                <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-display text-2xl sm:text-3xl font-bold whitespace-nowrap text-white">
                        {stat.decimals
                          ? stat.value.toFixed(stat.decimals)
                          : stat.value.toLocaleString()}
                        {stat.suffix && (
                          <span className="text-lg sm:text-xl">{stat.suffix}</span>
                        )}
                      </p>
                      <p className="mt-1 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-center">
                  <a
                    href="https://trustpager.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-accent-2 transition-colors hover:border-accent-2/60 hover:text-white"
                  >
                    Try TrustPager
                  </a>
                </p>
              </motion.div>

              <motion.p {...reveal} className="text-[17px] leading-relaxed text-foreground/80">
                AI is the ultimate science, but it needs the art of humanity
                to matter. TrustPager proved what I can do alone. The next
                thing I want to prove is what I can do inside a great team.
              </motion.p>

              <motion.div {...reveal} className="mt-20">
                <p className="font-display text-3xl sm:text-4xl font-bold leading-snug text-white">
                  Science is how we build.
                </p>
                <p className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-snug bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent pb-2">
                  Art is why we do it together.
                </p>
              </motion.div>
            </article>
          </div>
    </motion.div>,
    document.body
  );
}

/** Inline stat chip used within story paragraphs */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-block rounded-md border border-white/15 bg-white/[0.06] px-2 py-0.5 font-display text-[15px] font-semibold text-accent-1">
      {children}
    </span>
  );
}
