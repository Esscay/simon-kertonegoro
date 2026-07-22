"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { stats, type Stat } from "@/data/stats";

/** Proof strip: numbers count up when scrolled into view. Data: src/data/stats.ts */
export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Counter key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

function Counter({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="text-center"
    >
      <p className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-r from-neon-pink via-white to-neon-cyan bg-clip-text text-transparent">
        <motion.span>{rounded}</motion.span>
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs sm:text-sm tracking-[0.2em] uppercase text-muted">
        {stat.label}
      </p>
    </motion.div>
  );
}
