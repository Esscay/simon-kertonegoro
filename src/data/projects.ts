/**
 * ─── TIMELINE DATA ────────────────────────────────────────────────────────────
 * This file IS the timeline. To add a project: copy any entry, edit, done.
 * To reorder: move entries up/down - the page renders them in array order.
 * Every field except `highlights`, `link` and `accent` is required.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Project = {
  /** unique slug, used as the React key */
  id: string;
  /** big card title */
  title: string;
  /** one-liner under the title */
  tagline: string;
  /** e.g. "2024 - Present" (shown on the timeline spine) */
  period: string;
  /** your role on the project */
  role: string;
  /** main paragraph */
  description: string;
  /** optional bullet points revealed when the card is expanded */
  highlights?: string[];
  /** small pills at the bottom of the card */
  tags: string[];
  /** optional external link */
  link?: { label: string; href: string };
  /** optional CSS color for this entry's node + glow (defaults to amber) */
  accent?: string;
};

export const projects: Project[] = [
  {
    id: "trustpager",
    title: "TrustPager CRM",
    tagline: "The AI-native business operating system",
    period: "2024 - Present",
    role: "Founder & Sole Developer",
    description:
      "A full-scale CRM and business operating platform built end-to-end by one person: pipelines, automations, e-signing, invoicing, voice agents, email, SMS, scheduling, client portals and a public API and all of it designed so AI agents are first-class operators of the platform, not an afterthought.",
    highlights: [
      "100+ MCP tools exposing the entire platform to AI agents",
      "Automation engine with triggers, branching and AI actions",
      "Voice agents, e-signing, invoicing and client portals built in",
      "Single developer, production platform with live paying clients",
    ],
    tags: ["React", "TypeScript", "Supabase", "Postgres", "Edge Functions", "AI Agents"],
    link: { label: "trustpager.com", href: "https://trustpager.com" },
  },
  {
    id: "finalpiece",
    title: "FinalPiece AI",
    tagline: "AI-powered business transformation agency",
    period: "2023 - Present",
    role: "Founder & CEO",
    description:
      "The company behind TrustPager. FinalPiece designs and ships AI-driven operations for small businesses: CRM builds, websites, voice agents and automations. Fulfilment that used to take an agency team, delivered by one founder and a fleet of AI agents.",
    tags: ["AI Strategy", "Automation", "Fulfilment", "Agency"],
    link: { label: "finalpiece.ai", href: "https://finalpiece.ai" },
  },
  {
    id: "placeholder-1",
    title: "Your Next Project",
    tagline: "Replace me in src/data/projects.ts",
    period: "20XX",
    role: "Your role",
    description:
      "Copy this block, edit the fields, and it appears on the timeline. Drag entries up or down in the array to reorder the page.",
    tags: ["Edit me"],
  },
];
