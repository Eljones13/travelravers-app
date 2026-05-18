// TRAVEL RAVERS: FESTIVAL DETAIL LAYOUT — used for the 16 rich content.ts festivals
// Section order matches CsvFestivalDetailLayout exactly:
//   1. HERO (video/image, 16:9)
//   2. Festival name + dates + location + firstTimerScore badge
//   3. THE VIBE (editorial)
//   4. 2026 HEADLINERS (cross-referenced from csvFestivals)
//   5. GETTING THERE + Search Flights (Kiwi.com)
//   6. WHERE TO STAY + Find Hotels Nearby (Booking.com)
//   7. SURVIVAL INTEL (editorial)
//   8. GET TICKETS (Skiddle affiliate or text fallback)
//   9. GET THE APP

import { useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Volume2, VolumeX, MapPin, Calendar, Globe, ExternalLink,
  Ticket, Hotel, Music2, ArrowLeft, Plane, Shield, Star,
  ShoppingBag, AlertTriangle,
} from "lucide-react";
import EmailCapture from "./EmailCapture";
import TripCostCard from "./TripCostCard";

import type { Festival } from "@/data/content";
import { csvFestivals } from "@/data/csvFestivals";
import type { FestivalBrain } from "@/data/festivalBrain";
import editorialData from "@/data/travel_ravers_editorial.json";
import { buildStay22EmbedUrl, buildStay22DeepLinkUrl } from "@/lib/stay22";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Editorial {
  festivalName: string;
  vibe: string;
  gettingThere: string;
  gettingThereByTrain?: string;
  whereToStay: string;
  whereToStayTips?: string;
  survivalIntel: string;
  survivalIntelExtra?: string;
  firstTimerScore: number;
  firstTimerScoreNote: string;
}

const allEditorial: Editorial[] = editorialData as Editorial[];

function getEditorial(name: string): Editorial | undefined {
  return allEditorial.find((e) => e.festivalName === name);
}

// ── Skiddle affiliate map for the 16 rich festivals ───────────────────────────

const SKIDDLE_MAP: Record<string, string> = {
  "Terminal V":          "https://www.skiddle.com/festivals/terminal-v-festival/?sktag=15628",
  "Tomorrowland":        "https://www.skiddle.com/festivals/tomorrowland/?sktag=15628",
  "TimeWarp":            "NO_SKIDDLE",
  "Ultra Europe":        "NO_SKIDDLE",
  "Creamfields":         "https://www.skiddle.com/festivals/creamfields/?sktag=15628",
  "Boomtown Fair":       "https://www.skiddle.com/festivals/boom-town/?sktag=15628",
  "Sziget":              "https://www.skiddle.com/festivals/sziget-festival/?sktag=15628",
  "EXIT Festival":       "https://www.skiddle.com/festivals/exit/?sktag=15628",
  "Untold Festival":     "https://www.skiddle.com/festivals/untold-festival/?sktag=15628",
  "EDC Las Vegas":       "https://www.skiddle.com/festivals/electric-daisy-carnival/?sktag=15628",
  "Movement Detroit":    "NO_SKIDDLE",
  "Kappa FuturFestival": "https://www.skiddle.com/festivals/kappa-futurfestival/?sktag=15628",
  "Sonus Festival":      "NO_SKIDDLE",
  "Night Horizon Festival": "NO_SKIDDLE",
  "Defected Croatia":    "https://www.skiddle.com/festivals/defected-croatia/?sktag=15628",
  "Mystic Garden":       "https://www.skiddle.com/festivals/mystic-garden-festival/?sktag=15628",
};

interface Props {
  festival: Festival;
  /** Festival Brain record — single source of truth for tickets, video, headliners */
  brainFestival?: FestivalBrain;
}

// ── Helper URLs ───────────────────────────────────────────────────────────────

function buildBookingUrl(lat: number, lng: number, checkin: string, checkout: string): string {
  const base = "https://www.booking.com/searchresults.html";
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    checkin,
    checkout,
    radius: "10",
    unit: "km",
  });
  return `${base}?${params.toString()}`;
}

