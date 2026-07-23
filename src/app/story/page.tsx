import type { Metadata } from "next";
import Link from "next/link";
import StoryArticle from "@/components/StoryArticle";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Story - Simon Kertonegoro",
  description:
    "From teaching myself to code at 11, to VP of Marketing during Enjin's $20M to $4B run, to losing everything, to building TrustPager solo with Claude Code: 1.7 million lines, 20 businesses live.",
  alternates: { canonical: "/story" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/story`,
    title: "My Story - Simon Kertonegoro",
    description:
      "From teaching myself to code at 11, to VP of Marketing during Enjin's $20M to $4B run, to building TrustPager solo with Claude Code.",
    images: ["/og.jpg"],
  },
};

export default function StoryPage() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <span aria-hidden>←</span> Back to the timeline
        </Link>
      </div>
      <article className="mx-auto max-w-3xl px-6 pb-32 pt-14">
        <h1 className="sr-only">My Story - Simon Kertonegoro</h1>
        <StoryArticle />
      </article>
    </main>
  );
}
