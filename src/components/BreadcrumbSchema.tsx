// TRAVEL RAVERS: BREADCRUMB SCHEMA — site-wide BreadcrumbList JSON-LD
// Wraps SchemaScript with a BreadcrumbList shape.
// Props: items — ordered array of { name, url } from root to current page.

import SchemaScript from "@/components/SchemaScript";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return (
    <SchemaScript
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
