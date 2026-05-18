// TRAVEL RAVERS: HOME PAGE — Festival travel OS landing
import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { MapPin, X, ExternalLink } from "lucide-react";
import heroFestival from "@/assets/hero-festival.jpg";
import { festivals } from "@/data/content";
import FestivalCard from "@/components/FestivalCard";
import SectionHeader from "@/components/SectionHeader";
import SchemaScript from "@/components/SchemaScript";
import EmailCapture from "@/components/EmailCapture";
import { useFestivalStore } from "@/context/FestivalStoreContext";
import { useFestivalFocus } from "@/context/FestivalFocusContext";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Travel Ravers",
  url: "https://travelravers.com",
  description: "Festival travel OS for UK and EU ravers",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://travelravers.com/festivals?q={query}",
    "query-input": "required name=query",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Travel Ravers",
  url: "https://travelravers.com",
  logo: "https://travelravers.com/logo.png",
  sameAs: [
    "https://www.instagram.com/travelravers",
    "https://www.tiktok.com/@travelravers",
    "https://open.spotify.com/user/travelravers",
  ],
};

// ── Festival Picker — 6 festivals to set Focus and navigate ──
const PICKER_SLUGS = [
  "tomorrowland",
  "creamfields",
  "ultra-europe",
  "exit-serbia",
  "dimensions-croatia",
  "terminal-v",
];

// ── Outcome-based value props ──
const valueProps = [
  {
    eyebrow: "Discovery",
    heading: "Find Your 2026 Festival",
    body: "49 festivals across Europe and beyond, each with a full travel guide, packing list, and booking links.",
    href: "/festivals",
    accentClass: "border-tr-green/20",
    eyebrowClass: "text-tr-green/60",
  },
  {
    eyebrow: "Packing",
    heading: "Pack Like a Veteran",
    body: "The checklist that survives 4 days of mud, heat, and 3am chaos — curated from real festival-goers.",
    href: "/gear",
    accentClass: "border-tr-cyan/20",
    eyebrowClass: "text-tr-cyan/60",
  },
  {
    eyebrow: "Logistics",
    heading: "Sort Flights & Stays",
    body: "Flights, safe beds, and travel insurance locked in — with affiliate links so prices don't creep up on you.",
    href: "/travel",
    accentClass: "border-tr-purple/20",
    eyebrowClass: "text-tr-purple/60",
  },
];

// ── Featured blog posts ──
const featuredBlogs = [
  {
    slug: "croatia-festival-guide",
    title: "Croatia Festival Travel Guide 2026",
    tag: "Travel Guide",
    tagColor: "text-amber-400 border-amber-400/30",
  },
  {
    slug: "bluetooth-airtags-guide",
    title: "Best Bluetooth Trackers & AirTags for Festivals",
    tag: "Tech / Safety",
    tagColor: "text-tr-cyan border-tr-cyan/30",
  },
  {
    slug: "best-luggage",
    title: "Best Festival Luggage & Bags 2026",
    tag: "Gear",
    tagColor: "text-tr-green border-tr-green/30",
  },
];

const PWA_DISMISSED_KEY = "tr_pwa_dismissed";

