// TRAVEL RAVERS: GUIDES HUB — /guides
// Uses the Velvet releases/videos grid pattern for guide articles.
// Rendering delegated to GuideCard.
import { motion } from "framer-motion";
import { guides } from "@/data/content";
import { usePageMeta } from "@/hooks/use-page-meta";
import GuideCard from "@/components/GuideCard";

export default function GuidesPage() {
  usePageMeta(
    "Festival Travel Guides — Tips, Packing Lists & Deep Dives",
    "Expert advice for ravers. First-time tips, packing lists, festival deep-dives, and travel logistics.",
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
            Guides
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Expert advice from experienced ravers. First-time tips, packing intel, festival deep-dives, and travel logistics.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", "First Time Abroad", "Packing & Gear", "Festival Deep Dives", "Money & Logistics"].map((cat) => (
            <button
              key={cat}
              className={`tr-status-pill border transition-colors ${
                cat === "All"
                  ? "bg-tr-cyan/15 text-tr-cyan border-tr-cyan/30"
                  : "bg-secondary text-muted-foreground border-border hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="content-grid">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GuideCard
                title={guide.title}
                slug={guide.slug}
                excerpt={guide.excerpt}
                category={guide.category}
                readingTime={guide.readTime}
                coverImage={guide.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
