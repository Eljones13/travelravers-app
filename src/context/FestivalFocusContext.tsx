// TRAVEL RAVERS: Festival Focus — personalisation context
// Stores the user's currently focused festival in localStorage.
// Separate from FestivalStoreContext (ticket statuses) — this is about
// which festival the user is actively planning, driving banner + content filtering.
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { festivals } from "@/data/content";
import { getCsvFestivalBySlug } from "@/data/csvFestivals";

const STORAGE_KEY = "tr_focus_festival";

// Minimal festival metadata needed for personalisation across the site
export interface FestivalMeta {
  slug: string;
  name: string;
  country: string;
  /** From rich (content.ts) festivals */
  festivalType?: "camping" | "city" | "beach";
  /** From CSV festivals — 1 = high mud risk */
  mudrisk?: 0 | 1;
  /** From CSV festivals — 1 = high heat risk */
  heatrisk?: 0 | 1;
  /** From CSV festivals — whether camping is offered */
  isCamping?: boolean;
}

interface FestivalFocusContextValue {
  selectedSlug: string | null;
  selectedMeta: FestivalMeta | null;
  setFocus: (slug: string) => void;
  clearFocus: () => void;
}

// ── Resolvers ─────────────────────────────────────────────────────────────────

function resolveMeta(slug: string): FestivalMeta | null {
  // 1. Try rich content.ts festivals first
  const rich = festivals.find((f) => f.slug === slug);
  if (rich) {
    return {
      slug: rich.slug,
      name: rich.name,
      country: rich.country,
      festivalType: rich.type,
    };
  }
  // 2. Fall back to CSV festivals
  const csv = getCsvFestivalBySlug(slug);
  if (csv) {
    return {
      slug: csv.slug,
      name: csv.festivalName,
      country: csv.country,
      mudrisk: csv.mudrisk,
      heatrisk: csv.heatrisk,
      isCamping: csv.camping,
    };
  }
  return null;
}

function loadSlugFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const FestivalFocusContext = createContext<FestivalFocusContextValue | null>(null);

export function FestivalFocusProvider({ children }: { children: ReactNode }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    const stored = loadSlugFromStorage();
    // Validate stored slug is still resolvable — discard stale/invalid entries
    if (stored && resolveMeta(stored)) return stored;
    return null;
  });

  const selectedMeta: FestivalMeta | null = selectedSlug ? resolveMeta(selectedSlug) : null;

  const setFocus = useCallback((slug: string) => {
    setSelectedSlug(slug);
    try {
      localStorage.setItem(STORAGE_KEY, slug);
    } catch {
      // localStorage unavailable (private mode / storage full)
    }
  }, []);

  const clearFocus = useCallback(() => {
    setSelectedSlug(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <FestivalFocusContext.Provider value={{ selectedSlug, selectedMeta, setFocus, clearFocus }}>
      {children}
    </FestivalFocusContext.Provider>
  );
}

export function useFestivalFocus(): FestivalFocusContextValue {
  const ctx = useContext(FestivalFocusContext);
  if (!ctx) throw new Error("useFestivalFocus must be used within FestivalFocusProvider");
  return ctx;
}
