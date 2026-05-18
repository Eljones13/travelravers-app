// TRAVEL RAVERS: Blog — First-Time Festival Survival Guide 2026
import { ExternalLink, ShoppingBag, Plane, Hotel, Shield, Users, Backpack } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "First-Time Festival Survival Guide 2026",
  description: "Step-by-step packing, safety, and travel guide for first-time ravers heading to European festivals in 2026.",
  keywords: [
    "first time festival guide 2026",
    "festival packing checklist",
    "festival safety tips",
    "first festival europe",
    "what to bring to a festival",
    "festival camping tips beginner",
    "how to survive a festival",
  ],
  publishDate: "2026-04-05",
  affiliatePrograms: ["Amazon UK (travelravers-21)", "Skyscanner", "Stay22", "SafetyWing"],
};

const heroImage = "/blogs/tents-hero.jpg";
const heroAlt = "Festival campsite at sunrise with colourful tents and a glowing stage in the background";

interface GearCardProps {
  name: string;
  description: string;
  href: string;
  price?: string;
}

function GearCard({ name, description, href, price }: GearCardProps) {
  return (
    <div
      className="rounded-lg border border-tr-green/20 p-4 relative overflow-hidden"
      style={{ backgroundColor: "hsl(140 40% 3%)" }}
    >
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

interface ChecklistItemProps {
  text: string;
  sub?: string;
}

function ChecklistItem({ text, sub }: ChecklistItemProps) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-border/10 last:border-0">
      <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border border-tr-cyan/30 bg-tr-cyan/5 flex items-center justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-tr-cyan/50" />
      </span>
      <span className="text-sm text-foreground/70 leading-snug">
        {text}
        {sub && <span className="block text-xs text-foreground/40 mt-0.5">{sub}</span>}
      </span>
    </li>
  );
}

