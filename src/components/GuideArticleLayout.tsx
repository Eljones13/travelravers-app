// TRAVEL RAVERS: GUIDE ARTICLE LAYOUT — used at /guides/[slug]
// Presentational full-width article layout for a single guide.
// The page file (GuideDetailPage) owns routing + SEO; this component owns rendering.
// Includes: hero image, category meta, h1, read-time, in-page TOC nav, markdown body parser,
// related-guides CTA. Schema injection point is marked for future JSON-LD.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ExternalLink, ShoppingBag } from "lucide-react";
import type { Guide } from "@/data/content";
import { festivalGear, type GearProduct } from "@/data/festivalGear";
import gearFlatlay from "@/assets/gear-flatlay.jpg";

interface GuideArticleLayoutProps {
  guide: Guide;
}

// Parses the guide's markdown-like content string into typed sections.
// Splits on "## " headings; first chunk (index 0) has no heading (intro).
function parseSections(raw: string) {
  return raw.split("\n## ").map((block, i) => {
    if (i === 0) return { title: null as string | null, content: block.trim() };
    const [heading, ...rest] = block.split("\n");
    return { title: heading.trim(), content: rest.join("\n").trim() };
  });
}

// Renders a single paragraph/block from the article body.
// Handles ### headings, bullet/numbered lists, and **bold** inline markup.
function renderBlock(block: string, key: number) {
  if (block.startsWith("### ")) {
    return (
      <h3
        key={key}
        className="font-display text-sm font-bold text-foreground uppercase tracking-wider mt-6 mb-2"
      >
        {block.replace("### ", "")}
      </h3>
    );
  }

  if (block.startsWith("- ") || block.startsWith("1. ")) {
    const items = block.split("\n").filter(Boolean);
    return (
      <ul key={key} className="space-y-2 ml-1">
        {items.map((item, k) => (
          <li key={k} className="flex items-start gap-2 text-sm">
            <span className="text-tr-cyan mt-0.5" aria-hidden="true">•</span>
            <span>{item.replace(/^[-\d.]+\s*\*?\*?/, "").replace(/\*\*/g, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Inline **bold** processing
  const parts = block.split(/\*\*(.*?)\*\*/g);
  return (
    <p key={key} className="text-sm sm:text-base">
      {parts.map((part, k) =>
        k % 2 === 1
          ? <strong key={k} className="text-foreground font-semibold">{part}</strong>
          : part,
      )}
    </p>
  );
}

// ── Gear sidebar helpers ──────────────────────────────────────────────────────

// Words too common to be meaningful for matching
const STOP = new Set([
  "festival", "festivals", "guide", "guides", "best", "your", "list",
  "2026", "2025", "what", "this", "that", "with", "from",
]);

function depluralize(w: string): string {
  return w.endsWith("s") && w.length > 4 ? w.slice(0, -1) : w;
}

function tokenize(s: string): string[] {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map(depluralize)
    .filter((w) => w.length >= 4);
}

function getGearForGuide(guideTitle: string): GearProduct[] {
  const tTokens = new Set(tokenize(guideTitle));
  const t = guideTitle.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  const matched = festivalGear.filter((p) => {
    // 1. Keyword overlap with any blog mention
    const byMention = p.blogMentions.some((mention) => {
      const mToks = tokenize(mention);
      const shared = mToks.filter((w) => tTokens.has(w) && !STOP.has(w));
      // One long specific word (≥7 chars) is enough; otherwise need ≥2
      return shared.some((w) => w.length >= 7) || shared.length >= 2;
    });
    if (byMention) return true;

    // 2. A significant noun from the product name appears verbatim in the title
    //    (catches "Best Earplugs…" → "Loop Earplugs", "Hydration Packs" → "Hydration Backpack")
    const nameWords = p.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .map(depluralize)
      .filter((w) => w.length >= 6 && !STOP.has(w));
    return nameWords.some((w) => t.includes(w));
  });

  if (matched.length >= 3) return matched.slice(0, 3);

  // Pad with universally-tagged products not already matched
  const fallback = festivalGear
    .filter((p) => p.featuredOnFestivals.includes("All") && !matched.includes(p))
    .slice(0, 3 - matched.length);

  return [...matched, ...fallback].slice(0, 3);
}

function GearSidebar({ products }: { products: GearProduct[] }) {
  return (
    <aside
      className="hidden lg:block w-56 flex-shrink-0"
      aria-label="Recommended gear for this guide"
    >
      <div className="sticky top-8 rounded-lg border border-tr-cyan/15 p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <ShoppingBag className="w-3 h-3 text-tr-cyan/60" aria-hidden="true" />
          <p className="label-caps text-[0.55rem] text-tr-cyan/60">Amazon UK</p>
        </div>
        <p className="font-display text-[0.65rem] font-bold text-foreground uppercase tracking-wider mb-4">
          Gear for This Guide
        </p>
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-md border border-border/30 bg-secondary/20 overflow-hidden"
            >
              <figure className="aspect-[4/3] m-0">
                <img
                  src={gearFlatlay}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="p-3">
                <p className="font-display text-[0.6rem] font-semibold text-foreground uppercase tracking-wider leading-snug mb-3">
                  {p.name}
                </p>
                <a
                  href={p.amazonUkUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary text-[0.55rem] py-1.5 px-2 inline-flex items-center gap-1 w-full justify-center"
                  aria-label={`Buy ${p.name} on Amazon UK`}
                >
                  🏆 See Best Sellers
                  <ExternalLink className="w-2 h-2 opacity-70" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider mt-3 leading-relaxed">
          Affiliate links — we earn a small commission
        </p>
      </div>
    </aside>
  );
}

// ── Main layout ───────────────────────────────────────────────────────────────

export default function GuideArticleLayout({ guide }: GuideArticleLayoutProps) {
  const sections = parseSections(guide.content);
  const headings = sections.filter((s) => s.title).map((s) => s.title!);
  const gearProducts = getGearForGuide(guide.title);

  return (
    <article className="page-container">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Guides
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:flex lg:gap-10 lg:items-start">

            {/* ── Main article ── */}
            <div className="flex-1 min-w-0">

              {/* Hero image */}
              {guide.image && (
                <figure className="aspect-[21/9] rounded-lg overflow-hidden mb-8 m-0">
                  <img
                    src={guide.image}
                    alt={`Cover image for ${guide.title}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </figure>
              )}

              {/* Article meta */}
              <header className="mb-8">
                <span className="tr-status-pill bg-secondary text-muted-foreground border border-border mb-4 inline-flex">
                  {guide.category}
                </span>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase tracking-wider leading-tight">
                  {guide.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{guide.readTime}</span>
                </div>
              </header>

              {/* In-page table of contents */}
              {headings.length > 0 && (
                <nav className="glass-card p-5 mb-10" aria-label="Table of contents">
                  <p className="label-caps mb-3">In This Guide</p>
                  <ol className="space-y-2 list-none p-0 m-0">
                    {headings.map((heading, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-foreground/70 hover:text-tr-cyan transition-colors text-sm flex items-center gap-2"
                        >
                          <span className="text-tr-cyan/50 font-display text-xs" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* TRAVEL RAVERS: ARTICLE SCHEMA INJECTION POINT — add JSON-LD Article schema here */}

              {/* Article body */}
              <div className="space-y-8">
                {sections.map((section, i) => (
                  <section
                    key={i}
                    id={section.title ? `section-${headings.indexOf(section.title)}` : undefined}
                  >
                    {section.title && (
                      <h2 className="font-display text-lg sm:text-xl font-bold text-foreground uppercase tracking-wider mb-4">
                        {section.title}
                      </h2>
                    )}
                    <div className="text-foreground/80 leading-relaxed space-y-4">
                      {section.content.split("\n\n").map((block, j) => renderBlock(block, j))}
                    </div>
                  </section>
                ))}
              </div>

            </div>{/* end main article */}

            {/* ── Gear sidebar (lg+) ── */}
            <GearSidebar products={gearProducts} />

          </div>{/* end flex row */}

          {/* Related guides CTA — full width */}
          <aside className="glass-card p-6 mt-12 border-tr-cyan/20">
            <p className="font-display text-sm uppercase tracking-wider text-tr-cyan mb-2">Keep Reading</p>
            <p className="text-foreground/70 text-sm mb-4">
              Check out more guides on packing, safety, and festival-specific travel tips.
            </p>
            <Link to="/guides" className="btn-primary text-xs">Browse All Guides</Link>
          </aside>
        </motion.div>
      </div>
    </article>
  );
}
