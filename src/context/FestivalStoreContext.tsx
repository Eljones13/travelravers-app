// TRAVEL RAVERS: Festival Store — React Context adaptation of Zustand store spec
// Stores ticket/attendance status per festival slug, persisted to localStorage
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { TicketStatus } from "@/types/festival";

const STORAGE_KEY = "tr_ticket_statuses";

function loadFromStorage(): Record<string, TicketStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, TicketStatus>) : {};
  } catch {
    return {};
  }
}

interface FestivalStoreContextValue {
  ticketStatuses: Record<string, TicketStatus>;
  setTicketStatus: (id: string, status: TicketStatus) => void;
  getTicketStatus: (id: string) => TicketStatus;
}

const FestivalStoreContext = createContext<FestivalStoreContextValue | null>(null);

export function FestivalStoreProvider({ children }: { children: ReactNode }) {
  const [ticketStatuses, setTicketStatuses] = useState<Record<string, TicketStatus>>(loadFromStorage);

  const setTicketStatus = useCallback((id: string, status: TicketStatus) => {
    setTicketStatuses((prev) => {
      const next = { ...prev, [id]: status };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage may be unavailable (private mode / storage full)
      }
      return next;
    });
  }, []);

  const getTicketStatus = useCallback(
    (id: string): TicketStatus => ticketStatuses[id] ?? "none",
    [ticketStatuses],
  );

  return (
    <FestivalStoreContext.Provider value={{ ticketStatuses, setTicketStatus, getTicketStatus }}>
      {children}
    </FestivalStoreContext.Provider>
  );
}

export function useFestivalStore(): FestivalStoreContextValue {
  const ctx = useContext(FestivalStoreContext);
  if (!ctx) throw new Error("useFestivalStore must be used within FestivalStoreProvider");
  return ctx;
}
