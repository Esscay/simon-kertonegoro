"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import StoryArticle, { type BlockComponent } from "@/components/StoryArticle";

/**
 * Full-screen story reader, opened from the Track Record panel and the
 * About Me bar. Content comes from StoryArticle (shared with the
 * crawlable /story page); this overlay adds the scroll container,
 * reading-progress bar and per-block reveal animations.
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

  // Per-block scroll reveal, scoped to this overlay's scroll container
  const MotionBlock: BlockComponent = ({ as = "div", className, children }) => {
    const Tag = motion[as];
    return (
      <Tag
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ root: scrollRef, once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </Tag>
    );
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
      <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain">
        <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <StoryArticle Block={MotionBlock} />
        </article>
      </div>
    </motion.div>,
    document.body
  );
}
