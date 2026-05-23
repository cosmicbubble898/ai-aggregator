# 0011. Render the repo's markdown lessons in-app (SSG + react-markdown)

- **Status:** Accepted
- **Date:** 2026-05-23

## Context
Teaching how the app is built is a core mission, so the learning lessons (in `docs/learn/`) should appear **inside the app**, not only on GitHub ([spec](../specs/in-app-learn.md)). The hard requirement: **no duplicated content** — the GitHub copy and the in-app copy must be the *same* source, or they'll drift.

## Decision
- **Single source of truth:** the in-app Learn pages render the **same `docs/learn/*.md` files**. Lessons are authored once, as markdown in the repo; the app reads those exact files.
- **Statically generated at build:** `generateStaticParams` + `dynamicParams = false` pre-render one page per lesson at `next build`. The markdown is read with `node:fs` **at build time** (when the whole repo is present) and baked into static HTML — so nothing reads the filesystem at runtime (which avoids serverless file-tracing pitfalls) and pages are fast.
- **Markdown → HTML with `react-markdown` + `remark-gfm`:** renders to real React elements (no `dangerouslySetInnerHTML`, so no injection risk), and `remark-gfm` handles the tables/strikethrough the lessons use. Styled with plain-CSS design tokens (a `.prose` CSS Module), consistent with [ADR-0007](0007-stack-next16-plain-css.md) (plain CSS) and [ADR-0009](0009-claude-inspired-design-system.md) (the design system).
- **In-lesson links are rewritten** at render: a sibling lesson (`NN-slug.md`) → its `/learn/<slug>` route; any other repo file → its GitHub page; external links open in a new tab. So the same markdown reads correctly both on GitHub and in the app.

## Consequences
- **Pro:** the lessons can never drift between GitHub and the app; the section is fast (static) and safe (no raw HTML injection).
- **Cost:** two new dependencies (`react-markdown`, `remark-gfm`).
- Lessons must stay self-consistent as markdown (they already pass the docs-reviewer gate). Links to non-lesson repo docs leave the app (to GitHub) — acceptable.
- Only **written** lessons render; "coming" lessons simply have no file yet.
- A future enhancement could add search or progress; out of scope now.

Relates to [ADR-0007](0007-stack-next16-plain-css.md), [ADR-0009](0009-claude-inspired-design-system.md), and the [in-app Learn spec](../specs/in-app-learn.md).
