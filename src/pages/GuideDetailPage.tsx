// TRAVEL RAVERS: GUIDE ARTICLE TEMPLATE — /guides/[slug]
// Owns: slug resolution, not-found fallback, per-page SEO.
// Rendering delegated to GuideArticleLayout.
import { useParams, Link } from "react-router-dom";
import { guides } from "@/data/content";
import { usePageMeta } from "@/hooks/use-page-meta";
import GuideArticleLayout from "@/components/GuideArticleLayout";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function GuideDetailPage() {
  const { slug } = useParams();
  const guide = guides.find((g) => g.slug === slug);

  // Hook must be called unconditionally — falls back gracefully when guide is undefined
  usePageMeta(
    guide ? guide.title : "Guide Not Found",
    guide ? guide.excerpt : "",
  );

  if (!guide) {
    return (
      <div className="page-container">
        <div className="page-inner text-center">
          <p className="text-muted-foreground">Guide not found.</p>
          <Link to="/guides" className="btn-primary mt-4 inline-flex">
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

  // TRAVEL RAVERS: ARTICLE SCHEMA INJECTION POINT
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "Guides", url: "https://travelravers.com/guides" },
          { name: guide.title, url: `https://travelravers.com/guides/${guide.slug}` },
        ]}
      />
      <SchemaScript
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: guide.title,
          description: guide.excerpt,
          author: {
            "@type": "Organization",
            name: "Travel Ravers",
          },
          publisher: {
            "@type": "Organization",
            name: "Travel Ravers",
            url: "https://travelravers.com",
          },
        }}
      />
      <GuideArticleLayout guide={guide} />
    </>
  );
}
