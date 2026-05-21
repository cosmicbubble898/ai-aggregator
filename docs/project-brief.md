# AI Aggregator — Project & Development Brief

> **Purpose of this document:** a self-contained overview of *what* this project is, *how* it works, and *how we build it* with a proper, traceable software-development process. It's written to be read standalone — e.g. pasted into a fresh chat to brainstorm direction, process, or architecture. Nothing here assumes prior context.

---

## 1. TL;DR

We're building an **AI aggregator**: one web app to use many AI models — **chat, image generation/editing, and video generation** — from a single interface, where each user **brings their own API keys (BYOK)**. It's cloud-hosted, multi-tenant (each user gets a private, isolated workspace with their own history), and **open source (MIT)**.

It's a **learning / experimentation** project with no commercial motive. The deeper goal is to build it with a **fully documented, fully traceable, professional engineering process** — to the point where it can eventually run as an **AI-driven pipeline**: drop in a spec, an AI implements it on a branch, it deploys to a preview, a human approves, and it ships.

---

## 2. The product (what & why)

**What:** Sign in with Google, paste your own provider keys (OpenRouter + AtlasCloud), and use:
- **Chat** with many models (including vision — ask about an image), streaming, per-chat model/system-prompt/web-search, multiple generations at once.
- **Images** — text-to-image, image-to-image / editing (with negative prompt, seed, strength, second image), plus a dedicated image "studio."
- **Video** — text-to-video and image-to-video, resilient to page refreshes.
- **History** — per-user, private, persistent chat/image/video history with galleries, and **deletion that also removes the underlying file from storage** (no orphans).

**Why:**
- **One place for many models** instead of juggling separate apps and subscriptions.
- **BYOK:** each user runs on their own provider balances — no shared cost, no markup, and access to a wider range of models than mainstream consumer apps.
- **Own your history:** a private, deletable record of everything you make.

A working reference implementation already exists, but we're **rebuilding from scratch, feature by feature** — for a clean, fully-understood codebase and the learning value.

---

## 3. The bigger ambition: a documented, AI-driven engineering pipeline

The reason for the heavy emphasis on docs and process is a **north star**: an engineering loop where

> a PRD/spec goes in → an AI implements the feature on a branch and on a local/preview environment → it's tested → a human clicks approve → it auto-deploys to production.

This only works if **every change is traceable** (why → what → how → shipped) and the repo is **spec-first and documented**. AI removes the usual excuse for skipping the tedious-but-important work (docs, ADRs, changelogs, hygiene), so "no corners" is realistic. We lay these rails now and run the loop semi-manually, tightening the automation over time (e.g. eventually an AI agent running in CI).

---

## 4. How it works (architecture)

A web app is split into parts that each do one job:

```
        USER'S BROWSER (the UI)
                │  HTTPS, e.g. "generate this image"
                ▼
        OUR SERVER  →  runs on VERCEL (serverless functions)
        • verifies who you are (Google login)
        • decrypts YOUR api key
        • calls the AI provider, relays the result
           │ structured data                │ forwards prompt + your key
           ▼                                ▼
   NEON (Postgres)                  OpenRouter / AtlasCloud
   • users, encrypted keys          • actually RUN the models (their GPUs)
   • chats (text/json)              • return text / image / video
   • image/video metadata (a key per file)
           ▲
           │  "file gen/abc.png is owned by Sam"
   CLOUDFLARE R2 (object storage)
   • the actual image & video files
```

- **Server runs on Vercel**, serverless (no always-on machine to manage; code runs on-demand per request).
- **Two kinds of storage, on purpose:** a **database (Neon Postgres)** for small structured records (users, encrypted keys, chats, media *metadata*) — the "filing cabinet"; and **object storage (Cloudflare R2)** for the big media files — the "warehouse." The DB stores a *key* pointing at each file in R2.
- **The aggregator insight:** the models don't run on our server — **the providers run them**. Our server authenticates the user, attaches *their* key, forwards the prompt, and relays the answer. That's why it's cheap to run and why it's BYOK.
- **Media is private:** served only to its owner via an authenticated, ownership-checked path.

---

## 5. Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** — frontend + backend in one framework.
- **Auth.js v5** — Google OAuth, per-user sessions.
- **Neon** (Postgres) + **Drizzle ORM** — database.
- **Cloudflare R2** (S3-compatible) — media file storage.
- **Vercel** — hosting + CI/CD + preview deploys.
- **Providers:** OpenRouter + AtlasCloud (BYOK).

---

## 6. How we build it — the engineering process

This is the heart of "doing it properly."

### 6.1 Principles
- **Local-first:** build and test on your machine, then deploy. Catch ~90% of issues cheaply and fast; verify the rest on the deployed URL.
- **Spec-first & documented:** code and docs change together. Decisions are recorded, not lost.
- **Traceable:** any line of shipped code can be traced back to the "why."
- **No secrets in the repo, ever.**

### 6.2 Version control & GitHub (open source)
- Public GitHub repository, **MIT licensed** — built in the open to share and learn.
- `git` from commit #1; small, frequent commits.

