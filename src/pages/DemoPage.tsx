// TRAVEL RAVERS: Interactive App Demo — /demo
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Smartphone, ArrowLeft, ChevronRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const HOW_TO_BULLETS = [
  "Tap or click through the screens to explore the app flow.",
  "Start by choosing a festival, then open the radar, map, timetable, checklist, and SOS sections.",
  "Try dropping pins on the map, switching timetable days, checking off kit items, and opening DJ profiles.",
  "This is an interactive preview, so some actions are demo-only and won't save data.",
  "When you're ready, join the waitlist for launch updates and early access.",
];

function WaitlistButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#waitlist"
      className={`btn-primary inline-flex items-center gap-2 ${className}`}
    >
      Join Waitlist
      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  );
}

export default function DemoPage() {
  usePageMeta(
    "Interactive App Demo — Travel Ravers",
    "Explore the Travel Ravers Survival App demo. See offline maps, squad radar, timetable, packing checklist, and SOS tools in action.",
  );

  return (
    <div className="page-container">
      <div className="page-inner">

        {/* ── Back link ── */}
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors text-[0.65rem] font-display uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          Back to App Page
        </Link>

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-tr-cyan/10 border border-tr-cyan/20 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-4.5 h-4.5 text-tr-cyan" aria-hidden="true" />
            </div>
            <p className="label-caps text-[0.6rem] text-tr-cyan/60">Interactive Preview</p>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            Explore the Survival App Demo
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            This is an interactive preview of the Travel Ravers Survival App. It shows how the app can help festival-goers with planning, navigation, packing, squad coordination, and emergency tools.
          </p>
        </motion.header>

        {/* ── Top CTAs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <WaitlistButton />
          <Link to="/app" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to App Page
          </Link>
        </motion.div>

        {/* ── How to use ── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-lg border border-tr-cyan/15 bg-tr-cyan/5 px-5 py-5 mb-10 max-w-2xl"
        >
          <h2 className="font-display text-xs font-bold uppercase tracking-wider text-tr-cyan mb-4">
            How to use this demo
          </h2>
          <ul className="space-y-2.5">
            {HOW_TO_BULLETS.map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/65 leading-snug">
                <span className="mt-[3px] w-4 h-4 flex-shrink-0 rounded border border-tr-cyan/25 bg-tr-cyan/8 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-tr-cyan/60" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── iframe container ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mb-12"
        >
          {/*
            The demo HTML has its own status bar + nav bar as part of the UI.
            We strip its outer phone chrome (done via CSS override in the HTML)
            and provide a single clean phone-shaped frame here.

            Sizing: 390px wide × 844px tall — matches iPhone 14 logical resolution.
            The iframe is position:absolute filling the container exactly,
            so there is no gap and no inner scroll visible.
          */}
          <div className="flex flex-col items-center">
            <div
              className="
                relative
                w-full sm:w-[390px]
                rounded-[2.5rem]
                border-2 border-white/10
                overflow-hidden
                shadow-[0_0_0_1px_rgba(0,245,255,0.08),0_0_80px_rgba(0,245,255,0.07),0_32px_80px_rgba(0,0,0,0.6)]
              "
              style={{
                backgroundColor: "#03060f",
                /* Fixed height = exact iframe height so nothing bleeds out */
                height: "844px",
              }}
            >
              {/* iframe fills the container with no scrollbars */}
              <iframe
                src="/demo/travel-ravers-demo.html"
                title="Travel Ravers Survival App Demo"
                scrolling="no"
                className="absolute inset-0 w-full h-full border-0 block"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>

            <p className="mt-4 text-[0.6rem] font-display uppercase tracking-widest text-foreground/25">
              Interactive prototype · not final UI
            </p>
          </div>
        </motion.div>

        {/* ── Bottom CTAs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/20"
          id="waitlist"
        >
          <WaitlistButton />
          <Link to="/app" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to App Page
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
