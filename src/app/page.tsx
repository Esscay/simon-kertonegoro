import ContactSection from "@/components/ContactSection";
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
      <ContactSection />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-muted">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href="https://www.linkedin.com/in/esscay/"
            className="text-accent-2 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Esscay"
            className="text-accent-2 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://trustpager.com"
            className="text-accent-2 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            TrustPager
          </a>
          <a
            href="https://finalpiece.ai"
            className="text-accent-2 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            FinalPiece AI
          </a>
        </nav>
        <p className="mt-4">
          © {new Date().getFullYear()} Simon Kertonegoro
        </p>
      </footer>
    </main>
  );
}
