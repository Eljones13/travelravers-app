// TRAVEL RAVERS: FESTIVALS HUB — /festivals
// Merges content.ts (rich) and csvFestivals.ts (CSV) into one unified listing.
// Deduplication: if a slug exists in both, the content.ts version wins (richer data).
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarCheck, CalendarDays } from "lucide-react";
import { festivals as richFestivals } from "@/data/content";
import { csvFestivals, type CsvFestival } from "@/data/csvFestivals";
import { mockFestivals } from "@/data/mockFestivals";
import { usePageMeta } from "@/hooks/use-page-meta";
import FestivalCard from "@/components/FestivalCard";
import FestivalHeroCard from "@/components/home/FestivalHeroCard";
import SectionHeader from "@/components/SectionHeader";

const FILTERS = ["All", "UK", "Europe", "Global", "Camping", "City", "First-Timer Friendly"] as const;
type Filter = (typeof FILTERS)[number];

// Active color per filter — maps to brand color roles
const filterActiveClass: Record<Filter, string> = {
  "All":                   "bg-tr-cyan/15   text-tr-cyan   border-tr-cyan/40",
  "UK":                    "bg-tr-cyan/15   text-tr-cyan   border-tr-cyan/40",
  "Europe":                "bg-tr-green/15  text-tr-green  border-tr-green/40",
  "Global":                "bg-tr-purple/15 text-tr-purple border-tr-purple/40",
  "Camping":               "bg-tr-cyan/15   text-tr-cyan   border-tr-cyan/40",
  "City":                  "bg-tr-cyan/15   text-tr-cyan   border-tr-cyan/40",
  "First-Timer Friendly":  "bg-tr-green/15  text-tr-green  border-tr-green/40",
};

// ── Normalise a CsvFestival into FestivalCard's prop shape ────────────────────
function csvToCardProps(f: CsvFestival) {
  // Derive region from country
  const ukCountries = ["uk", "united kingdom", "england", "scotland", "wales"];
  const euCountries = ["belgium", "germany", "france", "spain", "croatia", "netherlands",
                       "italy", "serbia", "hungary", "romania"];
  const countryLower = f.country.toLowerCase();
  const region: "uk" | "eu" | "global" = ukCountries.includes(countryLower)
    ? "uk"
    : euCountries.includes(countryLower)
    ? "eu"
    : "global";

  return {
    slug: f.slug,
    name: f.festivalName,
    country: f.country,
    city: f.location.split(",")[0].trim(),
    dates: f.dates,
    genres: f.genre.split(" / ").map((g) => g.trim()),
    vibeTag: f.genre.split(" / ")[0].trim(),
    status: "on-sale" as const,
    image: f.imageUrl,
    firstTimerFriendly: false,
    region,
    camping: f.camping,
    officialSiteOnly: f.skiddleTicketUrl === "NO_SKIDDLE",
  };
}

export default function FestivalsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  // Build the combined list — rich festivals first, then CSV-only festivals
  // Dedup: skip CSV entries whose slug is already in richFestivals
  const richSlugs = useMemo(() => new Set(richFestivals.map((f) => f.slug)), []);

  const csvOnly = useMemo(
    () => csvFestivals.filter((f) => !richSlugs.has(f.slug)).map(csvToCardProps),
    [richSlugs],
  );

  // Unified list for filtering
  type CardData = typeof csvOnly[number];
  const allCards: CardData[] = useMemo(() => [
    ...richFestivals.map((f) => ({
      slug: f.slug,
      name: f.name,
      country: f.country,
      city: f.city,
      dates: f.dates,
      genres: f.genres,
      vibeTag: f.vibe,
      status: f.status,
      image: f.image,
      firstTimerFriendly: f.firstTimerFriendly,
      region: f.region as "uk" | "eu" | "global",
      camping: f.type === "camping",
      officialSiteOnly: f.officialSiteOnly ?? false,
    })),
    ...csvOnly,
  ], [csvOnly]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return allCards;
    if (activeFilter === "UK") return allCards.filter((f) => f.region === "uk");
    if (activeFilter === "Europe") return allCards.filter((f) => f.region === "eu");
    if (activeFilter === "Global") return allCards.filter((f) => f.region === "global");
    if (activeFilter === "Camping") return allCards.filter((f) => f.camping);
    if (activeFilter === "City") return allCards.filter((f) => !f.camping);
    if (activeFilter === "First-Timer Friendly") return allCards.filter((f) => f.firstTimerFriendly);
    return allCards;
  }, [activeFilter, allCards]);

  usePageMeta(
    "Electronic Music Festivals 2026 — UK, Europe & Beyond",
    "Discover the best electronic music festivals in the UK, Europe, and beyond. Travel guides, packing tips, and survival advice for every major festival in 2026.",
    undefined,
    "https://travelravers.com/festivals",
  );

  const featuredMock = useMemo(() => mockFestivals.filter((f) => f.isFeatured), []);

  return (
    <div className="page-container">
      <div className="page-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <SectionHeader
              eyebrow="2026 Season"
              heading="Electronic Music Festivals 2026 — UK, Europe & Beyond"
              size="lg"
            />
            <Link
              to="/my-weekends"
              className="flex-shrink-0 inline-flex items-center gap-2 btn-secondary text-xs"
            >
              <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />
              My Plans
            </Link>
          </div>
          <p className="text-muted-foreground text-base mt-3 max-w-2xl">
            Major electronic music festivals across the UK, Europe, and beyond. Each guide includes travel intel, packing tips, and survival advice.
          </p>
        </motion.div>

        {/* ── FEATURED STRIP ── */}
        {featuredMock.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
            aria-label="Featured festivals"
          >
            <p className="label-caps text-[0.6rem] text-muted-foreground/50 mb-3">
              Featured picks
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featuredMock.map((fest) => (
                <FestivalHeroCard key={fest.id} festival={fest} slug={fest.id} />
              ))}
            </div>
          </motion.section>
        )}

        {/* ── FILTER BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="label-caps text-[0.6rem] text-muted-foreground/50">
              Filter by region / type
            </p>
            <Link
              to="/calendar"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-cyan/60 hover:text-tr-cyan transition-colors"
            >
              <CalendarDays className="w-3 h-3" aria-hidden="true" />
              Calendar view →
            </Link>
          </div>
          <div
            className="flex flex-wrap gap-2 pb-5 border-b border-border/40"
            role="group"
            aria-label="Filter festivals"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`tr-status-pill border transition-all duration-200 ${
                    isActive
                      ? filterActiveClass[filter]
                      : "bg-secondary text-muted-foreground border-border hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── FESTIVAL LIST ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground text-sm py-12 text-center"
            >
              No festivals match that filter yet — more are being added.
            </motion.p>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {filtered.map((fest, i) => (
                <motion.div
                  key={fest.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <FestivalCard
                    name={fest.name}
                    slug={fest.slug}
                    country={fest.country}
                    city={fest.city}
                    dates={fest.dates}
                    genres={fest.genres}
                    vibeTag={fest.vibeTag}
                    status={fest.status}
                    image={fest.image}
                    firstTimerFriendly={fest.firstTimerFriendly}
                    officialSiteOnly={fest.officialSiteOnly}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
