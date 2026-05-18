// TRAVEL RAVERS: MERCH STORE — /merch
// Adapted from Velvet's merch grid with external purchase links.
// Rendering delegated to MerchCard.
import { motion } from "framer-motion";
import { merchProducts } from "@/data/content";
import { usePageMeta } from "@/hooks/use-page-meta";
import MerchCard from "@/components/MerchCard";

export default function MerchPage() {
  usePageMeta(
    "Merch",
    "Official Travel Ravers merchandise. Tees, hoodies, accessories, and festival-ready gear.",
  );

  return (
    <div className="page-container">
      <div className="page-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Merch
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Rep the signal. Festival-tested apparel, accessories, and digital tools designed by ravers, for ravers.
          </p>
        </motion.div>

        <div className="content-grid">
          {merchProducts.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <MerchCard
                title={product.title}
                slug={product.slug}
                category={product.category}
                description={product.description}
                image={product.image}
                price={product.price}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
