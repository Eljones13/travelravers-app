// TRAVEL RAVERS: SOUNDCLOUD EMBED COMPONENT
// Renders a responsive SoundCloud iframe player.
// Color tuned to tr-cyan (#00f5d4). Auto-play off by default.
// Used inside MusicCard and wherever a standalone embed is needed.

export interface SoundCloudEmbedProps {
  /** Full track or playlist URL: https://soundcloud.com/artist/track */
  trackUrl: string;
  title: string;
  type: "TR Original" | "Curated" | "Partner Mix";
}

const typeColorClass: Record<SoundCloudEmbedProps["type"], string> = {
  "TR Original": "text-tr-cyan",
  "Curated":     "text-tr-green",
  "Partner Mix": "text-tr-purple",
};

export default function SoundCloudEmbed({ trackUrl, title, type }: SoundCloudEmbedProps) {
  const src =
    "https://w.soundcloud.com/player/?url=" +
    encodeURIComponent(trackUrl) +
    "&color=%2300f5d4&auto_play=false&hide_related=true" +
    "&show_comments=false&show_user=true&show_reposts=false&show_teaser=false";

  return (
    <div className="w-full">
      {/* Type eyebrow + title */}
      <div className="mb-2">
        <span className={`font-display text-[0.55rem] uppercase tracking-[0.2em] ${typeColorClass[type]}`}>
          {type}
        </span>
        <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mt-0.5 leading-tight">
          {title}
        </h2>
      </div>

      {/* SoundCloud player iframe */}
      <iframe
        width="100%"
        height={166}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={src}
        title={title}
        loading="lazy"
        style={{ border: "none", display: "block", borderRadius: "0.375rem" }}
      />
    </div>
  );
}
