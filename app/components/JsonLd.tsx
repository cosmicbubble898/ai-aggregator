// Renders a JSON-LD structured-data block into the page. Search/AI engines read
// it; people never see it. The `<` → `<` escape prevents the JSON from ever
// closing the <script> tag early (a standard safety step). Data comes from
// lib/jsonld.ts (generated from lib/site.ts + the lessons).
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
