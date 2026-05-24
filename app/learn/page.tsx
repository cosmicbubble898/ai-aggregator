import type { Metadata } from "next";
import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import { learnJsonLd } from "@/lib/jsonld";
import { JsonLd } from "../components/JsonLd";
import styles from "./learn.module.css";

// Title is just "Learn" — the root layout's template appends "— AI Aggregator".
const LEARN_DESCRIPTION =
  "Learn how this app is built, in plain English — the same lessons that live in the repo.";

export const metadata: Metadata = {
  title: "Learn",
  description: LEARN_DESCRIPTION,
  alternates: { canonical: "/learn" },
  // openGraph/twitter must repeat the share image + title here: defining them on
  // a page REPLACES (not merges with) the root layout's, so the inherited
  // file-based image and root twitter text would otherwise vanish. See ADR-0012.
  openGraph: {
    type: "website",
    title: "Learn — AI Aggregator",
    description: LEARN_DESCRIPTION,
    url: "/learn",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn — AI Aggregator",
    description: LEARN_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

// The Learn index: every lesson, in order, read from docs/learn at build time.
export default async function LearnIndex() {
  const lessons = await getLessons();

  return (
    <main className={styles.page}>
      <JsonLd data={learnJsonLd(lessons)} />
      <Link href="/" className={styles.back}>
        ← Home
      </Link>
      <h1 className={styles.title}>Learn by building this</h1>
      <p className={styles.lead}>
        The same lessons that live in the repo, in order — plain English, zero
        background needed. Want to go deeper on anything? Just ask the AI.
      </p>

      <ol className={styles.list}>
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link href={`/learn/${lesson.slug}`} className={styles.card}>
              <span className={styles.num}>{lesson.number}</span>
              <span className={styles.cardText}>
                <span className={styles.cardTitle}>{lesson.title}</span>
                {lesson.summary && (
                  <span className={styles.cardSummary}>{lesson.summary}</span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
