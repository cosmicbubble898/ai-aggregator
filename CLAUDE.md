# AI Aggregator — Claude Code guide

**Current phase:** Live & public, CI green. **Shipped to production:** Google sign-in; design system + landing; in-app `/learn` (lessons 0–5); public `docs/vision.md`; **SEO + GEO (ADR-0012, PR #13)** + process hygiene (PR #14: `docs/deferred.md` + recorded review gates) + docs-consistency/R2-reframe (PR #16) — the SEO re-audit now scores **GEO 80** (was 10). **Now BUILDING the core CHAT feature** (MVP = **BYOK + text chat + transient vision**). **Data model = a normalized per-message "message tree"** (ChatGPT/Claude parent-pointer branching in Vercel's table style; ADR-0013) — **Phase 1 built + code-reviewed clean on branch `feat/chat`** (`chat`+`message` tables, flexible `settings` bag, per-message metrics, transient-vision attachments; **migration NOT yet run**). Approved build plan: `~/.claude/plans/what-is-the-next-twinkly-shamir.md` (Phases 0–5; build on the **Vercel AI SDK**; prompt-caching default-on; the "smart" layers — summarize/RAG/memory — are an additive roadmap, not built now). **In flight:** **BYOK keys (P0-2), PR #11 (ADR-0010)** — rebased clean but **NOT merged**; needs `ENCRYPTION_KEY` in Vercel + the prod `provider_key` migration — **the gate for chat to call models.** **Governance (locked):** UI = freely reversible; **data model = one-way door, always gated (propose→approve→ADR)**; capability/relay layer = ONE consistent "power-strip" pattern. **Next:** Phase 0 (BYOK go-live, owner) → Phase 2 (chat backend on `feat/chat`, honoring the spec's write-path contract). Decisions: custom domain before backlinks; learning-first positioning. (Read `docs/session-log/SESSION-2026-05-25.md` for full context.)

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
