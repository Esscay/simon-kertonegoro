"use client";

import Image from "next/image";
import { useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * Layered hero, no pinned scroll:
 *  - Bottom layer: simon-bg-fade - Simon with the room feathering into
 *    transparency, page background showing through.
 *  - Top layer: the party photo (identical frame), fading out over the
 *    first ~600px of scroll. Then the page flows on organically.
 * Mouse parallax: the two layers drift a few px against each other,
 * giving the hero depth on pointer devices.
 */
export default function Hero() {
  const { scrollY } = useScroll();

  const groupOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const cueOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  // Simon sharpens slightly as the party fades
  const sharpen = useTransform(scrollY, [0, 600], [0, 1]);
  const saturate = useTransform(sharpen, [0, 1], [1, 1.15]);
  const contrast = useTransform(sharpen, [0, 1], [1, 1.08]);
  const soloFilter = useMotionTemplate`saturate(${saturate}) contrast(${contrast})`;

  // Mouse parallax: -1..1 normalized cursor position, spring-smoothed
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const soloX = useTransform(sx, [-1, 1], [-10, 10]);
  const soloY = useTransform(sy, [-1, 1], [-6, 6]);
  const groupX = useTransform(sx, [-1, 1], [7, -7]);
  const groupY = useTransform(sy, [-1, 1], [4, -4]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { innerWidth, innerHeight } = window;
      mx.set((e.clientX / innerWidth) * 2 - 1);
      my.set((e.clientY / innerHeight) * 2 - 1);
    },
    [mx, my]
  );

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative h-screen overflow-hidden"
    >
      {/* Bottom layer - Simon (slightly overscaled so parallax never shows edges) */}
      <motion.div
        style={{ filter: soloFilter, x: soloX, y: soloY }}
        className="absolute -inset-4"
      >
        <Image
          src="/simon-bg-fade.webp"
          alt="Simon Kertonegoro"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Top layer - the party photo, fading out on scroll */}
      <motion.div
        style={{ opacity: groupOpacity, x: groupX, y: groupY }}
        className="absolute -inset-4"
      >
        <Image
          src="/hero-group.webp"
          alt="Simon Kertonegoro with friends"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Bottom gradient into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep to-transparent" />

      {/* Name (persistent) + scroll cue */}
      <div className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6">
        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/70">
          Founder · Engineer · Builder
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          Simon Kertonegoro
        </h1>
        <motion.div
          style={{ opacity: cueOpacity }}
          className="mt-8 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-white/70 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
