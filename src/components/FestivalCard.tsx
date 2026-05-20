// TRAVEL RAVERS: FESTIVAL CARD COMPONENT — used at /festivals and /
// Presentational only. Animation wrappers (motion.div) stay on the parent page.
// compact=true  → small hero-strip tile (image + name + location)
// tile=true     → vertical portrait card for featured strips (image + name + location + vibe + status)
// compact=false, tile=false → full list row (default for /festivals)

import { Link } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";

export interface FestivalCardProps {
  name: string;
  slug: string;
  country: string;
  city: string;
  dates: string;
  genres: string[];
  vibeTag: string;
  status: "on-sale" | "selling-fast" | "tbc" | "cancelled";
  image?: string;
  firstTimerFriendly?: boolean;
  /** Tile variant: vertical portrait card for featured strips. */
  tile?: boolean;
  /** Compact variant for dense strips (e.g. hero bottom bar). Defaults to false. */
  compact?: boolean;
  /** When true, shows an "Official Site Only" badge — no Skiddle affiliate */
  officialSiteOnly?: boolean;
}

const statusConfig: Record<
  FestivalCardProps["status"],
  { label: string; className: string }
> = {
  "on-sale":      { label: "On Sale",       className: "bg-tr-green/15  text-tr-green  border-tr-green/30"  },
  "selling-fast": { label: "Selling Fast",  className: "bg-tr-amber/15  text-tr-amber  border-tr-amber/30"  },
  "tbc":          { label: "TBC 2026",      className: "bg-muted        text-muted-foreground border-border" },
  "cancelled":    { label: "Cancelled",     className: "bg-tr-red/10    text-tr-red/70 border-tr-red/20"    },
};

const FALLBACK_STATUS = statusConfig["tbc"];

export default function FestivalCard({
  name,
  slug,
  country,
  city,
  dates,
  genres,
  vibeTag,
  status,
  image,
  firstTimerFriendly,
  tile = false,
  compact = false,
  officialSiteOnly = false,
}: FestivalCardProps) {
  const s = statusConfig[status] ?? FALLBACK_STATUS;

  // ── TILE VARIANT — vertical portrait card for featured strips ──
  if (tile) {
    return (
      <article className="tr-festival-card h-full">
        <Link
          to={`/festivals/${slug}`}
          className="group flex flex-col h-full overflow-hidden rounded-lg border border-border/40 bg-card/60 backdrop-blur-md hover:border-border/70 hover:bg-card/80 transition-all duration-300"
        >
          {/* Image */}
          {image && (
            <figure className="w-full aspect-[4/3] flex-shrink-0 overflow-hidden m-0">
              <img
                src={image}
                alt={`${name} festival`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </figure>
          )}

          {/* Content */}
          <div className="flex flex-col gap-2 p-3 flex-1">
            <p className="font-display text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider leading-tight">
              {name}
            </p>
            <div className="flex items-center gap-1 text-foreground/45 text-[0.7rem]">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{city}, {country}</span>
            </div>

            {/* Pills row */}
            <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
              <span className="tr-status-pill bg-secondary text-foreground/40 border border-border/40">
                {vibeTag}
              </span>
              <span className={`tr-status-pill border ${s.className}`}>{s.label}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (compact) {
    return (
      <article className="tr-festival-card">
        <Link
          to={`/festivals/${slug}`}
          className="group relative flex items-center gap-3 overflow-hidden rounded-lg border border-border/40 bg-background/50 backdrop-blur-xl hover:bg-background/70 transition-all duration-300 p-2"
        >
          {image && (
            <figure className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-md overflow-hidden m-0">
              <img
                src={image}
                alt={`${name} festival`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </figure>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-display text-[0.65rem] sm:text-xs font-semibold text-foreground truncate uppercase tracking-wider">
              {name}
            </p>
            <p className="text-foreground/40 text-[0.6rem] sm:text-xs truncate">
              {country} · {dates.split(",")[0]}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="tr-festival-card group relative">
      {/* Left border glow — appears on hover */}
      <span
        data-left-glow
        className="absolute inset-y-0 left-0 w-[2px] rounded-l bg-tr-cyan/0 group-hover:bg-tr-cyan/70 transition-all duration-300"
        aria-hidden="true"
      />
      <Link
        to={`/festivals/${slug}`}
        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm group-hover:bg-card/70 group-hover:border-border/60 transition-all duration-300 overflow-hidden"
      >
        {/* Image — fixed square thumbnail */}
        {image && (
          <figure className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-md overflow-hidden m-0">
            <img
              src={image}
              alt={`${name} festival`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
            />
          </figure>
        )}

        {/* Name + location — grows to fill space */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="font-display text-sm sm:text-base font-bold text-foreground uppercase tracking-wider truncate">
              {name}
            </h2>
            {firstTimerFriendly && (
              <span className="tr-status-pill bg-tr-green/10 text-tr-green border border-tr-green/20 hidden sm:inline-flex flex-shrink-0">
                First-Timer Friendly
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{city}, {country}</span>
            <span className="text-foreground/20 hidden sm:inline" aria-hidden="true">·</span>
            <span className="truncate hidden sm:inline">{dates}</span>
          </div>
        </div>

        {/* Genre tags — hidden on mobile (too cramped) */}
        <div className="hidden md:flex flex-wrap gap-1 flex-shrink-0 max-w-[180px]">
          {genres.slice(0, 3).map((g) => (
            <span
              key={g}
              className="text-[0.55rem] font-display uppercase tracking-wider text-foreground/35 bg-secondary px-1.5 py-0.5 rounded"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Vibe tag — hidden below sm */}
        <span className="hidden sm:inline tr-status-pill bg-secondary text-foreground/40 border border-border/40 flex-shrink-0">
          {vibeTag}
        </span>

        {/* Status pill + arrow */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
          {officialSiteOnly && (
            <span className="tr-status-pill border border-amber-500/30 bg-amber-500/10 text-amber-400 hidden sm:inline-flex flex-shrink-0">
              Official Site Only
            </span>
          )}
          <span className={`tr-status-pill border ${s.className}`}>{s.label}</span>
          <ExternalLink
            className="w-4 h-4 text-foreground/20 group-hover:text-tr-cyan/60 transition-colors flex-shrink-0 hidden sm:block"
            aria-hidden="true"
          />
        </div>
      </Link>
    </article>
  );
}
