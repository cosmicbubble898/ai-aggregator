# 0003. Store generated media on Cloudflare R2

- **Status:** Accepted
- **Date:** 2026-05-21

## Context
The app generates images/videos (including uncensored content) that must persist privately. Vercel's storage (Blob) is Vercel infrastructure and its AUP prohibits this content; Blob also bills egress.

## Decision
Store all generated media on **Cloudflare R2** (S3-compatible). Keep the database (Neon) for structured data only.

## Consequences
- Permissive for legal content, **no egress fees**, ~free at experimentation scale; off Vercel entirely.
- Use the AWS S3 SDK against R2's endpoint (`region: "auto"`, path-style).
- Requires **presigned URLs** for reads/uploads and a **CORS** policy for browser uploads (→ [0005](0005-direct-to-storage-uploads.md)).
- Media is served via an owner-checked path that redirects to a short-lived presigned URL.

## Update (2026-05-24)
Reframed rationale for public docs: choose Cloudflare R2 because it's the more **open** object storage that fits a BYOK app (users bring their own keys and generate what they want) and has **no egress fees** (cheaper to serve) — *not* framed as avoiding Vercel's content policy. The original context above is kept as the historical record.
