import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
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

// The headline title, reused for the document title and social-share cards.
const DEFAULT_TITLE = `${SITE_NAME} — open-source BYOK multi-model AI workspace`;

// Root metadata, inherited by every page (and overridden where a page sets its
// own). `metadataBase` lets child pages use relative URLs for canonical/OG; the
// `title.template` appends the brand to each child page's own title. Every URL
// flows from SITE_URL (lib/site.ts), so the custom-domain swap is one constant.
// See ADR-0012.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
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
