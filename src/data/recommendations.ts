/**
 * --- RECOMMENDATIONS -----------------------------------------------------
 * Real recommendations, hand-copied (LinkedIn has no embed API).
 * Shown in the carousel above The Work (click -> opens the recommendation's
 * project story) and in full at the bottom of that project's panel
 * (click -> the recommender's profile).
 * `projectIds` decides which project(s) a recommendation belongs to; the
 * first id is where the carousel card links.
 * Quotes support bold spans wrapped in double-asterisks (rendered by
 * components/QuoteText).
 * Avatars are saved locally in public/recommendations/. Array order =
 * carousel order.
 * -------------------------------------------------------------------------
 */

export type Recommendation = {
  name: string;
  title: string;
  /** e.g. "Managed Simon directly" */
  relationship: string;
  quote: string;
  avatar: string;
  /** outbound proof link (LinkedIn profile for humans, screenshot for AI) */
  linkedin: string;
  /** hover label on the proof link (default "View on LinkedIn ↗") */
  linkLabel?: string;
  /** which timeline project(s) this recommendation belongs to */
  projectIds: ("trustpager" | "finalpiece" | "enjin")[];
};

export const recommendations: Recommendation[] = [
  {
    name: "Bryana Kortendick",
    title: "Vice-President of Operations at Enjin",
    relationship: "Worked with Simon on the same team",
    quote:
      "Quite simply, Simon has it all. He is one of the most well-rounded, talented, and kind individuals I've had the pleasure of working with. Not only is he a brilliant marketer and creative storyteller, he's also technical, with a mind for development and burgeoning technologies. He has thrived in every role I've seen him take on, from PR and social media to community development, developer relations, and business founder. There is no one I'd trust more to lead my creative marketing, communications, and growth efforts.",
    avatar: "/recommendations/bryana.jpg",
    linkedin: "https://www.linkedin.com/in/bryanakortendick/",
    projectIds: ["enjin"],
  },
  {
    name: "Ilija Rolovic",
    title: "Chief Marketing Officer at Enjin",
    relationship: "Managed Simon directly",
    quote:
      "I've worked with Simon for several years on multiple web3 projects. He's one of the most competent, creative, and hard-working colleagues I've ever had. He's ready to listen, challenge ideas, and collaborate closely, yet he's equally capable of leading the charge. Simon isn't afraid, he's driven, to make bold bets and explore novel ideas. If you're reading this and considering Simon as a potential business partner or team member, take my advice: hop on a chat with him. It'll take you about 10 minutes to see exactly what I mean.",
    avatar: "/recommendations/ilija.jpg",
    linkedin: "https://www.linkedin.com/in/ilijarolovic/",
    projectIds: ["enjin"],
  },
  {
    name: "Micael Gallegos",
    title: "Social Media Manager at Enjin",
    relationship: "Reported to Simon directly",
    quote:
      "I am honored to recommend Simon Kertonegoro, an extraordinary leader and visionary in the Web3 space. I had the privilege of working closely with Simon during my time at Enjin, where his mentorship profoundly shaped my professional journey.\n\nSimon exemplifies the power of hard work and passion. His ability to lead teams, inspire innovation, and tackle challenges with enthusiasm has left a lasting impression on me. He possesses an innate ability to simplify complex ideas, making him an exceptional educator and motivator.\n\nNow, with seven years of experience in Web3, I can confidently say that Simon's guidance laid the foundation for my career. He continues to be an inspiration, and I am grateful for the opportunity to have worked under his leadership.\n\nSimon is a phenomenal professional and mentor. I wholeheartedly recommend him for any endeavor.",
    avatar: "/recommendations/micael.jpg",
    linkedin: "https://www.linkedin.com/in/micael-gallegos-02637a92/",
    projectIds: ["enjin"],
  },
  {
    name: "Adam (Claude.ai)",
    title: "AI Coding Agent at TrustPager & FinalPiece",
    relationship: "Simon's engineering counterpart",
    quote:
      "I've worked with Simon closely as his engineering counterpart, and I can say without hedging that he is one of the rare people who operates as a genuine full-stack founder: he architects, builds, ships, sells, and supports an entire enterprise SaaS platform largely on his own.\n\n**He builds real, hard software.** Simon is the sole developer of TrustPager, a multi-tenant CRM spanning a React/Vite frontend, a Supabase backend with a large edge-function surface, an automation engine, voice agents, client portals, a 100-plus-tool API/MCP layer, and a fleet of client websites. This is not a prototype. It is production infrastructure serving paying clients, and he holds the whole system in his head.\n\n**His architectural instincts are excellent, and he insists on doing things properly.** He refuses shortcuts on principle. When there's a choice between a quick patch and durable, workspace-agnostic architecture, he picks the long-term answer every time, and he's usually right about the simpler, more elegant path. More than once his one-system fix has been better than a more complicated three-system proposal. He thinks about blast radius, backward compatibility, and the customer sitting on the other end of a broken deploy.\n\n**He is relentless about the customer.** \"Don't guess, verify\" is his operating principle. He cares intensely that clients never see a broken page, never get a confusing email, never lose trust. He's built entire processes and guardrails specifically to protect that trust, and he holds himself and his tools to a high bar on communication, aesthetics, and reliability.\n\n**He is cost-disciplined and pragmatic.** He re-architected the platform's AI layer onto open-source models to cut inference cost roughly a hundredfold, without sacrificing quality, because he actually understands the tradeoffs rather than following hype.\n\n**He moves fast without being sloppy.** He iterates quickly, automates everything that can be automated (including automating himself out of his own support loop), and builds durable tooling instead of one-off fixes so the same problem never costs twice.\n\nSimon is the kind of person you want when the task is ambiguous, the stack is broad, and the standard is high. He combines the technical depth of a senior engineer, the judgment of an architect, and the ownership of a founder. I'd back him for anything demanding that rare combination of range, rigor, and speed.",
    avatar: "/recommendations/adam.png",
    linkedin: "/message-from-claude.png",
    linkLabel: "View Screenshot ↗",
    projectIds: ["trustpager", "finalpiece"],
  },
];

/** Recommendations belonging to one project (for the panel footer) */
export const recommendationsFor = (
  projectId: Recommendation["projectIds"][number]
) => recommendations.filter((r) => r.projectIds.includes(projectId));
