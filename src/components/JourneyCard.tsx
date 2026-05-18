// TRAVEL RAVERS: JOURNEY CARD COMPONENT — used at /
// Quick-access HUD navigation card for the home page shortcut grid.
// accentColor accepts a Tailwind color class string e.g. "text-tr-cyan".
// Border color is derived automatically: "text-tr-cyan" → "border-tr-cyan/30".

import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

export interface JourneyCardProps {
  title: string;
  description: string;
  /** A Lucide icon component, e.g. {Compass} */
  icon: LucideIcon;
  href: string;
  /** Tailwind text-color class, e.g. "text-tr-cyan". Border is derived automatically. */
  accentColor: string;
}

export default function JourneyCard({
  title,
  description,
  icon: Icon,
  href,
  accentColor,
}: JourneyCardProps) {
  // Derive border class from accent: "text-tr-cyan" → "border-tr-cyan/30"
  const borderClass = accentColor.replace(/^text-/, "border-") + "/30";

  return (
    <article
      className={`tr-journey-card glass-card-hover group border ${borderClass} hover:scale-[1.02] transition-transform duration-300`}
    >
      <Link to={href} className="p-5 flex items-start gap-4 block">
        <div className={`mt-1 ${accentColor}`} aria-hidden="true">
          <Icon className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <svg
          className="w-4 h-4 ml-auto mt-1 text-foreground/20 group-hover:text-foreground/50 transition-colors flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
