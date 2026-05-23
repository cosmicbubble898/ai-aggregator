import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getLessons } from "@/lib/lessons";

// The sitemap lists every public, indexable URL so search engines can find and
// re-crawl them. Lesson entries are built from getLessons(), so a new lesson
// appears here automatically (single source of truth). Private/utility routes
// are intentionally absent (and blocked in robots.ts). Sitemap URLs must be
// absolute, so they flow from SITE_URL — one constant for the custom-domain swap.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lessons = await getLessons();

  const lessonEntries: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${SITE_URL}/learn/${lesson.slug}`,
    lastModified: lesson.lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...lessonEntries,
  ];
}
