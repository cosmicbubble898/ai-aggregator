<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Working in this repo (rules for AI agents)

**Project:** a BYOK multi-model AI aggregator (chat + image + video). This is a **greenfield rebuild** — the old app at `../chat-saas` is a **reference only**, not something we deploy. Public, open-source (MIT).

**Mission (core):** this is also a **public learning resource** — people learn software engineering + AI agents by reading this repo and by building it with Claude Code. So **write code and docs to be understood by a beginner**: clear names, comments that explain the *why*, no unexplained magic. Teaching value is first-class, not an afterthought.

## Golden rules
- **Read `node_modules/next/dist/docs/` before writing any Next.js code.** This is Next 16; APIs differ from training data.
- **Never commit secrets.** They live only in `.env.local` (gitignored) and the host's env settings. The repo ships only `.env.example` with empty placeholders. Check `git status` before every commit.
- **Type-check + lint before committing:** `npx tsc --noEmit` and `npm run lint` must pass (CI enforces this on every PR).
- **Learning & docs content gets a `docs-reviewer` pass before commit/push** — independent check for accuracy + beginner clarity. A wrong lesson mis-teaches, so the bar is higher than for code.

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

