// TRAVEL RAVERS: MERCH DETAIL PAGE — /merch/[slug]
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { merchProducts } from "@/data/content";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function MerchDetailPage() {
  const { slug } = useParams();
  const product = merchProducts.find((p) => p.slug === slug);

  // Hook must be called unconditionally — falls back gracefully when product is undefined
  usePageMeta(
    product ? `${product.title} — TR Merch` : "Product Not Found",
    product ? product.description : "",
  );

  if (!product) {
    return (
      <div className="page-container">
        <div className="page-inner text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/merch" className="btn-primary mt-4 inline-flex">Back to Merch</Link>
        </div>
      </div>
    );
  }

  // TRAVEL RAVERS: PRODUCT SCHEMA INJECTION POINT
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "Merch", url: "https://travelravers.com/merch" },
          { name: product.title, url: `https://travelravers.com/merch/${product.slug}` },
        ]}
      />
      <SchemaScript
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          brand: {
            "@type": "Brand",
            name: "Travel Ravers",
          },
        }}
      />
    <article className="page-container">
      <div className="page-inner">
        <Link to="/merch" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Merch
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start space-y-8 order-2 lg:order-1">
            <div>
              <span className="tr-status-pill bg-secondary text-muted-foreground border border-border mb-4 inline-flex">{product.category}</span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wider">{product.title}</h1>
              <p className="text-foreground text-2xl font-bold">{product.price}</p>
            </div>

            <p className="text-foreground/70 leading-relaxed">{product.description}</p>

            <div>
              <h3 className="label-caps mb-4">Purchase</h3>
              <a
                href={product.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover flex items-center justify-between p-4 group"
              >
                <span className="text-foreground font-medium">Buy from Store</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-semibold text-sm">{product.price}</span>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </a>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="space-y-4 order-1 lg:order-2">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </article>
    </>
  );
}
