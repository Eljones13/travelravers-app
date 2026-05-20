// TRAVEL RAVERS: Mock festival data — used for featured strip + My Weekends
// These are canonical UI-layer records; the full data lives in csvFestivals.ts / content.ts
import type { Festival } from "@/types/festival";
import imgCreamfields from "@/assets/festival-creamfields.jpg";
import imgTomorrowland from "@/assets/festival-tomorrowland.jpg";
import imgCamping from "@/assets/festival-camping.jpg";
import imgHero from "@/assets/hero-festival.jpg";
import imgUltra from "@/assets/festival-ultra.jpg";

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
    heroImageUrl: imgCreamfields,
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
    heroImageUrl: imgTomorrowland,
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
    heroImageUrl: imgCamping,
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
    heroImageUrl: imgHero,
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
    heroImageUrl: imgCamping,
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
    heroImageUrl: imgUltra,
  },
];

/** Lookup a mock festival by its id */
export function getMockFestivalById(id: string): Festival | undefined {
  return mockFestivals.find((f) => f.id === id);
}
