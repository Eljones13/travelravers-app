// TRAVEL RAVERS: TRAVEL & ACCOMMODATION PAGE — /travel
// Card-based layout for flight, hotel, insurance, and FX affiliate areas
import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, Shield, Banknote, ExternalLink } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Stay22Modal } from "@/components/Stay22Modal";

const travelModules = [
  {
    icon: Plane,
    title: "Flights & Trains",
    color: "text-tr-cyan",
    borderColor: "border-tr-cyan/20",
    description: "Find the cheapest flights to festival cities. We recommend booking within a week of securing your festival ticket — prices spike as events approach.",
    tips: [
      "Use Skyscanner's 'Everywhere' search to find the cheapest routes",
      "Consider nearby airports — Bergamo instead of Milan, Charleroi instead of Brussels",
      "Eurostar is often cheaper and greener for Belgium, Netherlands, and Paris festivals",
      "Set price alerts and book mid-week for the best deals",
    ],
    ctaText: "Search Flights ✈",
    ctaUrl: "https://www.kiwi.com/deep?from=GB&affilid=travelravers",
    partner: "Kiwi.com affiliate",

  },
  {
    icon: Hotel,
    title: "Hotels, Hostels & Camping Plus",
    color: "text-tr-purple",
    borderColor: "border-tr-purple/20",
    description: "From budget hostels to boutique hotels near the festival. For camping festivals, consider glamping or nearby accommodation for at least the first night.",
    tips: [
      "Book as early as possible — festival weekends sell out hotels fast",
      "Hostels are great for solo travellers (social + safe + cheap)",
      "Check cancellation policies — festival plans change",
      "For camping festivals, consider one hotel night for arrival/departure",
    ],
    ctaText: "Search Accommodation",
    ctaUrl: "#",
    partner: "Booking.com / Hostelworld affiliate widget area",
  },
  {
    icon: Shield,
    title: "Travel Insurance & Medical Cover",
    color: "text-tr-green",
    borderColor: "border-tr-green/20",
    description: "Don't travel without cover. Festival injuries, lost gear, cancelled flights — insurance saves your trip. Make sure your policy explicitly covers festival attendance.",
    tips: [
      "Check your policy covers 'festival attendance' and 'camping'",
      "Medical cover minimum £1M for EU, £5M for USA trips",
      "Ensure lost/stolen belongings cover includes expensive items",
      "Get a GHIC card (free) for EU festivals as backup",
    ],
    ctaText: "Compare Insurance",
    ctaUrl: "#",
    partner: "SafetyWing / World Nomads affiliate widget area",
  },
  {
    icon: Banknote,
    title: "FX & Money Abroad",
    color: "text-tr-amber",
    borderColor: "border-tr-amber/20",
    description: "Festival spending adds up fast. Use the right card to avoid getting stung on currency conversion. Here's what experienced festival travellers use.",
    tips: [
      "Get a fee-free travel card (Monzo, Revolut, Wise) before you go",
      "Avoid airport currency exchanges — terrible rates",
      "Take some local cash as backup (card machines fail at festivals)",
      "Set a daily spending budget and track it — festival amnesia is real",
    ],
    ctaText: "Compare Travel Cards",
    ctaUrl: "#",
    partner: "Wise / Revolut referral widget area",
  },
];

export default function TravelPage() {
  usePageMeta(
    "Travel & Stays",
    "Flights, hotels, hostels, travel insurance, and money tips for festival trips in the UK and Europe.",
  );

  const [stay22Open, setStay22Open] = useState(false);

  return (
    <div className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "Travel & Stays", url: "https://travelravers.com/travel" },
        ]}
      />
      <div className="page-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">Travel & Stays</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Everything you need to get to the festival and find somewhere to sleep. Flights, hotels, hostels, insurance, and money tips.
          </p>

          {/* ── Stay22 hero CTA ───────────────────────────────────────────── */}
          <div className="mb-10">
            <button
              type="button"
              onClick={() => setStay22Open(true)}
              className="btn-primary inline-flex items-center gap-2.5 text-sm py-3 px-5 relative overflow-hidden"
              aria-label="Open festival accommodation map"
            >
              {/* neon corner brackets */}
              <span aria-hidden="true" className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white/25 rounded-tl" />
              <span aria-hidden="true" className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white/25 rounded-br" />
              <Hotel className="w-4 h-4" aria-hidden="true" />
              🏨 Open Festival Accommodation Map
            </button>
            <p className="text-foreground/30 text-[0.6rem] font-display uppercase tracking-wider mt-1.5">
              Powered by Stay22 · Affiliate
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {travelModules.map((mod, i) => (
            <motion.section
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-6 sm:p-8 ${mod.borderColor}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`${mod.color} mt-1`}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground uppercase tracking-wider mb-2">{mod.title}</h2>
                  <p className="text-foreground/70 leading-relaxed">{mod.description}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6 ml-10">
                {mod.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className={mod.color}>•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              {/* Affiliate widget placeholder */}
              <div className="bg-secondary/50 border border-border rounded-md p-5 mb-4 text-center">
                <p className="text-muted-foreground/50 text-xs font-display uppercase tracking-wider">{mod.partner}</p>
              </div>

              {mod.ctaUrl === "#" ? (
                /* Accommodation card — open Stay22 modal */
                <button
                  type="button"
                  onClick={() => setStay22Open(true)}
                  className="btn-secondary text-xs inline-flex items-center gap-1.5"
                >
                  {mod.ctaText} <Hotel className="w-3 h-3" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={mod.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs inline-flex items-center gap-1.5"
                >
                  {mod.ctaText} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </motion.section>
          ))}
        </div>
      </div>

      <Stay22Modal open={stay22Open} onClose={() => setStay22Open(false)} />
    </div>
  );
}
