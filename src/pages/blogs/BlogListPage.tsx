// TRAVEL RAVERS: Blog List — /blogs
// Shows all 6 affiliate blog posts as glass cards.
// When a festival is focused, relevant posts are surfaced first.
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, SlidersHorizontal } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useFestivalFocus } from "@/context/FestivalFocusContext";
import EmailCapture from "@/components/EmailCapture";

interface BlogEntry {
  slug: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  /** Festival slugs and lowercase country names this post is most relevant to */
  festivalTags: string[];
}

const BLOGS: BlogEntry[] = [
  {
    slug: "first-time-festival-guide",
    title: "First-Time Festival Survival Guide 2026",
    description: "Step-by-step packing, safety, and travel guide for first-time ravers heading to European festivals in 2026.",
    tag: "First-Time Ravers",
    tagColor: "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/8",
    festivalTags: [],
  },
  {
    slug: "amazon-games-guide",
    title: "Best Amazon Games & Entertainment for Festival Prep 2026",
    description: "Fire Tablet, Kindle Paperwhite, and portable projectors to keep you entertained on the journey there and in your tent.",
    tag: "Amazon Picks",
    tagColor: "text-tr-green border-tr-green/30 bg-tr-green/8",
    festivalTags: [],
  },
  {
    slug: "rave-makeup-guide",
    title: "How to Do Rave Makeup That Lasts 3 Days",
    description: "UV face paint, body glitter, setting sprays and a 5-step system that survives sweat, rain, and three nights of dancing.",
    tag: "Beauty",
    tagColor: "text-tr-purple border-tr-purple/30 bg-tr-purple/8",
    festivalTags: [],
  },
  {
    slug: "best-festival-outfits",
    title: "Best Festival Outfits 2026: Gottwood, Defected & Electric Love",
    description: "What to wear at three completely different festivals — a UK woodland rave, a Croatian beach festival, and an Alpine mega-event.",
    tag: "Fashion",
    tagColor: "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/8",
    festivalTags: ["gottwood", "uk", "croatia", "defected-croatia", "electric-love", "austria"],
  },
  {
    slug: "best-luggage",
    title: "Best Festival Luggage & Bags 2026: From Carry-Ons to Camelbaks",
    description: "The five bags every festival-goer needs — carry-on, 65L rucksack, bumbag, hydration pack, and waterproof dry bag.",
    tag: "Gear",
    tagColor: "text-tr-green border-tr-green/30 bg-tr-green/8",
    festivalTags: [],
  },
  {
    slug: "bluetooth-airtags-guide",
    title: "Best Bluetooth Trackers & AirTags for Festivals 2026",
    description: "AirTag vs Tile Pro vs SmartTag2 vs Chipolo — honest comparison for festival use cases. Never lose your tent again.",
    tag: "Tech / Safety",
    tagColor: "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/8",
    festivalTags: [],
  },
  {
    slug: "croatia-festival-guide",
    title: "Croatia Festival Travel Guide 2026",
    description: "Defected Croatia (final ever edition), Love International, and Hideout — with flights, transfers, hotels, and heat survival gear.",
    tag: "Travel Guide",
    tagColor: "text-amber-400 border-amber-400/30 bg-amber-400/8",
    festivalTags: ["croatia", "hideout", "defected-croatia", "love-international"],
  },
  {
    slug: "best-festival-tents",
    title: "Best Festival Tents 2026: What to Buy for Every Budget",
    description: "From £30 pop-up tents to premium blackout shelters — every budget covered. Vango, Quechua, MSR and more reviewed for festival camping.",
    tag: "Gear",
    tagColor: "text-tr-green border-tr-green/30 bg-tr-green/8",
    festivalTags: [],
  },
  {
    slug: "best-power-banks",
    title: "Best Power Banks & Portable Stations for Festivals 2026",
    description: "Never run out of battery again. Pocket power banks for personal use, portable power stations for the whole campsite — all reviewed.",
    tag: "Tech / Gear",
    tagColor: "text-tr-cyan border-tr-cyan/30 bg-tr-cyan/8",
    festivalTags: [],
  },
];

