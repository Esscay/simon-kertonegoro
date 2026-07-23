import { projects } from "@/data/projects";
import { stats } from "@/data/stats";
import { recommendations } from "@/data/recommendations";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt - a plain-markdown summary of this site written for AI systems
 * (see llmstxt.org). Generated from the same data files that render the
 * page, so it can never drift from the visible content.
 */
export function GET() {
  const visible = projects.filter((p) => !p.hidden);

  const statLines = stats
    .map(
      (s) =>
        `- ${s.decimals ? s.value.toFixed(s.decimals) : s.value.toLocaleString()}${s.suffix ?? ""} ${s.label}`
    )
    .join("\n");

  const projectBlocks = visible
    .map((p) => {
      const facts = p.facts
        ? p.facts.map((f) => `  - ${f.value} ${f.label}`).join("\n")
        : "";
      const sections = p.sections
        ? p.sections.map((s) => `  - ${s.heading}: ${s.body}`).join("\n")
        : "";
      return [
        `### ${p.title} (${p.period}) - ${p.role}`,
        ``,
        `${p.tagline}. ${p.description}`,
        facts ? `\nKey numbers:\n${facts}` : "",
        sections ? `\nDetails:\n${sections}` : "",
        p.link ? `\nLink: ${p.link.href}` : "",
        `More: ${SITE_URL}/work/${p.id}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const recBlocks = recommendations
    .map(
      (r) =>
        `- ${r.name} (${r.title}; ${r.relationship.toLowerCase()}): "${r.quote.replace(/\*\*/g, "").replace(/\n+/g, " ")}"`
    )
    .join("\n");

  const body = `# Simon Kertonegoro

> Full-Stack Developer and Project Manager. Founder of FinalPiece AI and sole
> developer of TrustPager, a multi-tenant Business Operating System for
> Australian service businesses, built solo with Claude Code since May 2025.

Canonical site: ${SITE_URL}
LinkedIn: https://www.linkedin.com/in/esscay/
Companies: https://trustpager.com | https://finalpiece.ai

## Code shipped solo (TrustPager, since May 2025)

${statLines}

## Career timeline

${projectBlocks}

## My story

Taught himself to code at 11. Joined Enjin as a social media intern at a $20M
valuation and was VP of Marketing within six months, helping scale it to $4B.
Built his own startup and lost everything, then rebuilt: since May 2025 he has
built TrustPager solo with Claude Code, bootstrapped from $30,000, now
producing $30,000 per quarter. His thesis: build systems that compound.
Full story: ${SITE_URL}/story

## Recommendations (verbatim)

${recBlocks}

## Pages

- ${SITE_URL}/ - portfolio home (interactive timeline)
- ${SITE_URL}/story - the full personal story
${visible.map((p) => `- ${SITE_URL}/work/${p.id} - ${p.title}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
