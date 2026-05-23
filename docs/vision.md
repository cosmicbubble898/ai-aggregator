# Vision & Direction

> A plain-language statement of what this project is, where it's going, and the deliberate engineering discipline behind it. This is an open-source project built in the open — part product, part learning resource. For the system overview see [architecture](architecture.md); for current Phase-1 scope see the [PRD](prd/phase-1.md).

## What this is

A **BYOK (bring-your-own-key) multi-model AI workspace** — use many AI models across chat, image, audio, and video from one place, on your own provider keys. Cloud-hosted, open-source (MIT), with private, persistent, deletable history. You can use our hosting, bring your own storage, or self-host the whole thing.

## Where it's going

Phase 1 is the multi-model aggregator (chat + image + video). From there: **audio** (transcription, speech-to-speech), then **workflows** that chain models and tools together — growing toward a broad, ChatGPT/Claude-shaped **cloud AI workspace**.

A useful shorthand for the near-term shape: a strong **multi-model generation platform** (the kind you've seen focused on video/image creation) **plus a real chat brain** — conversation with memory and retrieval. The generation breadth, with an actual conversational layer on top, all on BYOK.

## Two things that make it different

**1. Bring your own key (BYOK).** You run on your own provider balances — no markup, no resold credits, and access to a far wider range of models than typical consumer apps. And you can **own your data**: use our storage, bring your own bucket, or self-host.

**2. Learning-first.** This is also a learning platform. The code and docs are written to be understood by a beginner, and the product itself teaches you to use AI — learn a concept, then try it live in the real tools. For many people, that's the front door.

## How you can use it — the ownership ladder

1. **Hosted** — your data lives in our storage, isolated to your account (only you can see it).
2. **Hosted + bring your own storage** — your media files live in *your own* bucket; you own the files.
3. **Self-host** — it's open source; run the whole thing on your own infrastructure and keys. Everything is yours.

## The model, plainly

- Any fee covers only the **infrastructure we host**. We **never resell AI credits** — you always bring your own provider keys and pay providers directly.
- **Open-source and self-hostable for free.**
- Optional data-ownership tiers (use our storage vs. your own) and a team tier for usage governance on a shared key. All infrastructure-only — never credit resale.

## Where we focus — and what we deliberately defer (and why)

We're building lean, sustainably, and in the open. That means **discipline about what we take on, and when.**

For the near term — until the product has meaningful, stable recurring revenue and proven operational stability — we deliberately stay within what **serverless + API-relay** infrastructure does excellently:

- **In scope:** multimodal *generation* (chat, image, audio, video), each running on the providers' APIs via your key; chat with memory and retrieval (RAG); workflows that orchestrate API calls.
- **Deliberately deferred (until revenue + stability):** anything requiring heavy, always-on, or specialized infrastructure — **VM-backed autonomous agents** (an AI operating a virtual computer), **real-time / persistent-connection features** (live collaborative canvases, voice-mode), and **enterprise-grade infrastructure**.

**Why defer the heavy stuff?** Because that class of capability brings real, ongoing cost, operational burden, and security/safety responsibility. Taking it on *before* the product is financially and operationally stable would make it fragile and expensive — exactly the way lean products die. By staying serverless-first, we keep the product **cheap to run, reliable, and sustainable**, and we earn the right to add heavier capabilities responsibly, once there's the revenue and stability to support them. Until then, we focus on doing the generation-and-chat core exceptionally well.

This isn't a limitation we're shy about — it's a deliberate sequence: **prove the core, stay sustainable, then expand.**

## Principles

- **Open source (MIT), built in the open** — the repo is meant to be read and learned from.
- **Spec-first and traceable** — every change traces from "why" to "shipped."
- **Privacy by default** — your data is yours; media is private to its owner; deletion really deletes.
- **Honest, not hype.**
