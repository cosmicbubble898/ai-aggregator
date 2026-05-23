# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Project scaffolded: Next.js 16.2.6, TypeScript, App Router, ESLint.
- Documentation & open-source framework: PRD (`docs/prd/phase-1.md`), architecture overview, ADRs, runbook, spec template.
- Repo conventions: `AGENTS.md` agent rules, `CONTRIBUTING.md`, Conventional Commits, MIT `LICENSE`.
- CI (typecheck + lint + build) and PR/issue templates.
- Project brief (`docs/project-brief.md`) — standalone overview for brainstorming.
- Specialist subagents in `.claude/agents/` (code-reviewer, backend, frontend, devops) as available helpers, with a soft delegation note in `CLAUDE.md`.
- Session continuity system: `docs/session-log/` (logs + template + README) and `CLAUDE.md` updates (context imports, current phase, session start/end protocol).
- Learning-first mission declared up front (README + AGENTS.md) + a `docs/learn/` learning-path index — the repo doubles as an open-source learning resource.
- `docs/learn/01-foundations.md` — beginner foundations lesson (hardware/software, local vs cloud, server, frontend/backend, database vs file storage, API, hosting, git) with analogies, mapped to this project.
- `docs-reviewer` agent + a review gate: learning/docs content gets an independent accuracy/clarity review before commit/push. Applied it to `01-foundations.md` (clearer cloud-access framing, defined "serverless," tightened the restaurant/kitchen analogy).
- `/ai-start` slash command (`.claude/commands/ai-start.md`) + a project-scoped session-start protocol in `CLAUDE.md` — one-word session resume (read CLAUDE.md + latest session log, then ask before acting). Named `ai-start` (not `start`) to avoid colliding with the productivity plugin's `/start`.
- `ONBOARDING.md` — guided-build companion at the repo root: a beginner opens it in Claude Code (or a claude.ai chat) to go from empty folder to deployed app (tutor-in-chat vs. builder-in-Claude-Code, why-first golden rules, a doc map, the phased build journey, and the chat-handoff/continuity lesson). Passed the docs-reviewer gate; linked from README + `docs/learn/`.
- **Live deployment:** connected the repo to **Vercel** — production auto-deploys from `main` (https://ai-aggregator-sandy.vercel.app), and every branch/PR gets an automatic **preview** deploy. Proves the local → preview/staging → production pipeline.
- Plain-text **landing page** placeholder — an "AI Aggregator" heading, two intro paragraphs, and an inert "Sign in with Google" button (wired to Google OAuth in the auth feature). Replaces the Next.js starter homepage; no design yet.
- Planning for **Google auth**: feature spec (`docs/specs/auth.md`) + **ADR-0008** (independent staging environment with its own database — reverses the PRD's deferred "separate dev/prod data" non-goal). Passed the docs-reviewer gate.
- **Google sign-in (auth) — P0-1, shipped.** Auth.js v5 + Google OAuth, backed by Neon Postgres via the Drizzle adapter; real Sign in / Sign out on the landing page + a protected `/dashboard`. Live on **production** (https://ai-aggregator-sandy.vercel.app), verified end to end; staging + production run on **separate Neon databases** (ADR-0008).
- `AGENTS.md` — added a **"How we build: human + AI"** section documenting the human↔AI partnership and division of labor (human = product/systems/UX thinker; Claude = builder + technical thinker; propose schemas for review first).
- **Design system (Claude-inspired)** — plain-CSS design tokens in `app/globals.css`: a pixel-matched warm palette with a clay accent (light + dark, dark via `prefers-color-scheme`), a type scale, 4px spacing rhythm, and corner radii. Fonts swapped to free, open-licensed look-alikes self-hosted via `next/font` — **Newsreader** (serif), **Hanken Grotesk** (sans), **JetBrains Mono** (mono). Documented in `docs/design-system.md` + **ADR-0009**; no UI/layout built yet (the design-first gate before any user-visible UI).
- **Learning curriculum** — beginner lessons in `docs/learn/` (0 Zero → 1 The big picture → 2 The AI side → 3 Foundations → 4 Building it properly → 5 Git & GitHub), the locked curriculum index, and a **`WRITING-GUIDE.md`** style guide (the "learning system": very simple, analogy-led, never too technical). Each lesson passed the docs-reviewer gate.
- **In-app Learn section** — a public **`/learn`** index + per-lesson pages that render the same `docs/learn/*.md` files in the design system (single source of truth), statically generated at build via `react-markdown`; in-lesson links rewritten to work in-app; a **Learn** button added to the landing nav. Spec: `docs/specs/in-app-learn.md`; decision: **ADR-0011**.
