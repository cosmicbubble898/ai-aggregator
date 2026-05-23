# Runbook

Operational guide: local setup, environments, deploy, rollback. Sections marked _(added with …)_ get filled in as the relevant feature lands.

## Local development

```bash
npm install                  # `--legacy-peer-deps` once Auth.js is added
cp .env.example .env.local   # fill in values (Windows: copy)
npm run dev                  # http://localhost:3000
```

Local app code talks to the **cloud** backing services (Neon, R2, providers) via the values in `.env.local`. See [architecture](architecture.md#local-vs-cloud).

## Environments

| Environment | Where | Trigger |
|---|---|---|
| **Local** | your machine (`localhost:3000`) | `npm run dev` |
| **Preview** | Vercel (private URL) | every push to a non-`main` branch / PR |
| **Production** | Vercel (public URL) | merge to `main` |

## Environment variables

Defined in [`.env.example`](../.env.example). Set them in **`.env.local`** for local, and in **Vercel → Project → Environment Variables** for preview/production. Never commit real values.

**`ENCRYPTION_KEY` (BYOK):** a 32-byte key, base64-encoded, that encrypts users' provider API keys at rest (see [ADR-0010](adr/0010-encrypt-provider-keys.md)). Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Set it **per environment** (like the database — [ADR-0008](adr/0008-independent-staging-separate-db.md)): the **same** value for local + Vercel **Preview** (they share the staging DB), and a **separate** value for **Production**. ⚠️ If it's changed or lost, all stored keys become undecryptable and users must re-enter them.

## Database migrations

The schema lives in [`db/schema.ts`](../db/schema.ts); `drizzle-kit push` applies it to a database. Apply changes to **staging first, then production** ([ADR-0008](adr/0008-independent-staging-separate-db.md)). `drizzle.config.ts` reads `DATABASE_URL` from the environment, so point it at the target DB:

```bash
DATABASE_URL="<target-db-url>" npx drizzle-kit push   # staging, then production
```

## Accounts / services (set up per feature)

- **Vercel** — hosting + CI/CD (connected at Step 1). _(added: deploy)_
- **GitHub** — source + CI. _(added: Step 1)_
- **Neon** — Postgres database. _(added with auth/persistence)_
- **Cloudflare R2** — media storage; needs an API token + CORS for browser uploads. _(added with first media feature)_
- **Google Cloud** — OAuth client (consent screen + redirect URIs). _(added with auth)_
- **OpenRouter / AtlasCloud** — user-supplied keys (BYOK), entered in-app. _(added with BYOK)_

## Deploy

Push to `main` → Vercel builds and deploys to production automatically. Vercel install command must be `npm install --legacy-peer-deps` once Auth.js is present.

## Rollback

In the Vercel dashboard → Deployments → select the last good deployment → **Promote to Production** (instant). Or revert the offending commit on `main` and let it redeploy.
