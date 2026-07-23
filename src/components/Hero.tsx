"use client";

import Image from "next/image";
import ShootingStars from "@/components/ShootingStars";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

/**
 * Layered hero, no pinned scroll:
 *  - Bottom layer: simon-bg-fade - Simon with the room feathering into
 *    transparency, page background showing through.
 *  - Top layer: the party photo (identical frame), fading out over the
 *    first ~600px of scroll. Then the page flows on organically.
 * The two layers must stay pixel-aligned, so they never move
 * independently of each other.
 */
export default function Hero() {
  const { scrollY } = useScroll();

  // Slow, then fast: barely moves for the first stretch, then accelerates
  // and snaps to invisible by ~150px
  const groupOpacity = useTransform(
    scrollY,
    [0, 55, 105, 150],
    [1, 0.88, 0.45, 0]
  );
  const cueOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  // Simon sharpens slightly as the party fades
  const sharpen = useTransform(scrollY, [0, 150], [0, 1]);
  const saturate = useTransform(sharpen, [0, 1], [1, 1.15]);
  const contrast = useTransform(sharpen, [0, 1], [1, 1.08]);
  const soloFilter = useMotionTemplate`saturate(${saturate}) contrast(${contrast})`;

  // Light effects reveal as the party dissolves
  const raysOpacity = useTransform(scrollY, [40, 150], [0, 1]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Light effects behind everything, revealed by the fade */}
      <motion.div
        style={{ opacity: raysOpacity }}
        aria-hidden
        className="absolute inset-0"
      >
        {/* god rays fanning up from behind Simon's back, bottom middle */}
        <div className="god-rays" />
        {/* upward light flow, same diagonal as the stars */}
        <div className="ray-flow" />
        {/* soft halo anchoring the rays' origin behind his head */}
        <div className="absolute left-1/2 top-[32%] h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[90px]" />
        <ShootingStars />
      </motion.div>

      {/* Bottom layer - Simon */}
      <motion.div style={{ filter: soloFilter }} className="absolute inset-0">
        <Image
          src="/simon-bg-fade.webp"
          alt="Simon Kertonegoro"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Top layer - the party photo, fading out on scroll */}
      <motion.div style={{ opacity: groupOpacity }} className="absolute inset-0">
        <Image
          src="/hero-group.webp"
          alt="Simon Kertonegoro with friends"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Bottom gradient into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep to-transparent" />

      {/* Scroll cue + name (persistent) */}
      <div className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6">
        <motion.div style={{ opacity: cueOpacity }} className="mb-8">
          <button
            type="button"
            aria-label="Scroll to next section"
            onClick={() =>
              document
                .getElementById("shipped")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex cursor-pointer flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase">
              Scroll
            </span>
            {/* static line with a down arrow pulsing along it */}
            <span
              className="relative block h-10 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.3), transparent)",
              }}
            >
              <motion.span
                style={{ x: "-50%" }}
                animate={{ y: [0, 32], opacity: [0, 1, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeIn",
                  repeatDelay: 0.4,
                }}
                className="absolute left-1/2 top-0 block"
              >
                {/* thick solid triangle pointing down */}
                <span
                  className="block h-0 w-0"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "9px solid rgba(255,255,255,0.95)",
                    filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))",
                  }}
                />
              </motion.span>
            </span>
          </button>
        </motion.div>
        <h1 className="pb-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_var(--shadow-deep)]">
          Simon Kertonegoro
        </h1>
        <p className="mt-1 flex items-center gap-4 text-xs sm:text-sm tracking-[0.35em] uppercase text-white/70">
          <span
            aria-hidden
            className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent to-accent-1/70"
          />
          Full-Stack Developer · Project Manager
          <span
            aria-hidden
            className="hidden sm:block h-px w-10 bg-gradient-to-l from-transparent to-accent-2/70"
          />
        </p>
      </div>
    </section>
  );
}
