# The big picture — software & AI in plain terms

*Two clear pictures, in order: first **what software actually is**, then **what AI is** — kept separate, because they are not the same thing. Imagine it explained to a curious 15-year-old who has never coded. Nothing to memorize.*

> Software is genuinely hard to picture, for one reason: **you can't see it.** Let's start exactly there.

## 1. Software is invisible — so what is it, really?
You can hold a phone or a game console in your hand. That's **hardware** — the physical machine. But the *app* or the *game* running on it isn't something you can touch. So what is it?

**Software is a big set of instructions** — a long, exact list of "when this happens, do that" — written down and **stored as a file.** On its own it just sits there, like a recipe in a drawer or the rulebook of a board game: words on a page, doing nothing. The magic only happens when the machine **runs** those instructions — then things start appearing and responding on your screen.

So hold onto this: *software = a pile of instructions, stored somewhere, that a machine follows.* Invisible on its own; alive when it runs.

## 2. A video game makes it click
A game is software — and it lets you actually *see* every piece of software at once:

- **What you see and control:** the world on the screen, and you steering it with a controller, keys, or your thumbs. This is where **you** act.
- **The rules running behind it:** invisible instructions deciding "touch the enemy → lose a life," "grab the coin → score goes up." You never see these rules; they just run.
- **What it remembers:** your **save** — your level, your score, your character — kept somewhere so it's still there tomorrow.
- **How it answers you:** pictures, sound, music, a buzz in the controller — even spoken words.

A banking app, a chat app, this very project — they're all the same shape as that game. Different job, same parts.

## 3. The two halves: front end and back end
Engineers split every app into two halves, and you only ever touch one of them:

- **Front end — where you interact.** The screen, the buttons, the words and pictures you see and tap (or speak to). The part *you* use. *(The game's screen and controller.)*
- **Back end — where the work happens, out of sight.** It runs the instructions and it **stores things**. You never see it. *(The game's rule-engine, plus its save files.)*

And the back end keeps **two different kinds of stored stuff** — worth keeping straight:
- **The instructions** — the program itself (the rules of the game).
- **The data** — *your* stuff: your messages, photos, audio, video, save files.

Both have to live *somewhere*. Exactly where — on your own device, or on a powerful computer out on the internet — is what the later lesson [Foundations](03-foundations.md) unpacks. For now: **front end = where you talk to it; back end = where it works and remembers.**

## 4. How you talk to software — and how it talks back
You've *always* had many ways to interact with software, long before AI existed:
- **You → it:** typing, tapping, clicking, a game controller, voice commands, even hand gestures or body movement.
- **It → you:** text, pictures, sound and music, video, a buzz in your hand.

A calculator, a music player, a video game — all software, all interactive, and **none of them AI.** That matters, because it tells us exactly what AI *adds*.

## 5. Now — what is AI?
Everything so far ran on **rules a human wrote out by hand**: fixed and exact, "if X, then Y." That's ordinary software — like a **vending machine**: press B4, you always get B4. Dependable, but it can only do what someone spelled out in advance.

**AI is a new kind of back-end worker.** Instead of following only hand-written rules, it has **learned patterns from a massive pile of examples** — so it can handle the fuzzy, *human* requests nobody can write exact rules for: "understand what I just typed," "draw a cat wearing a hat," "answer this in plain English." Less vending machine, more **clever, very well-read assistant** — you ask in everyday words, it gives its best response. (And, like a person, it can be confidently wrong — so you stay the judge.)

The key point: **AI doesn't replace software — it slots into it.** It's a new kind of part you add to the back end for the fuzzy, human jobs, bolted onto the very same front-end / back-end / data shape you just learned.

*(There's also a second role — the one you'll live in here: AI as the **helper that builds the software with you**, where you describe and it assembles the parts. More on that across the next lessons.)*

## 6. The whole picture, in one breath
> **Software** is a set of invisible *instructions* that work on your *data*, split into a **front end** (where you see and interact) and a **back end** (out of sight, where the instructions run and both the program and your data are stored). **AI** is a new kind of worker you can add to the back end for fuzzy, human tasks — and also the helper that builds the whole thing with you.

Everything after this just zooms into one piece at a time.

**Next:** [The AI side](02-the-ai-side.md) — a closer look at those AI "workers": models, agents, and why we put many of them in one place.
