// TRAVEL RAVERS: Mock festival data — used for featured strip + My Weekends
// These are canonical UI-layer records; the full data lives in csvFestivals.ts / content.ts
import type { Festival } from "@/types/festival";

export const mockFestivals: Festival[] = [
  {
    id: "creamfields",
    name: "Creamfields",
    location: "Daresbury, Cheshire",
    country: "UK",
    startDate: "2026-08-20",
    endDate: "2026-08-24",
    trackName: "Techno / House",
    ticketStatus: "none",
    isFeatured: true,
    heroImageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  },
  {
    id: "tomorrowland",
    name: "Tomorrowland",
    location: "Boom, Belgium",
    country: "Belgium",
    startDate: "2026-07-17",
    endDate: "2026-07-26",
    trackName: "EDM / Progressive House",
    ticketStatus: "none",
    isFeatured: true,
    heroImageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop",
  },
  {
    id: "defected-croatia",
    name: "Defected Croatia",
    location: "Tisno, Croatia",
    country: "Croatia",
    startDate: "2026-07-06",
    endDate: "2026-07-11",
    trackName: "House",
    ticketStatus: "none",
    isFeatured: true,
    heroImageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop",
  },
  {
    id: "glastonbury",
    name: "Glastonbury",
    location: "Pilton, Somerset",
    country: "UK",
    startDate: "2026-06-24",
    endDate: "2026-06-28",
    trackName: "Multi-genre",
    ticketStatus: "none",
    isFeatured: true,
    heroImageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
  },
  {
    id: "love-international-2026",
    name: "Love International",
    location: "Tisno, Croatia",
    country: "Croatia",
    startDate: "2026-07-08",
    endDate: "2026-07-15",
    trackName: "House / Techno",
    ticketStatus: "none",
    isFeatured: false,
    heroImageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
  },
  {
    id: "sea-dance-festival-2026",
    name: "Sea Dance Festival",
    location: "Buljarica Beach, Montenegro",
    country: "Montenegro",
    startDate: "2026-08-27",
    endDate: "2026-08-30",
    trackName: "Electronic / Dance",
    ticketStatus: "none",
    isFeatured: false,
    heroImageUrl:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&auto=format&fit=crop",
  },
];

/** Lookup a mock festival by its id */
export function getMockFestivalById(id: string): Festival | undefined {
  return mockFestivals.find((f) => f.id === id);
}
