// TRAVEL RAVERS: Festival-specific gear page — /gear/:festivalSlug
// Products ordered: explicit festivalSlugs matches first, then tag-profile matches.
// Sets festival focus on mount so the global FestivalContextBanner updates.

import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Backpack } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useFestivalFocus } from "@/context/FestivalFocusContext";
import type { FestivalMeta } from "@/context/FestivalFocusContext";
import { festivalGear } from "@/data/festivalGear";
import { festivals } from "@/data/content";
import { getCsvFestivalBySlug } from "@/data/csvFestivals";
import ProductCard from "@/components/ProductCard";
import EmailCapture from "@/components/EmailCapture";
import gearFlatlay from "@/assets/gear-flatlay.jpg";

// ── Shared tag derivation ──────────────────────────────────────────────────────

const HOT_COUNTRIES = new Set([
  "Croatia", "Spain", "Malta", "Portugal", "Serbia",
  "Montenegro", "Greece", "Italy", "Hungary",
]);

function getRelevantTags(meta: FestivalMeta): Set<string> {
  const tags = new Set(["all"]);
  const isHot = meta.heatrisk === 1 || HOT_COUNTRIES.has(meta.country);
  const isCamping = meta.festivalType === "camping" || meta.isCamping === true;
  const isUK = meta.country === "UK" || meta.country === "Scotland";
  const isMuddy = meta.mudrisk === 1 || isUK;

  if (isMuddy && isCamping) {
    tags.add("uk-camping");
    tags.add("camping");
  } else if (isHot && isCamping) {
    tags.add("hot-weather");
    tags.add("camping");
    tags.add("croatia");
  } else if (isHot) {
    tags.add("hot-weather");
    tags.add("croatia");
  } else if (isCamping) {
    tags.add("camping");
    tags.add("eu-camping");
  } else {
    tags.add("city");
  }

  return tags;
}

function getIntro(meta: FestivalMeta | null, festivalName: string): string {
  if (!meta) return `Everything you need for ${festivalName} 2026.`;
  const isHot = meta.heatrisk === 1 || HOT_COUNTRIES.has(meta.country);
  const isCamping = meta.festivalType === "camping" || meta.isCamping === true;
  const isUK = meta.country === "UK" || meta.country === "Scotland";
  const isMuddy = meta.mudrisk === 1 || isUK;

  if (isMuddy && isCamping)
    return `${festivalName} is a UK camping festival. Expect mud, cold nights, and rain — these are the products that matter most.`;
  if (isHot && isCamping)
    return `${festivalName} is a hot-weather camping festival. Sun protection, hydration, and a lightweight setup are your priorities.`;
  if (isHot)
    return `${festivalName} is a Mediterranean festival. Pack light, stay hydrated, and protect yourself from the sun.`;
  if (isCamping)
    return `${festivalName} is a European camping festival. Pack smart — good kit makes the difference between a great trip and a miserable one.`;
  return `${festivalName} is a city festival. No camping kit needed — focus on a solid day bag, power, and comfort.`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FestivalGearPage() {
  const { festivalSlug } = useParams<{ festivalSlug: string }>();
  const { selectedMeta, setFocus } = useFestivalFocus();

  // Set festival focus on mount (failsafe for direct URL access)
  useEffect(() => {
    if (festivalSlug) setFocus(festivalSlug);
  }, [festivalSlug, setFocus]);

  // Resolve festival name immediately — don't wait for context
  const festivalName = useMemo(() => {
    if (!festivalSlug) return "This Festival";
    const rich = festivals.find((f) => f.slug === festivalSlug);
    if (rich) return rich.name;
    const csv = getCsvFestivalBySlug(festivalSlug);
    if (csv) return csv.festivalName;
    // Fallback: title-case the slug
    return festivalSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [festivalSlug]);

  usePageMeta(
    `${festivalName} Packing List & Gear 2026 — Travel Ravers`,
    `Festival gear tailored for ${festivalName} 2026. Tents, power banks, weather kit, and essentials selected for the climate and campsite.`,
  );

  // Derive tag filter from focused metadata
  const relevantTags = useMemo(
    () => (selectedMeta ? getRelevantTags(selectedMeta) : new Set(["all"])),
    [selectedMeta],
  );

  // Split: explicit slug matches first, then tag matches (no duplicates)
  const { explicitProducts, tagProducts } = useMemo(() => {
    if (!festivalSlug) return { explicitProducts: [], tagProducts: [] };
    const explicit = festivalGear.filter((p) =>
      p.festivalSlugs?.includes(festivalSlug),
    );
    const explicitIds = new Set(explicit.map((p) => p.id));
    const tagMatched = festivalGear.filter(
      (p) => !explicitIds.has(p.id) && p.tags.some((t) => relevantTags.has(t)),
    );
    return { explicitProducts: explicit, tagProducts: tagMatched };
  }, [festivalSlug, relevantTags]);

  const allProducts = [...explicitProducts, ...tagProducts];
  const intro = getIntro(selectedMeta, festivalName);

  return (
    <div className="page-container">
      <div className="page-inner">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-[0.65rem] font-display uppercase tracking-wider">
          <Link
            to={`/festivals/${festivalSlug}`}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-tr-cyan transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {festivalName}
          </Link>
          <span className="text-foreground/20" aria-hidden="true">·</span>
          <Link
            to="/gear"
            className="text-muted-foreground hover:text-tr-cyan transition-colors"
          >
            All Gear
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2 flex items-center gap-2">
            <Backpack className="w-3 h-3" aria-hidden="true" />
            Festival Gear Guide
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight leading-none mb-4">
            Gear for {festivalName}
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">{intro}</p>
        </motion.div>

        {/* Hand-picked products (explicit festivalSlugs match) */}
        {explicitProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12"
            aria-label={`Hand-picked gear for ${festivalName}`}
          >
            <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-4">
              Hand-picked for {festivalName}
            </p>
            <div className="content-grid">
              {explicitProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
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

        {/* Tag-profile matched products */}
        {tagProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-12"
            aria-label="Also recommended"
          >
            {explicitProducts.length > 0 && (
              <p className="label-caps text-[0.6rem] text-foreground/35 mb-4">
                Also recommended for this festival type
              </p>
            )}
            <div className="content-grid">
              {tagProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.03 }}
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

        {/* Empty state */}
        {allProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/40 text-sm mb-4">
              No gear recommendations yet for this festival.
            </p>
            <Link to="/gear" className="btn-primary text-xs">
              Browse All Gear
            </Link>
          </div>
        )}

        {/* Email capture */}
        <div className="mt-4">
          <EmailCapture
            heading={`Get the full ${festivalName} packing list`}
            subheading="We'll send the complete festival-specific checklist before the event."
          />
        </div>

      </div>
    </div>
  );
}
