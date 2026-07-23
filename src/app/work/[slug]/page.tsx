import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";
import QuoteText from "@/components/QuoteText";

/**
 * Crawlable, deep-linkable page per project. The homepage keeps its
 * drawer UX; these routes exist so search engines and AI systems can
 * read (and quote) the full project content.
 */

const visible = () => projects.filter((p) => !p.hidden);

export function generateStaticParams() {
  return visible().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = visible().find((p) => p.id === slug);
  if (!project) return {};
  const title = `${project.title} - Simon Kertonegoro`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/${project.id}`,
      title,
      description: project.description,
      images: ["/og.jpg"],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = visible().find((p) => p.id === slug);
  if (!project) notFound();

  const accent = project.brand?.accent ?? "var(--accent-1)";

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
        <header>
          {project.brand && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.brand.logo}
              alt={`${project.title} logo`}
              className="mb-6 h-10 w-auto max-w-full rounded bg-white/90 object-contain object-left p-1"
            />
          )}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
            {project.title}
          </h1>
          <p
            className="mt-3 text-lg font-semibold"
            style={{ color: accent }}
          >
            {project.tagline}
          </p>
          <p className="mt-3 text-xs tracking-[0.25em] uppercase text-muted">
            {project.role} · {project.period}
          </p>
        </header>

        <p className="mt-10 text-[17px] leading-relaxed text-foreground/85">
          {project.description}
        </p>

        {project.video && (
          <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
            <div className="relative aspect-video">
              <iframe
                src={project.video}
                title={`${project.title} video`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {project.facts && (
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p
                  className="font-display text-xl sm:text-2xl font-bold whitespace-nowrap"
                  style={{ color: accent }}
                >
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] tracking-[0.08em] uppercase text-muted">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {project.highlights && (
          <ul className="mt-10 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] text-foreground/80">
                <span style={{ color: accent }} aria-hidden>
                  ◆
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {project.sections?.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-white">
              {section.heading}
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-foreground/75">
              {section.body}
            </p>
          </section>
        ))}

        {project.recommendations && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-white">
              Recommendations
            </h2>
            <div className="mt-5 space-y-4">
              {project.recommendations.map((rec) => (
                <a
                  key={rec.name}
                  href={rec.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-white/25"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rec.avatar}
                      alt={rec.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full border border-white/15 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {rec.name}
                      </p>
                      <p className="text-xs text-muted">
                        {rec.title} · {rec.relationship}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    <QuoteText text={rec.quote} />
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <p className="mt-10">
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
              style={{ background: accent }}
            >
              Visit {project.link.label}
              <span aria-hidden>↗</span>
            </a>
          </p>
        )}
      </article>
    </main>
  );
}
