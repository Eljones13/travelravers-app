// TRAVEL RAVERS: MUSIC CARD COMPONENT — used at /music
// Presentational card for a mix or playlist.
// Square artwork with rounded-lg. Type eyebrow: cyan/green/purple.
// Platform badges: Spotify=green, YouTube=red, SoundCloud=orange, Apple Music=grey.
// When soundcloudUrl is provided, renders a live SoundCloud embed instead of static artwork.

import { ExternalLink } from "lucide-react";
import SoundCloudEmbed from "@/components/SoundCloudEmbed";

export interface MusicPlatform {
  name: string;
  url: string;
}

export interface MusicCardProps {
  title: string;
  type: "original" | "curated" | "partner";
  vibeDescription: string;
  artworkUrl: string;
  platforms: MusicPlatform[];
  soundcloudUrl?: string;
}

// Type eyebrow colors
const typeConfig: Record<MusicCardProps["type"], { label: string; colorClass: string }> = {
  original: { label: "TR Original",       colorClass: "text-tr-cyan"   },
  curated:  { label: "Curated Playlist",  colorClass: "text-tr-green"  },
  partner:  { label: "Partner Mix",       colorClass: "text-tr-purple" },
};

// Maps internal type keys to SoundCloudEmbed type labels
const embedTypeMap: Record<MusicCardProps["type"], "TR Original" | "Curated" | "Partner Mix"> = {
  original: "TR Original",
  curated:  "Curated",
  partner:  "Partner Mix",
};

// Platform badge colors — tinted pills per platform
function getPlatformClass(name: string): string {
  const n = name.toLowerCase();
  if (n === "spotify")      return "bg-[#1DB954]/10 text-[#1DB954] border-[#1DB954]/30 hover:bg-[#1DB954]/20";
  if (n === "youtube")      return "bg-tr-red/10 text-tr-red border-tr-red/30 hover:bg-tr-red/20";
  if (n === "soundcloud")   return "bg-[#FF5500]/10 text-[#FF5500] border-[#FF5500]/30 hover:bg-[#FF5500]/20";
  if (n === "apple music")  return "bg-secondary text-muted-foreground border-border hover:text-foreground";
  // fallback
  return "bg-secondary text-muted-foreground border-border hover:text-foreground";
}

export default function MusicCard({
  title,
  type,
  vibeDescription,
  artworkUrl,
  platforms,
  soundcloudUrl,
}: MusicCardProps) {
  const tc = typeConfig[type];

  return (
    <article className="tr-music-card glass-card-hover overflow-hidden group rounded-lg">
      {soundcloudUrl ? (
        /* ── EMBED LAYOUT — player replaces static artwork ── */
        <div className="p-4 pb-3">
          <SoundCloudEmbed
            trackUrl={soundcloudUrl}
            title={title}
            type={embedTypeMap[type]}
          />
        </div>
      ) : (
        /* ── ARTWORK LAYOUT — static image with overlaid title ── */
        <figure className="aspect-square overflow-hidden relative m-0 rounded-t-lg">
          <img
            src={artworkUrl}
            alt={`${title} artwork`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-3 left-3 right-3">
            <span className={`font-display text-[0.55rem] uppercase tracking-[0.2em] ${tc.colorClass}`}>
              {tc.label}
            </span>
            <h2 className="font-display text-sm sm:text-base font-bold text-foreground uppercase tracking-wider mt-0.5 leading-tight">
              {title}
            </h2>
          </figcaption>
        </figure>
      )}

      <div className="p-4 pt-3">
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{vibeDescription}</p>

        {/* Platform badge pills */}
        <nav aria-label={`Listen to ${title}`}>
          <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
            {platforms.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`tr-status-pill border transition-colors inline-flex items-center gap-1 ${getPlatformClass(platform.name)}`}
                  aria-label={`Listen to ${title} on ${platform.name}`}
                >
                  {platform.name}
                  <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
