// TRAVEL RAVERS: Blog — Best Power Banks & Power Stations for Festivals 2026
import { ExternalLink, ShoppingBag, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Power Banks & Portable Stations for Festivals 2026",
  description: "Never run out of battery at a festival again. Our top picks for power banks and portable power stations — from pocket-sized to campsite-ready.",
  keywords: ["best power bank festival 2026", "portable power station camping", "festival charging station", "high capacity power bank", "anker power bank review", "solar power bank festival"],
  publishDate: "2026-03-27",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

const heroImage = "/blogs/power-hero.jpg";
const heroAlt = "Portable power banks and charging cables laid out at a festival campsite";

interface PowerCardProps {
  name: string;
  category: string;
  capacity: string;
  description: string;
  href: string;
  price?: string;
  tip?: string;
  ports?: string;
}

function PowerCard({ name, category, capacity, description, href, price, tip, ports }: PowerCardProps) {
  return (
    <div className="rounded-lg border border-yellow-500/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(45 40% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-yellow-500/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-yellow-500/40" />
      <div className="flex items-start justify-between mb-1">
        <p className="text-[0.58rem] font-display uppercase tracking-widest text-yellow-500/50">{category}</p>
        <span className="inline-flex items-center gap-1 text-[0.58rem] font-display uppercase tracking-widest text-foreground/40 border border-border/20 rounded px-1.5 py-0.5">
          <Zap className="w-2.5 h-2.5" aria-hidden="true" />
          {capacity}
        </span>
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      {ports && <p className="text-[0.6rem] text-foreground/40 font-display uppercase tracking-wider mb-2">{ports}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-3">{description}</p>
      {tip && (
        <p className="text-foreground/40 text-xs italic border-l-2 border-yellow-500/20 pl-3 mb-4">{tip}</p>
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

const CHARGING_TIPS = [
  { title: "Charge everything the night before", body: "Power banks, phone, earbuds, tracker, torch — all of it. A full charge cycle the night before departure is non-negotiable." },
  { title: "Bring your own cable", body: "Festival charging stations rarely have cables. Bring a short (30cm) USB-C cable for your power bank and a longer (1m) cable for tent charging. Short cables lose less power over distance." },
  { title: "Airplane mode extends battery life 3x", body: "When you're not actively using your phone, airplane mode is your friend. Turn off mobile data, enable airplane mode, and re-enable WiFi only when needed." },
  { title: "A 20,000mAh bank charges an iPhone ~4x", body: "Real-world capacity is 60–70% of rated mAh due to conversion losses. Factor that in when choosing capacity. For a 3-day festival: 20,000mAh minimum for two phones." },
  { title: "Official festival charging = queue time", body: "Festival charging tents have long queues and you have to leave your phone unattended. A power bank removes this entirely. Worth every penny." },
];

export default function BestPowerBanks() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/best-power-banks.jpg", "https://travelravers.com/blogs/best-power-banks");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/best-power-banks" },
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
          url: "https://travelravers.com/blogs/best-power-banks",
          image: "https://travelravers.com/blogs/power-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/power-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-yellow-500/60 mb-2">Tech · Power · Festival 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Power Banks & Power Stations for Festivals 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Running out of battery at a festival is a safety issue, not just an inconvenience. No GPS, no maps, no emergency contacts. This guide covers power banks for personal use and portable power stations for campsite charging.
          </p>
        </header>

        {/* Power bank picks */}
        <section className="mb-10">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            Power Banks (Personal Use)
          </h2>
          <div className="space-y-4">
            <PowerCard
              name="Anker 737 Power Bank"
              category="Best Overall"
              capacity="24,000 mAh"
              description="The best all-round festival power bank. 140W bi-directional charging means it recharges itself in 1.5 hours and pushes full 140W to laptops. Two USB-C ports plus USB-A, enough for a full squad top-up. The digital display shows exact percentage remaining."
              href="https://www.amazon.co.uk/s?k=anker+737+power+bank&tag=travelravers-21"
              price="~£80–100"
              ports="2× USB-C (140W) · 1× USB-A (22.5W)"
              tip="This exceeds airline carry-on limits (100Wh). The Anker 737 is 88.8Wh — just within limits. Always check your specific airline."
            />
            <PowerCard
              name="Anker 323 Power Bank"
              category="Budget Pick"
              capacity="10,000 mAh"
              description="The minimum viable power bank for a 3-day festival — roughly 2 full charges for a modern smartphone. Lightweight at 180g, easy to drop in a bumbag, and charges via USB-C. Not the fastest charging, but reliable and cheap."
              href="https://www.amazon.co.uk/s?k=anker+323+power+bank+10000&tag=travelravers-21"
              price="~£18–25"
              ports="1× USB-C · 1× USB-A"
            />
            <PowerCard
              name="Baseus 65W 20,000mAh"
              category="Value Pick"
              capacity="20,000 mAh"
              description="Excellent mid-range option. 65W output can charge a MacBook Air slowly and a phone rapidly. Compact for a 20,000mAh bank. Great for festival trips where you want enough to cover the full weekend without hunting for a socket."
              href="https://www.amazon.co.uk/s?k=baseus+65w+power+bank+20000&tag=travelravers-21"
              price="~£35–50"
              ports="2× USB-C (65W) · 1× USB-A"
            />
            <PowerCard
              name="BigBlue Solar Power Bank"
              category="Solar Option"
              capacity="26,800 mAh"
              description="Solar charging at festivals is largely a gimmick — you need direct sun for hours to add meaningful charge. But as a backup to top up a nearly-full power bank during a sunny day set, it works. The large bank capacity is the real feature here."
              href="https://www.amazon.co.uk/s?k=bigblue+solar+power+bank+camping&tag=travelravers-21"
              price="~£40–60"
              tip="Lay it panel-up on your tent during the afternoon set. You'll gain ~10–20% charge in 3–4 hours of UK summer sun."
            />
          </div>
        </section>

        {/* Portable power stations */}
        <section className="mb-10">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            Portable Power Stations (Campsite Use)
          </h2>
          <p className="text-foreground/55 text-sm leading-relaxed mb-5">
            If you're going with a group and camping for multiple days, a portable power station is a game-changer. Charge everyone's phones, run a Bluetooth speaker, and power a small fan. Check festival rules — most allow battery-only stations (no generators).
          </p>
          <div className="space-y-4">
            <PowerCard
              name="Jackery Explorer 240"
              category="Group Campsite"
              capacity="240 Wh / 67,200 mAh"
              description="The go-to campsite power station for festival groups. Weighs 3.1kg — manageable in a trolley. AC output for laptops and mini fans. USB-C and USB-A for phones. Enough for a full 3-day festival for 4 people. Charges via AC in 5 hours or solar panels."
              href="https://www.amazon.co.uk/s?k=jackery+explorer+240&tag=travelravers-21"
              price="~£200–260"
              ports="1× AC (200W) · 2× USB-A · 1× USB-C · 1× DC"
              tip="Check the festival's generator policy. Most UK festivals allow battery stations — Jackery qualifies as battery, not generator."
            />
            <PowerCard
              name="EcoFlow River 2"
              category="Premium Campsite"
              capacity="256 Wh / 71,000 mAh"
              description="Faster charging than the Jackery (1 hour from AC) and a slightly higher AC output at 300W. The app monitoring is useful for tracking group usage. Compact and lightweight enough to carry in one hand. Best-in-class for serious festival camping."
              href="https://www.amazon.co.uk/s?k=ecoflow+river+2&tag=travelravers-21"
              price="~£200–280"
              ports="3× AC (300W) · 4× USB-A · 2× USB-C · 2× DC"
            />
          </div>
        </section>

        {/* Tips */}
        <section className="mb-10">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            Battery Management at Festivals
          </h2>
          <div className="space-y-3">
            {CHARGING_TIPS.map((tip, i) => (
              <div key={i} className="rounded-lg border border-border/15 p-4" style={{ backgroundColor: "hsl(45 20% 2.5%)" }}>
                <p className="font-display text-xs font-bold uppercase tracking-wide text-yellow-500/70 mb-1">{tip.title}</p>
                <p className="text-foreground/55 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commission callout */}
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-yellow-500 text-sm font-display uppercase tracking-wider mb-1">
            🛒 Amazon electronics earn 5% commission
          </p>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Adding to cart locks in a 90-day affiliate tracking window. You can buy any time in that window and it still counts — even if you switch to a different product in the same session.
          </p>
        </div>
      </div>
    </article>
  );
}
