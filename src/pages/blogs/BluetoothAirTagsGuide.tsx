// TRAVEL RAVERS: Blog — Best Bluetooth Trackers & AirTags for Festivals 2026
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Bluetooth Trackers & AirTags for Festivals 2026",
  description: "Never lose your tent, bag or squad again. Best AirTags and Bluetooth trackers reviewed for festival use.",
  keywords: ["airtag festival", "best bluetooth tracker 2026", "festival theft protection", "tile pro review", "samsung smarttag2", "never lose tent festival"],
  publishDate: "2026-03-15",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

interface TrackerProductProps {
  name: string;
  description: string;
  href: string;
  price?: string;
}

function TrackerProduct({ name, description, href, price }: TrackerProductProps) {
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

const COMPARISON = [
  { name: "Apple AirTag", price: "~£99 (4-pack)", range: "~100m Bluetooth / unlimited UWB", battery: "1 year (CR2032)", worksWith: "iPhone only", useCase: "Best if everyone in your squad has an iPhone" },
  { name: "Tile Pro", price: "~£35", range: "~122m", battery: "1 year", worksWith: "iOS & Android", useCase: "Mixed squad — works with both phone types" },
  { name: "Samsung SmartTag2", price: "~£30", range: "~120m", battery: "6 months", worksWith: "Samsung Galaxy only", useCase: "Best for Samsung users — UWB precision" },
  { name: "Chipolo ONE", price: "~£25", range: "~60m", battery: "2 years", worksWith: "iOS & Android", useCase: "Budget option, excellent battery life" },
];

const heroImage = "/blogs/airtags-hero.jpg";
const heroAlt = "Apple AirTag and Bluetooth trackers beside a festival bag ready to pack";

export default function BluetoothAirTagsGuide() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/bluetooth-airtags-guide.jpg", "https://travelravers.com/blogs/bluetooth-airtags-guide");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/bluetooth-airtags-guide" },
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
          url: "https://travelravers.com/blogs/bluetooth-airtags-guide",
          image: "https://travelravers.com/blogs/airtags-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/airtags-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">Safety · Tech · Festival 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Bluetooth Trackers & AirTags for Festivals 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Festival theft is more common than people admit. Tents get ransacked during headliners, bags go missing in campsites, and cars get broken into in festival car parks. A £25–30 Bluetooth tracker is cheap insurance against all three. Here's which one to buy.
          </p>
        </header>

        {/* Comparison table */}
        <section className="mb-8 overflow-x-auto">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4">
            Comparison: AirTag vs Tile vs SmartTag vs Chipolo
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2 pr-4">Tracker</th>
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2 pr-4">Price</th>
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2 pr-4">Range</th>
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2 pr-4">Battery</th>
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2 pr-4">Works With</th>
                <th className="text-left font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 py-2">Festival Use</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((t) => (
                <tr key={t.name} className="border-b border-border/15 hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4 font-display text-[0.7rem] uppercase tracking-wide text-foreground/80">{t.name}</td>
                  <td className="py-3 pr-4 font-mono text-tr-green text-[0.7rem]">{t.price}</td>
                  <td className="py-3 pr-4 text-foreground/60 text-[0.7rem]">{t.range}</td>
                  <td className="py-3 pr-4 text-foreground/60 text-[0.7rem]">{t.battery}</td>
                  <td className="py-3 pr-4 text-foreground/60 text-[0.7rem]">{t.worksWith}</td>
                  <td className="py-3 text-foreground/50 text-[0.65rem] italic max-w-[12rem]">{t.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Products */}
        <section className="mb-8">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            Buy the Right Tracker
          </h2>
          <div className="space-y-4">
            <TrackerProduct
              name="Apple AirTag 4-Pack"
              description="The gold standard if you're on iPhone. UWB precision finding means you can locate your bag to within a few centimetres indoors. The 4-pack is the best value — use one per bag, one for your tent zip, and one for your car."
              href="https://www.amazon.co.uk/s?k=apple+airtag+4+pack&tag=travelravers-21"
              price="~£99 (4-pack)"
            />
            <TrackerProduct
              name="Tile Pro Bluetooth Tracker"
              description="The best cross-platform option for mixed iPhone/Android squads. Loud 103dB speaker makes it easy to locate in a messy tent. Replaceable battery. Tile's network of 35M+ devices means it can still be found even out of Bluetooth range."
              href="https://www.amazon.co.uk/s?k=tile+pro+bluetooth+tracker&tag=travelravers-21"
              price="~£35"
            />
            <TrackerProduct
              name="Samsung Galaxy SmartTag2"
              description="Samsung's best tracker uses both Bluetooth and UWB for precision location. Works exclusively with Samsung Galaxy phones. Excellent battery life (6 months) and water-resistant to IP67 — survives festival rain."
              href="https://www.amazon.co.uk/s?k=samsung+galaxy+smarttag2&tag=travelravers-21"
              price="~£30"
            />
            <TrackerProduct
              name="Chipolo ONE Bluetooth Tracker"
              description="The underdog — lightweight, loud (120dB), works with both Apple Find My and Google Find My Device. Two-year battery means you'll never need to replace it between festivals. The cheapest reliable tracker on the market."
              href="https://www.amazon.co.uk/s?k=chipolo+one+bluetooth+tracker&tag=travelravers-21"
              price="~£25"
            />
          </div>
        </section>

        <div className="rounded-lg border border-tr-cyan/20 bg-tr-cyan/5 p-4">
          <p className="text-tr-cyan text-sm font-display uppercase tracking-wider">
            Festival tip
          </p>
          <p className="text-foreground/60 text-sm leading-relaxed mt-1">
            Attach to your tent peg, backpack, and car keys before you arrive. Don't wait until something goes missing — by then it's too late to set them up properly.
          </p>
        </div>
      </div>
    </article>
  );
}
