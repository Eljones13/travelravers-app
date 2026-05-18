// TRAVEL RAVERS: Blog — Best Festival Tents 2026
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "Best Festival Tents 2026: What to Buy for Every Budget",
  description: "Top festival tents for 2026 reviewed — from budget pop-ups to blackout sleeping tents. Never sleep in a leaking tent again.",
  keywords: ["best festival tent 2026", "festival tent reviews", "pop up tent festival", "blackout tent camping", "2 man festival tent", "budget festival tent uk"],
  publishDate: "2026-03-25",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

const heroImage = "/blogs/tents-hero.jpg";
const heroAlt = "Festival tents pitched in a colourful campsite at sunrise";

interface TentCardProps {
  name: string;
  category: string;
  capacity: string;
  description: string;
  href: string;
  price?: string;
  tip?: string;
  verdict?: string;
}

function TentCard({ name, category, capacity, description, href, price, tip, verdict }: TentCardProps) {
  return (
    <div className="rounded-lg border border-tr-green/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(140 40% 3%)" }}>
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-tr-green/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-tr-green/40" />
      <div className="flex items-start justify-between mb-1">
        <p className="text-[0.58rem] font-display uppercase tracking-widest text-tr-green/50">{category}</p>
        <span className="text-[0.58rem] font-display uppercase tracking-widest text-foreground/40 border border-border/20 rounded px-1.5 py-0.5">{capacity}</span>
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-3">{description}</p>
      {tip && (
        <p className="text-foreground/40 text-xs italic border-l-2 border-tr-green/20 pl-3 mb-3">{tip}</p>
      )}
      {verdict && (
        <p className="text-tr-green/70 text-xs font-display uppercase tracking-wide mb-4">Verdict: {verdict}</p>
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

const TENT_TIPS = [
  { title: "Pitch it before you go", body: "Practice pitching in your garden. Most tent failures happen because people are doing it for the first time at 2am with a torch clenched in their teeth." },
  { title: "Seam seal everything", body: "Even tents rated at 2000mm+ HH benefit from seam sealer on the inner seams. A £5 tube of seam sealer is the best insurance against a wet sleeping bag." },
  { title: "Footprint under the tent", body: "A groundsheet footprint extends tent life by 2–3 years and adds an extra moisture barrier. Many brands sell them separately — or use a cheap tarp cut to size." },
  { title: "Face the door away from prevailing wind", body: "Always orient your tent door away from the direction the wind usually comes from. At UK summer festivals, that's usually south-west." },
  { title: "Don't leave a dark tent in direct sun", body: "Internal temps in a sealed tent can hit 50°C in direct summer sun. If you're sleeping in, leave a vent cracked and use a silver emergency blanket over the outer to reflect heat." },
];

export default function BestFestivalTents() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/best-festival-tents.jpg", "https://travelravers.com/blogs/best-festival-tents");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/best-festival-tents" },
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
          url: "https://travelravers.com/blogs/best-festival-tents",
          image: "https://travelravers.com/blogs/tents-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/tents-hero.jpg with final artwork at any time */}
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
          <p className="label-caps text-[0.6rem] text-tr-green/60 mb-2">Gear · Festival Camping 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Best Festival Tents 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            A bad tent ruins a festival. A leaking sleeping area, a door that won't zip, poles that snap in the first drizzle — we've all been there. This guide covers the best festival tents by budget, size, and use case so you can sleep properly between sets.
          </p>
        </header>

        {/* Tent picks */}
        <div className="space-y-4 mb-10">
          <TentCard
            name="Vango Blade 200"
            category="Best Overall"
            capacity="2-person"
            description="The festival tent standard. The Blade 200 pitches in under 5 minutes, packs down small enough to fit in a rucksack, and its 3000mm HH rating handles UK summer rain without drama. The single-skin design means no inner to get wet separately."
            href="https://www.amazon.co.uk/s?k=vango+blade+200+tent&tag=travelravers-21"
            price="~£80–120"
            tip="Use the guy ropes. In wind, an unguyed Blade will flap loudly and potentially deform."
            verdict="Best all-rounder under £120"
          />
          <TentCard
            name="Coleman Instant Pop-Up Tent"
            category="Budget Pick"
            capacity="2–3 person"
            description="The cheapest route to a dry night. Pop-up tents deploy in seconds and are ideal for festivals where you're only sleeping two or three nights. Water-resistant coating handles light rain. Not suitable for heavy downpours or multiple festivals."
            href="https://www.amazon.co.uk/s?k=coleman+pop+up+festival+tent&tag=travelravers-21"
            price="~£30–55"
            tip="Pop-up tents can be tricky to fold back down. Watch a YouTube tutorial for your specific model before arriving at the festival."
            verdict="Best for first-timers on a tight budget"
          />
          <TentCard
            name="Quechua 2 Second Easy Fresh"
            category="Quick Pitch"
            capacity="2-person"
            description="Decathlon's legendary pop-up tent, now with a blackout inner that blocks up to 95% of light. If you're sleeping until noon, this is the only pop-up that actually works. Durable enough for 10+ festivals. The 'Fresh' version also has better ventilation than the standard model."
            href="https://www.amazon.co.uk/s?k=quechua+2+second+blackout+tent&tag=travelravers-21"
            price="~£80–100"
            tip="The blackout inner makes a real difference — internal temp stays cooler too, not just darker."
            verdict="Best pop-up for late sleepers"
          />
          <TentCard
            name="MSR Hubba Hubba NX2"
            category="Premium"
            capacity="2-person"
            description="The backcountry standard, perfect for serious festival-goers who want a tent that lasts a decade. Ultralight at 1.7kg, packs to the size of a Nalgene bottle, and the DAC Featherlite poles handle serious wind. Overkill for most, but if you festival 5+ times a year, you'll make the money back in longevity."
            href="https://www.amazon.co.uk/s?k=msr+hubba+hubba+nx2&tag=travelravers-21"
            price="~£350–450"
            verdict="Best long-term investment"
          />
          <TentCard
            name="Trespass Becker 4-Man Dome"
            category="Group Option"
            capacity="4-person"
            description="Four people who can share a tent is a festival game-changer — one person carries it, costs split four ways, and you have a communal space for morning cans and pre-set prep. Trespass makes reliable budget-tier group tents that hold up for 5–10 festivals."
            href="https://www.amazon.co.uk/s?k=trespass+4+man+festival+tent&tag=travelravers-21"
            price="~£50–90"
            tip="Use the inner for sleeping, outer for storing wet gear and bags. Stops condensation building inside."
            verdict="Best for groups splitting the cost"
          />
        </div>

        {/* Pitching tips */}
        <section className="mb-10">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            5 Things That Will Save Your Sleep
          </h2>
          <div className="space-y-3">
            {TENT_TIPS.map((tip, i) => (
              <div key={i} className="rounded-lg border border-border/15 p-4" style={{ backgroundColor: "hsl(140 20% 2.5%)" }}>
                <p className="font-display text-xs font-bold uppercase tracking-wide text-tr-green/80 mb-1">{tip.title}</p>
                <p className="text-foreground/55 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Peg & guy rope section */}
        <section className="mb-10">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-4">
            Accessories Worth Buying
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.amazon.co.uk/s?k=tent+pegs+storm+camping&tag=travelravers-21"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border/20 p-4 hover:border-tr-green/30 transition-colors group"
              style={{ backgroundColor: "hsl(140 20% 2.5%)" }}
            >
              <p className="font-display text-xs font-bold uppercase tracking-wide text-foreground group-hover:text-tr-green transition-colors mb-1">Storm Tent Pegs</p>
              <p className="text-foreground/50 text-xs leading-relaxed">The pegs that come with tents are useless in soft ground. Upgrade to aluminium V-pegs or screw pegs. ~£8–15 for a full set.</p>
              <p className="text-tr-green/60 text-[0.6rem] uppercase tracking-wider font-display mt-2 group-hover:text-tr-green transition-colors">Shop on Amazon →</p>
            </a>
            <a
              href="https://www.amazon.co.uk/s?k=seam+sealer+waterproof+tent&tag=travelravers-21"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border/20 p-4 hover:border-tr-green/30 transition-colors group"
              style={{ backgroundColor: "hsl(140 20% 2.5%)" }}
            >
              <p className="font-display text-xs font-bold uppercase tracking-wide text-foreground group-hover:text-tr-green transition-colors mb-1">Seam Sealer</p>
              <p className="text-foreground/50 text-xs leading-relaxed">Apply to all interior seams before your first trip. Kiwi Camp Dry or Gear Aid Seam Grip. ~£5–10.</p>
              <p className="text-tr-green/60 text-[0.6rem] uppercase tracking-wider font-display mt-2 group-hover:text-tr-green transition-colors">Shop on Amazon →</p>
            </a>
          </div>
        </section>

        {/* Commission callout */}
        <div className="rounded-lg border border-tr-green/20 bg-tr-green/5 p-5">
          <p className="text-tr-green text-sm font-display uppercase tracking-wider mb-1">
            🛒 Amazon gear earns 5–7% commission
          </p>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Adding to cart locks in a 90-day affiliate tracking window. You can buy any time in that window and it still counts — even if you switch to a different product in the same session.
          </p>
        </div>
      </div>
    </article>
  );
}
