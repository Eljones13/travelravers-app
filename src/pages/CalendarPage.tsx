// TRAVEL RAVERS: FESTIVAL CALENDAR 2026 — /calendar
// Monthly grid showing all festivals plotted by date.
// Merges content.ts (rich) + csvFestivals.ts (CSV), deduplicated by slug.
// Parses the `dates` string field to extract month(s) for placement.
// Terminal V ("Apr/Oct 2026") appears in both April and October.
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, LayoutList } from "lucide-react";
import { festivals } from "@/data/content";
import { csvFestivals } from "@/data/csvFestivals";
import { usePageMeta } from "@/hooks/use-page-meta";
import SectionHeader from "@/components/SectionHeader";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

// Short names match the abbreviations used in the dates field
const MONTH_ABBREVS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Returns 0-based month indices extracted from a dates string.
 *  Handles "Jul 18–27, 2026", "Sep 5, 2026", and "Apr/Oct 2026". */
function getMonthIndices(dates: string): number[] {
  const matches = dates.match(/[A-Z][a-z]{2}/g) ?? [];
  return matches
    .map((m) => MONTH_ABBREVS.indexOf(m))
    .filter((i) => i !== -1);
}

type Region = "uk" | "eu" | "global";

// Region → pill colour classes (UK=cyan, Europe=green, Global=purple)
const regionPillClass: Record<Region, string> = {
  uk:     "border-tr-cyan/40   bg-tr-cyan/10   text-tr-cyan   hover:bg-tr-cyan/20",
  eu:     "border-tr-green/40  bg-tr-green/10  text-tr-green  hover:bg-tr-green/20",
  global: "border-tr-purple/40 bg-tr-purple/10 text-tr-purple hover:bg-tr-purple/20",
};

const regionLabel: Record<Region, string> = {
  uk: "UK", eu: "Europe", global: "Global",
};

// Unified calendar entry shape
interface CalEntry {
  slug: string;
  name: string;
  dates: string;
  region: Region;
}

function deriveRegion(country: string): Region {
  const c = country.toLowerCase();
  const ukList = ["uk", "united kingdom", "england", "scotland", "wales"];
  const euList = ["belgium", "germany", "france", "spain", "croatia", "netherlands",
                  "italy", "serbia", "hungary", "romania"];
  if (ukList.includes(c)) return "uk";
  if (euList.includes(c)) return "eu";
  return "global";
}

export default function CalendarPage() {
  usePageMeta(
    "Festival Calendar 2026 — UK & EU",
    "Every major electronic music festival in 2026 plotted by month. Browse UK, Europe, and global events at a glance.",
    undefined,
    "https://travelravers.com/calendar",
  );

  // Build unified list — rich first, then CSV-only
  const allEntries = useMemo((): CalEntry[] => {
    const richSlugs = new Set(festivals.map((f) => f.slug));
    const richEntries: CalEntry[] = festivals.map((f) => ({
      slug: f.slug,
      name: f.name,
      dates: f.dates,
      region: f.region as Region,
    }));
    const csvEntries: CalEntry[] = csvFestivals
      .filter((f) => !richSlugs.has(f.slug))
      .map((f) => ({
        slug: f.slug,
        name: f.festivalName,
        dates: f.dates,
        region: deriveRegion(f.country),
      }));
    return [...richEntries, ...csvEntries];
  }, []);

  // Build monthIndex (0–11) → CalEntry[] map
  const calendarMap = useMemo(() => {
    const map: Record<number, CalEntry[]> = {};
    for (let i = 0; i < 12; i++) map[i] = [];
    for (const fest of allEntries) {
      for (const idx of getMonthIndices(fest.dates)) {
        map[idx].push(fest);
      }
    }
    return map;
  }, [allEntries]);

  const totalEvents = allEntries.length;
  const activeMonths = Object.values(calendarMap).filter((f) => f.length > 0).length;

  return (
    <div className="page-container">
      <div className="page-inner">

        {/* ── PAGE HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <SectionHeader
              eyebrow="2026 Season"
              heading="Festival Calendar 2026"
              size="lg"
            />
            <Link
              to="/festivals"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-cyan/60 hover:text-tr-cyan transition-colors mt-1"
            >
              <LayoutList className="w-3 h-3" aria-hidden="true" />
              ← List view
            </Link>
          </div>
          <p className="text-muted-foreground text-base mt-3 max-w-2xl">
            {totalEvents} festivals across {activeMonths} months. Click any event to open its full travel guide.
          </p>

          {/* Region legend */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="label-caps text-[0.6rem] text-muted-foreground/40 mr-1">Region</span>
            {(["uk", "eu", "global"] as const).map((r) => (
              <span
                key={r}
                className={`tr-status-pill border ${regionPillClass[r]}`}
              >
                {regionLabel[r]}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CALENDAR GRID — 1 col mobile, 3 col desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MONTHS.map((monthName, idx) => {
            const fests = calendarMap[idx];
            const isEmpty = fests.length === 0;

            return (
              <motion.div
                key={monthName}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`glass-card p-5 ${isEmpty ? "opacity-40" : ""}`}
              >
                {/* Month heading */}
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays
                    className={`w-3.5 h-3.5 flex-shrink-0 ${isEmpty ? "text-foreground/20" : "text-tr-cyan/50"}`}
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-foreground/40">
                    {monthName} 2026
                  </h2>
                  {!isEmpty && (
                    <span className="ml-auto font-display text-[0.55rem] uppercase tracking-wider text-foreground/25">
                      {fests.length} {fests.length === 1 ? "event" : "events"}
                    </span>
                  )}
                </div>

                {isEmpty ? (
                  <p className="text-foreground/20 text-[0.65rem] font-display uppercase tracking-wider">
                    No events
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                    {fests.map((fest) => (
                      <li key={`${fest.slug}-${idx}`}>
                        <Link
                          to={`/festivals/${fest.slug}`}
                          className={`tr-status-pill border transition-colors flex items-center gap-1.5 w-full ${regionPillClass[fest.region]}`}
                        >
                          {/* Colour dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="truncate">{fest.name}</span>
                          <span className="ml-auto text-current/50 flex-shrink-0 text-[0.5rem]">
                            {fest.dates.split(",")[0]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
