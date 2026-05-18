// TRAVEL RAVERS: Blog — Best Amazon Games & Entertainment for Festival Prep 2026
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Amazon Games & Entertainment for Festival Prep 2026",
  description: "Discover the best Amazon games, gadgets and entertainment picks to prep for festival season 2026. Curated by Travel Ravers.",
  keywords: ["festival entertainment", "amazon festival deals", "fire tablet", "kindle camping", "portable projector camping", "festival prep 2026"],
  publishDate: "2026-03-01",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

interface ProductCardProps {
  name: string;
  description: string;
  href: string;
  price?: string;
}

function ProductCard({ name, description, href, price }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-tr-cyan/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(185 60% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-tr-cyan/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-tr-cyan/40" />
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-4">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[0.65rem] font-display uppercase tracking-wider text-tr-green border border-tr-green/30 hover:border-tr-green/60 hover:text-tr-green px-3 py-2 rounded transition-colors"
      >
        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
        BUY ON AMAZON →
        <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
      </a>
    </div>
  );
}

const heroImage = "/blogs/games-hero.jpg";
const heroAlt = "Amazon Fire tablet, Kindle and portable projector ready for a festival trip";

export default function AmazonGamesGuide() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/amazon-games-guide.jpg", "https://travelravers.com/blogs/amazon-games-guide");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/amazon-games-guide" },
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
          url: "https://travelravers.com/blogs/amazon-games-guide",
          image: "https://travelravers.com/blogs/games-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/games-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">Amazon Picks · Festival Prep 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Amazon Games & Entertainment for Festival Prep 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Downtime at a festival is real — tent time, queue time, travel time. These Amazon picks keep you entertained from packing day to the journey home.
          </p>
        </header>

        <div className="space-y-5 mb-10">
          <ProductCard
            name="Amazon Fire Tablet"
            description="Stream sets, browse lineups, read guides, and watch movies in your tent. The HD screen holds up outdoors and battery life lasts all day. Perfect for long coach journeys and campsite chilling."
            href="https://www.amazon.co.uk/s?k=amazon+fire+tablet&tag=travelravers-21"
            price="From ~£49"
          />
          <ProductCard
            name="Kindle Paperwhite"
            description="A festival isn't just music — there's a lot of waiting around. The Kindle Paperwhite's glare-free screen works in direct sunlight and lasts weeks on a single charge. Drop it in your bumbag, forget it's there."
            href="https://www.amazon.co.uk/s?k=kindle+paperwhite&tag=travelravers-21"
            price="From ~£139"
          />
          <ProductCard
            name="Portable Mini Projector"
            description="Turn your tent into a cinema after the last act. These battery-powered mini projectors run 2–3 hours on a charge and pair with any phone via HDMI or Bluetooth. A guaranteed campsite crowd-pleaser."
            href="https://www.amazon.co.uk/s?k=portable+mini+projector+camping&tag=travelravers-21"
            price="From ~£59"
          />
        </div>

        {/* 90-day tip */}
        <div className="rounded-lg border border-tr-green/20 bg-tr-green/5 p-4">
          <p className="text-tr-green text-sm font-display uppercase tracking-wider">
            💡 Add to cart to lock in the 90-day affiliate window
          </p>
          <p className="text-foreground/50 text-xs mt-1 leading-relaxed">
            Amazon tracks purchases for 90 days after you click. Add items to your cart now even if you buy later — it still counts.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-border/20">
          <Link to="/gear" className="btn-primary inline-flex text-sm">
            See Full Festival Gear Guide →
          </Link>
        </div>
      </div>
    </article>
  );
}
