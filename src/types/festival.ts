// TRAVEL RAVERS: Festival domain types — used across store, mock data, and UI
export type TicketStatus = "going" | "maybe" | "none";

export interface Festival {
  id: string;
  name: string;
  location: string;
  country: string;
  startDate: string; // ISO "2026-08-20"
  endDate: string;   // ISO "2026-08-24"
  trackName: string; // genre/vibe label
  ticketStatus: TicketStatus;
  isFeatured: boolean;
  heroImageUrl: string;
}
