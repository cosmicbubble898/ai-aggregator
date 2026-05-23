import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// robots.txt — tells crawlers what they may fetch. We allow the public site and
// block private/utility paths. Crucially, we EXPLICITLY welcome the major AI
// crawlers: this is a public learning resource, and we WANT to be read and cited
// in AI answers (GEO). Listing them by name makes that intent unmistakable.
// See ADR-0012.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training crawler
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic crawler
  "anthropic-ai", // Anthropic (legacy UA)
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google Gemini / AI Overviews opt-in
];

// Paths that should never be indexed: the signed-in app, API routes, settings.
const DISALLOW = ["/dashboard", "/api/", "/settings"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
