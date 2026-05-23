import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLesson, getLessons } from "@/lib/lessons";
import styles from "../learn.module.css";

// Only the real lessons exist as routes; any other slug 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const lessons = await getLessons();
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLesson(slug);
  return lesson ? { title: `${lesson.meta.title} — Learn` } : {};
}

const REPO_BLOB =
  "https://github.com/cosmicbubble898/ai-aggregator/blob/main/";

// Resolve a link written relative to docs/learn/ into a repo path (handles `..`).
function resolveFromLearn(relativePath: string): string {
  const stack = ["docs", "learn"];
  for (const part of relativePath.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return stack.join("/");
}

// The lessons link to each other and to other repo files using markdown paths
// (e.g. `02-the-ai-side.md`, `../prd/phase-1.md`). Rewrite them so they work in
// the app: a sibling lesson becomes its /learn route; any other repo file points
// at GitHub; real external links open in a new tab.
function MdLink({ href, children }: ComponentPropsWithoutRef<"a">) {
  if (!href) return <>{children}</>;

  if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  const sibling = href.match(/^(\d{2}-[a-z0-9-]+)\.md(#.*)?$/);
  if (sibling) {
    return <Link href={`/learn/${sibling[1]}${sibling[2] ?? ""}`}>{children}</Link>;
  }

  const [pathPart, hash] = href.split("#");
  const gh = REPO_BLOB + resolveFromLearn(pathPart) + (hash ? `#${hash}` : "");
  return (
    <a href={gh} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await getLesson(slug);
  if (!lesson) notFound();

  const lessons = await getLessons();
  const index = lessons.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? lessons[index - 1] : null;
  const next =
    index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <main className={styles.page}>
      <Link href="/learn" className={styles.back}>
        ← All lessons
      </Link>

      <article className={styles.prose}>
        <Markdown remarkPlugins={[remarkGfm]} components={{ a: MdLink }}>
          {lesson.markdown}
        </Markdown>
      </article>

      <nav className={styles.lessonNav}>
        {prev ? (
          <Link href={`/learn/${prev.slug}`}>← {prev.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/learn/${next.slug}`}>{next.title} →</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
