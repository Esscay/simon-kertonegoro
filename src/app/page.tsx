import Hero from "@/components/Hero";
import RecommendationsCarousel from "@/components/RecommendationsCarousel";
import Stats from "@/components/Stats";
import StoryCTA from "@/components/StoryCTA";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <RecommendationsCarousel />
      <Timeline />
      <StoryCTA />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} Simon Kertonegoro ·{" "}
          <a
            href="https://finalpiece.ai"
            className="text-accent-2 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            FinalPiece AI
          </a>
        </p>
      </footer>
    </main>
  );
}
