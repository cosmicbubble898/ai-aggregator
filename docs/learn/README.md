# Learn by building this

This project is a **working AI app** *and* a **learning resource**. If you want to understand how real software is built — and how AI agents work — using **Claude Code** in the desktop app, you can follow this repo step by step, even with zero background.

**The core idea:** you don't memorize commands. You learn the *why*, and let Claude do the mechanics (git, the terminal, the boilerplate). You drive; the AI handles the plumbing.

## Fastest start
Drop the repo's **[`ONBOARDING.md`](../../ONBOARDING.md)** into Claude Code — or a claude.ai chat — and it becomes your step-by-step mentor.

## The learning path
1. **[Foundations](01-foundations.md)** ✅ — the absolute basics, in plain English with analogies: what's a server, frontend vs. backend, "the cloud," databases vs. file storage, hosting, git.
2. **The AI side** — what an AI model is, what an *agent* is, why an *aggregator*, comparing models, AI censorship & uncensored models, bring-your-own-key (BYOK). *(planned)*
3. **Build it yourself** — a guided walkthrough from empty folder → deployed app with Claude Code. See **[`ONBOARDING.md`](../../ONBOARDING.md)**.

## The repo *is* the lesson
This project is fully documented, so its own files teach the real story — not toy examples:

| Read this | To learn |
|---|---|
| [`docs/prd/phase-1.md`](../prd/phase-1.md) | **what** we're building and **why** — a real product spec |
| [`docs/adr/`](../adr) | **why each technology** was chosen (Architecture Decision Records) |
| [`docs/architecture.md`](../architecture.md) | **how the pieces fit together** |
| [`docs/session-log/`](../session-log) | the **build diary**, session by session |
| [`docs/runbook.md`](../runbook.md) | how to **run and deploy** it |

## Working across many chats (handoffs)
Long AI chats slow down and start forgetting earlier details — so don't rely on one forever. When a chat gets long: write a short **handoff** (use [`../session-log/_TEMPLATE.md`](../session-log/_TEMPLATE.md)), start a fresh chat, and give it the handoff **+ this repo**. The golden rule: **no important context lives only in a chat** — it lives in the repo and in Claude's memory. *(A full lesson is coming.)*
