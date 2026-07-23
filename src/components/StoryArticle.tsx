import React from "react";
import { stats } from "@/data/stats";

/**
 * The My Story content - single source of truth, rendered in two places:
 *  - the full-screen StoryOverlay (which passes a motion-animated Block)
 *  - the crawlable /story page (plain semantic HTML for SEO + AI systems)
 */

type BlockTag = "header" | "p" | "blockquote" | "div";

export type BlockComponent = React.ComponentType<{
  as?: BlockTag;
  className?: string;
  children: React.ReactNode;
}>;

const DefaultBlock: BlockComponent = ({ as = "div", className, children }) => {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
};

/** Inline stat chip used within story paragraphs */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-block rounded-md border border-white/15 bg-white/[0.06] px-2 py-0.5 font-display text-[15px] font-semibold text-accent-1">
      {children}
    </span>
  );
}

export default function StoryArticle({
  Block = DefaultBlock,
}: {
  Block?: BlockComponent;
}) {
  return (
    <>
      <Block as="header">
        <p className="text-xs tracking-[0.35em] uppercase text-muted">
          My story
        </p>
        <h2 className="mt-6 font-display text-3xl sm:text-5xl font-bold leading-tight text-white">
          I&apos;ve always believed{" "}
          <span className="bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent">
            art
          </span>{" "}
          is the most beautiful contribution people can make to this world.
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
      </Block>

      <Block as="p" className="mt-16 text-[17px] leading-relaxed text-foreground/80">
        I taught myself to code at 11, treating every website like a canvas. I
        learned to scale at Enjin, joining as a social media intern and leaving
        as VP of Marketing after helping grow it from <Chip>$20M</Chip> to{" "}
        <Chip>$4B</Chip>. Then I learned what the climb couldn&apos;t teach me:
        I built my own startup and lost everything. The fortune, the house, the
        confidence. Understanding the science of success means nothing until
        you&apos;ve mastered the art of your own humanity.
      </Block>

      <Block as="p" className="mt-8 text-[17px] leading-relaxed text-foreground/80">
        That&apos;s the lesson underneath everything I build now.
      </Block>

      <Block as="blockquote" className="my-16">
        <p className="font-display text-3xl sm:text-4xl font-bold leading-snug text-white">
          Build systems that compound, and even your worst days move you
          forward.
        </p>
      </Block>

      <Block
        as="p"
        className="font-display text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent pb-2"
      >
        So now I build systems.
      </Block>

      <Block as="p" className="mt-16 text-[17px] leading-relaxed text-foreground/80">
        Since May 2025, working solo with Claude Code, I&apos;ve built
        TrustPager: a complete Business Operating System for Australian service
        businesses. Bootstrapped from <Chip>$30,000</Chip> and now produces{" "}
        <Chip>$30,000 per quarter</Chip> with minimal ongoing effort. As a solo
        developer I shipped more code than 25 developers would deploy in a
        year... equivalent to <Chip>$3M AUD</Chip> in dev team salary.
      </Block>

      {/* Stats strip */}
      <Block
        as="div"
        className="my-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
      >
        <p className="text-center text-xs tracking-[0.35em] uppercase text-muted">
          The Results
        </p>
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-y-8">
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
      </Block>

      <Block as="p" className="text-[17px] leading-relaxed text-foreground/80">
        AI is the ultimate science, but it needs the art of humanity to matter.
        TrustPager proved what I can do alone. The next thing I want to prove
        is what I can do inside a great team.
      </Block>

      <Block as="div" className="mt-20">
        <p className="font-display text-3xl sm:text-4xl font-bold leading-snug text-white">
          Science is how we build.
        </p>
        <p className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-snug bg-gradient-to-r from-accent-1 via-cream to-accent-2 bg-clip-text text-transparent pb-2">
          Art is why we do it together.
        </p>
      </Block>
    </>
  );
}
