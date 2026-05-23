# AI Aggregator — Claude Code guide

**Current phase:** Live & public on GitHub, CI green, Vercel pipeline proven. **Shipped to production:** Google sign-in (P0-1); the **Claude-inspired design system + landing page** (ADR-0009; PR #9); and an **in-app `/learn` section + lessons 0–5** of the learning curriculum (single-sourced from `docs/learn/*.md`, ADR-0011; PR #12) with a `WRITING-GUIDE.md`; and a public **`docs/vision.md`** (expanded vision + the deliberate **serverless-first ceiling**: defer VM/realtime/enterprise infra until real MRR + stability). **In flight:** **BYOK keys (P0-2)** built in **PR #11** (ADR-0010) — not yet in prod (needs `ENCRYPTION_KEY` in Vercel + the prod `provider_key` migration + a rebase onto `main` to drop now-merged lesson/doc overlap). **IN PROGRESS — SEO + GEO (PR1, branch `feat/seo-geo`):** foundation committed (`lib/site.ts` single URL source + `docs/specs/seo-geo.md` + **ADR-0012**); **next = technical plumbing** (root metadata, the lesson meta-description fix, sitemap/robots[allow AI crawlers]/manifest, `/dashboard` noindex, static landing, `llms.txt`, JSON-LD), then the **design-gated** UI parts (homepage learning-first reframe, FAQ, pillar intro) with owner sign-off. Plan: `C:\Users\samar\.claude\plans\thanks-so-ive-installed-atomic-hammock.md`; use the **`searchfit-seo`** agents (re-audit after shipping). Decisions: **buy a custom domain** (before backlinks), **learning-first positioning**. (Read the latest `docs/session-log/SESSION-2026-05-24.md` for full context.)

## Context imports

@AGENTS.md
@docs/project-brief.md
@docs/architecture.md
@docs/prd/phase-1.md

## Session continuity

Every session ends by updating `docs/session-log/SESSION-<date>.md`. Every session starts by reading the most recent session log + this file. The repo is the source of truth — no context should live only in a session.

### Session start protocol

1. Open the session **in this project folder** (`ai-aggregator/`) — not the parent directory — so `CLAUDE.md` and `docs/session-log/` are unambiguous (the parent has the old `chat-saas` reference repo too).
2. Run **`/ai-start`** (slash command at `.claude/commands/ai-start.md`). *(Named `ai-start`, not `start` — `/start` is taken by the productivity plugin.)* It runs the prompt below; you can also just **paste it manually**, which is the foolproof, can't-collide option:

> Read this project's CLAUDE.md, then read the most recent file in docs/session-log/ (the highest-dated SESSION-*.md). Confirm you understand: (a) the project's current phase, (b) what the last session accomplished, (c) what's next. Then ask me what we're working on today before doing anything else.

## Specialist subagents (optional delegation)

This project defines specialist subagents in `.claude/agents/`. They are **available helpers, not a mandate** — delegate to one when it genuinely helps (parallel work, isolated review, focused expertise); the main session may also do the work directly when staying in one context is better.

- **code-reviewer** (read-only) — invoke proactively after writing/modifying code and **before any commit**.
- **docs-reviewer** (read-only) — reviews documentation & learning content for accuracy + beginner clarity. **Run it before committing or pushing any learning content** (`docs/learn/**`, README, `ONBOARDING.md`) — a wrong lesson mis-teaches, so the bar is higher than for code.
- **backend-agent** — server-side: API routes, server actions, Auth.js, Drizzle/Neon, R2, env & integrations.
- **frontend-agent** — client UI: components, pages/layouts, state, forms, CSS, accessibility.
- **devops-agent** — deploy config, CI/CD, env/secrets, platform setup (Vercel/Neon/R2).

Routing is soft-enforced only (a prompt contract, not a hard boundary), so there is no rigid "never execute directly" rule for now — revisit if the codebase grows. When delegating to multiple agents, prefer running non-overlapping ones in parallel.

---

**Session-end:** Before ending any session, Claude Code must offer to update the session log (`docs/session-log/SESSION-<date>.md`).
