# 0007. Stack: Next.js 16.2.6, App Router, TypeScript, plain CSS, npm

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
We need a stack that matches the reference app (for clean porting), keeps the version-matched Next docs in `node_modules` accurate, and stays simple.

## Decision
- **Next.js 16.2.6** (pinned), **App Router**, **TypeScript**, **ESLint**, **npm**, `@/*` import alias, no `src/` dir.
- **Plain CSS** (no Tailwind), matching the reference so UI work ports cleanly.
- Backing libraries added per feature: **Auth.js v5** (Google), **Drizzle + Neon**, **AWS S3 SDK** (for R2).

## Consequences
- The bundled docs at `node_modules/next/dist/docs/` match our exact version (AGENTS.md relies on this).
- Installs need `--legacy-peer-deps` once `next-auth@5 beta` is present (locally and in Vercel's install command).
- Choosing Tailwind or a `src/` layout later would need a new ADR superseding this one.
