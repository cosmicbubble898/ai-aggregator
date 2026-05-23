# Architecture

A first-principles view of how the app works, where the server runs, and where data lives.

## The pieces

A web app is split into parts that each do one job:

1. **Client (browser)** — the UI the user sees and clicks. Runs on *their* device. (React / Next.js.)
2. **Server (backend)** — code that runs away from the user to do what the browser can't be trusted with: verify identity, hold secrets, call paid services. (Next.js route handlers + server actions, on Vercel.)
3. **Storage** — where data persists between visits (database + file storage).
4. **External services** — the AI providers we aggregate.

```
        YOUR BROWSER (client UI)
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
   • image/video metadata
     (a reference/key per file)
           ▲
           │ "file gen/abc.png is owned by Sam"
   CLOUDFLARE R2 (object storage)
   • the actual image & video files
```

## Where the server runs

On **Vercel**, as **serverless functions** — you don't rent an always-on machine; Vercel runs your code on-demand per request and spins it down after. No machine to manage. → [ADR-0002](adr/0002-host-on-vercel-serverless.md)

## Where data is stored (two kinds, on purpose)

- **Neon (Postgres)** — small, structured, searchable records: users, encrypted API keys (AES-256-GCM at rest, master key in the environment — [ADR-0010](adr/0010-encrypt-provider-keys.md)), chats (text/JSON), and *metadata* about each image/video (a reference key, prompt, date, owner). Think **filing cabinet**.
- **Cloudflare R2 (object storage)** — the big binary files (image/video bytes). Think **warehouse**. The database keeps a *slip* (the object key) pointing at each file in the warehouse. → [ADR-0003](adr/0003-cloudflare-r2-for-media.md), [ADR-0004](adr/0004-store-storage-keys-not-urls.md)

Media is **private** — served only to its owner via an authenticated, ownership-checked path.

## The aggregator insight

The AI models do **not** run on our server. **OpenRouter and AtlasCloud** run them on their GPUs. Our server authenticates the user, attaches *their* key, forwards the prompt, and relays the answer. That's why it's cheap to run and why it's BYOK — the expensive compute is billed to each user's own key.

## One request, end to end ("generate an image")

1. Browser → our Vercel server: "make this image."
2. Server: confirms you're logged in, decrypts *your* AtlasCloud key, calls AtlasCloud.
3. AtlasCloud generates it, returns the image.
4. Server: uploads the file to R2, writes a row in Neon (key + prompt + your user id), returns the reference.
5. Browser: shows it via an owner-checked link that resolves to R2.

## Local vs. cloud

Even in local development, the app talks to the **same cloud** backing services (Neon, R2, the providers) — "local" means *your app code* runs on your laptop while still using those managed services. A few things only surface once deployed (Vercel's 4.5 MB body limit, OAuth redirect URLs, R2 CORS), so features are verified on the deployed URL too, not just locally. → [runbook](runbook.md)
