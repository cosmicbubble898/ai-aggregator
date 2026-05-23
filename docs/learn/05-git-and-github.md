# Git & GitHub — the save system and the shared shelf

*[Building it properly](04-building-it-properly.md) talked about "small labeled steps" and shipping changes as "proposals." This lesson is the two tools that make those real — **git** and **GitHub** — in plain English. [Foundations](03-foundations.md) gave the one-line version; here's the working picture. You won't memorize commands; Claude Code runs them. Knowing what they do makes you the director.*

## 1. git — a save system with a timeline
You know `Ctrl+S`: it saves your file, but it *overwrites* the last version — yesterday's is gone.

**git** is a smarter save system. Whenever you ask, it takes a **snapshot of your whole project** and keeps it *forever*, each with a short note on what changed. The result is a complete timeline you can scroll back through — and jump back to — at any point.

- Each snapshot is called a **commit** (the "small labeled step" from Lesson 4).
- *Analogy:* not Ctrl+S, but a game's save slots that keep **every** save you've ever made, each labeled, so you can always see what changed and reload an earlier one.

## 2. Branches — a safe place to try things
You don't want to experiment on the live, working version of your app. So git lets you make a **branch**: a parallel copy of the project where you can build a feature or test an idea **without touching the main version**.

- If it works, you fold it back in (a "merge"). If it doesn't, you throw the branch away — the main version was never at risk.
- *Analogy:* duplicating a document to draft big changes, so the published copy stays clean until you're happy.
- We name branches for their job: `feat/...` for a new feature, `fix/...` for a bug fix.

## 3. GitHub — the shared shelf
git runs on **your** computer. **GitHub** is a website that stores your git project in the cloud — so it's backed up, and others can see, copy, and contribute.

- *Analogy:* the public shelf you put your project on for the world.
- This project is **open source** (anyone may read it), so every file *and* its whole history are public — on purpose. That's the mission: people learn by reading exactly how it was built. We call this **building in the open**.

## 4. Pull requests — proposing a change for review
When a branch is ready, you open a **pull request** (PR): *"here are my changes — please review them and pull them into the main version."* It's a **proposal** that people (and the automated checks from Lesson 4) look over *before* it's accepted.

- *Analogy:* handing an editor your draft edits to approve before they go into the final, published document.
- On this project, **merging the PR** — folding the branch back into the main version (the "merge" from §2) — **is the moment a change actually ships.** That's the next lesson.

## 5. Who actually types all this?
**You don't.** Claude Code runs the git and GitHub commands for you — committing, branching, pushing, opening PRs. The reason to understand them anyway: so you know what's happening at each step — where your save points are, that experiments are safe on a branch, and that nothing ships without passing through a reviewable proposal. That's the difference between directing the build and just watching it.

---

## See it in the real project
| Idea | In this project |
|---|---|
| Snapshots with notes (commits) | every change, with a `feat:`/`fix:`/`docs:` message |
| A safe branch per feature | `feat/design-system`, `feat/byok-keys`, … |
| The shared shelf (public) | `github.com/cosmicbubble898/ai-aggregator` |
| Proposals for review | the repo's pull requests (PRs) |

**Next:** *Shipping it* — how a reviewed change travels from your laptop to a live website that anyone can open (the deploy pipeline). *(coming)*
