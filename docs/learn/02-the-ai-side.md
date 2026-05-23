# The AI side — models, agents, and why an "aggregator"

*Plain-English, no background needed. [The big picture](01-the-big-picture.md) sketched what software and AI are; this lesson zooms into the **AI** part — what these models actually are, and why this app exists. (The technical plumbing — servers, databases, the cloud — comes a bit later, in [Foundations](03-foundations.md).)*

> **You don't need to build a model to build this app.** We never train AI here — we *call* models other companies run. This lesson is about understanding what you're ordering, not how to cook it.

## 1. What is an AI model?
A **model** is a program that has read an enormous amount of text (or images, or video) and learned the *patterns* in it. You give it some input, it predicts a sensible continuation.
- **Analogy:** an incredibly well-read assistant who has skimmed much of the internet. Ask a question and they give you their best answer from memory — fast, fluent, and *usually* right, but not looking anything up unless you give them a tool to.
- It **predicts**, it doesn't "know." That's why a model can be confident and wrong (people call this a *hallucination*). You stay the editor.

Models come in different **kinds**, grouped by what they take in and put out:
- **Text (language)** — text in, text out: chat, summarize, translate, write code.
- **Image** — a prompt → a picture (or edit/transform an existing image).
- **Audio** — speech → text (transcription), text → speech (voices), or generated music and sound.
- **Video** — a prompt (or a starting image) → a moving clip.
- **3D** — a prompt → a 3D shape or object (for games, AR/VR, product design).

**This app focuses on text (chat), image, and video** — the three in the [product spec](../prd/phase-1.md). Audio and 3D are part of the wider AI world; they're listed here so you see the whole landscape, not because the app does them (today).

## 2. Different models, different strengths
There isn't one "best" AI — there are many, each with trade-offs: some are sharper at code, some at creative writing, some make better images, some are cheaper, some are faster, some will write things others refuse to (see §6 below).
- **Analogy:** a kitchen with many specialist chefs. You wouldn't ask the pastry chef to grill a steak.
- **In this project:** the whole point is to put many models side by side so you can **send the same prompt to several** and compare — instead of being locked into one app's single model.

## 3. What is an AI *agent*?
A plain chatbot answers and stops. An **agent** is a model that can **take actions in a loop** to reach a goal: it can use *tools* (search the web, read a file, run a command), look at the result, and decide the next step — over and over until it's done.
- **Analogy:** a chatbot is someone answering trivia. An agent is an *assistant you hand a task to* — "book this trip" — who then makes the calls, checks options, and reports back.
- **In this project:** the app is **built by an agent** — Claude Code (in the desktop app) writes the code, runs the commands, and commits the work, while you direct. So you're not just *using* AI here; you're watching an agent build software. That's a big part of what this repo teaches.

## 4. Why an "aggregator"?
Think of an **API** as a *menu* one program offers another: a fixed list of things you can order, and how to ask for them. (More on this in [Foundations](03-foundations.md).) An **aggregator** is one app that orders from **many** providers' menus and brings the results into a single place.
- **Without one:** you juggle separate apps and subscriptions — one for chat, another for images, another for video.
- **With one:** a single interface for all of them, one place for your history, and the ability to compare models on the same task.

## 5. Bring-your-own-key (BYOK)
To order off a provider's menu, you need an **API key** — a secret password that says "bill this to *my* account." **BYOK** means *each user brings their own keys.*
- **Analogy:** the app is the *waiter* that carries your order to many kitchens — but **you** hand over your own payment card (your key). The app never puts the meal on its own tab.
- **Why it's good:** you pay only your own usage (no markup), you're not sharing a pool with strangers, and you get access to a far wider range of models than a typical consumer app exposes.
- Because keys are basically passwords to money, storing them safely is a real topic of its own — that's a later lesson, *Keeping your keys safe*.

## 6. AI censorship & "uncensored" models
Many mainstream models have **guardrails** — they'll refuse certain requests. Other, more **open** models have fewer restrictions and will attempt things the big ones won't.
- Neither is simply "better" — it's a trade-off between safety and freedom, and the right choice depends on what you're doing (and on using them **legally and responsibly**).
- **In this project:** because it's BYOK and aggregates many providers, it can surface this difference honestly — letting you see *which* model will and won't do a given task, rather than hiding it. Understanding that models differ here is itself part of AI literacy.

---

## See it in the real project
| Idea | Where it shows up |
|---|---|
| Calling models (not training them) | our backend orders from **OpenRouter** + **AtlasCloud** |
| Comparing models | send one prompt to several at once |
| An agent building software | **Claude Code** writes/commits this very repo |
| BYOK | the `/settings` page where you add your own keys |

Want the product's full "what & why"? Read [`../prd/phase-1.md`](../prd/phase-1.md).

**Next:** [Foundations](03-foundations.md) — the concrete pieces (server, frontend/backend, the cloud, database vs. files) and the proper names for them.
