# ADR-0012 — SEO & GEO (search + AI-engine discoverability) as a standing practice

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-05-24 |
| **Spec** | [seo-geo](../specs/seo-geo.md) |

## Context

This project is a **public learning resource** (the repo *is* the course). Its value depends on people *finding* it — both via **search engines** and, increasingly, via **AI engines** (ChatGPT / Perplexity / Claude) that answer questions and cite sources. An audit (2026-05-23, via the `searchfit-seo` agents) scored us Technical **45** · On-page **70** · **GEO 10** · Backlinking **30**: no sitemap/robots/canonical/Open Graph/structured data/`llms.txt`, and lesson pages shipped the wrong meta description.

The strategic read (all three agents agreed): the **product** space ("open-source ChatGPT alternative / BYOK / self-hosted chat") is a red ocean owned by giants — a 0-star solo project can't out-rank them head-on. The **winnable wedge** is the **learning / build-along** angle plus **GEO citations** and **niche directory listings**: be the cited source for "what is BYOK", "model vs agent", "build a real AI app with Claude Code".

## Decision

1. **Treat SEO + GEO as a standing, first-class concern** — not a one-off. New public routes ship discoverable by default (see the AGENTS golden rule).
2. **One URL source of truth** — `lib/site.ts` (`SITE_URL` from `NEXT_PUBLIC_SITE_URL`). Every canonical/sitemap/OG/JSON-LD URL derives from it, so moving to a custom domain is a **one-line change**.
3. **Next-native technical SEO** — root `metadataBase` + title template + canonical + Open Graph; `sitemap.ts`, `robots.ts`, `manifest.ts`, an OG image; per-lesson descriptions; `/dashboard` noindex; static-prerendered `/` and `/learn`.
4. **GEO** — `llms.txt`, JSON-LD (`SoftwareApplication`/`Organization`/`WebSite`/`Course`/`Article`/`FAQPage`/`BreadcrumbList`), answer-first lesson lead sentences, and FAQ blocks — so engines can extract clean answers. **Explicitly allow AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended): we *want* the citations.
5. **Learning-first positioning** — lead the homepage + README with "build this yourself with Claude Code, and learn full-stack while you do", product as the proof. *(A UX/positioning call owned by the human — design-first.)*
6. **Get a custom domain** (owner) and make it live **before** any off-page/backlink work, so link equity isn't split between the Vercel URL and the domain. Build now behind `SITE_URL`.
7. **Phasing:** PR1 = technical SEO + GEO + on-page + these standing docs. Follow-ups = content (lessons 6–10 + explainers), off-page (directories/awesome-lists), and the domain swap.

## Consequences

**Positive**
- The site becomes findable (search) and citable (AI engines); GEO especially should move sharply off its `10` floor.
- The custom-domain migration is a one-constant change with no scattered edits.
- A standing rule (in `AGENTS.md` + the `docs-reviewer` checklist) keeps future routes SEO/GEO-ready, and re-running the `searchfit-seo` auditor is the monitoring loop.

**Negative / trade-offs**
- `llms.txt` is currently **low-yield** for ranking and some bots ignore it. We ship it anyway (cheap, on-brand for an AI-built/AI-documented app, retrieved by Perplexity, valuable to the dev-tool learner audience) — but we don't over-expect ranking from it.
- Ongoing discipline cost: every new public route must ship metadata + canonical + sitemap entry (and content routes + `llms.txt`/JSON-LD).
- Content (the real growth driver) and off-page listings are **manual follow-ups**, not solved by this PR.
- Building behind the Vercel URL means a later domain swap step (mitigated by the single-constant design + a 301 + canonical pointing at the domain).
