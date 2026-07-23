"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { recommendations, type Recommendation } from "@/data/recommendations";
import { projects, type Project } from "@/data/projects";
import ProjectPanel from "@/components/ProjectPanel";
import { plainQuote } from "@/components/QuoteText";

/**
 * Embla carousel of recommendations, shown above The Work. Seamless
 * infinite loop; slides are sized to exact thirds (halves on tablet) so
 * no card ever sits clipped at the edge. Clicking a card opens the story
 * of the project the recommendation belongs to.
 */
export default function RecommendationsCarousel() {
  const [active, setActive] = useState<Project | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const openFor = (rec: Recommendation) =>
    setActive(projects.find((p) => p.id === rec.projectIds[0]) ?? null);

  return (
    <section className="relative pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.35em] uppercase text-muted">
            What my colleagues say
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous recommendations"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent-1/60 hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next recommendations"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent-1/60 hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        {/* padding inside the clip region gives hovering cards room to
            rise (top) and cast their shadow (bottom) without clipping */}
        <div className="mt-4 overflow-hidden pt-4 pb-8" ref={emblaRef}>
          {/* negative margin + per-slide padding = exact gutters that
              divide evenly, so a full card always lands on the edge */}
          <div className="flex touch-pan-y -ml-4">
            {recommendations.map((rec) => (
              <div
                key={rec.name}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
              >
                <a
                  href={`/work/${rec.projectIds[0]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openFor(rec);
                  }}
                  className="group block h-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-[0_10px_50px_-12px_var(--glow-1-soft)]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={rec.avatar}
                      alt={rec.name}
                      width={44}
                      height={44}
                      className="rounded-full border border-white/15"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {rec.name}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {rec.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75 line-clamp-3">
                    <span className="text-accent-1" aria-hidden>
                      &ldquo;
                    </span>
                    {plainQuote(rec.quote)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-accent-2 transition-colors group-hover:text-white">
                    Read the full story
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProjectPanel
        project={active}
        side="right"
        onClose={() => setActive(null)}
      />
    </section>
  );
}
