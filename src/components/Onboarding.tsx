import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RaverType = "camper" | "dayTripper" | "international";

interface Props {
  onComplete: () => void;
}

const RAVER_OPTIONS: { id: RaverType; label: string; desc: string }[] = [
  { id: "camper",        label: "CAMPER",        desc: "Multi-day, on-site, full send" },
  { id: "dayTripper",    label: "DAY TRIPPER",   desc: "Day tickets, home each night" },
  { id: "international", label: "INTERNATIONAL", desc: "Flying in, travelling from abroad" },
];

const slideVariants = {
  enter:  { x: 60,  opacity: 0 },
  center: { x: 0,   opacity: 1 },
  exit:   { x: -60, opacity: 0 },
};

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-tr-cyan/40" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-tr-cyan/40" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-tr-cyan/40" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-tr-cyan/40" />
    </>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i <= current
              ? "w-6 bg-tr-cyan shadow-[0_0_6px_hsl(var(--tr-cyan)/0.8)]"
              : "w-2 bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [raverType, setRaverType] = useState<RaverType | null>(null);

  function finish() {
    localStorage.setItem("tr_onboarding_completed", "true");
    if (raverType) localStorage.setItem("tr_raver_type", raverType);
    onComplete();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#03060f" }}
    >
      {/* Ambient HUD grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--tr-cyan)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--tr-cyan)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Brand wordmark */}
      <div className="mb-10 font-display text-sm font-bold uppercase tracking-[0.3em] text-foreground select-none">
        Travel<span className="text-tr-cyan"> Ravers</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-sm px-6"
        >
          <StepDots current={step} total={3} />

          {/* Screen 0 — Welcome */}
          {step === 0 && (
            <div className="flex flex-col gap-6">
              <div className="relative glass-card p-6 rounded-lg">
                <CornerBrackets />
                <h1 className="font-display text-xl uppercase tracking-widest text-tr-cyan leading-tight mb-3">
                  YOUR FESTIVAL<br />SURVIVAL<br />COMPANION
                </h1>
                <p className="font-body text-white/60 text-base leading-relaxed">
                  Plan smarter. Pack lighter. Rave harder.
                </p>
              </div>
              <button className="btn-primary w-full" onClick={() => setStep(1)}>
                LET'S GO
              </button>
            </div>
          )}

          {/* Screen 1 — Raver Type */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-base uppercase tracking-widest text-tr-cyan mb-2">
                WHAT KIND OF RAVER ARE YOU?
              </h1>
              <div className="flex flex-col gap-3">
                {RAVER_OPTIONS.map((rt) => {
                  const selected = raverType === rt.id;
                  return (
                    <button
                      key={rt.id}
                      onClick={() => setRaverType(rt.id)}
                      className={`relative text-left p-4 rounded-lg border transition-all duration-200 ${
                        selected
                          ? "border-tr-cyan/60 bg-tr-cyan/5 shadow-[0_0_20px_hsl(var(--tr-cyan)/0.15)]"
                          : "border-white/10 bg-white/[0.02] hover:border-tr-cyan/30"
                      }`}
                    >
                      <CornerBrackets />
                      <span className="font-display text-xs uppercase tracking-widest text-tr-cyan block mb-1">
                        {rt.label}
                      </span>
                      <span className="font-body text-white/50 text-sm">
                        {rt.desc}
                      </span>
                      {selected && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-tr-cyan shadow-[0_0_8px_hsl(var(--tr-cyan)/0.9)]" />
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                className="btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!raverType}
                onClick={() => setStep(2)}
              >
                THAT'S ME
              </button>
            </div>
          )}

          {/* Screen 2 — You're Ready */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="relative glass-card p-6 rounded-lg text-center">
                <CornerBrackets />
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-tr-cyan/10 border border-tr-cyan/40 flex items-center justify-center shadow-[0_0_20px_hsl(var(--tr-cyan)/0.2)]">
                  <span className="font-display text-tr-cyan text-lg leading-none">✓</span>
                </div>
                <h1 className="font-display text-xl uppercase tracking-widest text-tr-cyan mb-3">
                  YOU'RE ALL SET
                </h1>
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  67 festivals. Packing lists. Budget tools.
                  <br />All offline-ready.
                </p>
              </div>
              <button className="btn-primary w-full" onClick={finish}>
                EXPLORE FESTIVALS
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