export default function FirstTimeFestivalGuide() {
  usePageMeta(
    BLOG_META.title,
    BLOG_META.description,
    "/blogs/tents-hero.jpg",
    "https://travelravers.com/blogs/first-time-festival-guide",
  );

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/first-time-festival-guide" },
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
          url: "https://travelravers.com/blogs/first-time-festival-guide",
          image: "https://travelravers.com/blogs/tents-hero.jpg",
        }}
      />

      <div className="page-inner">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]"
        >
          ← Back to Guides
        </Link>

        {/* Hero */}
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
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">First-Time Ravers · Complete Guide 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            First-Time Festival Survival Guide 2026
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            Never been to a European festival before? We've got you. This guide covers everything from picking your first festival and buying tickets to packing your bag, staying safe, and keeping your squad together when the Wi-Fi dies.
          </p>
        </header>

        {/* ── 1. Choosing your first festival ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-tr-cyan/10 border border-tr-cyan/30 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-[0.6rem] font-bold text-tr-cyan">01</span>
            </span>
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Choosing Your First Festival
            </h2>
          </div>
          <div className="space-y-3 text-foreground/65 text-sm leading-relaxed">
            <p>
              Don't start with a five-day mega-rave in a foreign country. Your first festival should be manageable — ideally 2–3 days, with a mix of camping and proper sleeping infrastructure, and a genre you actually love.
            </p>
            <p>
              <strong className="text-foreground/90">Good first-timer picks for 2026:</strong> Creamfields UK (big production, well-organised, English-speaking crowd), Glastonbury (if you can get a ticket), or Electric Love in Austria (gorgeous scenery, surprisingly chilled vibe for a mega-festival).
            </p>
            <p>
              <strong className="text-foreground/90">What to look for:</strong> clear campsite maps, official medical teams, bag-check policies, and cashless payment info all published before you go. Avoid any festival where the organisers are vague about welfare or safety infrastructure.
            </p>
            <div className="rounded-lg border border-tr-cyan/15 p-4 bg-tr-cyan/5">
              <p className="text-tr-cyan/80 text-xs font-display uppercase tracking-wide mb-1">Travel Ravers tip</p>
              <p className="text-foreground/60 text-sm">
                Check the festival's Resident Advisor page and Reddit community before buying. Real attendee reviews tell you more about the actual experience than any official website.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Travel and tickets ── */}
        <section
          className="rounded-lg border border-tr-green/15 p-5 mb-10"
          style={{ backgroundColor: "hsl(140 40% 3%)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-4 h-4 text-tr-green/60 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Travel and Tickets
            </h2>
          </div>
          <div className="space-y-3 text-foreground/65 text-sm leading-relaxed mb-5">
            <p>
              Buy tickets as soon as they go on sale — every major European festival sells out months in advance. Tier 1 prices are always the cheapest; waiting costs real money.
            </p>
            <p>
              <strong className="text-foreground/90">Flights:</strong> book at least 3–4 months out for European festivals. Budget carriers (Ryanair, easyJet, Wizz Air) are fine for 2-hour hops. Check baggage allowances — most festival-goers end up checking a bag and paying more than they planned.
            </p>
            <p>
              <strong className="text-foreground/90">Travel insurance:</strong> non-negotiable. Get a policy that covers festival cancellation, medical evacuation, and lost gear. SafetyWing is popular with long-term travellers; standard annual multi-trip policies cover most festival scenarios.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.skyscanner.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-[0.65rem]"
            >
              <Plane className="w-3.5 h-3.5" aria-hidden="true" />
              Search Flights ✈
            </a>
            <a
              href="https://www.stay22.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-[0.65rem]"
            >
              <Hotel className="w-3.5 h-3.5" aria-hidden="true" />
              Find Hotels 🏨
            </a>
          </div>
          <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider mt-2">
            Skyscanner · Stay22 — Affiliate Links
          </p>
        </section>

        {/* ── 3. Camping vs hotels ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-tr-cyan/10 border border-tr-cyan/30 flex items-center justify-center flex-shrink-0">
              <span className="font-display text-[0.6rem] font-bold text-tr-cyan">03</span>
            </span>
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Camping vs Hotels
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg border border-tr-green/20 p-4" style={{ backgroundColor: "hsl(140 40% 3%)" }}>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-tr-green mb-2">Camping — The Authentic Way</p>
              <ul className="space-y-1.5 text-foreground/60 text-sm">
                <li>✓ Wake up inside the festival — no travel stress</li>
                <li>✓ Social — you'll meet people on your doorstep</li>
                <li>✓ Much cheaper once you have the gear</li>
                <li className="text-foreground/35">✗ Hot, noisy, and sometimes muddy</li>
                <li className="text-foreground/35">✗ Requires gear investment upfront</li>
              </ul>
            </div>
            <div className="rounded-lg border border-tr-cyan/20 p-4" style={{ backgroundColor: "hsl(185 60% 3%)" }}>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-tr-cyan mb-2">Hotel / Airbnb — The Comfort Play</p>
              <ul className="space-y-1.5 text-foreground/60 text-sm">
                <li>✓ Proper sleep, shower, and charging</li>
                <li>✓ Zero gear to carry on the plane</li>
                <li>✓ Good for day-trip festivals</li>
                <li className="text-foreground/35">✗ Expensive near festival sites</li>
                <li className="text-foreground/35">✗ Late-night transport logistics</li>
              </ul>
            </div>
          </div>
          <p className="text-foreground/55 text-sm leading-relaxed">
            For a first festival abroad, the hotel/Airbnb option reduces logistics stress dramatically. If you want to camp, invest in a decent 2-person tent and sleeping bag before you go — borrowing or buying cheap on-site is a false economy.
          </p>
        </section>

        {/* ── 4. Packing checklist ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Backpack className="w-4 h-4 text-tr-cyan/60 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Packing Checklist & Luggage Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="label-caps text-[0.58rem] text-tr-cyan/60 mb-3">Documents & Money</p>
              <ul className="space-y-0">
                <ChecklistItem text="Passport (valid 6+ months)" />
                <ChecklistItem text="Festival ticket (printed + digital)" />
                <ChecklistItem text="Travel insurance documents" />
                <ChecklistItem text="Local emergency contacts" />
                <ChecklistItem text="Cash + card (both)" sub="ATMs near festival sites often run out" />
              </ul>
            </div>
            <div>
              <p className="label-caps text-[0.58rem] text-tr-cyan/60 mb-3">Camping Essentials</p>
              <ul className="space-y-0">
                <ChecklistItem text="2–3 person tent" sub="Don't rely on borrowing one" />
                <ChecklistItem text="Sleeping bag (rated to 5°C)" sub="Nights can be cold even in summer" />
                <ChecklistItem text="Inflatable roll mat or camping pad" />
                <ChecklistItem text="Ear plugs + eye mask" />
                <ChecklistItem text="Padlock for tent zip" />
              </ul>
            </div>
            <div>
              <p className="label-caps text-[0.58rem] text-tr-cyan/60 mb-3">Tech & Power</p>
              <ul className="space-y-0">
                <ChecklistItem text="Power bank (20,000mAh+)" sub="Charges your phone 4–5 times" />
                <ChecklistItem text="USB-C charging cables (×2)" />
                <ChecklistItem text="EU plug adapter" />
                <ChecklistItem text="Bluetooth tracker (AirTag or Tile)" sub="For your tent location and bags" />
              </ul>
            </div>
            <div>
              <p className="label-caps text-[0.58rem] text-tr-cyan/60 mb-3">Health & Safety</p>
              <ul className="space-y-0">
                <ChecklistItem text="Sunscreen SPF 50+" />
                <ChecklistItem text="Ibuprofen + rehydration sachets" />
                <ChecklistItem text="Antihistamines" />
                <ChecklistItem text="Small first aid kit" />
                <ChecklistItem text="Hand sanitiser" />
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GearCard
              name="High-Capacity Power Bank"
              description="20,000mAh is the sweet spot — charges your phone 4–5 times and fits in most bumbags. Get one with USB-C PD if your phone supports fast charging."
              href="https://www.amazon.co.uk/s?k=20000mah+power+bank+festival&tag=travelravers-21"
              price="~£25–45"
            />
            <GearCard
              name="65L Festival Rucksack"
              description="Your main bag for camping festivals. Look for a padded hip belt, rain cover, and internal frame. This is your home for the weekend — don't cheap out."
              href="https://www.amazon.co.uk/s?k=65l+festival+rucksack+camping&tag=travelravers-21"
              price="~£40–90"
            />
            <GearCard
              name="Bumbag / Fanny Pack"
              description="Your daily carry inside the festival. Keeps your phone, cash, and essentials hands-free. Water-resistant is worth paying for."
              href="https://www.amazon.co.uk/s?k=festival+bumbag+waterproof&tag=travelravers-21"
              price="~£10–25"
            />
            <GearCard
              name="Bluetooth Tracker (AirTag)"
              description="Attach to your tent, main rucksack, or keys. When you're sleep-deprived at 4am trying to find your tent in a sea of identical tents, you'll be glad you have one."
              href="https://www.amazon.co.uk/s?k=apple+airtag+festival&tag=travelravers-21"
              price="~£25–35"
            />
          </div>
        </section>

        {/* ── 5. Safety & harm reduction ── */}
        <section
          className="rounded-lg border border-tr-red/15 p-5 mb-10"
          style={{ backgroundColor: "hsl(0 40% 3%)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-4 h-4 text-tr-red/60 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Safety, Harm Reduction & Knowing Your Rights
            </h2>
          </div>
          <div className="space-y-3 text-foreground/65 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground/90">Find the medical tent first.</strong> On your first day, locate the medical tent, welfare area, and festival security points before anything else. Know where they are before you need them.
            </p>
            <p>
              <strong className="text-foreground/90">Stay hydrated — but don't overdo it.</strong> In hot conditions drink water consistently throughout the day, not just when you feel thirsty. Overhydration (hyponatraemia) is a real risk at festivals — if you're dancing hard, you also need electrolytes, not just water.
            </p>
            <p>
              <strong className="text-foreground/90">Drug checking services.</strong> Many major UK and European festivals now offer on-site drug checking (The Loop, WEDINOS, DanceSafe). Use them. Substances sold at festivals are frequently adulterated. No judgement — just safety.
            </p>
            <p>
              <strong className="text-foreground/90">Know your rights at the gate.</strong> UK and EU festival security can search you with consent at the entry gate (you agree by buying a ticket). You have the right to know why you're being searched. You do not have to answer questions about third parties.
            </p>
            <div className="mt-4 rounded border border-tr-red/20 bg-tr-red/5 p-3">
              <p className="text-tr-red/80 text-xs font-display uppercase tracking-wide mb-1">Emergency SOS</p>
              <p className="text-foreground/60 text-xs">
                In any EU country, 112 is the universal emergency number (police, fire, ambulance). In the UK, it's 999. Save the festival's welfare team number in your phone before you go in.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. Squad & meeting points ── */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-4 h-4 text-tr-purple/60 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Staying With Your Squad & Meeting Points
            </h2>
          </div>
          <div className="space-y-3 text-foreground/65 text-sm leading-relaxed">
            <p>
              Mobile signal at festivals is terrible. Data is slow, calls drop, and group chats go silent at the worst moments. Plan for this before you walk through the gates.
            </p>
            <p>
              <strong className="text-foreground/90">Set a meeting point before you go in</strong> — something physical and easy to describe: "the big tree near the water point" or "the statue at the main stage entrance". Agree a time (e.g. every night at 1am if separated).
            </p>
            <p>
              <strong className="text-foreground/90">Download offline maps.</strong> Google Maps and Maps.me both support offline downloads. Download the local area before you leave your accommodation — you'll have no data to do it on-site.
            </p>
            <p>
              <strong className="text-foreground/90">Use low-bandwidth messaging.</strong> WhatsApp works better than a voice call in poor signal. Short texts get through when calls don't. Emergency SMS often works even with one bar of signal.
            </p>
            <div className="rounded-lg border border-tr-purple/20 p-4 bg-tr-purple/5">
              <p className="text-tr-purple/80 text-xs font-display uppercase tracking-wide mb-1">Festival Rule #1</p>
              <p className="text-foreground/60 text-sm">
                Never split up without agreeing a time and place to regroup. The festival looks very different at 3am with dead phone battery — make the plan before you need it.
              </p>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="rounded-lg border border-border/20 p-5" style={{ backgroundColor: "hsl(220 40% 3.5%)" }}>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
            More First-Timer Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: "/blogs/best-luggage", label: "Best Festival Luggage & Bags 2026" },
              { to: "/blogs/bluetooth-airtags-guide", label: "Best Bluetooth Trackers & AirTags" },
              { to: "/blogs/best-festival-tents", label: "Best Festival Tents for Every Budget" },
              { to: "/blogs/best-power-banks", label: "Best Power Banks for Festivals" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between rounded border border-border/20 hover:border-tr-cyan/30 px-4 py-3 transition-colors group"
              >
                <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors">{label}</span>
                <ExternalLink className="w-3 h-3 text-foreground/20 group-hover:text-tr-cyan/50 transition-colors flex-shrink-0 ml-2" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
