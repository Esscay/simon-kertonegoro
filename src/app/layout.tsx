import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL, SITE_TITLE, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

// Same family as FinalPiece AI (finalpiece.ai): Geist everywhere,
// weight does the display/body differentiation
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Simon Kertonegoro",
    "Full-Stack Developer",
    "Project Manager",
    "TrustPager",
    "FinalPiece AI",
    "AI-native development",
    "Claude Code",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
};

/** JSON-LD Person schema: grounds "Simon Kertonegoro" as an entity for
 *  search engines and AI systems, linked to corroborating profiles. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Simon Kertonegoro",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  jobTitle: "Full-Stack Developer & Project Manager",
  description: SITE_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    name: "FinalPiece AI",
    url: "https://finalpiece.ai",
  },
  sameAs: [
    "https://www.linkedin.com/in/esscay/",
    "https://github.com/Esscay",
    "https://trustpager.com",
    "https://finalpiece.ai",
  ],
  knowsAbout: [
    "Full-stack development",
    "TypeScript",
    "Postgres",
    "React",
    "AI agents",
    "MCP (Model Context Protocol)",
    "CRM platforms",
    "Project management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
