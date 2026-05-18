// TRAVEL RAVERS: SAFETY & HARM REDUCTION — /safety
// Digital welfare tent — softer visual tone, trust-building design.
// Warm dark background tint, muted accents. Red only for genuine urgency.
import { motion } from "framer-motion";
import { Heart, Droplets, Shield, Users, ExternalLink, Phone } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const safetySections = [
  {
    icon: Droplets,
    title: "Hydration & Heat Safety",
    // Muted teal, not full neon
    iconClass: "text-tr-cyan/60",
    borderClass: "border-tr-cyan/15",
    content: [
      "Drink water regularly — don't wait until you're thirsty. Aim for 500ml per hour when dancing.",
      "Recognise signs of heat exhaustion: dizziness, nausea, headache, confusion. Move to shade immediately.",
      "Wear sunscreen even on cloudy days. Reapply every 2 hours, more if sweating.",
      "In cold weather, hypothermia risk is real at night. Bring warm layers and know when to stop dancing and warm up.",
      "Alcohol dehydrates. If you're drinking, match every alcoholic drink with a glass of water.",
    ],
  },
  {
    icon: Shield,
    title: "Substance Harm Reduction",
    iconClass: "text-tr-amber/60",
    borderClass: "border-tr-amber/15",
    disclaimer: true,
    content: [
      "Travel Ravers does not encourage substance use. We believe in honest, non-judgemental information because it saves lives.",
      "If you choose to use substances, test them. Drug checking services are available at many European festivals — use them.",
      "Never mix substances. Never take something from a stranger. Start with a small amount and wait.",
      "Know the signs of overdose: difficulty breathing, loss of consciousness, seizures, overheating.",
      "If someone is in trouble, call for help immediately. You will not get in trouble for seeking medical assistance.",
    ],
    resources: [
      { name: "The Loop", desc: "UK drug checking & harm reduction", url: "#" },
      { name: "DanceSafe", desc: "Festival harm reduction info", url: "#" },
      { name: "TripSit", desc: "Crisis chat support", url: "#" },
    ],
  },
  {
    icon: Users,
    title: "Consent & Boundaries",
    iconClass: "text-tr-purple/60",
    borderClass: "border-tr-purple/15",
    content: [
      "Festivals are spaces for freedom and expression. That freedom depends on everyone respecting boundaries.",
      "Consent is ongoing and enthusiastic. 'Maybe' is not yes. Silence is not yes. Someone who is intoxicated cannot consent.",
      "If you see something that doesn't look right, trust your instincts. Check in with the person — 'Are you okay? Do you know this person?'",
      "Report concerns to festival welfare or security. Most festivals have dedicated safe spaces and welfare teams.",
      "Look out for your squad and the people around you. Community care is the foundation of festival culture.",
    ],
  },
  {
    icon: Heart,
    title: "Solo Raver Safety",
    iconClass: "text-tr-green/60",
    borderClass: "border-tr-green/15",
    content: [
      "Tell someone your plans — share your itinerary, accommodation details, and check-in schedule.",
      "Keep your phone charged at all times. Carry a power bank.",
      "Know your route home before you need it. Save the address of your accommodation offline.",
      "Trust your instincts. If a situation feels wrong, leave. No set is worth your safety.",
      "Many festivals have dedicated solo traveller meet-ups and safe spaces. Seek them out.",
    ],
  },
];

export default function SafetyPage() {
  usePageMeta(
    "Safety & Harm Reduction",
    "Festival safety, hydration, substance harm reduction, consent, and solo raver welfare guides.",
  );

  return (
    // Warm dark tint — hsl(20 8% 6%) rather than pure near-black
    <div className="page-container" style={{ background: "hsl(20 8% 5%)" }}>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "Safety & Harm Reduction", url: "https://travelravers.com/safety" },
        ]}
      />
      <div className="page-inner max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            {/* Heart icon — neutral warm white, not neon */}
            <Heart className="w-6 h-6 text-foreground/50" />
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Safety & Welfare</h1>
          </div>
          <p className="text-foreground/65 text-lg mb-4 max-w-2xl leading-relaxed">
            Know the risks before you go. This page covers heat, harm reduction, consent, and solo safety — the stuff the festival doesn't put on the ticket.
          </p>
          <p className="text-foreground/45 text-sm mb-10 max-w-2xl">
            If you or someone near you is in immediate danger at a festival, find the nearest welfare tent or call emergency services. You will not get in trouble for seeking help.
          </p>
        </motion.div>

        {/* ── EMERGENCY BANNER — the only place we use full red ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-lg border border-tr-red/40 p-4 mb-10 flex items-start gap-4"
          style={{ backgroundColor: "hsl(0 72% 51% / 0.06)" }}
          role="alert"
        >
          <Phone className="w-4 h-4 text-tr-red flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.2em] text-tr-red mb-1">Emergency Numbers</p>
            <p className="text-foreground/65 text-sm">UK: 999 · EU: 112 · USA: 911 · At any festival: find the nearest welfare/medical tent</p>
          </div>
        </motion.div>

        {/* ── SAFETY SECTIONS ── */}
        <div className="space-y-6">
          {safetySections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`rounded-lg border p-6 sm:p-7 ${section.borderClass}`}
              style={{ backgroundColor: "hsl(20 8% 7%)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <section.icon className={`w-4 h-4 ${section.iconClass} flex-shrink-0`} aria-hidden="true" />
                <h2 className="font-display text-sm font-bold text-foreground/90 uppercase tracking-wider">{section.title}</h2>
              </div>

              {section.disclaimer && (
                <div className="rounded-md border border-tr-amber/15 p-4 mb-4" style={{ backgroundColor: "hsl(38 92% 55% / 0.04)" }}>
                  <p className="font-display text-[0.6rem] uppercase tracking-wider text-tr-amber/70 mb-1">Note</p>
                  <p className="text-foreground/50 text-sm">This section contains harm reduction information. It is not an endorsement of substance use.</p>
                </div>
              )}

              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="text-foreground/60 text-sm leading-relaxed pl-4 border-l border-border/40">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Trust cards for external orgs */}
              {"resources" in section && section.resources && (
                <div className="mt-6 pt-5 border-t border-border/30">
                  <p className="label-caps text-[0.55rem] text-muted-foreground/50 mb-3">Trusted Resources</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {section.resources.map((r) => (
                      <a
                        key={r.name}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-3 rounded-md border border-border/40 p-3 hover:border-border/60 hover:bg-white/[0.02] transition-all duration-200 group flex-1"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="min-w-0">
                          <p className="font-display text-[0.65rem] font-semibold text-foreground/80 uppercase tracking-wide">{r.name}</p>
                          <p className="text-foreground/40 text-[0.65rem] mt-0.5">{r.desc}</p>
                        </div>
                        <span className="text-foreground/30 group-hover:text-foreground/50 transition-colors text-xs flex-shrink-0 mt-0.5 flex items-center gap-0.5">
                          Visit <ExternalLink className="w-2.5 h-2.5 ml-0.5" aria-hidden="true" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
