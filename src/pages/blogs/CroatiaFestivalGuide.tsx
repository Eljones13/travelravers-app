// TRAVEL RAVERS: Blog — Croatia Festival Travel Guide 2026
import { ExternalLink, ShoppingBag, Plane, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Croatia Festival Travel Guide 2026: Hideout, Defected & More",
  description: "Complete guide to Croatia's best festivals in 2026. Flights, hotels, packing tips and affiliate deals.",
  keywords: ["croatia festival 2026", "defected croatia travel", "love international guide", "hideout festival guide", "split airport festivals", "tisno croatia festival"],
  publishDate: "2026-03-18",
  affiliatePrograms: ["Amazon UK (travelravers-21)", "Skyscanner", "Stay22"],
};

interface FestivalCardProps {
  name: string;
  dates: string;
  location: string;
  vibe: string;
  ticketUrl: string;
  isLastYear?: boolean;
}

function FestivalCard({ name, dates, location, vibe, ticketUrl, isLastYear }: FestivalCardProps) {
  return (
    <div className="rounded-lg border border-tr-cyan/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(185 60% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-tr-cyan/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-tr-cyan/40" />
      <div className="flex items-start justify-between mb-2">
        <p className="text-[0.58rem] font-display uppercase tracking-widest text-tr-cyan/50">{location}</p>
        {isLastYear && (
          <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-400/10 text-red-400 px-2 py-0.5 text-[0.55rem] font-display uppercase tracking-wider">
            FINAL EVER
          </span>
        )}
      </div>
      <h3 className="font-display text-base font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      <p className="text-foreground/50 text-[0.7rem] font-display uppercase tracking-wider mb-2">{dates}</p>
      <p className="text-foreground/60 text-sm leading-relaxed mb-4">{vibe}</p>
      <a
        href={ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center gap-2 text-[0.65rem]"
      >
        Get Tickets
        <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
      </a>
    </div>
  );
}

interface GearCardProps {
  name: string;
  description: string;
  href: string;
  price?: string;
}

function GearCard({ name, description, href, price }: GearCardProps) {
  return (
    <div className="rounded-lg border border-tr-green/20 p-4 relative overflow-hidden" style={{ backgroundColor: "hsl(140 40% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-tr-green/40" />
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-3">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[0.65rem] font-display uppercase tracking-wider text-tr-green border border-tr-green/30 hover:border-tr-green/60 px-3 py-1.5 rounded transition-colors"
      >
        <ShoppingBag className="w-3 h-3" aria-hidden="true" />
        BUY ON AMAZON →
      </a>
    </div>
  );
}

const heroImage = "/blogs/croatia-hero.jpg";
const heroAlt = "Croatia's Adriatic coastline with festival stages set up by the sea at sunset";

export default function CroatiaFestivalGuide() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/croatia-festival-guide.jpg", "https://travelravers.com/blogs/croatia-festival-guide");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/croatia-festival-guide" },
        ]}
      />
      <SchemaScript
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: BLOG_META.title,
          description: BLOG_META.description,
          datePublished: BLOG_META.publishDate,
          dateModified: BLOG_META.publishDate,
          author: { "@type": "Organization", name: "Travel Ravers" },
          url: "https://travelravers.com/blogs/croatia-festival-guide",
          image: "https://travelravers.com/blogs/croatia-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/croatia-hero.jpg with final artwork at any time */}
        <div className="w-full rounded-xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
          <img
            src={heroImage}
            alt={heroAlt}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <header className="mb-8">
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">Travel Guide · Croatia 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Croatia Festival Travel Guide 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Croatia is the raver's paradise: stunning Adriatic coast, cheap flights from the UK, and some of the best house and techno festivals in Europe all clustered around Tisno and Pag Island. Here's how to do it properly.
          </p>
        </header>

        {/* Festival cards */}
        <section className="mb-8">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            The Festivals
          </h2>
          <div className="space-y-4">
            <FestivalCard
              name="Defected Croatia"
              dates="Aug 12–16, 2026"
              location="The Garden, Tisno"
              vibe="House music royalty at the beautiful Garden resort on the Adriatic. Multiple floating stages, day parties, boat parties, and some of the best tech house and deep house bookings in Europe. This edition is historic — don't miss it."
              ticketUrl="https://www.skiddle.com/festivals/defected-croatia/?sktag=15628"
              isLastYear={true}
            />
            <FestivalCard
              name="Love International"
              dates="Jul 8–15, 2026"
              location="The Garden, Tisno"
              vibe="A week-long celebration of disco, house, soul, and electronic music at the same Garden resort. Smaller and more intimate than Defected, Love International has a devoted following and a notoriously warm atmosphere."
              ticketUrl="https://loveinternational.hr/tickets"
            />
            <FestivalCard
              name="Hideout"
              dates="Jun 30 – Jul 4, 2026"
              location="Zrće Beach, Pag Island"
              vibe="Five days of drum and bass, house and techno at Zrće Beach — one of Europe's most famous party beaches. Three outdoor venues, 24-hour music, and the Croatian summer sun. A bucket-list experience for UK ravers."
              ticketUrl="https://www.skiddle.com/festivals/dimensions-festival/?sktag=15628"
            />
          </div>
        </section>

        {/* Travel section */}
        <section className="rounded-lg border border-tr-green/15 p-5 mb-8" style={{ backgroundColor: "hsl(140 40% 3%)" }}>
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4">
            Getting There
          </h2>
          <div className="space-y-3 mb-5">
            <p className="text-foreground/70 text-sm leading-relaxed">
              <strong className="text-foreground/90">Fly into Split Airport (SPU)</strong> — it's the main hub for both Tisno and Pag Island. Ryanair, easyJet and Jet2 all fly direct from London, Manchester, Leeds and Bristol. Book early: flights for Croatian festival season fill up by March.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              From Split, <strong className="text-foreground/90">hire a car</strong> — the drive to Tisno takes about 45 minutes along the coastal road. For Pag Island, allow 1.5–2 hours. Car hire at Split is cheap in the off-season but expensive during peak festival weeks. Book months ahead.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              The Garden resort runs official transfers from Split Airport during Defected and Love International weeks — check their website for shuttle bus packages. For Hideout, pre-book the official ferry transfer from Split or Zadar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.skyscanner.net/transport/flights-from/spu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-[0.65rem]"
            >
              <Plane className="w-3.5 h-3.5" aria-hidden="true" />
              Flights from Split (SPU) ✈
            </a>
            <a
              href="https://www.stay22.com/events/search?query=Split"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-[0.65rem]"
            >
              <Hotel className="w-3.5 h-3.5" aria-hidden="true" />
              Hotels near Split 🏨
            </a>
          </div>
          <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider mt-2">
            Skyscanner · Stay22 — Affiliate Links
          </p>
        </section>

        {/* Croatia gear */}
        <section className="mb-8">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            Essential Croatia Gear
          </h2>
          <p className="text-foreground/60 text-sm leading-relaxed mb-4">
            Croatia in July and August means 32–38°C temperatures, direct sun on exposed venues, and sea spray on boat parties. Pack accordingly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GearCard
              name="SPF 50+ Suncream"
              description="Non-negotiable for Adriatic coast festivals. Reef-safe is essential if you're swimming. Apply before you get dressed, reapply every 2 hours."
              href="https://www.amazon.co.uk/s?k=spf+50+suncream+festival&tag=travelravers-21"
              price="~£6–15"
            />
            <GearCard
              name="Portable USB Fan"
              description="For tent camping in the heat. A small rechargeable fan makes sleeping in a tent at 30°C actually bearable. Doubles as a cooling fan at outdoor stages."
              href="https://www.amazon.co.uk/s?k=portable+usb+fan+festival&tag=travelravers-21"
              price="~£12–25"
            />
            <GearCard
              name="Microfibre Beach Towel"
              description="Compact, quick-drying, and light enough to carry in your bumbag. Essential for boat parties, beach stages, and impromptu sea swimming between sets."
              href="https://www.amazon.co.uk/s?k=microfibre+beach+towel+compact&tag=travelravers-21"
              price="~£8–20"
            />
            <GearCard
              name="Reef-Safe SPF50 Sunscreen"
              description="Zingy coral reefs off the Croatian coast are protected. Reef-safe formula protects you and the sea. Look for mineral-based (non-nano zinc oxide) formulas."
              href="https://www.amazon.co.uk/s?k=reef+safe+sunscreen+spf50&tag=travelravers-21"
              price="~£10–20"
            />
          </div>
        </section>
      </div>
    </article>
  );
}