### 6.3 The change lifecycle (the traceability chain)
```
PRD  →  spec  →  ADR (if a real decision)  →  branch  →  commits
     →  Pull Request  →  CI + preview deploy  →  review  →  merge  →  production deploy  →  changelog
```
Each link references the previous one, so the history is navigable end to end.

### 6.4 Branching, commits, PRs
- **Branch per feature:** `feat/<slug>` (also `fix/`, `docs/`, `chore/`, `refactor/`).
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:` — a machine-readable history (auto-generates changelogs).
- **Pull Requests** use a template that links the spec + an acceptance-criteria checklist.

### 6.5 CI + preview + production (the deploy pipeline)
- **CI on every PR** (GitHub Actions): typecheck + lint + build must pass — the automated quality gate.
- **Preview deploy per PR** (Vercel): a private URL to review the feature *before* approving.
- **Merge to `main` = production deploy** (Vercel). That merge *is* the "approve → ship" action.
- The ladder is **local → preview → production**.

### 6.6 Environments & secrets
- Secrets live only in `.env.local` (gitignored) and the host's env settings — the repo ships only `.env.example` with empty placeholders.
- Dev points at the same managed cloud services (Neon, R2, providers); "local" just means *the app code* runs on your laptop.

### 6.7 Documentation framework (`docs/`)
- **`docs/prd/`** — PRDs (what & why).
- **`docs/adr/`** — numbered, immutable Architecture Decision Records (why a choice was made).
- **`docs/specs/`** — a per-feature spec with acceptance criteria (the unit an AI implements against).
- **`docs/architecture.md`** — system overview. **`docs/runbook.md`** — setup/deploy/rollback.
- **`AGENTS.md`** — the control file for how AI agents work in the repo. **`CHANGELOG.md`** — what shipped, when.

---

## 7. Build phasing (roadmap)

**Step 1 — Foundation + pipeline (in progress):** scaffold the app, lay down the full docs/traceability framework, then prove the pipeline by deploying a skeleton (GitHub → CI → Vercel → live) *before* any features. So deployment is never a scary big-bang at the end.

**Then — features, each its own local → preview → production cycle:**
`auth (Google) → BYOK keys → chat → vision → image gen/edit → image studio → video (T2V/I2V) → history & galleries → delete (+ R2 storage)`

We add each backing service exactly when the feature needs it (Neon at auth, R2 at first media, etc.), so each piece is learned in context.

---

## 8. Key decisions so far (with the "why")

- **Host on Vercel (serverless):** Next-native, ~$0 baseline, easy CI/CD + previews. Trade-offs to design around: a 4.5 MB request-body limit and a 60s function cap.
- **Store media on Cloudflare R2, not Vercel:** Vercel's Acceptable Use Policy prohibits the content this app can generate, and R2 has no egress fees. So generated media never lives on Vercel.
- **Store storage *keys* in the DB, not URLs:** signed URLs expire; a key is a durable reference, presigned on demand.
- **Upload images directly to storage (presigned PUT):** keeps large files out of function bodies (dodges the 4.5 MB limit) and out of the database.
- **Rebuild from scratch, feature-by-feature:** clean, understood codebase + learning; old app is a reference only.
- **Stack pinned to Next.js 16.2.6, plain CSS, npm:** matches the version-accurate docs and keeps things simple.
- **MIT license, public repo:** share and learn.

---

## 9. Constraints & non-goals

**Constraints:** Vercel's content policy (→ media on R2); Vercel's 4.5 MB body limit and 60s function cap; BYOK provider costs are each user's own; Google OAuth currently in "Testing" mode (true open sign-up needs the consent screen published).

**Non-goals (for now):** new features beyond the current set; commercial hardening (rate limiting, billing, quotas); secret rotation / security review; teams/sharing; a custom domain.

---

## 10. Current status

- **Done:** project scaffolded (Next 16.2.6, builds clean); full docs + open-source framework (PRD, 7 ADRs, architecture, runbook, spec template, README, AGENTS.md, CONTRIBUTING, CHANGELOG, MIT license); CI workflow + PR/issue templates; git initialized and everything staged.
- **Next:** authenticate GitHub (gh CLI) → first commit → create the public repo → push → connect Vercel and deploy the skeleton → prove the full pipeline loop → then start features with `auth`.

---

## 11. Questions to brainstorm

- **Automation depth:** how far to push the AI pipeline (e.g. an AI agent running in CI that opens PRs from a spec) vs. keeping a human in the loop at each step? Where are the right approval gates?
- **Testing strategy:** what level of automated tests (unit/integration/E2E) is worth it for a solo learning project, and where do they fit in CI?
- **Tooling:** is a lightweight issue/project tracker worth adding for traceability, or is GitHub Issues + the docs framework enough?
- **Spec granularity:** how big should a "feature spec" be — one per P0 capability, or finer?
- **OAuth / access:** publish the consent screen for true open sign-up, or keep an invite/test-user list during experimentation?
- **Scaling later:** if this ever grew beyond experimentation, what would change first (rate limiting, separate dev/prod data, secret rotation, abuse handling)?
- **Cost & vendor risk:** anything to reconsider about the Vercel + Neon + R2 + BYOK choices?

---

*This brief reflects the project as of 2026-05-21. The living source of truth is the repo's `docs/` (PRD, ADRs, architecture, runbook).*
