/**
 * ─── TIMELINE DATA ────────────────────────────────────────────────────────────
 * This file IS the timeline. To add a project: copy any entry, edit, done.
 * To reorder: move entries up/down - the page renders them in array order.
 * Every field except `highlights`, `link` and `accent` is required.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import {
  recommendationsFor,
  type Recommendation,
} from "@/data/recommendations";

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
  /** main paragraph (the card shows only the first two sentences) */
  description: string;
  /** optional bullet points shown in the detail panel */
  highlights?: string[];
  /** optional "By the numbers" stat tiles shown in the detail panel */
  facts?: { value: string; label: string }[];
  /** long-form content for the slide-out detail panel: as many sections as you like */
  sections?: { heading: string; body: string }[];
  /** small pills shown in the detail panel */
  tags: string[];
  /** optional external link */
  link?: { label: string; href: string };
  /** optional CSS color for this entry's node + glow (defaults to gold) */
  accent?: string;
  /** set true to keep the entry in this file but off the page */
  hidden?: boolean;
  /** optional embedded video at the top of the detail panel (Vimeo player URL) */
  video?: string;
  /** optional LinkedIn recommendations shown at the bottom of the panel */
  recommendations?: Recommendation[];
  /**
   * Branding for the card + detail panel. When present, the card renders as
   * a light "ad" for the platform: its logo, its colors, white background.
   * Without it, the card keeps the site's dark glass style.
   */
  brand?: {
    /** logo image path (put files in public/logos/) */
    logo: string;
    /** brand accent color: CTA, tagline, glows */
    accent: string;
    /** card/panel background (default white) */
    background?: string;
    /** heading text color on that background (default near-black) */
    foreground?: string;
    /** body text color (default slate) */
    muted?: string;
  };
};

