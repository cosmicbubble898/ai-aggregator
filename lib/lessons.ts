// Reads the learning lessons straight from `docs/learn/*.md` — the SAME files
// shown on GitHub — so the in-app Learn section and the repo never drift (single
// source of truth). This runs at BUILD time (Server Components + generateStaticParams),
// so the markdown is read once and baked into static pages; nothing reads the
// filesystem at runtime. Importing `node:fs` also keeps this server-only.
import { promises as fs } from "node:fs";
import path from "node:path";

const LESSONS_DIR = path.join(process.cwd(), "docs", "learn");

// Numbered files (e.g. `00-zero-before-foundations.md`) are lessons.
// `README.md` and `WRITING-GUIDE.md` are not, so they're excluded.
const LESSON_FILE = /^(\d{2})-[a-z0-9-]+\.md$/;

export type LessonMeta = {
  slug: string; // filename without ".md", used as the /learn/<slug> route
  number: string; // the leading "00".."99"
  title: string; // from the first "# " heading
  summary: string; // the opening italic line, as plain text
  lastModified: string; // the .md file's modified time (ISO), for the sitemap's <lastmod>
};

function parseTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

// Our lessons open with a one-line italic summary (*like this*). Pull it out for
// the index cards, stripping the surrounding/inner markdown emphasis.
function parseSummary(markdown: string): string {
  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("*") && !line.startsWith("**") && line.endsWith("*")) {
      return line
        .slice(1, -1)
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) -> text
        .replace(/[*_`]/g, "") // strip emphasis / code marks
        .replace(/\s+/g, " ")
        .trim();
    }
  }
  return "";
}

function metaFromMarkdown(
  slug: string,
  markdown: string,
  lastModified: string,
): LessonMeta {
  return {
    slug,
    number: slug.slice(0, 2),
    title: parseTitle(markdown),
    summary: parseSummary(markdown),
    lastModified,
  };
}

/** Every lesson, in curriculum (filename) order. */
export async function getLessons(): Promise<LessonMeta[]> {
  const files = (await fs.readdir(LESSONS_DIR))
    .filter((f) => LESSON_FILE.test(f))
    .sort();
  return Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(LESSONS_DIR, file);
      const [markdown, stat] = await Promise.all([
        fs.readFile(fullPath, "utf8"),
        fs.stat(fullPath),
      ]);
      return metaFromMarkdown(
        file.replace(/\.md$/, ""),
        markdown,
        stat.mtime.toISOString(),
      );
    }),
  );
}

/** One lesson's metadata + raw markdown, or null if the slug isn't a real lesson. */
export async function getLesson(
  slug: string,
): Promise<{ meta: LessonMeta; markdown: string } | null> {
  if (!LESSON_FILE.test(`${slug}.md`)) return null;
  try {
    const fullPath = path.join(LESSONS_DIR, `${slug}.md`);
    const [markdown, stat] = await Promise.all([
      fs.readFile(fullPath, "utf8"),
      fs.stat(fullPath),
    ]);
    return {
      meta: metaFromMarkdown(slug, markdown, stat.mtime.toISOString()),
      markdown,
    };
  } catch {
    return null;
  }
}
