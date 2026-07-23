/**
 * ─── RECOMMENDATIONS ──────────────────────────────────────────────────────────
 * Real LinkedIn recommendations, hand-copied (LinkedIn has no embed API).
 * Shown in the carousel above The Work (click -> opens the Enjin story) and
 * in full at the bottom of the Enjin panel (click -> LinkedIn profile).
 * Avatars are saved locally in public/recommendations/ because LinkedIn CDN
 * URLs expire. Array order = display order.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export type Recommendation = {
  name: string;
  title: string;
  /** e.g. "Managed Simon directly" */
  relationship: string;
  quote: string;
  avatar: string;
  linkedin: string;
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
  },
  {
    name: "Ilija Rolovic",
    title: "Chief Marketing Officer at Enjin",
    relationship: "Managed Simon directly",
    quote:
      "I've worked with Simon for several years on multiple web3 projects. He's one of the most competent, creative, and hard-working colleagues I've ever had. He's ready to listen, challenge ideas, and collaborate closely, yet he's equally capable of leading the charge. Simon isn't afraid, he's driven, to make bold bets and explore novel ideas. If you're reading this and considering Simon as a potential business partner or team member, take my advice: hop on a chat with him. It'll take you about 10 minutes to see exactly what I mean.",
    avatar: "/recommendations/ilija.jpg",
    linkedin: "https://www.linkedin.com/in/ilijarolovic/",
  },
  {
    name: "Micael Gallegos",
    title: "Social Media Manager at Enjin",
    relationship: "Reported to Simon directly",
    quote:
      "I am honored to recommend Simon Kertonegoro, an extraordinary leader and visionary in the Web3 space. I had the privilege of working closely with Simon during my time at Enjin, where his mentorship profoundly shaped my professional journey.\n\nSimon exemplifies the power of hard work and passion. His ability to lead teams, inspire innovation, and tackle challenges with enthusiasm has left a lasting impression on me. He possesses an innate ability to simplify complex ideas, making him an exceptional educator and motivator.\n\nNow, with seven years of experience in Web3, I can confidently say that Simon's guidance laid the foundation for my career. He continues to be an inspiration, and I am grateful for the opportunity to have worked under his leadership.\n\nSimon is a phenomenal professional and mentor. I wholeheartedly recommend him for any endeavor.",
    avatar: "/recommendations/micael.jpg",
    linkedin: "https://www.linkedin.com/in/micael-gallegos-02637a92/",
  },
];
