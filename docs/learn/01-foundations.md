# Foundations — the absolute basics

*The plain-English version. No coding background needed. We give an analogy for each idea, then show how it shows up in **this actual project**.*

> **You don't need to memorize any of this to build the app.** Claude Code does the typing and the commands. But understanding *what the pieces are* makes you the director instead of a passenger.

## 1. Hardware vs. software
- **Hardware** is the physical stuff — the actual computer, its chips, memory, and disk. The "body."
- **Software** is the instructions that run on it — apps, websites, code. The "thoughts."

Software always needs *some* hardware to run on. The only real question is *whose* hardware: yours, or someone else's.

## 2. Your laptop vs. "the cloud"
When you run a program on your own computer, it runs on **your hardware** — only you can use it, and only while your computer is on.

**"The cloud"** just means *someone else's computers, in a data center, that are always on and reachable over the internet.* That's the whole trick. "Putting it in the cloud" = running your software on an always-on computer **anyone can reach**, instead of only your laptop.

## 3. What is a server?
A **server** is one of those always-on computers, running your software, waiting to *serve* whoever visits.
- **Analogy:** your laptop running the app is like **cooking dinner just for yourself at home**. A server is a **restaurant kitchen** — always staffed, cooking for whoever walks in.
- **In this project:** our server code runs on **Vercel** (§8). When someone opens the app, Vercel's computer runs our code and sends back the page.

## 4. Frontend vs. backend
Every web app has two halves:
- **Frontend** = what you see and click in the browser — buttons, text, images. The **dining room**.
- **Backend** = the part you *don't* see, running on the server — it checks who you are, talks to databases, calls other services, and holds secrets. The **kitchen**.
- You (the customer) only ever touch the dining room; the kitchen does the real work out of sight.
- **In this project:** both halves are built with **Next.js** — the chat screen is frontend; the code that talks to the AI providers with your secret key is backend.

## 5. Where data lives: database vs. file storage
Apps need to *remember* things, and there are two kinds of memory:
- A **database** (we use **Neon**) is a **filing cabinet** — neat, searchable records: who the users are, their settings, the text of their chats. Small, structured, fast to look up.
- **File storage** (we use **Cloudflare R2**) is a **warehouse** — for big items: the actual image and video *files*. You don't cram a video into a filing cabinet; you put it in the warehouse and keep a *slip of paper* (its location) in the cabinet.

So: Neon holds the slips and the small stuff; R2 holds the big files.

## 6. What is an API?
An **API** is just a **menu** one program offers to another: "here's what you can ask me to do, and how to ask."
- When our backend wants an image, it doesn't build an AI model — it **orders off the provider's menu** (their API): "make an image of X," and gets the result back.
- That's the heart of an **aggregator**: one app that orders from *many* providers' menus and brings the results together.

## 7. Putting it together — what "the cloud" really is
A real cloud app is just these pieces, each on someone-else's always-on hardware:

```
your browser (frontend) → a server (backend) → a database + file storage → other companies' APIs
```

None of it is magic — it's specialized boxes connected by the internet.

## 8. Hosting — getting your app onto a server
**Hosting** = a company runs your app on their servers and keeps it reachable at a web address (often free to start).
- We use **Vercel**: you give it your code, it runs it and gives you a public URL. No physical machine to manage.

## 9. git and GitHub — the save system + the shared shelf
- **git** is a **save system with a timeline**: it records snapshots of your whole project, so you can see what changed and roll back. Like "track changes," but for an entire project, with full history.
- **GitHub** is a website that stores your git project in the cloud so others can see, copy, and contribute. The **public shelf** you put your project on.
- *(You won't type git commands — Claude Code does. But now you know what's happening when it "commits" and "pushes.")*

---

## See it in the real project
Everything above is live in this repo:

| Concept | In this project |
|---|---|
| Frontend + backend | **Next.js** (the `app/` folder) |
| Server / hosting | **Vercel** |
| Database | **Neon** |
| File storage | **Cloudflare R2** |
| Provider APIs | **OpenRouter** + **AtlasCloud** |
| Save system + shared shelf | **git** + **GitHub** |

Want the deeper "how it all connects" version? Read [`../architecture.md`](../architecture.md). Want to know *why* each piece was chosen? The [`../adr/`](../adr) folder explains every decision.

**Next:** the AI side — what a model is, what an *agent* is, and why an aggregator. *(coming soon)*
