import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import SmoothScroll from "@/components/SmoothScroll";

// Same family as FinalPiece AI (finalpiece.ai): Geist everywhere,
// weight does the display/body differentiation
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simonkertonegoro.com"),
  title: "Simon Kertonegoro - Full-Stack Developer · Project Manager",
  description:
    "Founder of FinalPiece AI and sole developer of TrustPager CRM. A timeline of the products I've built.",
  openGraph: {
    title: "Simon Kertonegoro - Full-Stack Developer · Project Manager",
    description:
      "Founder of FinalPiece AI and sole developer of TrustPager CRM. A timeline of the products I've built.",
    images: ["/og.jpg"],
  },
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
        <SmoothScroll />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
