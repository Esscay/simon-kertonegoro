import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/AmbientBackground";
import SmoothScroll from "@/components/SmoothScroll";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simonkertonegoro.com"),
  title: "Simon Kertonegoro - Founder & Builder",
  description:
    "Founder of FinalPiece AI and sole developer of TrustPager CRM. A timeline of the products I've built.",
  openGraph: {
    title: "Simon Kertonegoro - Founder & Builder",
    description:
      "Founder of FinalPiece AI and sole developer of TrustPager CRM. A timeline of the products I've built.",
    images: ["/hero-stylized.webp"],
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
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
