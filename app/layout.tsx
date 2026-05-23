import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Free, open-licensed look-alikes for Claude's proprietary fonts (see ADR-0009).
// next/font self-hosts each one and exposes it as a CSS variable that the design
// tokens in globals.css then reference (--font-serif, --font-sans, --font-mono).
const serif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const sans = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Aggregator",
  description:
    "Open-source BYOK multi-model AI aggregator — chat, image, and video generation from a single interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
