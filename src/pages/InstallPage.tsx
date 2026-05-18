// TRAVEL RAVERS: Main website app landing page — /install
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Smartphone,
  CalendarDays,
  BookOpen,
  ShoppingBag,
  Star,
  Zap,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import radarScreenshot from "@/assets/app-radar-screenshot.png";

// ── Apple / Google SVG marks ─────────────────────────────────────────────────
function AppleMark() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.28.15.59.19.9.14L14.38 12 3.08.1a1.06 1.06 0 0 0-.9.14C1.82.56 1.5 1.1 1.5 1.82v20.36c0 .72.32 1.26.68 1.58zM16.5 9.56l-2.73-2.73L4.5 1.6l10.5 9.55-1.5 1.51 1.5 1.5 10.5-9.7-6.32 6.18 1.09 1.08L21 9.18l-4.5 4.5v-4.1l-2 1.94-1.03-1.03L16.5 9.56zm1.68 4.79L4.5 22.4l9.27-5.23 4.41-2.82z" />
    </svg>
  );
}

// ── Benefits data ─────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: CalendarDays,
    color: "text-tr-cyan",
    bg: "bg-tr-cyan/10",
    border: "border-tr-cyan/20",
    title: "Keep Festival Plans in One Place",
    body: "Save the festivals you're going to, track your maybe list, and see everything lined up by date — all in one organised view.",
  },
  {
    icon: BookOpen,
    color: "text-tr-green",
    bg: "bg-tr-green/10",
    border: "border-tr-green/20",
    title: "Guides and Blogs on Demand",
    body: "Quick access to destination guides, packing advice, and survival content from your home screen — no searching required.",
  },
  {
    icon: ShoppingBag,
    color: "text-tr-purple",
    bg: "bg-tr-purple/10",
    border: "border-tr-purple/20",
    title: "Gear Lists Built for Festivals",
    body: "Browse gear picks by festival type, climate, and budget. Tap straight through to buy without losing your place.",
  },
  {
    icon: Zap,
    color: "text-tr-cyan",
    bg: "bg-tr-cyan/10",
    border: "border-tr-cyan/20",
    title: "Faster Festival Season Planning",
    body: "Check the calendar, browse line-ups, and compare festivals on the go. No app store needed — installs straight from your browser.",
  },
];

// ── Coming-soon inline note component ────────────────────────────────────────
function StoreButton({
  platform,
  label,
  style,
}: {
  platform: "ios" | "android";
  label: string;
  style: "light" | "green";
}) {
  const [tapped, setTapped] = useState(false);

  const baseClass =
    style === "light"
      ? "inline-flex items-center gap-3 px-6 py-3 rounded-md bg-white/95 hover:bg-white text-gray-900 transition-all duration-200 active:scale-[0.97] font-semibold text-sm w-full sm:w-auto justify-center"
      : "inline-flex items-center gap-3 px-6 py-3 rounded-md border border-tr-green/40 bg-tr-green/10 hover:bg-tr-green/20 text-tr-green transition-all duration-200 active:scale-[0.97] font-semibold text-sm w-full sm:w-auto justify-center";

  const fontStyle =
    style === "green"
      ? { fontFamily: "'Orbitron', system-ui, sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" as const }
      : undefined;

  return (
    <div className="flex flex-col items-start w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setTapped(true)}
        className={baseClass}
        style={fontStyle}
        aria-label={label}
      >
        {platform === "ios" ? <AppleMark /> : <GoogleMark />}
        {label}
      </button>
      {tapped && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 text-[0.6rem] font-display uppercase tracking-wider text-foreground/40 pl-1"
        >
          Coming soon — join the app waitlist below
        </motion.p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function InstallPage() {
  usePageMeta(
    "Install the Travel Ravers App",
    "Install Travel Ravers for festival season. Keep your festival plans, guides, gear picks, and calendar in one place — with fast access from your phone.",
  );

  return (
    <div className="page-container">
      <div className="page-inner max-w-4xl">

        {/* ── HERO ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="bg-tr-cyan/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-tr-cyan/20">
            <Smartphone className="w-8 h-8 text-tr-cyan" aria-hidden="true" />
          </div>

          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-3">
            Travel Ravers App
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Install Travel Ravers<br className="hidden sm:block" /> for Festival Season
          </h1>

          <p className="text-foreground/65 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Keep your festival plans, guides, gear picks, blogs, and calendar in one place — with fast access from your phone whenever you need it.
          </p>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <StoreButton platform="ios" label="Download for iOS" style="light" />
            <StoreButton platform="android" label="Download for Android" style="green" />
          </div>

          <p className="text-foreground/30 text-xs">
            Native apps coming soon · <Link to="/app" className="hover:text-tr-cyan transition-colors">Survival app waitlist →</Link>
          </p>
        </motion.section>

        {/* ── BENEFITS GRID ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="label-caps text-[0.6rem] text-foreground/35 mb-2">Why install</p>
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
              Everything Festival in Your Pocket
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className={`rounded-lg border p-5 flex items-start gap-4 ${b.border}`}
                style={{ backgroundColor: "hsl(220 40% 6%)" }}
              >
                <div className={`w-9 h-9 rounded-lg ${b.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <b.icon className={`w-4.5 h-4.5 ${b.color}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-wider mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-foreground/55 text-sm leading-relaxed">{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── QUICK LINKS STRIP ── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Festival Calendar", to: "/calendar" },
              { label: "Packing & Gear",    to: "/gear"     },
              { label: "Travel Guides",     to: "/blogs"    },
              { label: "My Weekends",       to: "/my-weekends" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="
                  group flex items-center justify-between
                  rounded-lg border border-border/20 hover:border-tr-cyan/30
                  px-4 py-3 transition-colors
                "
                style={{ backgroundColor: "hsl(220 40% 3.5%)" }}
              >
                <span className="font-display text-[0.65rem] uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors leading-snug">
                  {label}
                </span>
                <ChevronRight className="w-3 h-3 text-foreground/20 group-hover:text-tr-cyan/50 transition-colors flex-shrink-0 ml-2" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── OFFLINE SURVIVAL APP TEASER ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="
            rounded-xl border border-tr-purple/20
            overflow-hidden
            mb-4
          "
          style={{ backgroundColor: "hsl(260 40% 5%)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-0">
            {/* Text */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-tr-purple/30 bg-tr-purple/10 px-2.5 py-1 text-[0.58rem] font-display uppercase tracking-wider text-tr-purple/80">
                  <Star className="w-2.5 h-2.5" aria-hidden="true" />
                  Advanced Add-On
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground mb-3">
                Need Offline Tools<br className="hidden sm:block" /> on Site?
              </h2>

              <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-lg">
                Explore the Travel Ravers Survival App — radar, offline maps, packing lists, timetable support, and SOS tools for when signal disappears. Built for the moments the main app can't reach.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/app"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Explore Survival App
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-foreground/35 hover:text-tr-purple/70 transition-colors"
                >
                  View demo →
                </Link>
              </div>
            </div>

            {/* Radar screenshot — visible on sm+ */}
            <div className="hidden sm:flex items-center justify-center px-6 py-6 border-l border-tr-purple/10">
              <div
                className="w-[120px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.12)]"
              >
                <img
                  src={radarScreenshot}
                  alt="Travel Ravers Survival App radar screen preview"
                  className="w-full block"
                  width={390}
                  height={844}
                />
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