export const projects: Project[] = [
  {
    id: "trustpager",
    title: "TrustPager",
    tagline: "I built a multi-tenant CRM and AI automation platform by myself",
    period: "2025 - Present",
    role: "Founder & Sole Developer",
    description:
      "Twenty Australian businesses run their whole operation on it daily. Every line built by one person, with AI agents as first-class operators.",
    highlights: [
      "Multi-tenant security: row-level security policies, Postgres functions and secure views, layered with frontend permission gates",
      "Permissions that govern AI as well as people: 813 MCP tools and 919 API endpoints under one scope system",
      "Deep integrations: Stripe, PayPal, Zoom, Xero, Google, Facebook, WhatsApp",
      "Infrastructure across Supabase, Cloudflare and Fly.io",
    ],
    facts: [
      { value: "312", label: "Database tables" },
      { value: "191", label: "Edge functions" },
      { value: "1,258", label: "React components" },
      { value: "340", label: "Pages" },
      { value: "44+", label: "Automation actions" },
      { value: "7", label: "Industry blueprints" },
      { value: "$129/mo", label: "Replaces ~20 subscriptions" },
      { value: "14 months", label: "First commit to 20 businesses" },
      { value: "0", label: "Investors or outside engineers" },
    ],
    sections: [
      {
        heading: "The core insight",
        body: "Small business owners can't afford twenty subscriptions, and they burn out learning twenty platforms. But the real discovery is what happens when every system shares one dataset: the team works better, the systems compose, and AI agents stop being chatbots and become genuinely capable operators. Aligned data is what makes AI unstoppable.",
      },
      {
        heading: "The hardest problem",
        body: "A secure multi-tenant ecosystem spanning over a million lines of code, with permission systems that flow between people and AI agents. Row-level security policies, Postgres functions and secure views enforce the boundary at the data layer, with UX gates layered on top so that if you can't see something, you don't even know it exists.",
      },
      {
        heading: "The decision that changed everything",
        body: "Building the platform's public API early, so AI agents could drive and test the platform themselves. Development speed doubled overnight: the same surface that serves customers became the surface the AI builds against.",
      },
      {
        heading: "How one person ships this",
        body: "Ingrained workflows handle testing, building and deploying automatically, with AI directed under constant supervision and clear context. Issues get fixed forward, never rolled back. The one thing never delegated: every database change is shipped by hand. The schema is the backbone of the entire infrastructure, and keeping hands on it keeps the whole stack in memory.",
      },
      {
        heading: "What clients actually use",
        body: "The automations do the work: they let owners leverage their knowledge, reduce their stress and scale their impact. They're only powerful because they're tightly integrated with everything else, bookings, documents, SMS and email. And the scope is deliberate: TrustPager converts leads into clients and serves them brilliantly, and stops short of top-of-funnel marketing.",
      },
    ],
    tags: ["TypeScript", "Postgres", "React", "Supabase", "Cloudflare", "Fly.io", "AI Agents"],
    link: { label: "trustpager.com", href: "https://trustpager.com" },
    video:
      "https://player.vimeo.com/video/1180343011?badge=0&title=0&byline=0&portrait=0",
    recommendations: recommendationsFor("trustpager"),
    brand: {
      logo: "/logos/trustpager.webp",
      accent: "#21b6e4",
    },
  },
  {
    id: "finalpiece",
    title: "FinalPiece AI",
    tagline: "A team of two. Building websites, CRMs, and AI automations.",
    period: "2024 - Present",
    role: "Founder & Lead Developer",
    description:
      "Two people delivering what agencies staff whole teams for. Websites, CRM builds, voice agents and automations, shipped in weeks.",
    highlights: [
      "Websites built in Astro: fast, SEO-strong, launched wired into bookings, forms and on-page AI voice agents",
      "Every engagement uses TrustPager end to end, from scoping to invoicing",
      "Clients get an advisor on business and AI, not just software",
    ],
    facts: [
      { value: "1 week", label: "Proposal to prototype" },
      { value: "~1 month", label: "To production" },
      { value: "2", label: "Headcount" },
      { value: "20+", label: "Businesses transformed" },
      { value: "23", label: "Websites launched" },
      { value: "7", label: "Industries served" },
      { value: "$30K → $30K/qtr", label: "Bootstrap to revenue" },
    ],
    sections: [
      {
        heading: "The engagement",
        body: "Scope, build, launch: Astro websites engineered for SEO and load speed, designed to be among the best in the client's industry, and launched with the whole ecosystem wired in, booking systems, forms, even AI voice agents embedded directly in the page. One connected ecosystem is what makes a few-thousand-dollar website punch like an enterprise build.",
      },
      {
        heading: "The flywheel",
        body: "FinalPiece needed a platform to run on, so it runs on TrustPager, every day, for real clients. That dogfooding loop is inherent bug testing, product research and roadmap all at once: the service makes the platform stronger, and the platform makes the service scalable.",
      },
    ],
    tags: [
      "AI Implementation",
      "AI Training",
      "Web Design",
      "CRM Development",
      "AI Agent Development",
      "Automation Development",
    ],
    link: { label: "finalpiece.ai", href: "https://finalpiece.ai" },
    recommendations: recommendationsFor("finalpiece"),
    brand: {
      logo: "/logos/finalpiece.webp",
      accent: "#8b5cf6",
    },
  },
  {
    id: "into-the-multiverse",
    hidden: true,
    title: "Into the Multiverse",
    tagline: "A full 3D play-to-earn game, live in the browser",
    period: "2023 - 2024",
    role: "Founder & Lead Developer",
    description:
      "A Unity WebGL endless runner served from a Next.js site: no install, no friction, playable in seconds. Players earn NFTs by playing and use them right back in the game.",
    highlights: [
      "Built the entire web platform solo in Next.js; co-produced the game with my cofounder",
      "Squeezed a performant 3D game into a browser tab: load time, frame rate and hosting all solved",
      "Cross-game currency (Crests) usable across multiple titles",
      "Still live today, run by my cofounder",
    ],
    facts: [
      { value: "Unity WebGL", label: "Game engine" },
      { value: "Next.js", label: "Web platform" },
      { value: "2", label: "Person team" },
      { value: "Live", label: "Still running today" },
    ],
    sections: [
      {
        heading: "The build",
        body: "The hardest problem was making a 3D endless runner that was genuinely fun, robust AND performant enough to load smoothly inside a website, then solving the hosting to serve it. Advanced controls, epic abilities, parkour timing, and a full narrative (Aurora's Rift), all running in the browser with nothing to install.",
      },
      {
        heading: "The earn loop",
        body: "Play-to-earn done properly: playing the game earns NFTs, and those NFTs have utility inside the game itself. Crests, the multiverse currency, carried value across games, an early experiment in the interoperable-asset thesis that ran through everything we built.",
      },
    ],
    tags: ["Unity", "WebGL", "Next.js", "Web3 Gaming", "Game Production"],
    link: { label: "play2earn.club", href: "https://play2earn.club" },
    video:
      "https://player.vimeo.com/video/996763277?badge=0&title=0&byline=0&portrait=0",
    brand: {
      logo: "/logos/intothemultiverselogo.webp",
      accent: "#c07f10",
    },
  },
  {
    id: "infinity-realms",
    title: "Infinity Realms",
    tagline: "An open-world MMO, built by a team of nine",
    period: "2022 - 2023",
    role: "Founder & Project Manager",
    description:
      "An open-world MMO built on Unity, where players journey across medieval, steampunk and cyberpunk worlds with one inventory. Hundreds of players and a real NFT economy on Enjin, with a nine-person team directed end to end.",
    highlights: [
      "Directed a team of 9 game designers and developers",
      "Full NFT economy: earn in-game, buy externally, use everywhere",
      "Player real estate with in-game businesses, from hotels to workshops",
      "Cross-theme gear: a cyberpunk hero walking through medieval fantasy",
    ],
    facts: [
      { value: "9", label: "Team directed" },
      { value: "100s", label: "Active players" },
      { value: "3+", label: "Themed worlds" },
      { value: "Unity", label: "Engine" },
    ],
    sections: [
      {
        heading: "The multiverse MMO",
        body: "Players travel between thematic worlds, mixing gear, weapons and clothing across them, backed by a player-driven economy where real estate plots host player-run businesses. Every asset was an Enjin NFT: earnable in play, tradeable outside the game, usable everywhere.",
      },
      {
        heading: "What it taught me about scale",
        body: "Multi-tenant game servers are brutally hard, and MMO code fights you at every level of scale, that's ultimately what made it unmaintainable. The honest lesson: web platforms scale in ways game code never will. I'm a better platform engineer today because I earned that lesson the hardest way possible.",
      },
    ],
    tags: ["Unity", "C#", "MMO", "Enjin", "Team Leadership"],
    link: {
      label: "enjin.io/ecosystem/infinity-realms",
      href: "https://enjin.io/ecosystem/infinity-realms/",
    },
    video: "https://www.youtube.com/embed/cYRaI8bgSPI",
    brand: {
      logo: "/logos/InfinityRealmsLogo.avif",
      accent: "#3bd1e2",
      background: "#0e2530",
      foreground: "#ffffff",
      muted: "#9fc3cd",
    },
  },
  {
    id: "infinity-auto",
    title: "Infinity Auto",
    tagline: "The world's first blockchain GTA 5 server",
    period: "2021 - 2023",
    role: "Founder & Project Manager",
    description:
      "The world's first blockchain GTA 5 server: NFTs as drivable cars, weapons and gear, earned in play and truly owned. Around 500 players and one of the tightest communities in Web3 gaming.",
    highlights: [
      "~500 players and a fiercely loyal community",
      "NFTs with real utility: cars you drive, weapons you fire",
      "Covered by VentureBeat, Cointelegraph and the Web3 gaming press",
    ],
    facts: [
      { value: "1st", label: "Blockchain GTA 5 server" },
      { value: "~500", label: "Players" },
      { value: "Lua + C#", label: "Server scripting" },
    ],
    sections: [
      {
        heading: "The world first",
        body: "A FiveM server where blockchain assets became playable objects: buy or earn an NFT and it appears in the game as a rare vehicle or weapon. The MetaHome collection that ran through it was the first minted on Polkadot's Efinity, and the launch was covered from VentureBeat to Cointelegraph.",
      },
      {
        heading: "How it ended",
        body: "FiveM banned NFTs and sent a cease and desist, killing the game at its peak with a thriving community. The lesson stuck: platform risk is existential when you build on someone else's rails. It's a big part of why everything I build now runs on infrastructure I control.",
      },
    ],
    tags: ["FiveM", "Lua", "C#", "Enjin", "Community"],
    link: {
      label: "enjin.io/ecosystem/infinity-auto",
      href: "https://enjin.io/ecosystem/infinity-auto-grand-theft-auto/",
    },
    video:
      "https://player.vimeo.com/video/933465115?badge=0&title=0&byline=0&portrait=0",
    brand: {
      logo: "/logos/InfinityAutoLogo.avif",
      accent: "#fb2e6e",
      background: "#1a1220",
      foreground: "#ffffff",
      muted: "#b5a3bd",
    },
  },
  {
    id: "infinity-minecraft",
    title: "Infinity Minecraft",
    tagline: "The world's first blockchain Minecraft server",
    period: "2021 - 2022",
    role: "Founder & Project Manager",
    description:
      "The world's first blockchain Minecraft server (Survival Infinity), with the deepest NFT integration any game has shipped. Players minted land plots as NFTs, built on them, and sold the deed, and the buyer owned everything on it.",
    highlights: [
      "Full NFT real estate: mint a plot, build on it, sell the deed",
      "Dynamic NFTs saving location, size and value on-chain",
      "NFT art galleries inside Minecraft, giving collections real utility",
      "Engineered in Java against Enjin's ERC-1155 stack",
    ],
    facts: [
      { value: "1st", label: "Blockchain Minecraft server" },
      { value: "Java", label: "Plugin stack" },
      { value: "Full", label: "NFT real-estate system" },
    ],
    sections: [
      {
        heading: "The deepest integration in gaming",
        body: "Items, rewards, land, art: everything could be earned, owned and traded as NFTs. The real-estate system was the crown jewel: players created tokenized land plots, customized and upgraded them, then sold them on open exchanges, with dynamic NFTs recording location, size and value on-chain. Nothing close has shipped in any game since.",
      },
      {
        heading: "How it ended",
        body: "Mojang banned NFTs across Minecraft and the game had to close. Same lesson as Infinity Auto, learned twice so it would never be learned again: own your rails.",
      },
    ],
    tags: ["Minecraft", "Java", "Enjin", "NFT Systems"],
    link: {
      label: "enjin.io/ecosystem/survival-infinity",
      href: "https://enjin.io/ecosystem/survival-infinity-minecraft/",
    },
    video:
      "https://player.vimeo.com/video/933467492?badge=0&title=0&byline=0&portrait=0",
    brand: {
      logo: "/logos/SurvivalInfinityLogo.avif",
      accent: "#8bd93b",
      background: "#16211a",
      foreground: "#ffffff",
      muted: "#a3bfa9",
    },
  },
  {
    id: "mymetaverse",
    hidden: true,
    title: "MyMetaverse",
    tagline: "One platform powering NFTs across four games",
    period: "2020 - 2023",
    role: "Founder & Project Manager",
    description:
      "The platform behind the world-firsts: one NFT integration layer powering ownership and rewards across Minecraft, GTA 5, an MMO and the web. Built to scale on Kubernetes, speaking Rust, Java, C#, Lua and TypeScript across its games.",
    highlights: [
      "One integration, many games: ownership flowed from the platform into every title",
      "A central NFT reward engine scaled play-to-earn across the whole network",
      "MetaHome: the first NFT collection minted on Polkadot's Efinity",
      "Kubernetes orchestration with five languages across the stack",
    ],
    facts: [
      { value: "4", label: "Games powered" },
      { value: "1st", label: "NFT collection on Efinity" },
      { value: "K8s", label: "Platform orchestration" },
      { value: "5", label: "Languages across the stack" },
    ],
    sections: [
      {
        heading: "The platform play",
        body: "Instead of integrating NFTs into each game separately, MyMetaverse WAS the integration: one super-complex, powerful layer through which asset ownership and rewards flowed into every connected game. That's how a small team shipped blockchain integrations across Minecraft, GTA 5, an MMO and a browser game, by building the integration once, as a product.",
      },
      {
        heading: "The thread to everything since",
        body: "MyMetaverse was my first platform company: multi-game, multi-language, Kubernetes-scaled, press-covered from Cointelegraph to VentureBeat. Two of its games were killed by other companies' policy changes. Both lessons, platforms compound and rails must be owned, are the DNA of TrustPager.",
      },
    ],
    tags: ["Kubernetes", "Rust", "TypeScript", "Platform Engineering", "Web3"],
    video: "https://www.youtube.com/embed/h6x01TJwv80",
    brand: {
      logo: "/logos/MyMeteaverseLogo.png",
      accent: "#1c8a94",
    },
  },
  {
    id: "enjin",
    title: "Enjin",
    tagline: "From intern to VP during a $20M to $4B run",
    period: "2017 - 2021",
    role: "VP of Marketing",
    description:
      "Joined the blockchain gaming company at 32 as a glorified social media intern, when it was valued at $20M. Six months later I was VP of Marketing, and I helped scale it into a $4B Web3 gaming powerhouse.",
    highlights: [
      "Hundreds of PR placements, with the pitches written and the journalist relationships built personally",
      "Partnerships with Microsoft, Samsung and BMW",
      "Enjin Wallet grown past 4 million users",
      "Led the pivot to carbon-neutral operations during the NFT sustainability crisis",
    ],
    facts: [
      { value: "$20M → $4B", label: "Valuation during tenure" },
      { value: "6 months", label: "Intern to VP" },
      { value: "4 million", label: "Wallet users" },
      { value: "100s", label: "PR placements" },
      { value: "3", label: "Tech-giant partnerships" },
      { value: "1st", label: "NFT minting platform in the world" },
    ],
    sections: [
      {
        heading: "How intern to VP happens",
        body: "By seeing what needs to be done, learning how to do it, and iterating until it's done well. PR needed doing, so I learned to conceptualise newsworthy initiatives, write the pitches and build the journalist relationships myself. Those placements compounded into partnerships with Microsoft, Samsung and BMW, and helped drive the Enjin Wallet past 4 million users.",
      },
      {
        heading: "Building category firsts",
        body: "I pioneered two platforms that defined Web3 gaming's future. The Mint Shop was the world's first NFT minting platform, opening blockchain gaming to mainstream audiences by simplifying how digital assets get created and acquired. The Multiverse enabled NFTs to be used across multiple games, a groundbreaking concept that captured massive media attention and established Enjin as the leader in interoperable gaming assets.",
      },
      {
        heading: "The crisis pivot",
        body: "When the NFT sustainability backlash hit the industry, I led Enjin's strategic pivot to carbon-neutral operations, turning an industry-wide crisis into a competitive advantage that reinforced market confidence.",
      },
      {
        heading: "The lesson that became a thesis",
        body: "I left at the top, and after I left, the company lost its momentum. Individuals leave. Systems compound. That lesson became the thesis of everything I've built since.",
      },
    ],
    tags: [
      "Marketing",
      "PR",
      "Partnerships",
      "Community",
      "Web3 Gaming",
      "GraphQL",
      "ERC-1155",
      "Ethereum",
      "Efinity (Polkadot)",
      "Unity SDK",
    ],
    video: "https://www.youtube.com/embed/17-1c4mOIrk",
    recommendations: recommendationsFor("enjin"),
    link: { label: "enjin.io", href: "https://enjin.io" },
    brand: {
      logo: "/logos/enjin.webp",
      accent: "#7866d5",
    },
  },
];
