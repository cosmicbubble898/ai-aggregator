# Build this with me — your onboarding guide

**Goal:** take you from *"I've never written code"* to a real, deployed AI web app — with **Claude Code** doing the typing and **you** making the decisions. This file is your map and your mentor.

> **You do not need a coding background.** You need curiosity and a willingness to ask "why?". Everything else, the AI handles. By the end you'll understand how a real cloud app is built — and you'll have built one.

---

## How this works (read this part)

This project is two things at once: a **working AI app** *and* a **lesson**. The whole repo is written to be understood, and this file is the spine that ties it together.

The trick to the whole thing:

> **You are the director. Claude is the crew.** You decide *what* and *why*. Claude does the *how* — the commands, the files, the boilerplate. You never have to memorize a single command.

### Your two companions

You'll use Claude in **two places**, for two different jobs. Knowing which is which is half the battle:

| | **claude.ai chat** (in a browser) | **Claude Code** (the app on your computer) |
|---|---|---|
| Think of it as | Your **tutor** | Your **builder** |
| Best for | Asking "what is X?", understanding the *why*, planning before you act | Actually doing the work: creating files, running commands, saving to git |
| Touches your computer? | Not the way we use it here — it's for thinking and planning | Yes — it builds the real thing on your machine |
| Setup needed | None — open a browser | Install the Claude Code app (we'll walk you through it) |

**Rule of thumb:** *learn and plan in the chat tutor; build in Claude Code.* When you're unsure what something means, ask the tutor. When you're ready to make it real, switch to the builder.

### How to start the guide

Open this file in **Claude Code** (or paste it into a **claude.ai chat**) and say:

> *"Be my onboarding guide for this project. Start at Step 0 and go one step at a time — explain the why before we do anything, and wait for me before moving on."*

Claude will read this repo and walk you through it. That's it.

---

## The golden rules (so you stay in control)

These keep you in the driver's seat. Tell Claude to follow them too.

1. **You don't memorize commands.** If a command needs running, Claude runs it. Your job is to understand *what it does and why*.
2. **Always ask "why" before "how."** A good guide explains the reason first. If Claude jumps to doing something you don't understand, stop and ask it to explain in plain English.
3. **One step at a time.** Don't let the build run ahead of your understanding. Finish a step, make sure it makes sense, *then* move on.
4. **Never paste a secret into a chat.** Passwords and API keys (you'll learn what those are) live only in a special hidden file on your machine — never in a message, never in the code you share publicly. More on this when we get there.
5. **No important context lives only in a chat.** Chats get long and start forgetting. The real memory is the **repo** and short **handoff notes**. (There's a whole lesson on this below — it's one of the most useful things you'll learn here.)

---

## What you're going to build

One web app that lets you use **many** AI models — chat, image generation/editing, and video — from a single place, where each person brings **their own API keys** (so you run on your own balance, not someone else's). You sign in with Google, and everything you make is saved to your own private history.

- The short version is in the [README](README.md).
- The full "what and why" is the [Product spec (PRD)](docs/prd/phase-1.md).

You won't build it all at once. You'll build it the way real software is built: **one feature at a time**, each one taken all the way from your laptop to the live internet before starting the next.

---

## The map — how this repo teaches you

You won't read these all up front. This guide points you to the right one at the right moment. But here's the whole map, so you know what's around you:

| When you want to know… | Read this |
|---|---|
| The absolute basics (server, cloud, database, git…) in plain English | [`docs/learn/`](docs/learn) |
| **What** we're building and **why** | [`docs/prd/phase-1.md`](docs/prd/phase-1.md) |
| **Why** each technology was chosen | [`docs/adr/`](docs/adr) — Architecture Decision Records |
| **How** all the pieces fit together | [`docs/architecture.md`](docs/architecture.md) |
| How to **run and deploy** it (step by step) | [`docs/runbook.md`](docs/runbook.md) |
| The **build diary** — what happened each work session | [`docs/session-log/`](docs/session-log) |
| The **order** features get built | [README → Roadmap](README.md#roadmap) |

**The repo is the worked example.** Think of it as the answer key: you'll build your *own* version alongside it with Claude Code, and whenever you want to see how we did something, the real file is right here to compare against.

---

## The build journey

Each stop below is a checkpoint, not a script. For each one: what you'll **learn**, what you'll **do**, and a prompt you can hand to Claude. Go in order.

### Step 0 — Get your bearings (in the chat tutor)
- **Learn:** the big picture first — what software and AI even are — then what a server, the cloud, frontend/backend, a database, and git actually are, all with plain analogies.
- **Do:** work through the start of the learning track in [`docs/learn/`](docs/learn/) — Lesson 0 (the *why*), then **The big picture**, **The AI side**, and **Foundations**. Anything fuzzy, ask the tutor to re-explain with a different analogy.
- **Prompt:** *"I just read the first few learning lessons. Quiz me with three simple questions to check I understood, then explain anything I get wrong."*

### Step 1 — Set up your builder (in Claude Code)
- **Learn:** what the tools on your computer are for — Claude Code is your builder; "the terminal" is just the text window where commands run; git is the save system.
- **Do:** install the Claude Code app, then let Claude check your computer has what it needs (it'll tell you what's missing and install it).
- **Prompt:** *"Help me get set up. Check what's already installed on my computer for building this project, and walk me through installing anything that's missing — explain what each tool does as we go."*

### Step 2 — The skeleton, and proving the pipeline
- **Learn:** the single most important habit in this project — **deploy a blank app to the internet *before* building any features.** That way "putting it live" is never a scary, last-minute event; it's something you've already done and trust.
- **Do:** create the empty project, put it on GitHub (the public shelf for your code), set up the automated checks (called *CI*) that catch mistakes before they reach the live site, and deploy it live on Vercel. It'll be a near-blank page — that's the point. The *pipeline* works.
- **Prompt:** *"Walk me through creating the project skeleton and getting it deployed live on the internet, before we add any features. Explain each piece — GitHub, the automated checks, Vercel — as we set it up."*

### Step 3 and on — Features, one at a time
Now you build the real thing, following the **[Roadmap](README.md#roadmap)** in order. Each feature follows the same loop you learned in Step 2:

> **build on your laptop → preview it on a private link → approve → it goes live.**

The order (each links to its details as we get there): **sign in with Google → bring-your-own-key management → chat → vision (images into chat) → image generation & editing → video → your private history & galleries → delete (which also removes the stored file).**

For each feature, the rhythm is the same:
- **Learn the why:** skim the relevant part of the [PRD](docs/prd/phase-1.md) and any [decision record](docs/adr) for that feature.
- **Build it with Claude** on its own branch (a safe, separate copy — Claude handles it).
- **See it on a preview link**, then approve it to ship.
- **Prompt:** *"We're starting the [feature name] feature. Explain what it needs to do and why, point me to the relevant docs, then let's build it step by step."*

---

## The lesson that saves you: working across many chats

This one is worth its own section, because almost nobody learns it and everybody needs it.

**The problem:** a single AI chat slowly fills up. The longer it gets, the more it forgets what you said early on, and the slower it gets. If you treat one chat as your whole project's memory, you'll lose work.

**The fix — handoffs:** when a chat gets long, you don't panic. You:
1. Ask Claude to write a short **handoff note** — what we're doing, what we just did, what's next. (This repo has a ready-made shape for it: [`docs/session-log/_TEMPLATE.md`](docs/session-log/_TEMPLATE.md).)
2. Start a **fresh chat**.
3. Give the new chat the handoff note **+ this repo**. It's instantly caught up.

**The golden rule, again:** *no important context lives only in a chat.* It lives in the **repo** (the files, the docs) and in short handoff notes. The chat is where work *happens*; it is not where work is *stored*.

This isn't theory — it's exactly how this project is built. Every work session ends by writing one of these notes. Read the real ones in [`docs/session-log/`](docs/session-log) to see it in action.

---

## When you get stuck

- **Ask the tutor to slow down.** *"Explain that again like I've never seen a computer."* A good explanation can always go simpler.
- **Send Claude to the docs.** *"Check this repo's docs and tell me how we decided to handle X."* The repo is the source of truth.
- **It's okay to not finish in one sitting.** Write a handoff (see above), come back fresh.
- **Still stuck?** Open an issue on the GitHub repo, or email **cosmicbubble898@gmail.com**.

---

## What's next

This guide covers **Phase 1** — the full app described in the [PRD](docs/prd/phase-1.md). Once you've built and deployed that, you'll understand how nearly every modern web app fits together — and you'll have the one skill that matters most: knowing how to *direct* the build, not just type it.

Ready? Open this file in Claude Code (or a claude.ai chat) and say **"Be my onboarding guide — start at Step 0."**
