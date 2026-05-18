import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, CalendarCheck } from "lucide-react";
import { festivalGear } from "@/data/festivalGear";
import { HUD } from "@/constants/colors";

interface Props {
  festivalSlug: string;
  festivalName?: string;
  compact?: boolean;
}

// Grouped by category — order preserved from data file
const GROUPED = (() => {
  const map = new Map<string, typeof festivalGear>();
  for (const item of festivalGear) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category)!.push(item);
  }
  return Array.from(map.entries()).map(([name, items]) => ({
    name,
    emoji: items[0].icon,
    items,
  }));
})();

const TOTAL = festivalGear.length;

// ── Sub-components ─────────────────────────────────────────────────────────────

function ProgressBar({ pct, height }: { pct: number; height: string }) {
  return (
    <div className={`rounded-full bg-border/20 overflow-hidden ${height}`}>
      <div
        className={`h-full transition-all duration-500 ${pct >= 100 ? "bg-tr-green" : "bg-tr-cyan"}`}
        style={{ width: `${pct}%` }}
        role="presentation"
      />
    </div>
  );
}

function CategoryBlock({
  name,
  emoji,
  items,
  checked,
  collapsed,
  onToggleItem,
  onToggleCat,
}: {
  name: string;
  emoji: string;
  items: typeof festivalGear;
  checked: Set<string>;
  collapsed: boolean;
  onToggleItem: (id: string) => void;
  onToggleCat: () => void;
}) {
  const catChecked = items.filter((i) => checked.has(i.id)).length;

  return (
    <div>
      <button
        type="button"
        onClick={onToggleCat}
        className="w-full flex items-center gap-2 mb-2 group"
        aria-expanded={!collapsed}
        aria-label={`${name} — ${catChecked} of ${items.length} packed`}
      >
        <span className="text-sm leading-none" aria-hidden="true">
          {emoji}
        </span>
        <span className="font-display text-[0.6rem] uppercase tracking-wider text-foreground/55 group-hover:text-foreground/80 transition-colors flex-1 text-left">
          {name}
        </span>
        <span className="font-display text-[0.55rem] text-tr-cyan/50 tabular-nums">
          {catChecked}/{items.length}
        </span>
        {collapsed
          ? <ChevronDown className="w-3 h-3 text-foreground/30" aria-hidden="true" />
          : <ChevronUp className="w-3 h-3 text-foreground/30" aria-hidden="true" />
        }
      </button>

      {!collapsed && (
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isChecked = checked.has(item.id);
            return (
              <li key={item.id}>
                <label className="flex items-center gap-2.5 py-1 cursor-pointer group/item select-none">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleItem(item.id)}
                    className="sr-only"
                  />
                  <span
                    className={
                      isChecked
                        ? "w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all bg-tr-cyan border-tr-cyan"
                        : "w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all border-border/50 bg-transparent"
                    }
                    aria-hidden="true"
                  >
                    {isChecked && (
                      <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm leading-snug transition-colors flex-1 ${
                      isChecked
                        ? "line-through text-foreground/25"
                        : "text-foreground/70 group-hover/item:text-foreground/90"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-base flex-shrink-0 leading-none" aria-hidden="true">
                    {item.icon}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PackingChecklist({
  festivalSlug,
  festivalName,
  compact = false,
}: Props) {
  const storageKey = `tr_checklist_${festivalSlug}`;

  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return new Set(saved ? (JSON.parse(saved) as string[]) : []);
    } catch {
      return new Set();
    }
  });

  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked, storageKey]);

  const checkedCount = checked.size;
  const pct = TOTAL > 0 ? (checkedCount / TOTAL) * 100 : 0;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCat(name: string) {
    setCollapsedCats((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const categoryList = (
    <div className="space-y-4">
      {GROUPED.map(({ name, emoji, items }) => (
        <CategoryBlock
          key={name}
          name={name}
          emoji={emoji}
          items={items}
          checked={checked}
          collapsed={collapsedCats.has(name)}
          onToggleItem={toggle}
          onToggleCat={() => toggleCat(name)}
        />
      ))}

      <div className="flex items-center justify-between pt-4 border-t border-tr-cyan/10">
        <p className="text-foreground/25 text-[0.55rem] font-display uppercase tracking-wider">
          Saved to this device
        </p>
        {checkedCount > 0 && (
          <button
            type="button"
            onClick={() => setChecked(new Set())}
            className="text-[0.58rem] font-display uppercase tracking-wider text-foreground/30 hover:text-tr-red/60 transition-colors"
            aria-label="Reset packing checklist"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );

  // ── Compact mode (MyWeekendsPage) ─────────────────────────────────────────
  if (compact) {
    return (
      <div
        className="rounded-lg border border-tr-cyan/15 overflow-hidden"
        style={{ backgroundColor: HUD.cyanBg }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-4 py-2.5"
          aria-expanded={open}
          aria-label={`Packing list — ${checkedCount} of ${TOTAL} items packed`}
        >
          <div className="flex-1">
            <ProgressBar pct={pct} height="h-1.5" />
          </div>
          <span className="font-display text-[0.58rem] text-foreground/40 uppercase tracking-wider whitespace-nowrap tabular-nums">
            {checkedCount}/{TOTAL} packed
          </span>
          {open
            ? <ChevronUp className="w-3 h-3 text-foreground/30 flex-shrink-0" aria-hidden="true" />
            : <ChevronDown className="w-3 h-3 text-foreground/30 flex-shrink-0" aria-hidden="true" />
          }
        </button>

        {open && (
          <div className="border-t border-tr-cyan/10 px-4 pt-4 pb-5">
            {categoryList}
          </div>
        )}
      </div>
    );
  }

  // ── Full mode (festival detail pages) ─────────────────────────────────────
  return (
    <section
      className="rounded-lg border border-tr-cyan/20 p-5 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: HUD.cyanBg }}
      aria-label="Packing checklist"
    >
      <span aria-hidden="true" className="absolute top-2 left-2 w-3 h-3 border-t border-l border-tr-cyan/30" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-tr-cyan/30" />

      <div className="flex items-center gap-2 mb-3">
        <CalendarCheck className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
        <p className="label-caps text-[0.6rem] text-tr-cyan/60">Packing</p>
      </div>
      <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-1">
        Packing Checklist
      </h2>
      {festivalName && (
        <p className="text-foreground/45 text-[0.7rem] mb-4 leading-relaxed">
          Check off what you're bringing to {festivalName}
        </p>
      )}

      <div className="space-y-1.5 mb-5">
        <ProgressBar pct={pct} height="h-2" />
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.6rem] text-foreground/40 uppercase tracking-wider">
            {checkedCount} of {TOTAL} packed
          </span>
          {pct >= 100 && (
            <span className="font-display text-[0.6rem] text-tr-green uppercase tracking-wider">
              All packed ✓
            </span>
          )}
        </div>
      </div>

      {categoryList}
    </section>
  );
}
