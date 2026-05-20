// TRAVEL RAVERS: FESTIVAL PAGE TEMPLATE — /festivals/[slug]
// Owns: slug resolution, not-found fallback, per-page SEO.
// Resolution order: 1) content.ts festivals, 2) csvFestivals.ts, 3) 404.
// Rendering delegated to FestivalDetailLayout (rich) or CsvFestivalDetailLayout (CSV).
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarCheck, CalendarMinus, HelpCircle, MapPin } from "lucide-react";
import { festivals } from "@/data/content";
import { getCsvFestivalBySlug } from "@/data/csvFestivals";
import { getFestivalBySlug as getBrainFestival } from "@/data/festivalBrain";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useFestivalStore } from "@/context/FestivalStoreContext";
import { useFestivalFocus } from "@/context/FestivalFocusContext";
import type { TicketStatus } from "@/types/festival";
import FestivalDetailLayout from "@/components/FestivalDetailLayout";
import CsvFestivalDetailLayout from "@/components/CsvFestivalDetailLayout";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const MONTH_MAP: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseFestivalStartDate(dates: string): string {
  const yearMatch = dates.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : "2026";
  const match = dates.match(/^([A-Z][a-z]{2})\s+(\d{1,2})/);
  if (match && MONTH_MAP[match[1]]) {
    return `${year}-${MONTH_MAP[match[1]]}-${match[2].padStart(2, "0")}`;
  }
  return year;
}

// ── Plan bar status helpers ───────────────────────────────────────────────────
const STATUS_CYCLE: Record<TicketStatus, TicketStatus> = {
  none: "going",
  going: "maybe",
  maybe: "none",
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  none: "Add to my weekend plan",
  going: "Going ✓ — tap to mark maybe",
  maybe: "Maybe — tap to remove",
};

const STATUS_CLASSES: Record<TicketStatus, string> = {
  none: "btn-secondary text-xs inline-flex items-center gap-1.5",
  going: "inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider px-4 py-2 rounded-md border border-tr-cyan/50 bg-tr-cyan/10 text-tr-cyan hover:bg-tr-cyan/20 transition-all duration-200",
  maybe: "inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider px-4 py-2 rounded-md border border-tr-amber/50 bg-tr-amber/10 text-tr-amber hover:bg-tr-amber/20 transition-all duration-200",
};

