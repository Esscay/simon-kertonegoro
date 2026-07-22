"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

/**
 * Simple layered hero, no pinned scroll:
 *  - Bottom layer: simon-bg-fade - Simon with the room feathering into
 *    transparency, page background showing through.
 *  - Top layer: the party photo (identical frame), fading out over the
 *    first ~600px of scroll. Then the page flows on organically.
 */
export default function Hero() {
  const { scrollY } = useScroll();

  const groupOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Simon sharpens slightly as the party fades
  const sharpen = useTransform(scrollY, [0, 600], [0, 1]);
  const saturate = useTransform(sharpen, [0, 1], [1, 1.15]);
  const contrast = useTransform(sharpen, [0, 1], [1, 1.08]);
  const soloFilter = useMotionTemplate`saturate(${saturate}) contrast(${contrast})`;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Ambient site-theme glow, revealed as the photo fades */}
      <div className="absolute inset-0 bg-deep">
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marble/30 blur-[140px]" />
        <div className="absolute left-[15%] bottom-[10%] h-[40vh] w-[30vw] rounded-full bg-neon-pink/10 blur-[120px]" />
        <div className="absolute right-[15%] top-[15%] h-[40vh] w-[30vw] rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      {/* Bottom layer - Simon */}
      <motion.div style={{ filter: soloFilter }} className="absolute inset-0">
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
      <motion.div style={{ opacity: groupOpacity }} className="absolute inset-0">
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

      {/* Name + scroll cue */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6"
      >
        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/70">
          Founder · Engineer · Builder
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          Simon Kertonegoro
        </h1>
        <div className="mt-8 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[11px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-8 w-px bg-gradient-to-b from-white/70 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
