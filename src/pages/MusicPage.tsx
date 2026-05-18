// TRAVEL RAVERS: MUSIC & MIXES — /music
// Repurposed from Velvet's music grid for TR playlists and mixes.
// Rendering delegated to MusicCard; type labels/colours live in that component.
// Desktop sticky player bar at bottom of viewport — glass dark effect.
import { motion } from "framer-motion";
import { mixes } from "@/data/content";
import { usePageMeta } from "@/hooks/use-page-meta";
import MusicCard from "@/components/MusicCard";
import SectionHeader from "@/components/SectionHeader";
import { ExternalLink, Radio } from "lucide-react";

// First mix is used as the "now playing" placeholder in the sticky bar
const nowPlaying = mixes[0];

export default function MusicPage() {
  usePageMeta(
    "TR Music & Mixes",
    "Travel Ravers playlists and mixes. Listen while you plan your next festival trip.",
  );

  return (
    <>
      {/* ── MAIN CONTENT — pb-20 on desktop so sticky bar doesn't overlap ── */}
      <div className="page-container lg:pb-24">
        <div className="page-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Soundtrack Your Trip"
              heading="TR Music & Mixes"
              size="lg"
            />
            <p className="text-muted-foreground text-base mt-3 max-w-2xl">
              Listen while you plan. Original mixes, curated festival playlists, and partner sets from trusted DJs.
            </p>
          </motion.div>

          <div className="content-grid">
            {mixes.map((mix, i) => (
              <motion.div
                key={mix.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <MusicCard
                  title={mix.title}
                  type={mix.type}
                  vibeDescription={mix.vibe}
                  artworkUrl={mix.image}
                  platforms={mix.platforms}
                  soundcloudUrl={mix.soundcloudUrl}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY PLAYER BAR — desktop only ── */}
      <aside
        className="hidden lg:flex fixed bottom-0 left-0 right-0 z-40 items-center gap-6 px-6 h-14 border-t border-border/40"
        style={{ backgroundColor: "hsl(220 60% 3% / 0.85)", backdropFilter: "blur(12px)" }}
        aria-label="Now playing"
      >
        {/* Left: HUD label + track */}
        <div className="flex items-center gap-3 min-w-0">
          <Radio className="w-3.5 h-3.5 text-tr-cyan/70 flex-shrink-0 animate-pulse" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-display text-[0.5rem] uppercase tracking-[0.25em] text-tr-cyan/50 leading-none mb-0.5">
              Now Playing
            </p>
            <p className="font-display text-[0.65rem] uppercase tracking-wider text-foreground/80 truncate">
              {nowPlaying.title}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-border/40 flex-shrink-0" aria-hidden="true" />

        {/* Listen label */}
        <p className="text-foreground/35 text-[0.65rem] font-display uppercase tracking-wider flex-shrink-0">
          Listen while you plan
        </p>

        {/* Platform links */}
        <nav className="flex items-center gap-2 flex-shrink-0" aria-label="Player platform links">
          {nowPlaying.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tr-status-pill bg-secondary text-muted-foreground border border-border/40 hover:text-foreground transition-colors inline-flex items-center gap-1"
              aria-label={`Open ${p.name}`}
            >
              {p.name}
              <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
