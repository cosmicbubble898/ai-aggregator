# Spec — SEO & GEO (search + AI-engine discoverability)

| | |
|---|---|
| **Status** | In progress |
| **PRD** | [phase-1](../prd/phase-1.md) + the project's "public learning resource" mission ([vision](../vision.md)). SEO/GEO is a **standing, cross-cutting goal**, not a one-off feature. |
| **Branch** | `feat/seo-geo` |
| **Date** | 2026-05-24 |

## Problem

The public content (the landing page + the `/learn` lessons) is good but **nearly invisible** to search engines and AI engines (ChatGPT / Perplexity / Claude): there is no sitemap, robots, canonical, Open Graph, structured data, or `llms.txt`, and lesson pages even ship the **wrong meta description** (they inherit the generic root one). For a public learning resource, being **findable** (search) and **citable** (AI engines) is fundamental. Baseline audit (2026-05-23): Technical 45 · On-page 70 · **GEO 10** · Backlinking 30.

## Scope

- **In (this PR — PR1):**
  - **Single URL source:** `lib/site.ts` (`SITE_URL`, `GITHUB_URL`, `REPO_BLOB`, `SITE_NAME`, `SITE_DESCRIPTION`); `NEXT_PUBLIC_SITE_URL` in `.env.example` + Vercel. Refactor `app/page.tsx` + `app/learn/[slug]/page.tsx` to import it.
  - **Root metadata** (`app/layout.tsx`): `metadataBase`, title template, sharper description, default Open Graph / Twitter, canonical, `robots:{index,follow}`.
  - **Lesson metadata fix** (`app/learn/[slug]/page.tsx`): real per-lesson `description` (from `lesson.meta.summary`), canonical, `openGraph:{type:"article"}`. *(Top ROI — fixes the wrong-description bug.)*
  - **`app/sitemap.ts`**, **`app/robots.ts`** (explicitly **allow AI crawlers** — GPTBot, ClaudeBot, PerplexityBot, Google-Extended), **`app/manifest.ts`** + branded `icon`, **`opengraph-image`** (static default).
  - **`/dashboard` noindex.** **Static landing** (decouple `auth()` so `/` and `/learn` prerender).
  - **GEO:** `app/llms.txt/route.ts` (generated from `lib/site.ts` + `getLessons()`); JSON-LD (`lib/jsonld.ts`) on `/` (`SoftwareApplication` + `Organization`/`WebSite` + `FAQPage`), `/learn` (`Course`), lessons (`Article`/`LearningResource` + `BreadcrumbList`); answer-first lesson lead sentences; FAQ blocks.
  - **On-page:** `/learn` pillar intro; product → lesson concept links; per-page titles/descriptions.
  - **Standing docs:** this spec, **ADR-0012**, an `AGENTS.md` golden rule, a `docs-reviewer` SEO line, `README` live-URL + Learn link, `CHANGELOG`.
- **Out (follow-ups):** lessons 6–10 + blue-ocean explainers (content PR); off-page / directory submissions (mostly manual); the custom-domain swap (one constant, once bought); dynamic per-lesson OG images.

## Design notes

- **One-line domain swap:** every URL flows from `SITE_URL` (`lib/site.ts`). When the domain is bought, set `NEXT_PUBLIC_SITE_URL` + `metadataBase` to it, add it in Vercel, 301 the Vercel URL, keep canonical → the domain, resubmit the sitemap. The domain must be live **before** off-page/backlinks so equity isn't split. → ADR-0012.
- **Next-native:** use Next 16's metadata / `MetadataRoute` APIs (sitemap, robots, manifest) — read `node_modules/next/dist/docs/` for exact shapes before writing.
- **Single-source content stays single-source:** `llms.txt` and JSON-LD are generated from `lib/site.ts` + `getLessons()` so they never drift.
- **Honest note:** `llms.txt` is currently low-yield for ranking and some bots ignore it — ship it (cheap, on-brand, retrieved by Perplexity, useful for the dev-tool learner audience) but don't over-expect ranking.
- **UI/positioning items are the owner's call** (design-first): the homepage learning-first reframe, FAQ blocks, pillar intro, concept links, OG-image styling, and the answer-first lesson edits (the last also goes through the learning-content/`docs-reviewer` gate).

## Acceptance criteria

- [ ] `lib/site.ts` exists; `app/page.tsx` + `app/learn/[slug]/page.tsx` import it; `NEXT_PUBLIC_SITE_URL` in `.env.example`.
- [ ] Root `metadata` has `metadataBase`, title template, description, default OG/Twitter, canonical, `robots:{index,follow}`.
- [ ] Each lesson page emits its **own** description (from its summary) + canonical + `openGraph:{type:"article"}`.
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, the OG image, and the icon all resolve (no 404).
- [ ] `robots` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and disallows `/dashboard`, `/api/`, `/settings`.
- [x] `/dashboard` is `noindex`; `/learn` prerenders statically.
- [ ] **Deferred (owner decision, 2026-05-24):** making `/` prerender statically — it still calls `auth()` at the top level, so it is server-rendered (still fully crawlable; lowest-ROI SEO item). Revisit deliberately later.
- [ ] `/llms.txt` returns a generated `text/plain` summary + lessons + key definitions.
- [ ] JSON-LD present and valid on `/`, `/learn`, and a lesson page.
- [ ] (Design-gated) homepage reframe, FAQ, pillar intro, concept links, answer-first lesson leads — pending owner sign-off.
- [ ] `AGENTS.md` golden rule + `docs-reviewer` SEO line + `README`/`CHANGELOG` updated.

## Test plan

`npm run build` + `npx tsc --noEmit` + `npm run lint` green → view-source meta + JSON-LD on `/`, `/learn`, a lesson → fetch `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` → Open Graph + Google Rich Results validators → Lighthouse SEO ≈ 100 → confirm `/dashboard` noindex → on a preview URL, canonical points to production/domain → **re-run `searchfit-seo:seo-auditor`** (target GEO 10 → high). Post-deploy: submit the sitemap to Search Console; set GitHub About + topics; directory submissions.

## Open questions

- **Custom domain name** — TBD (owner buying). Build now behind `SITE_URL`.
- **How hard to lean into the learning-first homepage reframe** — owner's UX/positioning call.
- Per-lesson dynamic OG images — fast-follow or skip for now?
