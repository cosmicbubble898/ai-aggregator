import type { Metadata } from "next";
import Link from "next/link";
import { getLessons } from "@/lib/lessons";
import styles from "./learn.module.css";

export const metadata: Metadata = {
  title: "Learn — AI Aggregator",
  description:
    "Learn how this app is built, in plain English — the same lessons that live in the repo.",
};

// The Learn index: every lesson, in order, read from docs/learn at build time.
export default async function LearnIndex() {
  const lessons = await getLessons();

  return (
    <main className={styles.page}>
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
