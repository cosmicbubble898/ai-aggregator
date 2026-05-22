import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import ChatDemo from "./components/ChatDemo";
import styles from "./page.module.css";

// An image area on the page. When `src` is set it renders the real image
// (filling its aspect-ratio box); otherwise it shows a styled placeholder with
// a caption describing what image belongs there.
function MediaSlot({
  src,
  alt,
  caption,
  ratioClass,
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  caption: string;
  ratioClass: string;
  sizes: string;
  // `priority` opts the image out of lazy-loading — set it for the hero, which
  // is the page's largest above-the-fold image (its LCP element).
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`${styles.filledSlot} ${ratioClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.slotImg}
        />
      </div>
    );
  }
  return (
    <div className={`${styles.imageSlot} ${ratioClass}`}>
      <span>{caption}</span>
    </div>
  );
}

// The public landing page. It shows the product, demonstrates the design system,
// and lets a visitor sign in with Google (real auth). Image areas are styled
// placeholders for now — drop real images in later.

const GITHUB_URL = "https://github.com/cosmicbubble898/ai-aggregator";

const features: {
  title: string;
  blurb: string;
  slot: string;
  image?: string;
}[] = [
  {
    title: "Chat",
    blurb:
      "Talk to many models in one place — streaming replies, vision, and a model picker per conversation.",
    slot: "Chat interface preview",
  },
  {
    title: "Images",
    blurb:
      "Generate from a prompt or edit an existing image, with a focused studio for serious image work.",
    slot: "Generated image sample",
  },
  {
    title: "Video",
    blurb:
      "Bring ideas to motion with text-to-video and image-to-video, resilient to page refreshes.",
    slot: "Video frame sample",
  },
];

const steps = [
  { n: "1", title: "Sign in with Google", text: "One account, your own isolated workspace." },
  { n: "2", title: "Add your API keys", text: "Bring your own keys — encrypted at rest, never shared." },
  { n: "3", title: "Generate", text: "Everything you create is saved to your private history." },
];

export default async function Home() {
  const session = await auth();

  return (
    <div className={styles.page}>
      {/* ───────── Top nav ───────── */}
      <header className={styles.nav}>
        <span className={styles.brand}>AI Aggregator</span>
        <nav className={styles.navLinks}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {session?.user ? (
            <a className={styles.navCta} href="/dashboard">
              Open dashboard
            </a>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <button className={styles.navCta} type="submit">
                Sign in
              </button>
            </form>
          )}
        </nav>
      </header>

      <main>
        {/* ───────── Hero ───────── */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Open source · Bring your own keys</p>
            <h1 className={styles.heroTitle}>
              Every AI model, one calm workspace.
            </h1>
            <p className={styles.heroSubtitle}>
              Chat, image, and video generation from a single interface. Bring
              your own API keys, and own a private history of everything you
              create.
            </p>
            <div className={styles.heroActions}>
              {session?.user ? (
                <>
                  <a className={styles.primaryBtn} href="/dashboard">
                    Open dashboard
                  </a>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button className={styles.secondaryBtn} type="submit">
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google", { redirectTo: "/dashboard" });
                    }}
                  >
                    <button className={styles.primaryBtn} type="submit">
                      Sign in with Google
                    </button>
                  </form>
                  <a className={styles.secondaryBtn} href="#demo">
                    Try the demo
                  </a>
                </>
              )}
            </div>
            {session?.user && (
              <p className={styles.signedIn}>Signed in as {session.user.email}.</p>
            )}
          </div>
          <MediaSlot
            src="/generated/hero.jpeg"
            alt="Preview of the AI workspace — chat history, a conversation, and a context panel"
            caption="Hero image / product preview"
            ratioClass={styles.heroImage}
            sizes="(max-width: 860px) 100vw, 540px"
            priority
          />
        </section>

        {/* ───────── Features ───────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>One app, many models</h2>
          <p className={styles.sectionLead}>
            Stop juggling separate tools and subscriptions.
          </p>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.card}>
                <MediaSlot
                  src={feature.image}
                  alt={feature.slot}
                  caption={feature.slot}
                  ratioClass={styles.cardImage}
                  sizes="(max-width: 860px) 100vw, 340px"
                />
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardText}>{feature.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── How it works ───────── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionLead}>
            From a Google account to generating, in three steps.
          </p>
          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.n} className={styles.step}>
                <span className={styles.stepNumber}>{step.n}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.cardText}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Live demo chat ───────── */}
        <section id="demo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Try the feel</h2>
          <p className={styles.sectionLead}>
            A tiny taste of the chat interface — say hi.
          </p>
          <div className={styles.demoWrap}>
            <ChatDemo />
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className={styles.footer}>
        <span>AI Aggregator — open source (MIT), built in the open.</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
}