export default function Index() {
  const shouldReduceMotion = useReducedMotion();
  const { canInstall, triggerInstall } = useInstallPrompt();
  const navigate = useNavigate();
  const { setFocus } = useFestivalFocus();
  const { ticketStatuses } = useFestivalStore();
  const goingCount = useMemo(
    () => Object.values(ticketStatuses).filter((s) => s === "going").length,
    [ticketStatuses],
  );

  const [pwaDismissed, setPwaDismissed] = useState(
    () => localStorage.getItem(PWA_DISMISSED_KEY) === "1",
  );

  function handlePwaDismiss() {
    try { localStorage.setItem(PWA_DISMISSED_KEY, "1"); } catch { /* ignore */ }
    setPwaDismissed(true);
  }

  function handlePickerClick(slug: string) {
    setFocus(slug);
    navigate(`/festivals/${slug}`);
  }

  usePageMeta(
    "Festival Travel Guide for UK & EU Ravers",
    "Plan your first big festival abroad. Expert guides, packing lists, and travel tips for UK and EU ravers heading to Tomorrowland, Creamfields, EDC and beyond.",
  );

  // Resolve picker festivals from content data
  const pickerFestivals = PICKER_SLUGS
    .map((slug) => festivals.find((f) => f.slug === slug))
    .filter(Boolean) as typeof festivals;

  // Featured festivals for the bottom strip
  const featuredFestivals = festivals.slice(0, 4);

  return (
    <div className="relative overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center">
        {/* Ken Burns background */}
        <motion.img
          src={heroFestival}
          alt="Crowd at an electronic music festival at night with cyan stage lighting"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={shouldReduceMotion ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }
          loading="eager"
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen min-h-[100dvh] px-6 pb-24 pt-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Decorative cyan rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-16 h-px bg-tr-cyan/70 mx-auto mb-6"
            />

            {/* H1 */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[0.95] mb-6">
              Everything you need to{" "}
              <span className="text-tr-cyan">travel to your first festival abroad</span>
            </h1>

            <p className="text-white/75 text-lg sm:text-xl font-body leading-relaxed max-w-2xl mx-auto mb-10">
              Guides, gear, and booking links for 49 festivals in 2026.
              <br className="hidden sm:block" />
              Built by ravers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/festivals" className="btn-primary w-full sm:w-auto justify-center">
                Find your festival →
              </Link>
              {goingCount > 0 && (
                <Link to="/my-weekends" className="btn-ghost w-full sm:w-auto justify-center">
                  My plans ({goingCount})
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SIGNAL / WAVEFORM STRIP ── */}
      <section
        className="relative bg-background border-y border-border/40 py-3 px-6 overflow-hidden"
        aria-label="Signal status"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, hsl(185 80% 50% / 0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <span className="flex-shrink-0 flex items-center gap-1.5" aria-hidden="true">
            <span
              className="w-1.5 h-1.5 rounded-full bg-tr-cyan"
              style={{ boxShadow: "0 0 4px hsl(185 80% 50%)" }}
            />
          </span>

          <div className="flex items-center gap-[2px] flex-shrink-0" aria-hidden="true">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="tr-waveform-bar w-[2px] rounded-full"
                style={{
                  backgroundColor: `hsl(185, 80%, ${45 + (i % 7) * 2}%)`,
                  animationDelay: `${i * 35}ms`,
                  animationDuration: `${1400 + (i % 4) * 200}ms`,
                  "--wf-peak": `${(i % 5) * 3 + 4}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <p className="label-caps text-[0.6rem] text-tr-cyan/70 whitespace-nowrap">
            Signal Online: 2026 Festival Season
          </p>
        </div>
      </section>

      {/* ── FESTIVAL PICKER ── */}
      <section className="bg-background py-14 md:py-18 px-6 border-b border-border/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-6 gap-4"
          >
            <SectionHeader
              eyebrow="Where are you going?"
              heading="Pick Your Festival"
              size="lg"
            />
            <Link
              to="/festivals"
              className="tr-link-caps flex-shrink-0 text-tr-cyan hover:text-tr-cyan/80 transition-colors"
            >
              See all 49 →
            </Link>
          </motion.div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-6 gap-3 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
            {pickerFestivals.map((fest, i) => (
              <motion.button
                key={fest.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => handlePickerClick(fest.slug)}
                className="
                  group flex-shrink-0 w-[44vw] sm:w-[30vw] md:w-auto
                  flex flex-col overflow-hidden rounded-lg
                  border border-border/40 bg-card/60
                  hover:border-tr-cyan/40 hover:bg-card/80
                  transition-all duration-300 text-left
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tr-cyan/50
                "
                aria-label={`Explore ${fest.name}`}
              >
                {fest.image && (
                  <figure className="w-full aspect-[4/3] flex-shrink-0 overflow-hidden m-0">
                    <img
                      src={fest.image}
                      alt={`${fest.name} festival`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </figure>
                )}
                <div className="p-3 flex flex-col gap-1">
                  <p className="font-display text-[0.65rem] sm:text-xs font-bold text-foreground uppercase tracking-wider leading-tight line-clamp-2">
                    {fest.name}
                  </p>
                  <p className="flex items-center gap-1 text-foreground/45 text-[0.6rem]">
                    <MapPin className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{fest.city}, {fest.country}</span>
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS — 3 outcome cards ── */}
      <section className="bg-background py-16 md:py-20 px-6 border-b border-border/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="What we cover"
              heading="Everything In One Place"
              align="center"
              size="lg"
              className="mb-10"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {valueProps.map((vp, i) => (
              <motion.div
                key={vp.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={vp.href}
                  className={`
                    group block h-full rounded-lg border p-5 sm:p-6
                    bg-card/40 hover:bg-card/70
                    transition-all duration-300
                    ${vp.accentClass}
                  `}
                >
                  <p className={`label-caps text-[0.55rem] mb-2 ${vp.eyebrowClass}`}>
                    {vp.eyebrow}
                  </p>
                  <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3 leading-snug group-hover:text-tr-cyan transition-colors">
                    {vp.heading}
                  </h3>
                  <p className="text-foreground/55 text-sm leading-relaxed">
                    {vp.body}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className="bg-background py-12 px-6 border-b border-border/30">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <EmailCapture />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED BLOG POSTS ── */}
      <section className="bg-background py-16 md:py-20 px-6 border-b border-border/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8 gap-4"
          >
            <SectionHeader
              eyebrow="Read First"
              heading="Essential Guides"
              size="lg"
            />
            <Link
              to="/blogs"
              className="tr-link-caps flex-shrink-0 text-tr-cyan hover:text-tr-cyan/80 transition-colors"
            >
              All guides →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredBlogs.map((blog, i) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="group block rounded-lg border border-border/20 p-5 relative overflow-hidden hover:border-tr-cyan/30 transition-colors"
                  style={{ backgroundColor: "hsl(220 40% 3.5%)" }}
                >
                  <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-border/30 group-hover:border-tr-cyan/40 transition-colors" />
                  <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-border/30 group-hover:border-tr-cyan/40 transition-colors" />
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[0.58rem] font-display uppercase tracking-wider ${blog.tagColor}`}>
                      {blog.tag}
                    </span>
                    <ExternalLink className="w-3 h-3 text-foreground/20 group-hover:text-tr-cyan/50 transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-tr-cyan transition-colors leading-snug mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-[0.6rem] font-display uppercase tracking-wider text-tr-cyan/40 group-hover:text-tr-cyan/70 transition-colors">
                    Read Guide →
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FESTIVALS STRIP ── */}
      <section className="bg-background py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8 gap-4"
          >
            <SectionHeader
              eyebrow="Don't Miss"
              heading="Featured Festivals 2026"
              size="lg"
            />
            <Link
              to="/festivals"
              className="tr-link-caps flex-shrink-0 text-tr-cyan hover:text-tr-cyan/80 transition-colors"
            >
              View all festivals →
            </Link>
          </motion.div>

          <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
            Four festivals worth building your 2026 plans around — each with a full travel guide, packing list, and survival intel inside.
          </p>

          {/* Horizontal scroll on mobile, 4-col grid on desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
            {featuredFestivals.map((fest, i) => (
              <motion.div
                key={fest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-auto"
              >
                <FestivalCard
                  name={fest.name}
                  slug={fest.slug}
                  country={fest.country}
                  city={fest.city}
                  dates={fest.dates}
                  genres={fest.genres}
                  vibeTag={fest.vibe}
                  status={fest.status}
                  image={fest.image}
                  tile
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PWA install banner — mobile only, dismissible */}
      {canInstall && !pwaDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="
            md:hidden
            fixed bottom-4 left-4 right-4 z-50
            flex items-center gap-3
            rounded-xl border border-purple-500/30
            bg-purple-900/40 backdrop-blur-sm
            px-4 py-3
          "
          role="complementary"
          aria-label="Install Travel Ravers app"
        >
          <span className="text-xl flex-shrink-0" aria-hidden="true">📲</span>
          <p className="flex-1 text-sm text-white/80 leading-snug">
            Install Travel Ravers — works offline for your saved festivals
          </p>

          <button
            type="button"
            onClick={triggerInstall}
            className="
              flex-shrink-0 min-h-[44px] px-3 py-2
              rounded-lg bg-purple-600/70 hover:bg-purple-600
              font-display text-[0.65rem] uppercase tracking-wider text-white
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400
            "
          >
            Add to Home Screen
          </button>

          <button
            type="button"
            onClick={handlePwaDismiss}
            className="
              flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center
              text-white/40 hover:text-white/80 transition-colors
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400
            "
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.div>
      )}

      {/* Site-wide schema */}
      <SchemaScript schema={websiteSchema} />
      <SchemaScript schema={organizationSchema} />
    </div>
  );
}