function buildFlightsUrl(city: string): string {
  return `https://www.kiwi.com/deep?from=GB&to=${encodeURIComponent(city)}&affilid=travelravers`;
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function VideoHero({ festival, videoId }: { festival: Festival; videoId?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const func = muted ? "unMute" : "mute";
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube.com",
    );
    setMuted((m) => !m);
  }, [muted]);

  // Brain videoId takes priority over festival.youtubePromoId
  const id = videoId || festival.youtubePromoId;
  const hasVideo = !!id;
  const embedSrc = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1`;

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden border border-border/30 relative group">
      {hasVideo ? (
        <>
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={`${festival.name} promo video`}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            loading="eager"
            className="w-full h-full border-0"
            aria-label={`${festival.name} official promo video`}
          />
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.6rem] font-display uppercase tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            style={{
              backgroundColor: "hsl(220 60% 3% / 0.80)",
              backdropFilter: "blur(8px)",
              border: "1px solid hsl(185 80% 50% / 0.25)",
              color: muted ? "hsl(185 80% 65%)" : "hsl(0 0% 80%)",
            }}
          >
            {muted
              ? <><VolumeX className="w-3 h-3" aria-hidden="true" /> Unmute</>
              : <><Volume2 className="w-3 h-3" aria-hidden="true" /> Mute</>
            }
          </button>
        </>
      ) : (
        <img
          src={festival.image}
          alt={`${festival.name} festival`}
          className="w-full h-full object-cover"
          loading="eager"
        />
      )}
    </div>
  );
}

// ── FIRST TIMER BADGE ─────────────────────────────────────────────────────────

function FirstTimerBadge({ score, note }: { score: number; note: string }) {
  const color =
    score >= 8 ? "text-tr-green border-tr-green/30 bg-tr-green/10"
    : score >= 6 ? "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/10"
    : "text-tr-amber border-tr-amber/30 bg-tr-amber/10";

  return (
    <div className="space-y-1.5">
      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${color}`}>
        <Star className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
        <span className="font-display text-[0.6rem] uppercase tracking-wider">
          First-Timer Score: {score}/10
        </span>
      </div>
      {note && (
        <p className="text-foreground/45 text-[0.7rem] leading-relaxed max-w-xl">{note}</p>
      )}
    </div>
  );
}

// ── HEADLINERS ────────────────────────────────────────────────────────────────

