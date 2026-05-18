import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { HUD } from "@/constants/colors";

interface Props {
  festivalSlug: string;
  festivalName?: string;
}

type Budget = {
  travel:        string;
  ticket:        string;
  accommodation: string;
  food:          string;
  spending:      string;
};

const EMPTY: Budget = { travel: "", ticket: "", accommodation: "", food: "", spending: "" };

const FIELDS: { key: keyof Budget; label: string; placeholder: string }[] = [
  { key: "travel",        label: "Travel Cost",    placeholder: "200" },
  { key: "ticket",        label: "Ticket Price",   placeholder: "250" },
  { key: "accommodation", label: "Accommodation",  placeholder: "400" },
  { key: "food",          label: "Food Budget",    placeholder: "150" },
  { key: "spending",      label: "Spending Money", placeholder: "100" },
];

function parsePound(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) || n < 0 ? 0 : n;
}

function formatTotal(n: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TripCostCard({ festivalSlug, festivalName }: Props) {
  const storageKey = `tr_budget_${festivalSlug}`;

  const [budget, setBudget] = useState<Budget>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...EMPTY, ...(JSON.parse(saved) as Partial<Budget>) } : EMPTY;
    } catch {
      return EMPTY;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(budget));
  }, [budget, storageKey]);

  const total = Object.values(budget).reduce((sum, v) => sum + parsePound(v), 0);
  const hasAnyValue = Object.values(budget).some((v) => v !== "");

  function update(key: keyof Budget, value: string) {
    if (value !== "" && !/^\d*\.?\d*$/.test(value)) return;
    setBudget((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section
      className="rounded-lg border border-tr-cyan/20 p-5 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: HUD.cyanBg }}
      aria-label="Trip cost estimator"
    >
      {/* HUD corner brackets */}
      <span aria-hidden="true" className="absolute top-2 left-2 w-3 h-3 border-t border-l border-tr-cyan/30" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-tr-cyan/30" />

      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
        <p className="label-caps text-[0.6rem] text-tr-cyan/60">Trip Planner</p>
      </div>

      <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-1">
        Trip Cost Estimator
      </h2>
      {festivalName && (
        <p className="text-foreground/45 text-[0.7rem] mb-5 leading-relaxed">
          Budget your {festivalName} trip
        </p>
      )}

      {/* Fields */}
      <div className="space-y-2.5 mb-5" role="group" aria-label="Budget fields">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex items-center gap-3">
            <label
              htmlFor={`budget-${festivalSlug}-${key}`}
              className="font-display text-[0.6rem] uppercase tracking-wider text-foreground/50 w-28 flex-shrink-0"
            >
              {label}
            </label>
            <div className="relative flex-1">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-tr-cyan/50 text-xs font-display select-none"
                aria-hidden="true"
              >
                £
              </span>
              <input
                id={`budget-${festivalSlug}-${key}`}
                type="text"
                inputMode="decimal"
                value={budget[key]}
                onChange={(e) => update(key, e.target.value)}
                placeholder={placeholder}
                className="
                  w-full min-h-[38px] pl-7 pr-3 py-1.5 rounded-md text-right
                  border border-border/40 bg-secondary/30
                  text-foreground placeholder:text-foreground/20 text-sm font-display
                  focus:outline-none focus:border-tr-cyan/50 focus:ring-1 focus:ring-tr-cyan/20
                  transition-colors
                "
                aria-label={`${label} in pounds`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-tr-cyan/15 mb-4" />

      {/* Running total */}
      <div
        className="rounded-md border border-tr-cyan/30 px-4 py-3 flex items-center justify-between relative overflow-hidden"
        style={{ backgroundColor: HUD.cyanBgStrong }}
      >
        <span aria-hidden="true" className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-tr-cyan/25" />
        <span aria-hidden="true" className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-tr-cyan/25" />
        <span className="font-display text-[0.65rem] uppercase tracking-widest text-tr-cyan/70">
          Total Trip Cost
        </span>
        <output
          htmlFor={FIELDS.map((f) => `budget-${festivalSlug}-${f.key}`).join(" ")}
          className="font-display text-lg font-bold text-tr-cyan tabular-nums"
          aria-label={`Total trip cost: £${formatTotal(total)}`}
        >
          £{formatTotal(total)}
        </output>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider">
          Saved to this device · Estimates only
        </p>
        {hasAnyValue && (
          <button
            onClick={() => setBudget(EMPTY)}
            className="text-[0.58rem] font-display uppercase tracking-wider text-foreground/30 hover:text-tr-red/60 transition-colors"
            aria-label="Reset all budget fields"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
