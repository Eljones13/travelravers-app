// TRAVEL RAVERS: MY WEEKENDS — /my-weekends
// Lists festivals the user has marked as "going" or "maybe" via the festival store.
// Empty state: prompt to browse festivals.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck, HelpCircle, Trash2, Compass, Hotel } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useFestivalStore } from "@/context/FestivalStoreContext";
import type { TicketStatus } from "@/types/festival";
import { mockFestivals } from "@/data/mockFestivals";
import { csvFestivals } from "@/data/csvFestivals";
import { festivals as richFestivals } from "@/data/content";
import { Stay22Modal } from "@/components/Stay22Modal";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

// ── Festival name lookup across all data sources ──────────────────────────────
interface FestivalMeta {
  id: string;
  name: string;
  subtitle: string;
}

function resolveFestivalMeta(id: string): FestivalMeta {
  // 1. Mock festivals (UI-layer)
  const mock = mockFestivals.find((f) => f.id === id);
  if (mock) {
    return {
      id,
      name: mock.name,
      subtitle: `${mock.location} · ${mock.startDate.slice(0, 7)}`,
    };
  }
  // 2. CSV festivals
  const csv = csvFestivals.find((f) => f.slug === id);
  if (csv) {
    return {
      id,
      name: csv.festivalName,
      subtitle: `${csv.location} · ${csv.dates}`,
    };
  }
  // 3. Rich content.ts festivals
  const rich = richFestivals.find((f) => f.slug === id);
  if (rich) {
    return {
      id,
      name: rich.name,
      subtitle: `${rich.city}, ${rich.country} · ${rich.dates}`,
    };
  }
  // Fallback — unknown festival id
  return { id, name: id, subtitle: "Unknown festival" };
}

// ── Status pill ───────────────────────────────────────────────────────────────
const statusConfig: Record<
  Exclude<TicketStatus, "none">,
  { label: string; icon: typeof CalendarCheck; classes: string }
> = {
  going: {
    label: "Going",
    icon: CalendarCheck,
    classes:
      "inline-flex items-center gap-1 text-[0.6rem] font-display uppercase tracking-wider px-2 py-0.5 rounded border border-tr-cyan/50 bg-tr-cyan/10 text-tr-cyan",
  },
  maybe: {
    label: "Maybe",
    icon: HelpCircle,
    classes:
      "inline-flex items-center gap-1 text-[0.6rem] font-display uppercase tracking-wider px-2 py-0.5 rounded border border-tr-amber/50 bg-tr-amber/10 text-tr-amber",
  },
};

export default function MyWeekendsPage() {
  usePageMeta(
    "My Weekend Plans",
    "Your personal festival shortlist — festivals you're going to or considering in 2026.",
  );

  const { ticketStatuses, setTicketStatus } = useFestivalStore();
  const [stay22Open, setStay22Open] = useState(false);

  const planned = useMemo(() => {
    return Object.entries(ticketStatuses)
      .filter(([, status]) => status !== "none")
      .map(([id, status]) => ({
        ...resolveFestivalMeta(id),
        status: status as Exclude<TicketStatus, "none">,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [ticketStatuses]);

  return (
    <div className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com" },
          { name: "My Weekend Plans", url: "https://travelravers.com/my-weekends" },
        ]}
      />
      <div className="page-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="label-caps text-[0.6rem] text-muted-foreground/50 mb-2">Your plans</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
            My Weekend Plans
            {planned.length > 0 && (
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-tr-cyan/40 bg-tr-cyan/10 text-tr-cyan"
                style={{ fontSize: "0.75rem", fontFamily: "Orbitron, sans-serif" }}
                aria-label={`${planned.length} festivals tracked`}
              >
                {planned.length}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Festivals you've marked as going or maybe. Open any festival guide and tap{" "}
            <span className="text-tr-cyan font-display text-xs uppercase tracking-wider">
              Add to my weekend plan
            </span>{" "}
            to track it here.
          </p>
        </motion.div>

        {planned.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-10 text-center border-tr-cyan/10"
          >
            <span
              aria-hidden="true"
              className="block text-4xl mb-4"
            >
              🎪
            </span>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">
              No festivals tracked yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Browse the full 2026 lineup, open a festival guide, and hit{" "}
              <strong className="text-foreground">Add to my weekend plan</strong> to start tracking.
            </p>
            <Link to="/festivals" className="btn-primary inline-flex items-center gap-2">
              <Compass className="w-4 h-4" aria-hidden="true" />
              Browse 2026 Festivals
            </Link>
          </motion.div>
        ) : (
          /* ── Plan list ── */
          <div className="space-y-3">
            {planned.map((item, i) => {
              const cfg = statusConfig[item.status];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass-card p-4 sm:p-5 border-border/40 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/festivals/${item.id}`}
                      className="font-display text-sm font-bold text-foreground hover:text-tr-cyan transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-muted-foreground/60 text-xs mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={cfg.classes}>
                      <Icon className="w-3 h-3" aria-hidden="true" />
                      {cfg.label}
                    </span>

                    {item.status === "going" && (
                      <button
                        type="button"
                        onClick={() => setStay22Open(true)}
                        className="hidden sm:inline-flex items-center gap-1 text-[0.6rem] font-display uppercase tracking-wider px-2 py-1 rounded border border-tr-green/30 bg-tr-green/10 text-tr-green hover:bg-tr-green/20 transition-colors"
                        aria-label={`Book accommodation near ${item.name}`}
                      >
                        <Hotel className="w-3 h-3" aria-hidden="true" />
                        Book Stay
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setTicketStatus(item.id, "none")}
                      className="text-muted-foreground/40 hover:text-tr-red transition-colors p-1 rounded"
                      aria-label={`Remove ${item.name} from plans`}
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            <div className="pt-4 text-center">
              <Link
                to="/festivals"
                className="inline-flex items-center gap-2 text-tr-cyan text-[0.65rem] font-display uppercase tracking-wider hover:text-tr-cyan/80 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                Add more festivals →
              </Link>
            </div>
          </div>
        )}
      </div>
      <Stay22Modal open={stay22Open} onClose={() => setStay22Open(false)} />
    </div>
  );
}
