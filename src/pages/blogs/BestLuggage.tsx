// TRAVEL RAVERS: Blog — Best Festival Luggage & Bags 2026
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Festival Luggage 2026: Bags & Cases for Ravers",
  description: "Top-rated luggage, holdalls and festival bags reviewed for 2026. Find the perfect carry-on for every festival trip.",
  keywords: ["festival luggage 2026", "best festival bags", "65l festival rucksack", "festival bum bag", "camelbak festival", "cabin bag festival", "festival dry bag"],
  publishDate: "2026-03-12",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

interface ProductCardProps {
  name: string;
  category: string;
  description: string;
  href: string;
  price?: string;
  tip?: string;
}

function ProductCard({ name, category, description, href, price, tip }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-tr-green/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(140 40% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-tr-green/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-tr-green/40" />
      <p className="text-[0.58rem] font-display uppercase tracking-widest text-tr-green/50 mb-1">{category}</p>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-3">{description}</p>
      {tip && (
        <p className="text-foreground/40 text-xs italic border-l-2 border-tr-green/20 pl-3 mb-4">{tip}</p>
      )}
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

const heroImage = "/blogs/luggage-hero.jpg";
const heroAlt = "Festival bags and luggage packed and ready for a trip abroad";

export default function BestLuggage() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/best-luggage.jpg", "https://travelravers.com/blogs/best-luggage");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/best-luggage" },
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
          url: "https://travelravers.com/blogs/best-luggage",
          image: "https://travelravers.com/blogs/luggage-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/luggage-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-tr-green/60 mb-2">Gear · Festival Bags 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Festival Luggage & Bags 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            The five bags you actually need — and nothing else. Getting your bag system right before you leave is the difference between a smooth festival experience and a chaotic one.
          </p>
        </header>

        <div className="space-y-4 mb-10">
          <ProductCard
            name="Cabin Carry-On Suitcase"
            category="Getting There"
            description="If you're flying, a hard-shell carry-on that fits Ryanair/easyJet overhead bins saves £40+ in checked bag fees. Look for a 20-inch spinner with TSA-approved locks. Non-negotiable for budget European festival flights."
            href="https://www.amazon.co.uk/s?k=cabin+carry+on+suitcase&tag=travelravers-21"
            price="~£40–90"
            tip="Ryanair's max: 40x20x25cm under seat, 55x40x20cm overhead (with Plus/Priority)."
          />
          <ProductCard
            name="65L Hiking & Festival Rucksack"
            category="Camping"
            description="The main pack for camping festivals. 65L fits tent, sleeping bag, wellies, clothes and food. Pick one with a waterproof base, external attachment points for boots, and padded hip straps — you'll be walking 2km from the car park."
            href="https://www.amazon.co.uk/s?k=65l+festival+hiking+rucksack&tag=travelravers-21"
            price="~£35–80"
            tip="Pack your sleeping bag at the bottom, tent poles down one side, and heaviest items close to your back."
          />
          <ProductCard
            name="Festival Bumbag / Crossbody"
            category="On-Site Daily"
            description="Your daily carry. Fits phone, cards, cash, earbuds, lip balm and a small power bank. The best festival bumbags are water-resistant, have anti-theft zip placement, and can be worn across the chest as well as the hip."
            href="https://www.amazon.co.uk/s?k=festival+bum+bag+crossbody&tag=travelravers-21"
            price="~£12–30"
            tip="Never put your phone in your back pocket at a festival. Front-worn bumbag only."
          />
          <ProductCard
            name="Camelbak Hydration Pack"
            category="Festival Hydration"
            description="For long sets at outdoor stages, a 2L hydration pack keeps you dancing without queuing for water. The Camelbak Classic is the gold standard — also doubles as a small day pack with a 6L dry storage section."
            href="https://www.amazon.co.uk/s?k=camelbak+hydration+pack+festival&tag=travelravers-21"
            price="~£30–60"
            tip="Fill up at water points every 2–3 hours. Most UK festivals have free refill stations."
          />
          <ProductCard
            name="Waterproof Dry Bag"
            category="Rain Protection"
            description="10L or 20L dry bag to protect sleeping bag, electronics, and clothes from UK festival rain. Rolls closed at the top, floats if you drop it in a puddle, and costs almost nothing. Pack one even if the forecast looks good."
            href="https://www.amazon.co.uk/s?k=waterproof+dry+bag+festival&tag=travelravers-21"
            price="~£6–15"
          />
        </div>

        {/* Commission callout */}
        <div className="rounded-lg border border-tr-green/20 bg-tr-green/5 p-5">
          <p className="text-tr-green text-sm font-display uppercase tracking-wider mb-1">
            🛒 Amazon luggage earns 5% commission
          </p>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Adding to cart locks in a 90-day affiliate tracking window. You can buy any time in that window and it still counts — even if you switch to a different product in the same session.
          </p>
        </div>
      </div>
    </article>
  );
}
