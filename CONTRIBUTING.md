# Contributing

This project is built in the open as a learning project, with a deliberately **traceable, documented workflow**. Whether you're a human or an AI agent, the loop is the same. (Agent-specific rules: [`AGENTS.md`](AGENTS.md).)

## Prerequisites

- Node.js 20+
- Your own accounts/keys (added per feature): Google OAuth, Neon, Cloudflare R2, OpenRouter, AtlasCloud. See [`docs/runbook.md`](docs/runbook.md).

## Local setup

```bash
npm install                  # `--legacy-peer-deps` once Auth.js is present
cp .env.example .env.local   # fill in your values; never commit this file
npm run dev                  # http://localhost:3000
```

## The workflow (local → preview → production)

1. **Spec it.** Add a short spec in `docs/specs/` (copy `_TEMPLATE.md`) with acceptance criteria. Big features start from a PRD in `docs/prd/`.
2. **Decide it.** Record any non-obvious technical decision as an ADR in `docs/adr/`.
3. **Branch.** `feat/<slug>` (or `fix/`, `docs/`, `chore/`, `refactor/`).
4. **Build & commit.** Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. Keep commits small. Run `npx tsc --noEmit` and `npm run lint` before committing.
5. **Open a PR.** The template links the spec + acceptance checklist. CI runs typecheck + lint + build; Vercel posts a **preview URL**.
6. **Review the preview**, then **merge to `main`** — which auto-deploys to production. Update `CHANGELOG.md` in the PR.

## Conventions

- **Secrets** never enter the repo — only `.env.local` (gitignored) and the host's env settings.
- **Docs are first-class:** code and docs change together.
- See [`docs/architecture.md`](docs/architecture.md) for the system overview.
