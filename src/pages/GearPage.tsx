// TRAVEL RAVERS: PACKING & GEAR HUB — /gear
// Affiliate-ready product grid with category cards.
// Product tile rendering delegated to ProductCard.
// When a festival is focused, a priority gear section is surfaced at the top.
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Tent, Droplets, Shirt, Battery, Heart, Backpack } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";
import { gearCategories } from "@/data/content";
import { festivalGear } from "@/data/festivalGear";
import type { FestivalMeta } from "@/context/FestivalFocusContext";
import { useFestivalFocus } from "@/context/FestivalFocusContext";
import gearFlatlay from "@/assets/gear-flatlay.jpg";
import { usePageMeta } from "@/hooks/use-page-meta";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

// ── Gear profile logic ────────────────────────────────────────────────────────

const HOT_COUNTRIES = new Set([
  "Croatia", "Spain", "Malta", "Portugal", "Serbia",
  "Montenegro", "Greece", "Italy", "Hungary",
]);

interface GearProfile {
  headline: string;
  categories: string[];
  tip: string;
}

function getGearProfile(meta: FestivalMeta): GearProfile {
  const isHot = meta.heatrisk === 1 || HOT_COUNTRIES.has(meta.country);
  const isCamping = meta.festivalType === "camping" || meta.isCamping === true;
  const isUK = meta.country === "UK" || meta.country === "Scotland";
  const isMuddy = meta.mudrisk === 1 || isUK;

  if (isMuddy && isCamping) {
    return {
      headline: "UK camping festival — wet, cold nights expected",
      categories: ["Camping & Shelter", "Weather & Survival", "Tech & Power"],
      tip: "Pack wellies, waterproofs, and a warm sleeping bag first. UK August nights are colder than you think.",
    };
  }
  if (isHot && isCamping) {
    return {
      headline: "Beach / Mediterranean camping — heat and sun protection critical",
      categories: ["Health & Hygiene", "Food & Drink", "Weather & Survival"],
      tip: "Sun cream SPF50+, electrolyte tablets, and a hydration pack are non-negotiable in 30°C+ heat.",
    };
  }
  if (isHot) {
    return {
      headline: "Mediterranean festival — stay hydrated and protected",
      categories: ["Health & Hygiene", "Food & Drink", "Bags & Storage"],
      tip: "Lightweight day bag, sun protection, and a portable charger are your three priorities.",
    };
  }
  if (isCamping) {
    return {
      headline: "European camping festival — pack smart",
      categories: ["Camping & Shelter", "Bags & Storage", "Tech & Power"],
      tip: "Travel adapters, a compact tent, and a solid bumbag are the foundation of any EU camping trip.",
    };
  }
  return {
    headline: "City / non-camping festival",
    categories: ["Bags & Storage", "Tech & Power", "Safety & First Aid"],
    tip: "No camping gear needed — focus on a good day bag, portable power, and safety basics.",
  };
}

const categoryIcons: Record<string, typeof Tent> = {
  "tent":     Tent,
  "backpack": Backpack,
  "droplets": Droplets,
  "shirt":    Shirt,
  "battery":  Battery,
  "heart":    Heart,
};

export default function GearPage() {
  const { selectedMeta } = useFestivalFocus();

  usePageMeta(
    "Festival Packing List 2026 — Gear & Essentials",
    "The ultimate festival packing list. Tents, hydration packs, earplugs, tech, and festival-tested gear recommendations with affiliate links.",
    undefined,
    "https://travelravers.com/gear",
  );

  // Derive festival gear profile and priority products when a festival is focused
  const gearProfile = selectedMeta ? getGearProfile(selectedMeta) : null;
  const priorityProducts = gearProfile
    ? festivalGear
        .filter((p) => gearProfile.categories.includes(p.category))
        .slice(0, 4)
    : [];

  return (
    <div className="page-container">
      <div className="page-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Festival Packing List & Gear Guide
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Most festival regrets are packing failures. These are the products that hold up across four days of mud, heat, and 3am chaos — tested at real festivals, not in a warehouse.
          </p>
        </motion.div>

        {/* Email capture — replaces app CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <EmailCapture
            heading="Get the packing list before you need it"
            subheading="We'll send the full festival-specific checklist + gear picks before each event. No spam."
          />
        </motion.div>

        {/* ── Festival Focus: priority gear section ── */}
        {selectedMeta && gearProfile && priorityProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mb-12"
            aria-label={`Priority gear for ${selectedMeta.name}`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
              <div>
                <p className="label-caps text-[0.55rem] text-tr-cyan/55 mb-1">
                  Festival Focus
                </p>
                <h2 className="font-display text-base sm:text-lg font-bold uppercase tracking-wide text-foreground">
                  Priority Gear for {selectedMeta.name}
                </h2>
                <p className="text-foreground/50 text-xs sm:text-sm mt-1">
                  {gearProfile.headline}
                </p>
              </div>
              <Link
                to={`/festivals/${selectedMeta.slug}`}
                className="
                  flex-shrink-0 self-start sm:self-auto
                  label-caps text-[0.55rem] text-tr-cyan/60
                  hover:text-tr-cyan transition-colors
                  min-h-[44px] flex items-center
                "
              >
                Full packing list →
              </Link>
            </div>

            {/* Tip callout — promoted to display size */}
            <p className="font-display text-base sm:text-lg font-bold text-foreground/80 border-l-4 border-tr-cyan/40 pl-4 mb-5 leading-snug uppercase tracking-wide">
              {gearProfile.tip}
            </p>

            {/* Priority product grid — 2-col on mobile, 4-col on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {priorityProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                >
                  <ProductCard
                    title={product.name}
                    description={product.description}
                    image={gearFlatlay}
                    affiliateUrl={product.amazonUkUrl}
                    affiliateLabel="View on Amazon"
                    category={product.category}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Featured packing lists */}
        <section className="mb-12">
          <SectionHeader heading="Featured Packing Lists" className="mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Tomorrowland", "Creamfields", "Ultra Europe", "EDC Las Vegas", "Terminal V"].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              >
                <Link
                  to="/guides/ultimate-festival-packing-list"
                  className="glass-card-hover p-4 flex items-center justify-between group"
                >
                  <span className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">
                    {name} Packing List
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/50 transition-colors" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category cards */}
        <section className="mb-12">
          <SectionHeader heading="Shop by Category" className="mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {gearCategories.map((cat, i) => {
              const Icon = categoryIcons[cat.icon] || Tent;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="glass-card-hover p-4 text-center cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-tr-cyan mx-auto mb-2" aria-hidden="true" />
                  <p className="font-display text-[0.6rem] font-semibold text-foreground uppercase tracking-wider">
                    {cat.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Breadcrumb + gear product schema */}
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://travelravers.com" },
            { name: "Packing & Gear", url: "https://travelravers.com/gear" },
          ]}
        />
        {/* Gear product grid — affiliate-ready */}
        {/* TRAVEL RAVERS: PRODUCT SCHEMA INJECTION POINT */}
        <SchemaScript
          schema={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Festival Gear Recommendations",
            description: "Festival-tested gear for ravers",
            itemListElement: festivalGear.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              description: p.description,
            })),
          }}
        />
        <section>
          <SectionHeader heading="Gear Recommendations" className="mb-6" />
          <div className="content-grid">
            {festivalGear.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <ProductCard
                  title={product.name}
                  description={product.description}
                  image={gearFlatlay}
                  affiliateUrl={product.amazonUkUrl}
                  affiliateLabel="🏆 See Best Sellers"
                  category={product.category}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
