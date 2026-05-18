// TRAVEL RAVERS: APP LANDING PAGE — /app
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, MapPin, Shield, Users, Wifi, Battery, CheckSquare, Play } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import SectionHeader from "@/components/SectionHeader";
import radarScreenshot from "@/assets/app-radar-screenshot.png";

const faqs = [
  {
    q: "When does the app launch?",
    a: "The Travel Ravers app is currently in development. Sign up below to get early access when we launch ahead of the 2026 festival season.",
  },
  {
    q: "Is it free?",
    a: "Core features — offline maps, packing checklist, and SOS — will always be free. A premium tier covering Squad Radar and advanced features is planned.",
  },
  {
    q: "Which platforms will it support?",
    a: "iOS and Android. A progressive web app (PWA) version is also planned so you can use it without an app store download.",
  },
  {
    q: "How does it work without internet?",
    a: "Festival maps, your checklist, and emergency info are all downloaded to your device before you leave home. Every core feature works without mobile data on-site.",
  },
  {
    q: "How does Squad Radar work without signal?",
    a: "Squad Radar uses peer-to-peer Bluetooth and local WiFi (where available at the festival) to approximate your position relative to your crew — no mobile data required.",
  },
  {
    q: "Can I suggest a festival to add?",
    a: "Yes — we're constantly adding new festivals. Email us at hello@travelravers.com or use the contact details on the About page.",
  },
];

// 4 core features first (for 2×2 / 4-col grid), then 2 supporting features
const coreFeatures = [
  {
    icon: CheckSquare,
    title: "Offline Checklist",
    description: "Tell it your festival and it builds your exact list — nothing wasted, nothing forgotten.",
    color: "text-tr-cyan",
    bg: "bg-tr-cyan/10",
    border: "border-tr-cyan/20",
  },
  {
    icon: MapPin,
    title: "Offline Maps",
    description: "Download before you leave home. Stages, water points, welfare tent — zero bars needed.",
    color: "text-tr-green",
    bg: "bg-tr-green/10",
    border: "border-tr-green/20",
  },
  {
    icon: Users,
    title: "Squad Radar",
    description: "See your crew's positions over Bluetooth. No mobile data required to not lose each other.",
    color: "text-tr-purple",
    bg: "bg-tr-purple/10",
    border: "border-tr-purple/20",
  },
  {
    icon: Shield,
    title: "SOS Features",
    description: "One tap to emergency contacts, nearest medical tent, and local emergency number. Works at zero signal.",
    color: "text-tr-red",
    bg: "bg-tr-red/10",
    border: "border-tr-red/20",
  },
];

const supportingFeatures = [
  {
    icon: Wifi,
    title: "Works Offline",
    description: "Every core feature works without internet. Built for the people with no signal.",
    color: "text-tr-cyan",
    bg: "bg-tr-cyan/10",
    border: "border-tr-cyan/20",
  },
  {
    icon: Battery,
    title: "Battery Efficient",
    description: "Designed to use minimal battery. Your phone lasts the whole festival.",
    color: "text-tr-green",
    bg: "bg-tr-green/10",
    border: "border-tr-green/20",
  },
];

export default function AppPage() {
  usePageMeta(
    "Get the App",
    "The Travel Ravers app: offline festival maps, smart packing checklists, squad radar, and SOS alerts.",
  );

  return (
    <div className="page-container">
      <div className="page-inner max-w-4xl text-center">

        {/* ── HERO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-tr-cyan/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-tr-cyan/20">
            <Smartphone className="w-8 h-8 text-tr-cyan" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Travel Ravers App
          </h1>
          <p className="text-foreground/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            The festival app that works when your phone signal dies.
          </p>

          {/* Secondary CTAs */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 btn-secondary px-6 py-3 text-sm"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              View Demo
            </Link>
            <Link
              to="/install"
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-display uppercase tracking-wider text-foreground/35 hover:text-tr-cyan/70 transition-colors"
            >
              Main website app →
            </Link>
          </div>

          {/* App Store CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* App Store — light/white style */}
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-white/95 hover:bg-white text-gray-900 transition-all duration-200 active:scale-[0.97] font-semibold text-sm w-full sm:w-auto justify-center"
              aria-label="Download on the App Store"
            >
              {/* Apple logo approximation via text */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </a>

            {/* Google Play — green tint style */}
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-md border border-tr-green/40 bg-tr-green/10 hover:bg-tr-green/20 text-tr-green transition-all duration-200 active:scale-[0.97] font-semibold text-sm w-full sm:w-auto justify-center"
              style={{ fontFamily: "'Orbitron', system-ui, sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              aria-label="Get it on Google Play"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.76c.28.15.59.19.9.14L14.38 12 3.08.1a1.06 1.06 0 0 0-.9.14C1.82.56 1.5 1.1 1.5 1.82v20.36c0 .72.32 1.26.68 1.58zM16.5 9.56l-2.73-2.73L4.5 1.6l10.5 9.55-1.5 1.51 1.5 1.5 10.5-9.7-6.32 6.18 1.09 1.08L21 9.18l-4.5 4.5v-4.1l-2 1.94-1.03-1.03L16.5 9.56zm1.68 4.79L4.5 22.4l9.27-5.23 4.41-2.82z"/>
              </svg>
              Download for Android
            </a>
          </div>
        </motion.div>

        {/* ── FEATURE GRID — 2×2 mobile, 4-column desktop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <SectionHeader
            eyebrow="What's inside"
            heading="Core Features"
            align="center"
            size="lg"
            className="mb-8"
          />
          {/* 2×2 on mobile (sm:grid-cols-2), 4-col on desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-4">
            {coreFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className={`rounded-lg border p-4 sm:p-5 ${f.border}`}
                style={{ backgroundColor: "hsl(220 40% 6%)" }}
              >
                <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center mb-3`}>
                  <f.icon className={`w-4 h-4 ${f.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-wider mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Supporting features — 1-col mobile, 2-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {supportingFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.57 + i * 0.08 }}
                className={`rounded-lg border p-4 sm:p-5 flex items-start gap-4 ${f.border}`}
                style={{ backgroundColor: "hsl(220 40% 6%)" }}
              >
                <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
                  <f.icon className={`w-4 h-4 ${f.color}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold text-foreground uppercase tracking-wider mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Radar screenshot */}
        <div className="max-w-[280px] mx-auto mb-16">
          <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,245,255,0.08),0_24px_60px_rgba(0,0,0,0.5)]">
            <img
              src={radarScreenshot}
              alt="Travel Ravers app — Squad Radar screen showing Creamfields festival with live crew positions"
              className="w-full block"
              width={390}
              height={844}
            />
          </div>
          <p className="mt-3 text-[0.58rem] font-display uppercase tracking-widest text-foreground/25 text-center">
            Squad Radar · Live Preview
          </p>
        </div>

        {/* ── FAQ — clean accordion with <details>/<summary> ── */}
        <section className="text-left max-w-2xl mx-auto">
          <SectionHeader heading="Frequently Asked Questions" align="center" className="mb-8" />
          <div className="divide-y divide-border/40 border-t border-border/40">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                className="group py-4"
              >
                <summary
                  className="flex items-center justify-between gap-4 cursor-pointer list-none font-body text-sm font-semibold text-foreground/85 hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Rajdhani', system-ui, sans-serif" }}
                >
                  {faq.q}
                  {/* Chevron that rotates on open */}
                  <span
                    className="text-muted-foreground/50 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-foreground/60 text-sm leading-relaxed font-body" style={{ fontFamily: "'Rajdhani', system-ui, sans-serif" }}>
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