export default function FestivalDetailPage() {
  const { slug } = useParams();

  // 1. Try rich content.ts festivals first
  const richFestival = festivals.find((f) => f.slug === slug);

  // 2. Fall back to CSV festivals
  const csvFestival = !richFestival ? getCsvFestivalBySlug(slug ?? "") : undefined;

  // 3. Festival Brain — single source of truth for facts (tickets, dates, media)
  const brainFestival = getBrainFestival(slug ?? "");

  // Hooks must be called unconditionally
  usePageMeta(
    richFestival
      ? `${richFestival.name} 2026 — Travel Guide & Survival Tips`
      : csvFestival
        ? `${csvFestival.festivalName} 2026 — Festival Guide, Lineup & Tickets`
        : "Festival Not Found",
    richFestival
      ? richFestival.whyGo.slice(0, 155)
      : csvFestival
        ? `${csvFestival.festivalName} 2026 in ${csvFestival.location}. ${csvFestival.dates}. ${csvFestival.genre}. Buy tickets and find hotels nearby.`
        : "",
    undefined,
    slug ? `https://travelravers.com/festivals/${slug}` : undefined,
  );

  const { getTicketStatus, setTicketStatus } = useFestivalStore();
  const { selectedSlug, setFocus } = useFestivalFocus();
  const festivalId = slug ?? "";

  // Auto-set festival focus when visiting a detail page
  useEffect(() => {
    if (slug && slug !== selectedSlug) {
      setFocus(slug);
    }
  }, [slug, selectedSlug, setFocus]);
  const currentStatus = getTicketStatus(festivalId);

  // 404
  if (!richFestival && !csvFestival) {
    return (
      <div className="page-container">
        <div className="page-inner text-center">
          <p className="text-muted-foreground">Festival not found.</p>
          <Link to="/festivals" className="btn-primary mt-4 inline-flex">
            Back to Festivals
          </Link>
        </div>
      </div>
    );
  }

  // Rich (content.ts) festival page — full travel intel layout
  if (richFestival) {
    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://travelravers.com" },
            { name: "Festivals", url: "https://travelravers.com/festivals" },
            { name: richFestival.name, url: `https://travelravers.com/festivals/${richFestival.slug}` },
          ]}
        />
        <SchemaScript
          schema={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: richFestival.name,
            description: richFestival.whyGo,
            startDate: parseFestivalStartDate(richFestival.dates),
            location: {
              "@type": "Place",
              name: richFestival.city,
              address: {
                "@type": "PostalAddress",
                addressCountry: richFestival.country,
              },
            },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            organizer: {
              "@type": "Organization",
              name: "Travel Ravers",
              url: "https://travelravers.com",
            },
          }}
        />
        {/* ── Plan bar — fixed bottom on mobile, normal flow on sm+ ── */}
        <div
          className="fixed bottom-0 inset-x-0 z-50 sm:static sm:inset-auto sm:z-auto bg-background/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-border/30 sm:border-0 px-4 py-3 sm:py-0 sm:mb-4 flex items-center gap-3 sm:flex-wrap sm:max-w-3xl sm:mx-auto sm:px-6"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <button
            type="button"
            onClick={() => setTicketStatus(festivalId, STATUS_CYCLE[currentStatus])}
            className={STATUS_CLASSES[currentStatus]}
          >
            {currentStatus === "none" && <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />}
            {currentStatus === "going" && <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />}
            {currentStatus === "maybe" && <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />}
            {STATUS_LABEL[currentStatus]}
          </button>
          <button
            type="button"
            className="btn-secondary text-xs inline-flex items-center gap-1.5 opacity-60 cursor-not-allowed"
            disabled
            title="Maps integration coming soon"
          >
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Open in maps
          </button>
          {currentStatus !== "none" && (
            <button
              type="button"
              onClick={() => setTicketStatus(festivalId, "none")}
              className="inline-flex items-center gap-1 text-[0.6rem] text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase tracking-wider font-display"
            >
              <CalendarMinus className="w-3 h-3" aria-hidden="true" />
              Remove
            </button>
          )}
        </div>

        <FestivalDetailLayout festival={richFestival} brainFestival={brainFestival} />
        {/* Spacer so fixed plan bar doesn't cover content on mobile */}
        <div className="h-20 sm:h-0" aria-hidden="true" />
      </>
    );
  }

  // CSV festival page — headliners, tickets, accommodation layout
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "Festivals", url: "https://travelravers.com/festivals" },
          { name: csvFestival!.festivalName, url: `https://travelravers.com/festivals/${csvFestival!.slug}` },
        ]}
      />
      <SchemaScript
        schema={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: csvFestival!.festivalName,
          startDate: csvFestival!.startDate,
          endDate: csvFestival!.endDate,
          location: {
            "@type": "Place",
            name: csvFestival!.location,
            address: {
              "@type": "PostalAddress",
              addressCountry: csvFestival!.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: csvFestival!.lat,
              longitude: csvFestival!.lng,
            },
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          organizer: {
            "@type": "Organization",
            name: "Travel Ravers",
            url: "https://travelravers.com",
          },
        }}
      />

      {/* ── Plan bar — fixed bottom on mobile, normal flow on sm+ ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 sm:static sm:inset-auto sm:z-auto bg-background/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-border/30 sm:border-0 px-4 py-3 sm:py-0 sm:mb-4 flex items-center gap-3 sm:flex-wrap sm:max-w-4xl sm:mx-auto sm:px-6"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          onClick={() => setTicketStatus(festivalId, STATUS_CYCLE[currentStatus])}
          className={STATUS_CLASSES[currentStatus]}
        >
          {currentStatus === "none" && <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />}
          {currentStatus === "going" && <CalendarCheck className="w-3.5 h-3.5" aria-hidden="true" />}
          {currentStatus === "maybe" && <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />}
          {STATUS_LABEL[currentStatus]}
        </button>
        <button
          type="button"
          className="btn-secondary text-xs inline-flex items-center gap-1.5 opacity-60 cursor-not-allowed"
          disabled
          title="Maps integration coming soon"
        >
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          Open in maps
        </button>
        {currentStatus !== "none" && (
          <button
            type="button"
            onClick={() => setTicketStatus(festivalId, "none")}
            className="inline-flex items-center gap-1 text-[0.6rem] text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase tracking-wider font-display"
          >
            <CalendarMinus className="w-3 h-3" aria-hidden="true" />
            Remove
          </button>
        )}
      </div>

      <CsvFestivalDetailLayout festival={csvFestival!} brainFestival={brainFestival} />
      {/* Spacer so fixed plan bar doesn't cover content on mobile */}
      <div className="h-20 sm:h-0" aria-hidden="true" />
    </>
  );
}
