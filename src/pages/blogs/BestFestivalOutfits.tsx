// TRAVEL RAVERS: Blog — Best Festival Outfits 2026
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Festival Outfits 2026: What to Wear at a Rave",
  description: "The best festival outfits for ravers in 2026. Shop neon, Tron and rave fashion with our curated Amazon picks.",
  keywords: ["festival outfits 2026", "gottwood outfit", "defected croatia outfit", "electric love festival outfit", "rave outfit women", "beach festival fashion"],
  publishDate: "2026-03-10",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

interface FestivalStyleCardProps {
  festival: string;
  vibe: string;
  description: string;
  tips: string[];
  href: string;
  flag: string;
}

function FestivalStyleCard({ festival, vibe, description, tips, href, flag }: FestivalStyleCardProps) {
  return (
    <div className="rounded-lg border border-tr-cyan/15 overflow-hidden">
      <div className="p-5 border-b border-border/20" style={{ backgroundColor: "hsl(220 40% 3.5%)" }}>
        <div className="flex items-start justify-between mb-2">
          <span className="text-2xl" aria-hidden="true">{flag}</span>
          <span className="tr-status-pill text-[0.6rem]">{vibe}</span>
        </div>
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-foreground mb-2">{festival}</h3>
        <p className="text-foreground/60 text-sm leading-relaxed mb-4">{description}</p>
        <ul className="space-y-1.5 mb-4">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/55">
              <span className="text-tr-cyan/60 mt-0.5 text-[0.7rem]">›</span>
              {tip}
            </li>
          ))}
        </ul>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[0.65rem] font-display uppercase tracking-wider text-tr-green border border-tr-green/30 hover:border-tr-green/60 px-3 py-2 rounded transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
          SHOP OUTFITS ON AMAZON →
          <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

const heroImage = "/blogs/outfits-hero.jpg";
const heroAlt = "Festival outfits and rave fashion laid out — neon, sequins and statement pieces";

export default function BestFestivalOutfits() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/best-festival-outfits.jpg", "https://travelravers.com/blogs/best-festival-outfits");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/best-festival-outfits" },
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
          url: "https://travelravers.com/blogs/best-festival-outfits",
          image: "https://travelravers.com/blogs/outfits-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/outfits-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">Festival Fashion · 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Festival Outfits 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Three very different festivals. Three completely different dress codes. This guide breaks down exactly what to wear at a UK woodland rave, a Croatian beach festival, and an Austrian mega-festival.
          </p>
        </header>

        <div className="space-y-5">
          <FestivalStyleCard
            festival="Gottwood — UK Woodland"
            flag="🏴󠁧󠁢󠁷󠁬󠁳󠁿"
            vibe="Techno Forest Rave"
            description="Gottwood is a small, intimate festival in an Anglesey woodland. The dress code is practical-meets-rave: you'll be dancing on uneven ground, possibly in the rain, around bonfires and through trees. Comfort and weather-proofing are non-negotiable."
            tips={[
              "Waterproof boots or wellies — the woodland floor gets muddy after rain",
              "Layering is essential — warm nights turn cold fast after 3am",
              "Earth tones and forest-appropriate outfits fit the vibe (but UV gear works too)",
              "Small crossbody bag or bumbag — no room for big backpacks dancing in the trees",
            ]}
            href="https://www.amazon.co.uk/s?k=festival+rave+outfit+women&tag=travelravers-21"
          />

          <FestivalStyleCard
            festival="Defected Croatia — Adriatic Beach"
            flag="🇭🇷"
            vibe="Beach Festival Heat"
            description="Defected Croatia takes place on the Adriatic coast in July when temperatures hit 35°C. It's a beach festival at heart — daytime raving by the sea, nighttime dancing under the stars. The dress code is minimal, practical, and hedonistic."
            tips={[
              "Swimwear doubles as festival wear during the day — rash vests protect against sun",
              "Sandals or flip-flops for day, comfortable dancing shoes for the boat parties",
              "Loose linen or mesh co-ords for warm evenings",
              "UV protection is critical — suncream, sunglasses, and a hat for daytime sets",
            ]}
            href="https://www.amazon.co.uk/s?k=beach+festival+outfit&tag=travelravers-21"
          />

          <FestivalStyleCard
            festival="Electric Love — Austrian Alps"
            flag="🇦🇹"
            vibe="Alpine Mega-Festival"
            description="Electric Love is Austria's biggest EDM festival set against a stunning Alpine backdrop near Salzburg. 200,000+ attendees across four days means the full range of festival fashion is on show — from coordinated crew looks to full-on EDM rave outfits."
            tips={[
              "Full festival looks work here — this is a statement outfit crowd",
              "Evenings get cool at altitude — bring a light jacket or festival hoodie",
              "Comfortable trainers or festival boots for long days walking the site",
              "Fluorescent and neon colours photograph brilliantly against the mountain scenery",
            ]}
            href="https://www.amazon.co.uk/s?k=edm+festival+rave+outfit&tag=travelravers-21"
          />
        </div>

        <div className="mt-10 pt-6 border-t border-border/20">
          <Link to="/gear" className="btn-primary inline-flex text-sm">
            See Full Gear & Packing Guide →
          </Link>
        </div>
      </div>
    </article>
  );
}
