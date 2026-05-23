# Spec — In-app Learn section

| | |
|---|---|
| **Status** | In progress |
| **PRD** | [Phase 2+ — in-app Learn](../prd/phase-1.md#10-phasing) (learning mission) |
| **Branch** | `feat/in-app-learn` |
| **Date** | 2026-05-23 |

## Problem
The learning lessons live in `docs/learn/` and are only visible on GitHub. But teaching how the app is built is a **core mission** — so the app itself should surface the lessons. We want them in-app **without duplicating content**: one source, two places (GitHub + the app).

## Scope
- **In:**
  - A **`/learn`** index listing the lessons, and a **`/learn/<slug>`** page per lesson.
  - Each lesson page **renders the same `docs/learn/*.md` file** (single source of truth), styled in the design system.
  - **Statically generated at build** (read the markdown once, bake static HTML — fast, no runtime file reads).
  - A **"Learn"** button in the landing-page nav.
  - **In-lesson link rewriting** so links work in the app: a sibling lesson → its `/learn` route; any other repo file → GitHub; external links open in a new tab.
- **Out:**
  - Editing lessons in the app (they're authored as markdown in the repo).
  - Search, progress tracking, auth (the Learn section is public).
  - The "coming" (unwritten) lessons — only the existing lesson files are rendered.

## Design notes
- **Build-time read** (`lib/lessons.ts`): list `NN-*.md` files in `docs/learn/`, parse the H1 title + opening italic summary; read one by slug. Uses `node:fs`, so it's server-only and runs at build.
- **SSG:** `app/learn/[slug]/page.tsx` uses `generateStaticParams` + `dynamicParams = false` (unknown slugs 404). The route uses no dynamic APIs, so it's fully static.
- **Rendering:** `react-markdown` + `remark-gfm` (tables) — safe (no `dangerouslySetInnerHTML`). Prose styled via `learn.module.css` using design tokens (serif headings, mono code, token spacing). See [ADR-0011](../adr/0011-render-lessons-in-app.md).
- **Single source of truth:** the in-app pages read the very files shown on GitHub, so the two can't drift.

## Acceptance criteria
- [ ] `/learn` lists every written lesson in order; each links to its page.
- [ ] `/learn/<slug>` renders the lesson's markdown styled in the design system (headings, lists, tables, code, links).
- [ ] In-lesson "Next"/cross-links to sibling lessons navigate within `/learn`; other repo links go to GitHub; external links open in a new tab.
- [ ] A **Learn** link appears in the landing nav and routes to `/learn`.
- [ ] Pages are statically generated (no runtime filesystem reads); an unknown `/learn/<slug>` 404s.
- [ ] Editing a `docs/learn/*.md` file changes the in-app page on the next build (single source).

## Test plan
- **Local/preview:** open `/learn`, click into each lesson, confirm styling + that the "Next" link moves between lessons; confirm the nav "Learn" button works; hit a bogus `/learn/xyz` → 404.
- **Production:** same checks on the live URL after merge.

## Open questions
- Later: render the "coming" lessons' placeholders, add search, or surface the curriculum order/numbers more richly. Deferred.
