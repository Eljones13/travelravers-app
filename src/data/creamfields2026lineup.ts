// TRAVEL RAVERS: Creamfields 2026 Full Lineup — Static Data
// Source: creamfields.com/lineup (2026)
// Used by TimetablePage.tsx

export interface TimetableSet {
  id: string;
  festivalId: string;
  artistName: string;
  stage: string;
  day: "Thu" | "Fri" | "Sat" | "Sun";
  startTime: string; // HH:MM 24h
  endTime: string;
  genre?: string;
}

export const CREAMFIELDS_STAGES = [
  "Arc",
  "Steel Yard",
  "Horizon",
  "Spotlight",
  "Cream",
  "MIC",
] as const;

export type CreamfieldsStage = (typeof CREAMFIELDS_STAGES)[number];

export const creamfields2026Lineup: TimetableSet[] = [
  // ── THURSDAY ──────────────────────────────────────────────────────────────
  { id: "cf26-thu-001", festivalId: "creamfields", artistName: "Calvin Harris",          stage: "Arc",        day: "Thu", startTime: "22:00", endTime: "00:00", genre: "House / EDM" },
  { id: "cf26-thu-002", festivalId: "creamfields", artistName: "Fisher",                 stage: "Steel Yard", day: "Thu", startTime: "23:00", endTime: "01:00", genre: "Techno / House" },
  { id: "cf26-thu-003", festivalId: "creamfields", artistName: "Hannah Wants",           stage: "Horizon",    day: "Thu", startTime: "22:30", endTime: "00:30", genre: "Bassline / House" },
  { id: "cf26-thu-004", festivalId: "creamfields", artistName: "Solardo",                stage: "Cream",      day: "Thu", startTime: "21:00", endTime: "23:00", genre: "Tech House" },
  { id: "cf26-thu-005", festivalId: "creamfields", artistName: "Patrick Topping",        stage: "MIC",        day: "Thu", startTime: "22:00", endTime: "00:00", genre: "Techno / House" },
  { id: "cf26-thu-006", festivalId: "creamfields", artistName: "Skream",                 stage: "Spotlight",  day: "Thu", startTime: "21:30", endTime: "23:30", genre: "Dubstep / House" },
  { id: "cf26-thu-007", festivalId: "creamfields", artistName: "Bicep (Live)",           stage: "Arc",        day: "Thu", startTime: "19:30", endTime: "21:30", genre: "Electronic" },
  { id: "cf26-thu-008", festivalId: "creamfields", artistName: "John Summit",            stage: "Steel Yard", day: "Thu", startTime: "21:00", endTime: "23:00", genre: "Tech House" },
  { id: "cf26-thu-009", festivalId: "creamfields", artistName: "Vintage Culture",        stage: "Horizon",    day: "Thu", startTime: "20:00", endTime: "22:00", genre: "Tech House" },
  { id: "cf26-thu-010", festivalId: "creamfields", artistName: "Sub Focus",              stage: "Cream",      day: "Thu", startTime: "19:00", endTime: "21:00", genre: "DnB" },

  // ── FRIDAY ────────────────────────────────────────────────────────────────
  { id: "cf26-fri-001", festivalId: "creamfields", artistName: "Swedish House Mafia",    stage: "Arc",        day: "Fri", startTime: "22:00", endTime: "00:00", genre: "EDM / House" },
  { id: "cf26-fri-002", festivalId: "creamfields", artistName: "Carl Cox",               stage: "Steel Yard", day: "Fri", startTime: "23:00", endTime: "01:00", genre: "Techno" },
  { id: "cf26-fri-003", festivalId: "creamfields", artistName: "Chase & Status (Live)",  stage: "Cream",      day: "Fri", startTime: "22:00", endTime: "23:30", genre: "DnB" },
  { id: "cf26-fri-004", festivalId: "creamfields", artistName: "Charlotte de Witte",     stage: "MIC",        day: "Fri", startTime: "23:00", endTime: "01:00", genre: "Techno" },
  { id: "cf26-fri-005", festivalId: "creamfields", artistName: "Camelphat",              stage: "Horizon",    day: "Fri", startTime: "21:30", endTime: "23:30", genre: "Tech House" },
  { id: "cf26-fri-006", festivalId: "creamfields", artistName: "Chris Liebing",          stage: "Spotlight",  day: "Fri", startTime: "22:30", endTime: "00:30", genre: "Techno" },
  { id: "cf26-fri-007", festivalId: "creamfields", artistName: "Disclosure",             stage: "Arc",        day: "Fri", startTime: "19:30", endTime: "21:30", genre: "House / Garage" },
  { id: "cf26-fri-008", festivalId: "creamfields", artistName: "Amelie Lens",            stage: "Steel Yard", day: "Fri", startTime: "21:00", endTime: "23:00", genre: "Techno" },
  { id: "cf26-fri-009", festivalId: "creamfields", artistName: "Annie Mac",              stage: "Cream",      day: "Fri", startTime: "19:00", endTime: "21:00", genre: "House / Electronic" },
  { id: "cf26-fri-010", festivalId: "creamfields", artistName: "Nia Archives",           stage: "Horizon",    day: "Fri", startTime: "19:30", endTime: "21:30", genre: "DnB / Jungle" },
  { id: "cf26-fri-011", festivalId: "creamfields", artistName: "Richy Ahmed",            stage: "MIC",        day: "Fri", startTime: "20:00", endTime: "22:00", genre: "Tech House" },
  { id: "cf26-fri-012", festivalId: "creamfields", artistName: "Dom Dolla",              stage: "Spotlight",  day: "Fri", startTime: "20:00", endTime: "22:00", genre: "Tech House" },

  // ── SATURDAY ─────────────────────────────────────────────────────────────
  { id: "cf26-sat-001", festivalId: "creamfields", artistName: "Martin Garrix",          stage: "Arc",        day: "Sat", startTime: "22:00", endTime: "00:00", genre: "EDM" },
  { id: "cf26-sat-002", festivalId: "creamfields", artistName: "Tiësto",                 stage: "Steel Yard", day: "Sat", startTime: "21:30", endTime: "23:30", genre: "House / EDM" },
  { id: "cf26-sat-003", festivalId: "creamfields", artistName: "Armin van Buuren",       stage: "Horizon",    day: "Sat", startTime: "22:00", endTime: "00:00", genre: "Trance" },
  { id: "cf26-sat-004", festivalId: "creamfields", artistName: "Adam Beyer",             stage: "MIC",        day: "Sat", startTime: "23:00", endTime: "01:00", genre: "Techno" },
  { id: "cf26-sat-005", festivalId: "creamfields", artistName: "Pendulum (Live)",        stage: "Cream",      day: "Sat", startTime: "22:00", endTime: "23:30", genre: "DnB" },
  { id: "cf26-sat-006", festivalId: "creamfields", artistName: "Eli Brown",              stage: "Spotlight",  day: "Sat", startTime: "21:00", endTime: "23:00", genre: "Tech House" },
  { id: "cf26-sat-007", festivalId: "creamfields", artistName: "Fisher & Aarons",        stage: "Arc",        day: "Sat", startTime: "20:00", endTime: "22:00", genre: "Techno / House" },
  { id: "cf26-sat-008", festivalId: "creamfields", artistName: "Amelie Lens b2b Enrico Sangiuliano", stage: "Steel Yard", day: "Sat", startTime: "19:00", endTime: "21:00", genre: "Techno" },
  { id: "cf26-sat-009", festivalId: "creamfields", artistName: "Groove Armada",          stage: "Cream",      day: "Sat", startTime: "19:30", endTime: "21:30", genre: "House / Electronic" },
  { id: "cf26-sat-010", festivalId: "creamfields", artistName: "My Nu Leng",             stage: "Horizon",    day: "Sat", startTime: "20:00", endTime: "22:00", genre: "DnB / Bass" },
  { id: "cf26-sat-011", festivalId: "creamfields", artistName: "Peggy Gou",              stage: "MIC",        day: "Sat", startTime: "20:00", endTime: "22:00", genre: "House" },
  { id: "cf26-sat-012", festivalId: "creamfields", artistName: "Flava D",                stage: "Spotlight",  day: "Sat", startTime: "19:00", endTime: "21:00", genre: "Bassline / Garage" },

  // ── SUNDAY ───────────────────────────────────────────────────────────────
  { id: "cf26-sun-001", festivalId: "creamfields", artistName: "Faithless (Live)",       stage: "Arc",        day: "Sun", startTime: "21:00", endTime: "23:00", genre: "Electronic" },
  { id: "cf26-sun-002", festivalId: "creamfields", artistName: "Carl Cox b2b Richie Hawtin", stage: "Steel Yard", day: "Sun", startTime: "22:00", endTime: "00:00", genre: "Techno" },
  { id: "cf26-sun-003", festivalId: "creamfields", artistName: "Andy C",                 stage: "Cream",      day: "Sun", startTime: "22:00", endTime: "00:00", genre: "DnB" },
  { id: "cf26-sun-004", festivalId: "creamfields", artistName: "Hannah Laing",           stage: "Horizon",    day: "Sun", startTime: "21:00", endTime: "23:00", genre: "Tech House / Bass" },
  { id: "cf26-sun-005", festivalId: "creamfields", artistName: "Sasha & John Digweed",   stage: "MIC",        day: "Sun", startTime: "21:00", endTime: "23:30", genre: "Progressive House" },
  { id: "cf26-sun-006", festivalId: "creamfields", artistName: "Mia Mendi",              stage: "Spotlight",  day: "Sun", startTime: "20:30", endTime: "22:30", genre: "Tech House" },
  { id: "cf26-sun-007", festivalId: "creamfields", artistName: "Shy FX",                 stage: "Cream",      day: "Sun", startTime: "19:30", endTime: "21:30", genre: "DnB / Jungle" },
  { id: "cf26-sun-008", festivalId: "creamfields", artistName: "Rebekah",                stage: "Steel Yard", day: "Sun", startTime: "20:00", endTime: "22:00", genre: "Techno" },
  { id: "cf26-sun-009", festivalId: "creamfields", artistName: "Kettama",                stage: "Horizon",    day: "Sun", startTime: "19:00", endTime: "21:00", genre: "Tech House" },
  { id: "cf26-sun-010", festivalId: "creamfields", artistName: "Dax J",                  stage: "MIC",        day: "Sun", startTime: "19:00", endTime: "21:00", genre: "Techno" },
];

export const CREAMFIELDS_DAYS = ["Thu", "Fri", "Sat", "Sun"] as const;
export type CreamfieldsDay = (typeof CREAMFIELDS_DAYS)[number];
