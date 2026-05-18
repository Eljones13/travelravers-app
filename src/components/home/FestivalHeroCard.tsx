// TRAVEL RAVERS: Featured festival hero card — used in FestivalsPage featured strip
// Tron glass aesthetic: dark image overlay, neon corner brackets, cyan accent
import { Link } from "react-router-dom";
import { MapPin, Calendar, Music, ArrowRight } from "lucide-react";
import type { Festival } from "@/types/festival";

interface Props {
  festival: Festival;
  /** Explicit route slug — falls back to festival.id */
  slug?: string;
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", {
    ...opts,
    year: "numeric",
  })}`;
}

export default function FestivalHeroCard({ festival, slug }: Props) {
  const href = `/festivals/${slug ?? festival.id}`;

  return (
    <Link
      to={href}
      className="group relative flex flex-col justify-end overflow-hidden rounded-lg border border-tr-cyan/20 bg-background min-h-[220px] hover:border-tr-cyan/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tr-cyan/50"
      aria-label={`View ${festival.name} festival guide`}
    >
      {/* Hero image */}
      <img
        src={festival.heroImageUrl}
        alt={`${festival.name} festival crowd`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay gradient — bottom-heavy for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Neon corner brackets */}
      <span
        aria-hidden="true"
        className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-tr-cyan/40 rounded-tl transition-colors duration-300 group-hover:border-tr-cyan/70"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-tr-cyan/40 rounded-br transition-colors duration-300 group-hover:border-tr-cyan/70"
      />

      {/* Content */}
      <div className="relative z-10 p-4">
        <p className="font-display text-[0.55rem] uppercase tracking-[0.2em] text-tr-cyan/80 mb-1">
          {festival.country}
        </p>
        <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">
          {festival.name}
        </h3>

        <div className="flex flex-col gap-1 mb-3">
          <span className="flex items-center gap-1.5 text-white/60 text-xs">
            <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {formatDateRange(festival.startDate, festival.endDate)}
          </span>
          <span className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {festival.location}
          </span>
          <span className="flex items-center gap-1.5 text-white/60 text-xs">
            <Music className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {festival.trackName}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-tr-cyan text-[0.65rem] font-display uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
          View guide <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
