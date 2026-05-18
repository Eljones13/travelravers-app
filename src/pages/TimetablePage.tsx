// TRAVEL RAVERS: Timetable — /timetable
// Creamfields 2026 full lineup by day and stage, Tron glass aesthetic.
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Clock, Layers } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import {
  creamfields2026Lineup,
  CREAMFIELDS_STAGES,
  CREAMFIELDS_DAYS,
  type CreamfieldsDay,
  type CreamfieldsStage,
} from "@/data/creamfields2026lineup";

// Stage accent colours (Tron palette)
const STAGE_COLORS: Record<CreamfieldsStage, string> = {
  "Arc":        "border-tr-cyan/40   text-tr-cyan",
  "Steel Yard": "border-tr-purple/40 text-tr-purple",
  "Horizon":    "border-tr-green/40  text-tr-green",
  "Spotlight":  "border-yellow-400/40 text-yellow-400",
  "Cream":      "border-pink-400/40   text-pink-400",
  "MIC":        "border-orange-400/40 text-orange-400",
};

const STAGE_BG: Record<CreamfieldsStage, string> = {
  "Arc":        "bg-tr-cyan/5",
  "Steel Yard": "bg-tr-purple/5",
  "Horizon":    "bg-tr-green/5",
  "Spotlight":  "bg-yellow-400/5",
  "Cream":      "bg-pink-400/5",
  "MIC":        "bg-orange-400/5",
};

const DAY_DATES: Record<CreamfieldsDay, string> = {
  Thu: "21 Aug",
  Fri: "22 Aug",
  Sat: "23 Aug",
  Sun: "24 Aug",
};

function SetCard({ set }: { set: (typeof creamfields2026Lineup)[0] }) {
  const stage = set.stage as CreamfieldsStage;
  const colorClass = STAGE_COLORS[stage] ?? "border-border/30 text-foreground/60";
  const bgClass = STAGE_BG[stage] ?? "";

  return (
    <div
      className={`rounded border ${colorClass.split(" ")[0]} ${bgClass} p-3 relative overflow-hidden`}
    >
      {/* neon corner brackets */}
      <span
        aria-hidden="true"
        className={`absolute top-1 left-1 w-2.5 h-2.5 border-t border-l ${colorClass.split(" ")[0]} opacity-60`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r ${colorClass.split(" ")[0]} opacity-60`}
      />
      <p className="font-display text-[0.65rem] font-bold uppercase tracking-wide text-foreground leading-snug mb-1">
        {set.artistName}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[0.6rem] text-foreground/50 font-mono">
          <Clock className="w-2.5 h-2.5" aria-hidden="true" />
          {set.startTime} – {set.endTime}
        </span>
        {set.genre && (
          <span className={`text-[0.55rem] font-display uppercase tracking-wider opacity-60 ${colorClass.split(" ")[1]}`}>
            {set.genre}
          </span>
        )}
      </div>
    </div>
  );
}

export default function TimetablePage() {
  usePageMeta(
    "Creamfields 2026 Timetable — Full Lineup by Day & Stage",
    "Full Creamfields 2026 timetable. Browse every act by stage across Thu, Fri, Sat & Sun. Arc, Steel Yard, Horizon, Cream, MIC and Spotlight stages.",
  );

  const [activeDay, setActiveDay] = useState<CreamfieldsDay>("Thu");

  const dayLineup = creamfields2026Lineup.filter((s) => s.day === activeDay);

  return (
    <div className="page-container">
      <div className="page-inner">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2 flex items-center gap-2">
            <Music2 className="w-3 h-3" aria-hidden="true" />
            Creamfields · Aug 21–24 2026 · Daresbury, Cheshire
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-2">
            2026 Timetable
          </h1>
          <p className="text-foreground/55 text-sm max-w-xl">
            Full lineup by day and stage. Check back for set times as the event approaches.
          </p>
        </motion.header>

        {/* Stage legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CREAMFIELDS_STAGES.map((stage) => {
            const colorClass = STAGE_COLORS[stage];
            return (
              <span
                key={stage}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6rem] font-display uppercase tracking-wider ${colorClass}`}
              >
                <Layers className="w-2.5 h-2.5" aria-hidden="true" />
                {stage}
              </span>
            );
          })}
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6 border-b border-border/30 pb-2">
          {CREAMFIELDS_DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-t text-[0.65rem] font-display uppercase tracking-wider transition-colors ${
                activeDay === day
                  ? "bg-tr-cyan/15 text-tr-cyan border border-tr-cyan/30 border-b-transparent"
                  : "text-foreground/40 hover:text-foreground/70 border border-transparent"
              }`}
            >
              {day}
              <span className="block text-[0.5rem] opacity-60">{DAY_DATES[day]}</span>
            </button>
          ))}
        </div>

        {/* Stage columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CREAMFIELDS_STAGES.map((stage) => {
                const stageSets = dayLineup
                  .filter((s) => s.stage === stage)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime));
                const colorClass = STAGE_COLORS[stage];

                return (
                  <div key={stage} className="rounded-lg border border-border/20 overflow-hidden">
                    {/* Stage header */}
                    <div
                      className={`px-4 py-2.5 border-b border-border/20 flex items-center gap-2 ${colorClass.split(" ")[0].replace("border-", "bg-").replace("/40", "/10")}`}
                    >
                      <Layers className={`w-3 h-3 ${colorClass.split(" ")[1]}`} aria-hidden="true" />
                      <span className={`font-display text-[0.65rem] uppercase tracking-widest ${colorClass.split(" ")[1]}`}>
                        {stage}
                      </span>
                    </div>
                    {/* Sets */}
                    <div className="p-3 space-y-2.5" style={{ backgroundColor: "hsl(220 40% 3.5%)" }}>
                      {stageSets.length > 0 ? (
                        stageSets.map((set) => <SetCard key={set.id} set={set} />)
                      ) : (
                        <p className="text-foreground/30 text-[0.65rem] font-display uppercase tracking-wider py-4 text-center">
                          TBA
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="text-foreground/25 text-[0.6rem] font-display uppercase tracking-wider mt-8 text-center">
          Set times are indicative — check creamfields.com for confirmed schedule
        </p>
      </div>
    </div>
  );
}
