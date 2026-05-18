// TRAVEL RAVERS: CSV FESTIVAL DETAIL LAYOUT
// Section order (per spec):
//   1. HERO (video / image, 16:9)
//   2. Festival name + dates + location + firstTimerScore badge
//   3. THE VIBE
//   4. 2026 HEADLINERS
//   5. GETTING THERE + Search Flights button
//   6. WHERE TO STAY + Find Hotels Nearby button
//   7. SURVIVAL INTEL
//   8. GET TICKETS button
//   9. GET THE APP banner

import { useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Volume2, VolumeX, MapPin, Calendar, Tent, Globe,
  ExternalLink, Ticket, Hotel, Music2, ArrowLeft,
  Plane, Shield, Star, ShoppingBag, Youtube,
  Thermometer, Droplets, Users, Layers,
} from "lucide-react";
import type { CsvFestival } from "@/data/csvFestivals";
import type { FestivalBrain } from "@/data/festivalBrain";
import editorialData from "@/data/travel_ravers_editorial.json";
import { buildStay22EmbedUrl, buildStay22DeepLinkUrl } from "@/lib/stay22";
import TripCostCard from "./TripCostCard";
import PackingChecklist from "./PackingChecklist";

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

function getEditorial(festivalName: string): Editorial | undefined {
  return allEditorial.find((e) => e.festivalName === festivalName);
}

interface Props {
  festival: CsvFestival;
  /** Festival Brain record — single source of truth for tickets, video, headliners */
  brainFestival?: FestivalBrain;
}

// ── Booking.com affiliate URL ─────────────────────────────────────────────────

function buildBookingUrl(f: CsvFestival): string {
  const base = "https://www.booking.com/searchresults.html";
  const params = new URLSearchParams({
    latitude: String(f.lat),
    longitude: String(f.lng),
    checkin: f.startDate,
    checkout: f.endDate,
    radius: "10",
    unit: "km",
  });
  return `${base}?${params.toString()}`;
}

// ── Skyscanner affiliate URL (prefers nearestAirport IATA) ───────────────────

function buildSkyscannerUrl(f: CsvFestival): string {
  if (f.nearestAirport) {
    return `https://www.skyscanner.net/transport/flights-from/${f.nearestAirport.toLowerCase()}/`;
  }
  const city = f.location.split(",")[0].trim();
  return `https://www.kiwi.com/deep?from=GB&to=${encodeURIComponent(city)}&departure=${f.startDate}&affilid=travelravers`;
}

// ── Legacy Kiwi URL (kept for backward compat) ────────────────────────────────

function buildFlightsUrl(f: CsvFestival): string {
  return buildSkyscannerUrl(f);
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function VideoHero({ festival, resolvedVideoId }: { festival: CsvFestival; resolvedVideoId: string | null }) {
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

  // Use brain-resolved video ID (null means no video available)
  const id = resolvedVideoId;
  const hasVideo = !!id;
  const embedSrc = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1`;

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden border border-border/30 relative group">
      {hasVideo ? (
        <>
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={`${festival.festivalName} promo video`}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            loading="eager"
            className="w-full h-full border-0"
            aria-label={`${festival.festivalName} official promo video`}
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
          src={festival.imageUrl}
          alt={`${festival.festivalName} festival`}
          className="w-full h-full object-cover"
          loading="eager"
        />
      )}
    </div>
  );
}

// ── FIRST TIMER SCORE BADGE ───────────────────────────────────────────────────

function FirstTimerBadge({ score, note }: { score: number; note: string }) {
  const color =
    score >= 8 ? "text-tr-green border-tr-green/30 bg-tr-green/10"
    : score >= 6 ? "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/10"
    : "text-tr-amber border-tr-amber/30 bg-tr-amber/10";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${color}`}>
      <Star className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
      <span className="font-display text-[0.6rem] uppercase tracking-wider">
        First-Timer Score: {score}/10
      </span>
    </div>
  );
}

// ── HEADLINERS ────────────────────────────────────────────────────────────────

