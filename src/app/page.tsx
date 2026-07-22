import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Timeline />
      <footer className="border-t border-white/10 py-10 text-center text-sm text-muted">
        <p>
          © {new Date().getFullYear()} Simon Kertonegoro ·{" "}
          <a
            href="https://finalpiece.ai"
            className="text-neon-cyan hover:text-white transition-colors"
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
