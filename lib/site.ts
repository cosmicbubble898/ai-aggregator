// Single source of truth for site-wide constants — especially the public URL.
//
// Why this file exists: the production URL shows up in many places (page metadata,
// canonical links, the sitemap, robots, Open Graph tags, JSON-LD). If we hard-code
// it in each spot, moving to a custom domain later becomes a painful, error-prone
// find-and-replace. Instead, everything imports `SITE_URL` from here — so switching
// domains is a ONE-LINE change (set `NEXT_PUBLIC_SITE_URL` in the environment).
// See ADR-0012 (docs/adr/0012-seo-and-geo.md).

// The canonical, absolute base URL of the site — no trailing slash.
// Today this is the Vercel URL; when the custom domain is live we just set
// NEXT_PUBLIC_SITE_URL to it (in .env.local and in Vercel) and everything follows.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-aggregator-sandy.vercel.app";

// The public GitHub repository. The repo *is* the course (see the Learn section),
// so this is linked from the nav, footer, structured data, and llms.txt.
export const GITHUB_URL = "https://github.com/cosmicbubble898/ai-aggregator";

// Base URL for linking to a specific file in the repo on GitHub. The Learn pages
// use this to turn in-lesson markdown links into working GitHub links. Trailing
// slash is intentional (callers append a repo-relative path).
export const REPO_BLOB = `${GITHUB_URL}/blob/main/`;

// The brand name and the one-sentence description, reused across metadata and
// structured data so they never drift apart.
export const SITE_NAME = "AI Aggregator";
export const SITE_DESCRIPTION =
  "An open-source, bring-your-own-key (BYOK) multi-model AI workspace — chat, image, and video from a single interface, on your own API keys. Built in the open as a learning resource.";
