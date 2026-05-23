<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Working in this repo (rules for AI agents)

**Project:** a BYOK multi-model AI aggregator (chat + image + video). This is a **greenfield rebuild** — the old app at `../chat-saas` is a **reference only**, not something we deploy. Public, open-source (MIT).

**Mission (core):** this is also a **public learning resource** — people learn software engineering + AI agents by reading this repo and by building it with Claude Code. So **write code and docs to be understood by a beginner**: clear names, comments that explain the *why*, no unexplained magic. Teaching value is first-class, not an afterthought.

## How we build: human + AI (the partnership)

This project is built by a **human + Claude, hand in hand** — and that partnership is itself part of what this repo demonstrates. Shorthand: **the human is the _thinker_; Claude is the _builder_ — and also the _thinker_ on the hardcore technical side.**

**The human leads — the _what_, the _why_, and the human touch:**
- The *non-technical* systems architecture — the **data-model shape**, how data flows, process logic — and ruthless **simplification** (spotting patterns, turning chaos into clean systems).
- The **human-touch / product-psychology** calls — what a UI should feel like and what will genuinely appeal to people.
- **Agent-design direction** — when we build agents, the human guides their shape.
- Deep systems instinct (STEM + SaaS/operations background); directs the build rather than writing the code.

**Claude leads — the _how_, and all the technical thinking + building:**
- All **software engineering** — *thinking and building* on the technical side: code architecture, implementation, applying industry best practices.
- Writes code + docs a beginner can follow; surfaces structure, patterns, and failure-modes in plain language for the human to simplify.

Rules that follow:
- **Propose the data model / schema to the human for review _before_ building it**; flag critical, hard-to-reverse decisions; and bring **UI/UX choices** to the human (their human-touch call).
- **Favor lean, crystal-clear data flow over cleverness** — no chaotic sprawl.
- **Claude co-authors every commit** (`Co-Authored-By: Claude`) — the work is genuinely shared.

This human↔AI division of labor is first-class, not an afterthought.

## Golden rules
- **Read `node_modules/next/dist/docs/` before writing any Next.js code.** This is Next 16; APIs differ from training data.
- **Never commit secrets.** They live only in `.env.local` (gitignored) and the host's env settings. The repo ships only `.env.example` with empty placeholders. Check `git status` before every commit.
- **Type-check + lint before committing:** `npx tsc --noEmit` and `npm run lint` must pass (CI enforces this on every PR).
- **Learning & docs content gets a `docs-reviewer` pass before commit/push** — independent check for accuracy + beginner clarity. A wrong lesson mis-teaches, so the bar is higher than for code. Learning lessons follow the style guide at `docs/learn/WRITING-GUIDE.md` (very simple, analogy-led, never too technical — depth is what the AI tutor is for).

## Workflow — every change traces PRD → spec → ADR → branch → PR → deploy
1. Each feature gets a spec in `docs/specs/` (copy `_TEMPLATE.md`) with **acceptance criteria**.
2. Any non-obvious technical decision gets an ADR in `docs/adr/` (continue the numbering).
3. Work on a branch: `feat/<slug>` (or `fix/`, `docs/`, `chore/`, `refactor/`).
4. **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). Small, frequent.
5. Open a PR (template links the spec + acceptance checklist). CI runs typecheck/lint/build; Vercel posts a preview URL.
6. Review the preview, then **merge to `main` → auto-deploy to production**. Update `CHANGELOG.md`.

## Where things live
`docs/prd/` product · `docs/adr/` decisions · `docs/specs/` feature specs · `docs/architecture.md` system overview · `docs/runbook.md` setup/deploy/rollback.

## Commands
`npm run dev` · `npm run build` · `npm run lint` · `npx tsc --noEmit`
Installs after Auth.js is added need `--legacy-peer-deps` (next-auth v5 beta peer ranges).
<!-- END:project-rules -->

