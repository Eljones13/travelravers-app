#!/usr/bin/env vite-node
/**
 * scripts/generate-festival-brain-ts.ts
 *
 * Reads output/festival_brain_master.csv and emits src/data/festivalBrain.ts
 * as a fully-typed, self-contained TypeScript module.
 *
 * Run:  node_modules/.bin/vite-node scripts/generate-festival-brain-ts.ts
 * Re-run whenever festival_brain_master.csv is regenerated.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "output", "festival_brain_master.csv");
const OUT_PATH = path.join(ROOT, "src", "data", "festivalBrain.ts");

// ── CSV parser ─────────────────────────────────────────────────────────────────

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (ch === "," && !inQ) {
      out.push(cur); cur = "";
    } else { cur += ch; }
  }
  out.push(cur);
  return out;
}

function parseCsv(raw: string): Record<string, string>[] {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  const headers = splitCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = (vals[i] ?? "").trim(); });
    return row;
  });
}

// ── Field coercion ─────────────────────────────────────────────────────────────

function toNum(s: string): number | null {
  if (!s || s === "") return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function toBool(s: string): boolean {
  return s.trim().toLowerCase() === "true";
}

function toStr(s: string): string {
  return s ?? "";
}

// ── Escape a TS string literal ─────────────────────────────────────────────────

function q(s: string): string {
  return "`" + s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${") + "`";
}

// ── Fields to strip (audit columns, not data) ─────────────────────────────────

const STRIP_FIELDS = new Set([
  "mergeConfidence_image",
  "mergeConfidence_headliners",
  "mergeConfidence_skiddle",
  "mergeConfidence_youtube",
  "mergeNotes",
]);

// ── Main ───────────────────────────────────────────────────────────────────────

function main() {
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const rows = parseCsv(raw);

  const lines: string[] = [];

  lines.push(`// AUTO-GENERATED — do not edit manually.`);
  lines.push(`// Re-generate: node_modules/.bin/vite-node scripts/generate-festival-brain-ts.ts`);
  lines.push(`// Source: output/festival_brain_master.csv`);
  lines.push(`// Generated: ${new Date().toISOString()}`);
  lines.push(``);
  lines.push(`// ─── FestivalBrain type ─────────────────────────────────────────────────────`);
  lines.push(``);
  lines.push(`export interface FestivalBrain {`);
  lines.push(`  /** Canonical display name */`);
  lines.push(`  canonicalName: string;`);
  lines.push(`  /** URL slug — primary lookup key */`);
  lines.push(`  slug: string;`);
  lines.push(`  /** Pipe-separated list of known name variants */`);
  lines.push(`  aliases: string;`);
  lines.push(`  city: string;`);
  lines.push(`  country: string;`);
  lines.push(`  /** ISO 8601 YYYY-MM-DD */`);
  lines.push(`  startDate: string;`);
  lines.push(`  /** ISO 8601 YYYY-MM-DD */`);
  lines.push(`  endDate: string;`);
  lines.push(`  latitude: number | null;`);
  lines.push(`  longitude: number | null;`);
  lines.push(`  /** Genre string e.g. "Techno / House" */`);
  lines.push(`  vibe: string;`);
  lines.push(`  camping: boolean;`);
  lines.push(`  expectedAttendance: number | null;`);
  lines.push(`  primaryLanguage: string;`);
  lines.push(`  // ── Survival script fields (populated from base file when available) ──────`);
  lines.push(`  medicalDoctorLocal: string;`);
  lines.push(`  medicalAllergyLocal: string;`);
  lines.push(`  legalFreeToGoLocal: string;`);
  lines.push(`  legalCallEmbassyLocal: string;`);
  lines.push(`  scriptLostSquad: string;`);
  lines.push(`  scriptSubstance: string;`);
  lines.push(`  scriptMedicalTent: string;`);
  lines.push(`  scriptCharging: string;`);
  lines.push(`  // ── Media ──────────────────────────────────────────────────────────────────`);
  lines.push(`  imageUrl: string;`);
  lines.push(`  imageSource: string;`);
  lines.push(`  imageLicence: string;`);
  lines.push(`  // ── Lineup ─────────────────────────────────────────────────────────────────`);
  lines.push(`  /** Comma-separated headliner names, or "TBA" */`);
  lines.push(`  headliners: string;`);
  lines.push(`  lineupSourceUrl: string;`);
  lines.push(`  // ── Ticket URLs ─────────────────────────────────────────────────────────────`);
  lines.push(`  /** Primary CTA — direct festival or third-party ticket URL (not Skiddle) */`);
  lines.push(`  ticketUrlOfficial: string;`);
  lines.push(`  /** Skiddle affiliate URL (includes ?sktag=15628) */`);
  lines.push(`  ticketUrlSkiddle: string;`);
  lines.push(`  /** YouTube video ID for the hero embed */`);
  lines.push(`  youtubeVideoId: string;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`// ─── Data ───────────────────────────────────────────────────────────────────`);
  lines.push(``);
  lines.push(`export const festivalBrain: FestivalBrain[] = [`);

  for (const row of rows) {
    // Skip blank rows
    if (!row.slug) continue;

    lines.push(`  {`);
    lines.push(`    canonicalName: ${q(toStr(row.canonicalName))},`);
    lines.push(`    slug: ${q(toStr(row.slug))},`);
    lines.push(`    aliases: ${q(toStr(row.aliases))},`);
    lines.push(`    city: ${q(toStr(row.city))},`);
    lines.push(`    country: ${q(toStr(row.country))},`);
    lines.push(`    startDate: ${q(toStr(row.startDate))},`);
    lines.push(`    endDate: ${q(toStr(row.endDate))},`);
    lines.push(`    latitude: ${toNum(row.latitude) ?? "null"},`);
    lines.push(`    longitude: ${toNum(row.longitude) ?? "null"},`);
    lines.push(`    vibe: ${q(toStr(row.vibe))},`);
    lines.push(`    camping: ${toBool(row.camping)},`);
    lines.push(`    expectedAttendance: ${toNum(row.expectedAttendance) ?? "null"},`);
    lines.push(`    primaryLanguage: ${q(toStr(row.primaryLanguage))},`);
    lines.push(`    medicalDoctorLocal: ${q(toStr(row.medicalDoctorLocal))},`);
    lines.push(`    medicalAllergyLocal: ${q(toStr(row.medicalAllergyLocal))},`);
    lines.push(`    legalFreeToGoLocal: ${q(toStr(row.legalFreeToGoLocal))},`);
    lines.push(`    legalCallEmbassyLocal: ${q(toStr(row.legalCallEmbassyLocal))},`);
    lines.push(`    scriptLostSquad: ${q(toStr(row.scriptLostSquad))},`);
    lines.push(`    scriptSubstance: ${q(toStr(row.scriptSubstance))},`);
    lines.push(`    scriptMedicalTent: ${q(toStr(row.scriptMedicalTent))},`);
    lines.push(`    scriptCharging: ${q(toStr(row.scriptCharging))},`);
    lines.push(`    imageUrl: ${q(toStr(row.imageUrl))},`);
    lines.push(`    imageSource: ${q(toStr(row.imageSource))},`);
    lines.push(`    imageLicence: ${q(toStr(row.imageLicence))},`);
    lines.push(`    headliners: ${q(toStr(row.headliners))},`);
    lines.push(`    lineupSourceUrl: ${q(toStr(row.lineupSourceUrl))},`);
    lines.push(`    ticketUrlOfficial: ${q(toStr(row.ticketUrlOfficial))},`);
    lines.push(`    ticketUrlSkiddle: ${q(toStr(row.ticketUrlSkiddle))},`);
    lines.push(`    youtubeVideoId: ${q(toStr(row.youtubeVideoId))},`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`// ─── Lookup helpers ──────────────────────────────────────────────────────────`);
  lines.push(``);
  lines.push(`/** Look up a festival by its canonical slug. Returns undefined if not in Festival Brain. */`);
  lines.push(`export function getFestivalBySlug(slug: string): FestivalBrain | undefined {`);
  lines.push(`  return festivalBrain.find((f) => f.slug === slug);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Look up by slug OR any alias. Aliases are pipe-separated strings in the data.`);
  lines.push(` * Use this when resolving external/legacy slugs that may differ from canonical.`);
  lines.push(` */`);
  lines.push(`export function getFestivalBySlugOrAlias(slug: string): FestivalBrain | undefined {`);
  lines.push(`  return festivalBrain.find(`);
  lines.push(`    (f) =>`);
  lines.push(`      f.slug === slug ||`);
  lines.push(`      f.aliases.split(" | ").some((a) => a.trim().toLowerCase() === slug.toLowerCase())`);
  lines.push(`  );`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/** True if the festival has at least one purchasable ticket URL. */`);
  lines.push(`export function hasTicketUrl(f: FestivalBrain): boolean {`);
  lines.push(`  return !!(f.ticketUrlOfficial || f.ticketUrlSkiddle);`);
  lines.push(`}`);
  lines.push(``);

  const output = lines.join("\n");
  fs.writeFileSync(OUT_PATH, output, "utf-8");

  const slugs = rows.filter((r) => r.slug).map((r) => r.slug);
  console.log(`\n✅ festivalBrain.ts generated`);
  console.log(`   ${slugs.length} festivals`);
  console.log(`   → ${OUT_PATH}\n`);
}

main();
