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
