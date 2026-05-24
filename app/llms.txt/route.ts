import { SITE_URL, SITE_NAME, GITHUB_URL, SITE_DESCRIPTION } from "@/lib/site";
import { getLessons } from "@/lib/lessons";

// /llms.txt — a plain-text guide for AI engines (ChatGPT, Perplexity, Claude, …)
// describing what this project is and pointing at its best content. Following the
// emerging llms.txt convention (llmstxt.org): an H1 + a one-line summary, then
// link sections. Generated from lib/site.ts + getLessons() so it never drifts
// from the real site. Answer-first wording makes it easy to quote/cite. See
// ADR-0012. (Honest note: llms.txt is low-yield for ranking today and some bots
// ignore it — but it's cheap, on-brand, and read by some retrieval engines.)
export const dynamic = "force-static";

export async function GET() {
  const lessons = await getLessons();
  const lessonLines = lessons
    .map((l) => `- [${l.title}](${SITE_URL}/learn/${l.slug}): ${l.summary}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} lets you use many AI models — for chat, image generation, and video generation — from one interface, using your own provider API keys (BYOK). It is open-source (MIT) and cloud-hosted, and every user gets a private, isolated workspace with their own history. It is also a public learning resource: the repository is the course, the same lessons appear in the repo and on the site, and the whole thing is built in the open as a human + Claude Code partnership, documented step by step.

## Key links
- Website: ${SITE_URL}
- Learn (free, plain-English lessons): ${SITE_URL}/learn
- Source code (the repository is the course): ${GITHUB_URL}

## Lessons
${lessonLines}

## Key definitions
- BYOK (bring your own key): a model where you connect your own API keys — the secret tokens that bill AI usage to your own provider account — so generation runs on your account, not the app's. The app forwards your request with your key and relays the result; it never resells AI credits, and you keep full control of your spending and access.
- AI aggregator: a single app that connects to many AI models and providers through one interface, so you can use chat, image, and video models in one place instead of juggling separate tools and subscriptions.
- AI agent: an AI system that takes actions to reach a goal — calling tools (like searching the web or running a command) and making decisions across multiple steps — rather than only returning a single response to a single prompt. (A plain chat model answers; an agent acts.)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache at the edge/CDN; content only changes when lessons change (rebuild).
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
