# Learn by building this

This project is a **working AI app** *and* a **learning resource**. If you want to understand how real software is built — and how AI agents work — using **Claude Code** in the desktop app, you can follow this repo step by step, even with zero background.

**The core idea:** you don't memorize commands. You learn the *why*, and let Claude do the mechanics (git, the terminal, the boilerplate). You drive; the AI handles the plumbing.

## Fastest start
Drop the repo's **[`ONBOARDING.md`](../../ONBOARDING.md)** into Claude Code — or a claude.ai chat — and it becomes your step-by-step mentor.

## The learning path
The lessons follow the **real build, in order** — each in plain English with analogies, written for zero background. We're filling them in to catch up with what's already built (✅ = written; the rest are on the way). **New here? Start at 0.**

- **0 · [Zero — before Foundations](00-zero-before-foundations.md)** ✅ — the *why*: where AI is going (AGI/ASI), why learning it matters, the leverage of building software, and why everyone should build one small product themselves with Claude Code + chat. (Nearly free — you only pay for AI usage.)
- **1 · [The big picture](01-the-big-picture.md)** ✅ — software & AI in plain terms, the way you'd name a car's core parts — what software *is*, what AI *is*, no tech jargon yet.
- **2 · [The AI side](02-the-ai-side.md)** ✅ — what an AI model is, what an *agent* is, why an *aggregator*, comparing models, bring-your-own-key (BYOK), and AI censorship & uncensored models.
- **3 · [Foundations](03-foundations.md)** ✅ — the concrete pieces: what's a server, frontend vs. backend, "the cloud," databases vs. file storage, an API, hosting, git.
- **4 · [Building it properly](04-building-it-properly.md)** ✅ — the spec-first, fully-traceable process (PRD → spec → ADR → PR → deploy), Conventional Commits, and the AI-driven-pipeline north star. Why we don't cut corners.
- **5 · [Git & GitHub](05-git-and-github.md)** ✅ — version control, commits, branches, pull requests, and building in the open.
- **6 · Shipping it** — the deploy pipeline: local → staging → production, CI/CD, and environments. *(coming)*
- **7 · Sign-in & databases** — signing in with Google, what a database really does (Drizzle + Neon), and keeping staging and production data separate. *(coming)*
- **8 · How the app looks** — the design system: design tokens, light/dark themes, and fonts. *(coming)*
- **9 · Keeping your keys safe** — BYOK + encryption: how a secret is stored so even a database leak can't read it. *(coming)*
- **10 · Working across chats** — handoffs and continuity, so important context never lives only in a chat. *(coming)*
- **11 · [Build it yourself](../../ONBOARDING.md)** ✅ — a guided walkthrough from empty folder → deployed app with Claude Code.

> **Writing or improving a lesson?** Follow the **[writing style guide](WRITING-GUIDE.md)** — keep it very simple, lead with everyday analogies, and never go too technical (depth is what the AI tutor is for).

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