function HeadlinersSection({ festival }: { festival: CsvFestival }) {
  const hasTBA = festival.headliners === "TBA";
  const names = hasTBA
    ? []
    : festival.headliners.split(",").map((n) => n.trim()).filter(Boolean);

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
          <a
            href={festival.lineupSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-purple/60 hover:text-tr-purple border border-border/40 hover:border-tr-purple/30 rounded px-3 py-1.5 bg-secondary/30 transition-colors"
          >
            Check lineup source <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
          </a>
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
          <a
            href={festival.lineupSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-tr-purple/60 hover:text-tr-purple border border-border/40 hover:border-tr-purple/30 rounded px-3 py-1.5 bg-secondary/30 transition-colors"
          >
            View full lineup <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
          </a>
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

// ── MAIN LAYOUT ──────────────────────────────────────────────────────────────

export default function CsvFestivalDetailLayout({ festival, brainFestival }: Props) {
  const editorial = getEditorial(festival.festivalName);
  const bookingUrl = buildBookingUrl(festival);
  const flightsUrl = buildFlightsUrl(festival);
  const skyscannerUrl = buildSkyscannerUrl(festival);
  // ── Festival Brain: single source of truth for facts ─────────────────────────
  // Ticket URLs: brain wins over legacy festival fields
  const ticketUrlOfficial: string | null =
    brainFestival?.ticketUrlOfficial ||
    (festival.skiddleTicketUrl === "NO_SKIDDLE" ? festival.ticketUrl : null) ||
    null;
  const ticketUrlSkiddle: string | null =
    brainFestival?.ticketUrlSkiddle ||
    (festival.skiddleTicketUrl !== "NO_SKIDDLE" ? festival.skiddleTicketUrl : null) ||
    null;
  // Primary Book-Everything CTA
  const primaryTicketUrl = ticketUrlOfficial ?? ticketUrlSkiddle;
  const primaryTicketLabel = ticketUrlOfficial ? "Official Tickets" : "Get Tickets";
  // YouTube: brain wins over legacy festival.youtubeVideoId
  const resolvedVideoId =
    (brainFestival?.youtubeVideoId) ||
    (festival.youtubeVideoId !== "NO_VIDEO" ? festival.youtubeVideoId : null) ||
    null;

  // ── Stay22 ───────────────────────────────────────────────────────────────────
  const stay22Lat = brainFestival?.latitude ?? festival.lat ?? null;
  const stay22Lng = brainFestival?.longitude ?? festival.lng ?? null;
  const stay22StartDate = brainFestival?.startDate || festival.startDate;
  const stay22EndDate = brainFestival?.endDate || festival.endDate;
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

        {/* 1. HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <VideoHero festival={festival} resolvedVideoId={resolvedVideoId} />
          {!resolvedVideoId && (
            <p className="text-foreground/30 text-[0.6rem] font-display uppercase tracking-wider mt-1.5">
              Image: {festival.imageSource}
            </p>
          )}
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
            {festival.country} · {festival.genre}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-tight leading-none">
            {festival.festivalName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-muted-foreground text-sm mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-tr-cyan/60" aria-hidden="true" />
              {festival.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-tr-cyan/60" aria-hidden="true" />
              {festival.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <Tent className="w-3.5 h-3.5 text-tr-cyan/60" aria-hidden="true" />
              {festival.camping ? "Camping available" : "City / day festival"}
            </span>
          </div>
          {/* Risk badges + capacity */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {festival.mudrisk === 1 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400 px-2.5 py-1 text-[0.58rem] font-display uppercase tracking-wider">
                <Droplets className="w-2.5 h-2.5" aria-hidden="true" /> High Mud Risk
              </span>
            )}
            {festival.heatrisk === 1 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/40 bg-red-400/10 text-red-400 px-2.5 py-1 text-[0.58rem] font-display uppercase tracking-wider">
                <Thermometer className="w-2.5 h-2.5" aria-hidden="true" /> High Heat Risk
              </span>
            )}
            {festival.capacity && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-secondary/30 text-foreground/50 px-2.5 py-1 text-[0.58rem] font-display uppercase tracking-wider">
                <Users className="w-2.5 h-2.5" aria-hidden="true" /> {festival.capacity.toLocaleString()} cap
              </span>
            )}
            {festival.stages && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-secondary/30 text-foreground/50 px-2.5 py-1 text-[0.58rem] font-display uppercase tracking-wider">
                <Layers className="w-2.5 h-2.5" aria-hidden="true" /> {festival.stages} stages
              </span>
            )}
          </div>
          {editorial && (
            <div className="flex flex-col gap-2">
              <FirstTimerBadge score={editorial.firstTimerScore} note={editorial.firstTimerScoreNote} />
              {editorial.firstTimerScoreNote && (
                <p className="text-foreground/45 text-[0.7rem] leading-relaxed max-w-xl">
                  {editorial.firstTimerScoreNote}
                </p>
              )}
            </div>
          )}
        </motion.header>

        {/* Content stack — single column mobile, editorial sections */}
        <div className="space-y-6">

          {/* 3. THE VIBE */}
          {editorial?.vibe && (
            <EditorialSection
              icon={Globe}
              eyebrow="Atmosphere"
              heading="The Vibe"
              body={editorial.vibe}
              accentClass="border-tr-cyan/15"
            />
          )}


          {/* 4. HEADLINERS */}
          <HeadlinersSection festival={festival} />

          {/* 4B. AFFILIATE REVENUE BLOCK — 4 CTAs */}
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
              {/* GET TICKETS */}
              <a
                href={primaryTicketUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label={`Get tickets for ${festival.festivalName}`}
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-white/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-white/20" />
                <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                {primaryTicketLabel}
              </a>
              {/* FIND FLIGHTS */}
              <a
                href={skyscannerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label={`Search flights to ${festival.nearestAirport ?? festival.location}`}
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <Plane className="w-3.5 h-3.5" aria-hidden="true" />
                Find Flights ✈
              </a>
              {/* BOOK STAY — Stay22 deep link */}
              <a
                href={stay22DeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label={`Find accommodation near ${festival.festivalName}`}
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <Hotel className="w-3.5 h-3.5" aria-hidden="true" />
                Book Stay 🏨
              </a>
              {/* FESTIVAL KIT */}
              <a
                href="https://www.amazon.co.uk/s?k=festival+gear+essentials&tag=travelravers-21"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-1.5 text-[0.65rem] py-2.5 relative overflow-hidden"
                aria-label="Shop festival gear on Amazon"
              >
                <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/20" />
                <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/20" />
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                Festival Kit 🎒
              </a>
            </div>
            {/* Travel info line */}
            {(festival.nearestAirport || festival.nearestCity) && (
              <div className="mt-4 pt-3 border-t border-border/20">
                <p className="text-foreground/40 text-[0.6rem] font-display uppercase tracking-wider">
                  {festival.nearestAirport && <>Flying into {festival.nearestAirport}</>}
                  {festival.nearestAirport && festival.nearestCity && <span className="mx-2 opacity-40">·</span>}
                  {festival.nearestCity && <>Nearest city: {festival.nearestCity}</>}
                </p>
                <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider mt-1">
                  Skyscanner · Stay22 · Skiddle · Amazon — Affiliate Links
                </p>
              </div>
            )}
          </section>

          {/* TRIP COST ESTIMATOR */}
          <TripCostCard festivalSlug={festival.slug} festivalName={festival.festivalName} />

          {/* 4C. YOUTUBE SEARCH CARD */}
          {festival.youtubeSearchQuery && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(festival.youtubeSearchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-red-500/20 p-4 transition-colors hover:border-red-500/40 group"
              style={{ backgroundColor: "hsl(0 80% 50% / 0.03)" }}
              aria-label={`Watch ${festival.festivalName} 2026 on YouTube`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground uppercase tracking-wide group-hover:text-red-400 transition-colors">
                    ▶ Watch {festival.festivalName} 2026 on YouTube
                  </p>
                  <p className="text-foreground/40 text-[0.6rem] font-display uppercase tracking-wider mt-0.5">
                    YouTube Search · Opens in new tab
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-foreground/30 ml-auto group-hover:text-red-400 transition-colors" aria-hidden="true" />
              </div>
            </a>
          )}

          {/* 5. GETTING THERE */}
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
                aria-label={`Search flights to ${festival.festivalName}`}
              >
                <Plane className="w-4 h-4" aria-hidden="true" />
                Search Flights ✈
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                via Kiwi.com · Affiliate Link
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
                via Kiwi.com · Affiliate Link
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
                aria-label={`Find hotels near ${festival.festivalName}`}
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
                Find Hotels Nearby
              </h2>
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
              Find Accommodation Near {festival.festivalName}
            </h2>
            <a
              href={stay22DeepLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm mb-4"
              aria-label={`Find accommodation near ${festival.festivalName}`}
            >
              <Hotel className="w-4 h-4" aria-hidden="true" />
              Find Accommodation Near {festival.festivalName}
              <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
            </a>
            {hasCoords && (
              <div className="mt-4 rounded-lg overflow-hidden border border-border/20">
                <p className="label-caps text-[0.6rem] text-foreground/30 px-3 py-2 border-b border-border/20">
                  Map: Places to stay near {festival.festivalName}
                </p>
                <iframe
                  src={stay22EmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Accommodation near ${festival.festivalName}`}
                />
              </div>
            )}
            <p className="text-foreground/25 text-[0.55rem] mt-3 font-display uppercase tracking-wider">
              via Stay22 · Partner Link
            </p>
          </section>

          {/* 7. SURVIVAL INTEL */}
          {editorial?.survivalIntel && (
            <EditorialSection
              icon={Shield}
              eyebrow="Insider Tips"
              heading="Survival Intel"
              body={editorial.survivalIntel}
              accentClass="border-tr-amber/15"
            >
              {editorial.survivalIntelExtra && (
                <div className="mt-4 pt-4 border-t border-tr-amber/10">
                  <p className="text-foreground/70 text-sm leading-relaxed">{editorial.survivalIntelExtra}</p>
                </div>
              )}
            </EditorialSection>
          )}

          {/* PACKING CHECKLIST */}
          <PackingChecklist festivalSlug={festival.slug} festivalName={festival.festivalName} />

          {/* 8. GET TICKETS */}
          <section className="rounded-lg border border-tr-cyan/20 p-5" style={{ backgroundColor: "hsl(185 80% 50% / 0.04)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Ticket className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
              <p className="label-caps text-[0.6rem] text-tr-cyan/60">2026 Tickets</p>
            </div>
            <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              Get Your Tickets
            </h2>
            <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
              Buy official {festival.festivalName} tickets before they sell out. Prices rise as the event approaches.
            </p>
            {ticketUrlOfficial && (
              <>
                <a
                  href={ticketUrlOfficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                  aria-label={`Get official tickets for ${festival.festivalName}`}
                >
                  <Ticket className="w-4 h-4" aria-hidden="true" />
                  Official Tickets
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
                <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                  Official Festival Website
                </p>
              </>
            )}
            {!ticketUrlOfficial && ticketUrlSkiddle && (
              <>
                <a
                  href={ticketUrlSkiddle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                  aria-label={`Get tickets for ${festival.festivalName} via Skiddle`}
                >
                  <Ticket className="w-4 h-4" aria-hidden="true" />
                  Get Tickets
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
                <p className="text-foreground/30 text-[0.6rem] mt-2 font-display uppercase tracking-wider">
                  via Skiddle · Affiliate Link
                </p>
              </>
            )}
            {ticketUrlOfficial && ticketUrlSkiddle && (
              <div className="mt-3 pt-3 border-t border-border/20 flex items-center gap-2">
                <Ticket className="w-3 h-3 text-tr-cyan/40 flex-shrink-0" aria-hidden="true" />
                <a
                  href={ticketUrlSkiddle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.6rem] font-display uppercase tracking-wider text-tr-cyan/60 hover:text-tr-cyan transition-colors"
                  aria-label={`Compare ${festival.festivalName} tickets on Skiddle`}
                >
                  Compare on Skiddle
                </a>
                <span className="text-foreground/20 text-[0.55rem]">· Affiliate</span>
              </div>
            )}
          </section>


          {/* 9. GET THE APP */}
          <aside className="rounded-lg border border-border/30 p-5" style={{ backgroundColor: "hsl(220 40% 6%)" }}>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
              Plan This Trip
            </p>
            <p className="text-foreground/65 text-sm mb-4 leading-relaxed">
              Build a personalised packing list for {festival.festivalName}, track your squad, and get offline maps.
            </p>
            <Link to="/app" className="btn-primary text-xs inline-flex">
              Get the Travel Ravers App
            </Link>
          </aside>

        </div>
      </div>

    </article>
  );
}
