# AI Aggregator — Claude Code guide

**Current phase:** Live & public, CI green, Vercel pipeline proven. **Shipped to production:** Google sign-in (P0-1); design system + landing (ADR-0009, PR #9); in-app `/learn` + lessons 0–5 (ADR-0011, PR #12); public `docs/vision.md` (serverless-first ceiling); and **SEO + GEO PR1 (ADR-0012, PR #13)** — root metadata, the lesson meta-description fix, sitemap/robots (welcomes AI crawlers)/manifest, branded `icon.svg` + generated OG card, `/dashboard` noindex, `/llms.txt`, JSON-LD — all behind `lib/site.ts` (one-line custom-domain swap). Plus **process hygiene (PR #14): `docs/deferred.md`** (central parked-work registry) + review gates now recorded in the PR/spec templates. A full **system audit** (process/architecture/vision) ran 2026-05-24: architecture healthy, **BYOK crypto sound**, vision strong; the one real gap was that **code-review was honor-system** (now a recorded step; AI-reviewer-in-CI is deferred). **In flight:** **BYOK keys (P0-2), PR #11 (ADR-0010)** — NOT merged; needs `ENCRYPTION_KEY` in Vercel + the prod `provider_key` migration + a rebase onto `main`. **Decision — soft-launch MVP = BYOK + text chat + *transient* vision** (vision without storing the image server-side; defer image/video generation until a media-storage strategy). **R2 framing** reversed: "more-open-for-BYOK + cheaper egress", not AUP-dodging. Decisions: custom domain before backlinks; learning-first positioning. (Read `docs/session-log/SESSION-2026-05-24.md` — esp. the **Session 2** update — for full context.)

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