export default function BlogListPage() {
  const { selectedMeta } = useFestivalFocus();
  const [showAll, setShowAll] = useState(false);

  usePageMeta(
    "Festival Guides & Affiliate Reviews 2026 — Travel Ravers",
    "Deep-dive festival travel guides, gear reviews, and Amazon affiliate picks for ravers in 2026. Outfits, luggage, trackers, makeup, and destination guides.",
  );

  // Determine which posts are relevant to the focused festival
  const relevantSlugs = new Set<string>();
  if (selectedMeta) {
    const countryKey = selectedMeta.country.toLowerCase();
    BLOGS.forEach((blog) => {
      if (
        blog.festivalTags.includes(selectedMeta.slug) ||
        blog.festivalTags.includes(countryKey)
      ) {
        relevantSlugs.add(blog.slug);
      }
    });
  }

  // Only activate filtering if there are actually relevant posts to surface
  const hasFilter = !!selectedMeta && relevantSlugs.size > 0 && relevantSlugs.size < BLOGS.length;

  // Sorted list: relevant first, then rest — unless user toggles "show all" (no reordering)
  const displayBlogs =
    hasFilter && !showAll
      ? [
          ...BLOGS.filter((b) => relevantSlugs.has(b.slug)),
          ...BLOGS.filter((b) => !relevantSlugs.has(b.slug)),
        ]
      : BLOGS;

  return (
    <div className="page-container">
      <div className="page-inner">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2 flex items-center gap-2">
            <BookOpen className="w-3 h-3" aria-hidden="true" />
            Guides · Gear · Destinations
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Festival Guides 2026
          </h1>
          <p className="text-foreground/55 text-base max-w-xl">
            Everything you need to plan, pack, and survive a festival abroad. Affiliate links support the site.
          </p>
        </motion.header>

        {/* Festival focus filter bar — only visible when filtering is active */}
        {hasFilter && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="
              mb-6 flex flex-col sm:flex-row sm:items-center
              gap-3 sm:gap-4
              rounded-lg border border-tr-cyan/20 bg-tr-cyan/5
              px-4 py-3
            "
          >
            {/* Label */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-tr-cyan/60 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-foreground/70">
                <span className="text-tr-cyan font-display font-bold uppercase tracking-wide text-xs">
                  {relevantSlugs.size} relevant post{relevantSlugs.size !== 1 ? "s" : ""}
                </span>{" "}
                for <span className="text-foreground">{selectedMeta!.name}</span> — surfaced first
              </p>
            </div>

            {/* Toggle — large tap target for mobile */}
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="
                min-h-[44px] px-4 py-2
                rounded border border-border/30 hover:border-tr-cyan/30
                font-display text-xs uppercase tracking-wider
                text-foreground/60 hover:text-tr-cyan
                transition-colors duration-150
                flex-shrink-0 self-start sm:self-auto
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tr-cyan/50
              "
              aria-pressed={showAll}
            >
              {showAll ? "Show relevant first" : "Show all posts"}
            </button>
          </motion.div>
        )}

        {(() => {
          const relevantBlogs = hasFilter && !showAll
            ? displayBlogs.filter((b) => relevantSlugs.has(b.slug))
            : [];
          const otherBlogs = hasFilter && !showAll
            ? displayBlogs.filter((b) => !relevantSlugs.has(b.slug))
            : displayBlogs;

          const renderCard = (blog: BlogEntry, i: number, highlighted: boolean) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <Link
                to={`/blogs/${blog.slug}`}
                className={`
                  block rounded-lg border p-5 relative overflow-hidden transition-colors
                  hover:border-tr-cyan/30 group
                  ${highlighted ? "border-tr-cyan/25 bg-tr-cyan/5" : "border-border/20"}
                `}
                style={highlighted ? undefined : { backgroundColor: "hsl(220 40% 3.5%)" }}
              >
                <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-border/30 group-hover:border-tr-cyan/40 transition-colors" />
                <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-border/30 group-hover:border-tr-cyan/40 transition-colors" />
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[0.58rem] font-display uppercase tracking-wider ${blog.tagColor}`}>
                    {blog.tag}
                  </span>
                  <ExternalLink className="w-3 h-3 text-foreground/20 group-hover:text-tr-cyan/50 transition-colors" aria-hidden="true" />
                </div>
                <h2 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-2 group-hover:text-tr-cyan transition-colors leading-snug">
                  {blog.title}
                </h2>
                <p className="text-foreground/55 text-sm leading-relaxed">{blog.description}</p>
                <p className="mt-3 text-[0.6rem] font-display uppercase tracking-wider text-tr-cyan/40 group-hover:text-tr-cyan/70 transition-colors">
                  Read Guide →
                </p>
              </Link>
            </motion.div>
          );

          return (
            <>
              {relevantBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {relevantBlogs.map((blog, i) => renderCard(blog, i, true))}
                </div>
              )}

              {relevantBlogs.length > 0 && otherBlogs.length > 0 && (
                <p className="label-caps text-[0.6rem] text-foreground/35 mb-4">
                  Also useful for any festival
                </p>
              )}

              {otherBlogs.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    {otherBlogs.slice(0, 2).map((blog, i) => renderCard(blog, i, false))}
                  </div>

                  <div className="mb-8">
                    <EmailCapture />
                  </div>

                  {otherBlogs.length > 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {otherBlogs.slice(2).map((blog, i) => renderCard(blog, i + 2, false))}
                    </div>
                  )}
                </>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
