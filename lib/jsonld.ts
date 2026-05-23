// JSON-LD structured data — invisible, machine-readable descriptions of each
// page that search engines and AI engines read to understand (and cite) the
// site. Everything is generated from lib/site.ts + the lessons, so it never
// drifts from the real content. Rendered via app/components/JsonLd.tsx. See
// ADR-0012.
//
// (FAQPage is intentionally NOT here yet — it needs the on-page FAQ content,
// which is a design-gated item awaiting owner sign-off.)
import { SITE_URL, SITE_NAME, GITHUB_URL, SITE_DESCRIPTION } from "@/lib/site";
import type { LessonMeta } from "@/lib/lessons";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;
const LICENSE = "https://opensource.org/licenses/MIT";
const COURSE_NAME = `Learn by building this — ${SITE_NAME}`;
const LEARN_DESCRIPTION =
  "Learn how this app is built, in plain English — the same lessons that live in the repo.";

// A self-contained reference to the publisher org (carries name + url inline so
// it stays valid on pages where the full Organization node isn't present).
const orgRef = {
  "@id": ORG_ID,
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
} as const;

// Home: the app itself + the organization + the website, cross-linked in one graph.
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: [GITHUB_URL],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        license: LICENSE,
        codeRepository: GITHUB_URL,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

// Learn index: a free Course whose parts are the individual lessons.
export function learnJsonLd(lessons: LessonMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: COURSE_NAME,
    description: LEARN_DESCRIPTION,
    url: `${SITE_URL}/learn`,
    inLanguage: "en",
    isAccessibleForFree: true,
    provider: orgRef,
    hasPart: lessons.map((lesson) => ({
      "@type": "LearningResource",
      name: lesson.title,
      url: `${SITE_URL}/learn/${lesson.slug}`,
      ...(lesson.summary ? { description: lesson.summary } : {}),
    })),
  };
}

// A lesson: an Article that's part of the Course, plus a breadcrumb trail.
export function lessonJsonLd(lesson: LessonMeta) {
  const url = `${SITE_URL}/learn/${lesson.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: lesson.title,
        ...(lesson.summary ? { description: lesson.summary } : {}),
        url,
        mainEntityOfPage: url,
        image: OG_IMAGE,
        dateModified: lesson.lastModified,
        inLanguage: "en",
        author: orgRef,
        publisher: orgRef,
        isPartOf: {
          "@type": "Course",
          name: COURSE_NAME,
          url: `${SITE_URL}/learn`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Learn",
            item: `${SITE_URL}/learn`,
          },
          { "@type": "ListItem", position: 3, name: lesson.title, item: url },
        ],
      },
    ],
  };
}