function HeadlinersSection({ headliners, lineupSourceUrl, festivalName }: {
  headliners: string;
  lineupSourceUrl: string;
  festivalName: string;
}) {
  const hasTBA = headliners === "TBA" || !headliners;
  const names = hasTBA ? [] : headliners.split(",").map((n) => n.trim()).filter(Boolean);

  return (
    <section className="rounded-lg border border-tr-purple/20 p-5 sm:p-6" style={{ backgroundColor: "hsl(270 40% 6%)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Music2 className="w-3.5 h-3.5 text-tr-purple/70" aria-hidden="true" />
        <p className="label-caps text-[0.6rem] text-tr-purple/60">2026 Lineup</p>
      </div>
      <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
        2026 Headliners
      </h2>
      {hasTBA ? (
        <div>
          <p className="text-foreground/55 text-sm mb-4 leading-relaxed">
            Lineup to be announced — check back soon.
          </p>
          {lineupSourceUrl && (
            <a
              href={lineupSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-purple/60 hover:text-tr-purple border border-border/40 hover:border-tr-purple/30 rounded px-3 py-1.5 bg-secondary/30 transition-colors"
            >
              Check lineup source <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2 mb-5">
            {names.map((name) => (
              <span
                key={name}
                className="tr-status-pill bg-tr-purple/10 text-tr-purple/80 border border-tr-purple/25 text-[0.62rem]"
              >
                {name}
              </span>
            ))}
          </div>
          {lineupSourceUrl && (
            <a
              href={lineupSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-purple/60 hover:text-tr-purple border border-border/40 hover:border-tr-purple/30 rounded px-3 py-1.5 bg-secondary/30 transition-colors"
            >
              View full lineup <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}

// ── EDITORIAL SECTION ─────────────────────────────────────────────────────────

function EditorialSection({
  icon: Icon,
  eyebrow,
  heading,
  body,
  accentClass,
  children,
}: {
  icon: React.ElementType;
  eyebrow: string;
  heading: string;
  body: string;
  accentClass: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`rounded-lg border p-5 sm:p-6 ${accentClass}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
        <p className="label-caps text-[0.6rem] opacity-60">{eyebrow}</p>
      </div>
      <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
        {heading}
      </h2>
      <p className="text-foreground/70 text-sm leading-relaxed mb-4">{body}</p>
      {children}
    </section>
  );
}

// ── MAIN LAYOUT ───────────────────────────────────────────────────────────────

export default function FestivalDetailLayout({ festival, brainFestival }: Props) {
  const editorial = getEditorial(festival.name);
  const skiddleUrl = SKIDDLE_MAP[festival.name];
  const hasSkiddle = skiddleUrl && skiddleUrl !== "NO_SKIDDLE";
  // Cross-reference csvFestivals for lat/lng, dates (still used for Booking.com URL)
  const csvMatch = csvFestivals.find((f) => f.slug === festival.slug);
  const flightsUrl = festival.flightsUrl ?? buildFlightsUrl(festival.city);
  const flightsVia = festival.flightsUrl ? "Skyscanner" : "Kiwi.com";

  // Booking.com URL: use override, then csvMatch lat/lng, then city fallback
  const bookingUrl = festival.hotelUrl
    ?? (csvMatch
      ? buildBookingUrl(csvMatch.lat, csvMatch.lng, csvMatch.startDate, csvMatch.endDate)
      : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(festival.city)}`);

  // ── Festival Brain: single source of truth for facts ─────────────────────────
  // Headliners: brain → csv fallback → TBA
  const headliners =
    (brainFestival?.headliners && brainFestival.headliners !== "TBA"
      ? brainFestival.headliners
      : null)
    ?? csvMatch?.headliners
    ?? "TBA";
  const lineupSourceUrl = brainFestival?.lineupSourceUrl || csvMatch?.lineupSourceUrl || "";

  // Ticket URLs: brain wins; SKIDDLE_MAP + festival.ticketUrl as legacy fallback
  const ticketUrlOfficial: string | null =
    brainFestival?.ticketUrlOfficial || festival.ticketUrl || null;
  const ticketUrlSkiddle: string | null =
    brainFestival?.ticketUrlSkiddle || (hasSkiddle ? skiddleUrl : null) || null;

  // Primary CTA: official first, then Skiddle (one URL for the Book Everything grid)
  const primaryTicketUrl = ticketUrlOfficial ?? ticketUrlSkiddle;
  const primaryTicketLabel = ticketUrlOfficial ? "Official Tickets" : "Get Tickets";

  // ── Stay22: coordinates from Brain → csvMatch fallback ───────────────────────
  const stay22Lat = brainFestival?.latitude ?? csvMatch?.lat ?? null;
  const stay22Lng = brainFestival?.longitude ?? csvMatch?.lng ?? null;
  const stay22StartDate = brainFestival?.startDate || csvMatch?.startDate;
  const stay22EndDate = brainFestival?.endDate || csvMatch?.endDate;
  const stay22Opts = {
    slug: festival.slug,
    lat: stay22Lat,
    lng: stay22Lng,
    startDate: stay22StartDate,
    endDate: stay22EndDate,
  };
  const stay22DeepLink = buildStay22DeepLinkUrl(stay22Opts);
  const stay22EmbedUrl = buildStay22EmbedUrl(stay22Opts);
  const hasCoords = stay22Lat != null && stay22Lng != null;

  return (
    <article className="page-container">
      <div className="page-inner">

        {/* Back link */}
        <Link
          to="/festivals"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back to Festivals
        </Link>

        {/* Cancellation banner */}
        {festival.status === "cancelled" && festival.replacedBy && (
          <div
            className="rounded-lg border border-tr-amber/30 px-5 py-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ backgroundColor: "hsl(40 80% 50% / 0.06)" }}
            role="alert"
          >
            <AlertTriangle className="w-4 h-4 text-tr-amber flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="font-display text-[0.7rem] uppercase tracking-wider text-tr-amber mb-1">
                Festival Cancelled — 2026 Edition
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {festival.name} 2026 has been cancelled. Looking for Zrce Beach this summer?
              </p>
            </div>
            <Link
              to={`/festivals/${festival.replacedBy.slug}`}
              className="inline-flex items-center gap-1.5 shrink-0 text-[0.65rem] font-display uppercase tracking-wider text-tr-amber hover:text-tr-amber/80 border border-tr-amber/30 hover:border-tr-amber/50 rounded px-3 py-2 bg-tr-amber/5 hover:bg-tr-amber/10 transition-colors"
            >
              {festival.replacedBy.name} <ArrowLeft className="w-3 h-3 rotate-180" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* 1. HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <VideoHero festival={festival} videoId={brainFestival?.youtubeVideoId} />
        </motion.div>

        {/* 2. NAME + META + FIRST TIMER BADGE */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8"
        >
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2 flex items-center gap-2">
            <Globe className="w-3 h-3" aria-hidden="true" />
            {festival.country} · {festival.genres.join(" / ")}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-tight leading-none">
            {festival.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-muted-foreground text-sm mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-tr-cyan/60" aria-hidden="true" />
              {festival.city}, {festival.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-tr-cyan/60" aria-hidden="true" />
              {festival.dates}
            </span>
          </div>
          {editorial && (
            <FirstTimerBadge
              score={editorial.firstTimerScore}
              note={editorial.firstTimerScoreNote}
            />
          )}
        </motion.header>

        {/* Content stack */}
        <div className="space-y-6">

          {/* 1. BOOK EVERYTHING — affiliate CTA grid (above the fold) */}
          <section
            className="rounded-lg border border-tr-cyan/20 p-5"
            style={{ backgroundColor: "hsl(185 80% 50% / 0.03)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
              <p className="label-caps text-[0.6rem] text-tr-cyan/60">Plan This Trip</p>
            </div>
            <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Book Everything
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {primaryTicketUrl ? (
                <a
                  href={primaryTicketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                  aria-label={`${primaryTicketLabel} for ${festival.name}`}
                >
                  <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-white/20" />
                  <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-white/20" />
                  <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                  {primaryTicketLabel}
                </a>
              ) : (
                <span className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 opacity-40 cursor-not-allowed">
                  <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                  Tickets TBC
                </span>
              )}
              <a
                href={flightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label={`Search flights to ${festival.city}`}
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <Plane className="w-3.5 h-3.5" aria-hidden="true" />
                Find Flights ✈
              </a>
              <a
                href={stay22DeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label={`Find accommodation near ${festival.name}`}
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <Hotel className="w-3.5 h-3.5" aria-hidden="true" />
                Book Stay 🏨
              </a>
              <Link
                to={`/gear/${festival.slug}`}
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                Pack Smarter 🎒
              </Link>
            </div>
            {/* Secondary Skiddle CTA — shown when official ticket URL also exists */}
            {ticketUrlOfficial && ticketUrlSkiddle && (
              <div className="mt-3 pt-3 border-t border-border/20 flex items-center gap-2">
                <Ticket className="w-3 h-3 text-tr-cyan/40 flex-shrink-0" aria-hidden="true" />
                <a
                  href={ticketUrlSkiddle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.6rem] font-display uppercase tracking-wider text-tr-cyan/60 hover:text-tr-cyan transition-colors"
                  aria-label={`Compare ${festival.name} tickets on Skiddle`}
                >
                  Compare on Skiddle
                </a>
                <span className="text-foreground/20 text-[0.55rem]">· Affiliate</span>
              </div>
            )}
            <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider mt-3">
              {flightsVia} · Stay22 · {ticketUrlSkiddle ? "Skiddle" : "Official"} — Affiliate / Partner Links
            </p>
          </section>

          {/* TRIP COST ESTIMATOR */}
          <TripCostCard festivalSlug={festival.slug} festivalName={festival.name} />

          {/* 2. THE VIBE */}
          {(editorial?.vibe || festival.description) && (
            <EditorialSection
              icon={Globe}
              eyebrow="Atmosphere"
              heading="The Vibe"
              body={editorial?.vibe ?? festival.description}
              accentClass="border-tr-cyan/15"
            >
              {!editorial?.vibe && festival.whyGo && (
                <p className="text-foreground/70 text-sm leading-relaxed">{festival.whyGo}</p>
              )}
            </EditorialSection>
          )}

          {/* 3. 2026 HEADLINERS */}
          <HeadlinersSection
            headliners={headliners}
            lineupSourceUrl={lineupSourceUrl}
            festivalName={festival.name}
          />

          {/* 4. GETTING THERE */}
          {editorial?.gettingThere ? (
            <EditorialSection
              icon={Plane}
              eyebrow="Getting There"
              heading="Getting There"
              body={editorial.gettingThere}
              accentClass="border-tr-cyan/15"
            >
              {editorial.gettingThereByTrain && (
                <div className="mb-4">
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">{editorial.gettingThereByTrain}</p>
                  <a
                    href={festival.country.includes("UK") ? "https://www.thetrainline.com/?utm_source=travelravers" : "https://www.omio.com/?utm_source=travelravers"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 text-[0.65rem] font-display uppercase tracking-wider py-2"
                  >
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Book {festival.country.includes("UK") ? "Trains via Trainline" : "Trains & Buses via Omio"}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
                  </a>
                </div>
              )}
              <a
                href={flightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
                aria-label={`Search flights to ${festival.name}`}
              >
                <Plane className="w-4 h-4" aria-hidden="true" />
                Search Flights ✈
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                via {flightsVia} · Affiliate Link
              </p>
            </EditorialSection>
          ) : (
            <section className="rounded-lg border border-tr-cyan/15 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Plane className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
                <p className="label-caps text-[0.6rem] text-tr-cyan/60">Getting There</p>
              </div>
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Getting There
              </h2>
              {festival.travelTips && (
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">{festival.travelTips}</p>
              )}
              <a
                href={flightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <Plane className="w-4 h-4" aria-hidden="true" />
                Search Flights ✈
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                via {flightsVia} · Affiliate Link
              </p>
            </section>
          )}

          {/* 6. WHERE TO STAY */}
          {editorial?.whereToStay ? (
            <EditorialSection
              icon={Hotel}
              eyebrow="Accommodation"
              heading="Where to Stay"
              body={editorial.whereToStay}
              accentClass="border-tr-green/15"
            >
              {editorial.whereToStayTips && (
                <p className="text-foreground/70 text-sm leading-relaxed mb-4 italic border-l-2 border-tr-green/20 pl-4">
                  {editorial.whereToStayTips}
                </p>
              )}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
                aria-label={`Find hotels near ${festival.name}`}
              >
                <Hotel className="w-4 h-4" aria-hidden="true" />
                Find Hotels Nearby
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                via Booking.com · Affiliate Link
              </p>
            </EditorialSection>
          ) : (
            <section className="rounded-lg border border-tr-green/15 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Hotel className="w-3.5 h-3.5 text-tr-green/70" aria-hidden="true" />
                <p className="label-caps text-[0.6rem] text-tr-green/60">Accommodation</p>
              </div>
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Where to Stay
              </h2>
              {festival.accommodation && (
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">{festival.accommodation}</p>
              )}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                <Hotel className="w-4 h-4" aria-hidden="true" />
                Find Hotels Nearby
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                via Booking.com · Affiliate Link
              </p>
            </section>
          )}

          {/* 6B. STAY22 — accommodation CTA + inline map */}
          <section className="rounded-lg border border-tr-green/20 p-5" style={{ backgroundColor: "hsl(140 60% 40% / 0.03)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Hotel className="w-3.5 h-3.5 text-tr-green/70" aria-hidden="true" />
              <p className="label-caps text-[0.6rem] text-tr-green/60">Places to Stay</p>
            </div>
            <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Find Accommodation Near {festival.name}
            </h2>
            <a
              href={stay22DeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm mb-4"
              aria-label={`Find accommodation near ${festival.name}`}
            >
              <Hotel className="w-4 h-4" aria-hidden="true" />
              Find Accommodation Near {festival.name}
              <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
            </a>
            {hasCoords && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border/20">
                <p className="label-caps text-[0.6rem] text-foreground/30 px-3 py-2 border-b border-border/20">
                  Map: Places to stay near {festival.name}
                </p>
                <iframe
                  src={stay22EmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Accommodation near ${festival.name}`}
                />
              </div>
            )}
            <p className="text-foreground/25 text-[0.55rem] mt-3 font-display uppercase tracking-wider">
              via Stay22 · Partner Link
            </p>
          </section>

          {/* 7. SURVIVAL INTEL */}
          {(editorial?.survivalIntel || festival.survivalTips) && (
            <EditorialSection
              icon={Shield}
              eyebrow="Insider Tips"
              heading="Survival Intel"
              body={editorial?.survivalIntel ?? festival.survivalTips}
              accentClass="border-tr-amber/15"
            >
              {editorial?.survivalIntelExtra && (
                <div className="mt-4 pt-4 border-t border-tr-amber/10">
                  <p className="text-foreground/70 text-sm leading-relaxed">{editorial.survivalIntelExtra}</p>
                </div>
              )}
              {!editorial?.survivalIntel && festival.survivalIntelBullets && festival.survivalIntelBullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {festival.survivalIntelBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/70 leading-relaxed">
                      <span className="text-tr-amber/60 mt-0.5 flex-shrink-0" aria-hidden="true">›</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </EditorialSection>
          )}

          {/* 8. WHAT TO PACK */}
          {festival.packingHighlights && festival.packingHighlights.length > 0 && (
            <section
              className="rounded-lg border border-tr-amber/15 p-5 sm:p-6"
              style={{ backgroundColor: "hsl(40 80% 50% / 0.03)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-3.5 h-3.5 text-tr-amber/70" aria-hidden="true" />
                <p className="label-caps text-[0.6rem] text-tr-amber/60">Packing</p>
              </div>
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                What to Pack
              </h2>
              <ul className="space-y-2.5">
                {festival.packingHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/70 leading-relaxed">
                    <span className="text-tr-amber/50 mt-0.5 flex-shrink-0 font-bold" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 9. ENVIRONMENTAL RISKS */}
          {festival.environmentRisks && festival.environmentRisks.length > 0 && (
            <section
              className="rounded-lg border border-tr-red/20 p-5 sm:p-6"
              style={{ backgroundColor: "hsl(0 80% 50% / 0.03)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3.5 h-3.5 text-tr-red/70" aria-hidden="true" />
                <p className="label-caps text-[0.6rem] text-tr-red/60">Know Before You Go</p>
              </div>
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Environmental Risks
              </h2>
              <ul className="space-y-3">
                {festival.environmentRisks.map((risk) => (
                  <li key={risk} className="flex items-start gap-2.5 text-sm text-foreground/70 leading-relaxed">
                    <span className="text-tr-red/50 mt-0.5 flex-shrink-0" aria-hidden="true">⚠</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 10. FIRST-TIMER FAQ */}
          {festival.faqs && festival.faqs.length > 0 && (
            <section className="rounded-lg border border-tr-cyan/15 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
                <p className="label-caps text-[0.6rem] text-tr-cyan/60">Common Questions</p>
              </div>
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                First-Timer FAQ
              </h2>
              <div className="space-y-5">
                {festival.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border/20 pb-5 last:border-0 last:pb-0">
                    <p className="font-display text-[0.75rem] font-bold text-foreground uppercase tracking-wide mb-2">
                      {faq.q}
                    </p>
                    <p className="text-foreground/70 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. EMAIL CAPTURE */}
          <EmailCapture
            heading={`Get ${festival.name} intel in your inbox`}
            subheading="Lineup announcements, travel tips, and last-minute gear advice before the festival."
          />

        </div>
      </div>

    </article>
  );
}
