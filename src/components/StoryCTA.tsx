"use client";

import { useState } from "react";
import StoryOverlay from "@/components/StoryOverlay";

/** Bottom call-out bar: looks like a CTA, opens the My Story overlay. */
export default function StoryCTA() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section className="relative pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="conic-border shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1">
          <a
            href="/story"
            aria-label="Read my story"
            onClick={(e) => {
              e.preventDefault();
              setStoryOpen(true);
            }}
            className="group relative block cursor-pointer rounded-[calc(1.5rem-1px)] bg-surface/95 px-8 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-16"
          >
            <header className="flex items-center justify-center gap-5 sm:gap-8">
              <span
                aria-hidden
                className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent to-accent-1/60"
              />
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-accent-1/80 shadow-[0_0_8px_var(--glow-1)]"
              />
              <h2 className="pb-2 -mb-2 font-display text-3xl sm:text-4xl font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent drop-shadow-[0_0_24px_var(--glow-2-soft)]">
                About Me
              </h2>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rotate-45 bg-accent-2/80 shadow-[0_0_8px_var(--glow-2)]"
              />
              <span
                aria-hidden
                className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent to-accent-2/60"
              />
            </header>

            <p className="mt-3 text-xs tracking-[0.35em] uppercase text-muted">
              Read My Story
            </p>
          </a>
        </div>
      </div>

      <StoryOverlay open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
  );
}
