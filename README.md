# AI Aggregator

A **bring-your-own-key (BYOK) multi-model AI web app**: chat, image generation/editing, and video generation across many models — from one interface. Sign in with Google, add your own provider keys, and everything you create is saved to your own private, deletable history.

> **Status:** early. The project **foundation and deployment pipeline** are in place; the product features below are being built **one at a time** (see [Roadmap](#roadmap)). Built in the open as a learning project.

## 🎓 Learn by building this

**Teaching is a core goal of this project, not an afterthought.** The code *and* the docs are written to be understood by a beginner. If you want to learn how real software is built — and how AI agents actually work — using **Claude Code** in the desktop app, you can follow this repo step by step, even with zero coding background.

You don't memorize commands; you learn the *why* and let Claude do the mechanics. **Start here → [`docs/learn/`](docs/learn)**, or jump straight into the guided, paste-and-go companion: **[`ONBOARDING.md`](ONBOARDING.md)**.

## Features (Phase 1 target)

This is the full intended product, built incrementally:

- **Multi-model chat** — stream replies from many models; pick a model per chat; per-chat system prompt and web search; run several generations at once.
- **Vision** — attach or paste an image and ask a vision-capable model about it.
- **Image generation & editing** — text-to-image and image-to-image / edit (with negative prompt, seed, strength, second image), plus a dedicated image studio.
- **Video** — text-to-video and image-to-video, resilient to page refreshes.
- **Your own private history** — per-user chat / image / video history with galleries; delete anything (which also removes the underlying file from storage — no orphans).
- **BYOK & multi-tenant** — sign in with Google; bring your own OpenRouter + AtlasCloud keys (encrypted at rest); every user's workspace is fully isolated.

Full detail in the [PRD](docs/prd/phase-1.md).

## How it works (the full setup)

- **App (frontend + backend):** Next.js 16 (App Router) on **Vercel** — serverless, no machine to manage.
- **Database:** **Neon** (Postgres) + **Drizzle** — users, encrypted API keys, chat history, and media *metadata*.
- **File storage:** **Cloudflare R2** — the actual generated images and videos (private; served only to their owner).
- **Auth:** **Auth.js v5** with Google sign-in.
- **Models:** run on the providers — **OpenRouter** and **AtlasCloud** — using *your* keys. This app is the aggregator/middleman; it does **not** host the models.

Backing services are wired in as each feature needs them (Neon at auth, R2 at the first media feature, etc.). Full diagram + request walkthrough: [architecture](docs/architecture.md). Setup/deploy/rollback: [runbook](docs/runbook.md).

## Tech stack

Next.js 16 · React 19 · TypeScript · Auth.js v5 · Drizzle + Neon (Postgres) · Cloudflare R2 · Vercel · OpenRouter + AtlasCloud (BYOK).

## Roadmap

The full setup, shipped feature by feature — each through the same local → preview → production loop:

- [x] **Foundation** — project scaffold, docs framework, CI, deploy pipeline
- [ ] **Auth** — Google sign-in, per-user isolation
- [ ] **BYOK keys** — encrypted OpenRouter + AtlasCloud key management
- [ ] **Chat** — multi-model streaming + per-chat settings
- [ ] **Vision** — image input to chat
- [ ] **Image** — generation + editing + studio
- [ ] **Video** — text-to-video + image-to-video
- [ ] **History & galleries** — persistent per-user history
- [ ] **Delete** — remove records + the underlying files in R2

## Quickstart (local)

```bash
git clone <repo-url>
cd ai-aggregator
npm install                  # use `npm install --legacy-peer-deps` once auth is added
cp .env.example .env.local   # then fill in your own values (Windows: copy)
npm run dev                  # http://localhost:3000
```

You'll need your own accounts/keys (Google OAuth, Neon, Cloudflare R2, OpenRouter, AtlasCloud) — added per feature as the roadmap progresses. Step-by-step in the [runbook](docs/runbook.md).

## Development

Built with a deliberately **documented, traceable workflow**: spec → branch → Conventional Commit → PR → CI (typecheck + lint + build) → Vercel preview → merge → production. Specialist subagents in `.claude/agents/` assist with backend, frontend, devops, and review. See [CONTRIBUTING](CONTRIBUTING.md), [AGENTS.md](AGENTS.md), and the [project brief](docs/project-brief.md).

## Documentation

| | |
|---|---|
| [Product (PRD)](docs/prd/phase-1.md) | what we're building and why |
| [Project brief](docs/project-brief.md) | standalone overview of the project + process |
| [Architecture](docs/architecture.md) | how the system fits together |
| [Decisions (ADRs)](docs/adr) | why key technical choices were made |
| [Runbook](docs/runbook.md) | local setup, deploy, rollback |
| [Contributing](CONTRIBUTING.md) | the development workflow |
| [Agent rules](AGENTS.md) | how AI agents work in this repo |

## Contact

Questions, feedback, or want to get involved? Open an issue, or email **cosmicbubble898@gmail.com**.

## License

[MIT](LICENSE) © 2026 Cosmic Bubble
