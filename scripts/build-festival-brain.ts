#!/usr/bin/env tsx
/**
 * scripts/build-festival-brain.ts
 *
 * Builds the Festival Brain master dataset by merging:
 *   BASE  → src/data/csvFestivals.ts  (substitute for missing festivals.csv-Sheet1-2.csv)
 *   +     → travel_ravers_festivals.csv  (imageLicence, headliners, lineup, officialTicketUrl)
 *   +     → travel_ravers_skiddle.csv   (skiddleTicketUrl)
 *   +     → travel_ravers_youtube.csv   (youtubeVideoId)
 *
 * Outputs:
 *   output/festival_brain_master.csv
 *   output/festival_brain_review_needed.csv
 *   output/festival_brain_alias_map.csv
 *   output/festival_brain_merge_report.md
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { csvFestivals } from "../src/data/csvFestivals.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "src", "data");
const OUTPUT = path.join(ROOT, "output");

// ─── CSV parser ────────────────────────────────────────────────────────────────

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (ch === "," && !inQ) {
      result.push(cur); cur = "";
    } else { cur += ch; }
  }
  result.push(cur);
  return result;
}

function parseCsv(filePath: string): Record<string, string>[] {
  const text = fs.readFileSync(filePath, "utf-8");
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = splitCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = (vals[i] ?? "").trim(); });
    return row;
  });
}

// ─── Slug helpers ──────────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Manual alias map ──────────────────────────────────────────────────────────
// Maps variant festival names (as they appear in enrichment CSVs) → canonical slug

const ALIAS_MAP: Record<string, string> = {
  // Accented / alternate spelling
  "Sónar":                    "sonar-barcelona",
  "Sonar":                    "sonar-barcelona",
  // Naming variants
  "Ultra Miami":              "ultra-miami",
  "Ultra Music Festival":     "ultra-miami",
  "EXIT Festival":            "exit-festival",
  "Exit Festival":            "exit-festival",
  "Hideout":                  "hideout-festival",
  "Hideout Festival":         "hideout-festival",
  "Glastonbury":              "glastonbury",
  "Glastonbury (Fallow Year)": "glastonbury",
  "Hospitality in the Park":  "hospitality-in-park",
  "Hospitality In The Park":  "hospitality-in-park",
  "Hospitality In Park":      "hospitality-in-park",
  "Kappa FuturFestival":      "kappa-futurefestival",
  "Kappa Futur Festival":     "kappa-futurefestival",
  "Defqon.1":                 "defqon-1",
  "Defqon 1":                 "defqon-1",
  "Lost & Found":             "lost-and-found",
  "Lost and Found":           "lost-and-found",
  "Green Man":                "green-man",
  "Sea Star":                 "sea-star-festival",
  "Sea Dance":                "sea-dance-festival",
  "SW4":                      "sw4",
  "South West Four":          "sw4",
  "We Are FSTVL":             "we-are-fstvl",
  "Sonus Festival":           "sonus-croatia",
  "Sonus":                    "sonus-croatia",
};

type MatchConfidence = "exact-slug" | "exact-name" | "alias" | "derived" | "unmatched";

function resolveSlug(name: string): {
  slug: string;
  confidence: MatchConfidence;
  note: string;
} {
  // 1. Direct alias map lookup
  if (ALIAS_MAP[name]) {
    return { slug: ALIAS_MAP[name], confidence: "alias", note: `Alias map: "${name}" → "${ALIAS_MAP[name]}"` };
  }
  // 2. Case-insensitive name match against base
  const nameMatch = csvFestivals.find(
    (f) => f.festivalName.toLowerCase() === name.toLowerCase()
  );
  if (nameMatch) {
    return { slug: nameMatch.slug, confidence: "exact-name", note: "Exact name match (case-insensitive)" };
  }
  // 3. Derived slug match
  const derived = toSlug(name);
  const slugMatch = csvFestivals.find((f) => f.slug === derived);
  if (slugMatch) {
    return { slug: derived, confidence: "derived", note: "Slug derivation match" };
  }
  // 4. Unmatched
  return { slug: derived, confidence: "unmatched", note: `No base record found for "${name}"` };
}

// ─── CSV writer ────────────────────────────────────────────────────────────────

function esc(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function writeCsv(
  filePath: string,
  headers: string[],
  rows: Record<string, unknown>[]
): void {
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ];
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
  console.log(`  → wrote ${rows.length} rows to ${path.basename(filePath)}`);
}

// ─── Primary language lookup (country → language) ─────────────────────────────

const LANG_MAP: Record<string, string> = {
  "UK": "English", "Belgium": "French/Dutch/German", "USA": "English",
  "Germany": "German", "Netherlands": "Dutch", "France": "French",
  "Spain": "Spanish/Catalan", "Croatia": "Croatian", "Hungary": "Hungarian",
  "Romania": "Romanian", "Serbia": "Serbian", "Italy": "Italian",
  "Denmark": "Danish", "Montenegro": "Montenegrin", "Malta": "Maltese/English",
  "Portugal": "Portuguese", "Austria": "German", "Sweden": "Swedish",
  "Poland": "Polish", "Czech Republic": "Czech",
};

// ─── Main ──────────────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

  // Load enrichment CSVs
  const festivalsCSV = parseCsv(path.join(DATA, "travel_ravers_festivals.csv"));
  const skiddleCSV = parseCsv(path.join(DATA, "travel_ravers_skiddle.csv"));
  const youtubeCSV = parseCsv(path.join(DATA, "travel_ravers_youtube.csv"));

  // Build slug-keyed lookup maps
  type EnrichRow = Record<string, string> & { _confidence: MatchConfidence; _note: string; _csvName: string };

  function buildMap(rows: Record<string, string>[], nameField: string): Record<string, EnrichRow> {
    const map: Record<string, EnrichRow> = {};
    for (const row of rows) {
      const name = row[nameField] ?? "";
      const { slug, confidence, note } = resolveSlug(name);
      if (!map[slug] || confidence === "exact-slug" || confidence === "exact-name") {
        map[slug] = { ...row, _confidence: confidence, _note: note, _csvName: name };
      }
    }
    return map;
  }

  const festivalsMap = buildMap(festivalsCSV, "festivalName");
  const skiddleMap = buildMap(skiddleCSV, "festivalName");
  const youtubeMap = buildMap(youtubeCSV, "festivalName");

  // ── Master schema ────────────────────────────────────────────────────────────

  const MASTER_HEADERS = [
    "canonicalName", "slug", "aliases",
    "city", "country", "startDate", "endDate",
    "latitude", "longitude",
    "vibe", "camping", "expectedAttendance", "primaryLanguage",
    "medicalDoctorLocal", "medicalAllergyLocal",
    "legalFreeToGoLocal", "legalCallEmbassyLocal",
    "scriptLostSquad", "scriptSubstance", "scriptMedicalTent", "scriptCharging",
    "imageUrl", "imageSource", "imageLicence",
    "headliners", "lineupSourceUrl",
    "ticketUrlOfficial", "ticketUrlSkiddle",
    "youtubeVideoId",
    "mergeConfidence_image", "mergeConfidence_headliners",
    "mergeConfidence_skiddle", "mergeConfidence_youtube",
    "mergeNotes",
  ];

  const masterRows: Record<string, unknown>[] = [];
  const reviewRows: Record<string, unknown>[] = [];

  const unmatchedFestivals: string[] = [];
  const unmatchedSkiddle: string[] = [];
  const unmatchedYoutube: string[] = [];

  // Track which enrichment rows were actually consumed
  const consumedFestivals = new Set<string>();
  const consumedSkiddle = new Set<string>();
  const consumedYoutube = new Set<string>();

  for (const festival of csvFestivals) {
    const { slug, festivalName } = festival;

    const fest = festivalsMap[slug];
    const skiddle = skiddleMap[slug];
    const youtube = youtubeMap[slug];

    if (fest) consumedFestivals.add(slug);
    if (skiddle) consumedSkiddle.add(slug);
    if (youtube) consumedYoutube.add(slug);

    // ── Field resolution ─────────────────────────────────────────────────────

    // Image: travel_ravers_festivals.csv wins, fallback to base
    const imageUrl = fest?.imageUrl || festival.imageUrl || "";
    const imageSource = fest?.imageSource || festival.imageSource || "";
    const imageLicence = fest?.imageLicence || "";

    // Headliners: travel_ravers_festivals.csv wins
    const headliners = fest?.headliners || festival.headliners || "";

    // Lineup source: travel_ravers_festivals.csv wins
    const lineupSourceUrl = fest?.lineupSourceUrl || festival.lineupSourceUrl || "";

    // Official ticket URL: travel_ravers_festivals.csv wins.
    // Exclude Skiddle URLs from this field — move them to skiddleTicketUrl.
    let rawTicket = fest?.ticketUrl || festival.ticketUrl || "";
    let ticketUrlOfficial = rawTicket;
    let skiddleFromTicket = "";
    if (rawTicket.includes("skiddle.com")) {
      skiddleFromTicket = rawTicket;
      ticketUrlOfficial = "";
    }

    // Skiddle URL: travel_ravers_skiddle.csv wins, fallback to base SKIDDLE_MAP or ticket field
    const rawSkiddle = skiddle?.skiddleTicketUrl || festival.skiddleTicketUrl || skiddleFromTicket;
    const ticketUrlSkiddle = rawSkiddle === "NO_SKIDDLE" ? "" : rawSkiddle;

    // YouTube: travel_ravers_youtube.csv wins, fallback to base
    const rawYt = youtube?.youtubeVideoId || festival.youtubeVideoId || "";
    const youtubeVideoId = rawYt === "NO_VIDEO" ? "" : rawYt;

    // ── Merge confidence ──────────────────────────────────────────────────────

    const confImage = fest
      ? fest._confidence
      : festival.imageUrl ? "base-only" : "missing";

    const confHeadliners = fest
      ? fest._confidence
      : festival.headliners && festival.headliners !== "TBA" ? "base-only" : "missing";

    const confSkiddle = skiddle
      ? skiddle._confidence
      : ticketUrlSkiddle ? "base-only" : "no-skiddle";

    const confYoutube = youtube
      ? youtube._confidence
      : youtubeVideoId ? "base-only" : "missing";

    // ── Merge notes ───────────────────────────────────────────────────────────

    const notes: string[] = [];
    if (!fest) notes.push("Not in travel_ravers_festivals.csv");
    if (!skiddle) notes.push("Not in travel_ravers_skiddle.csv");
    if (!youtube) notes.push("Not in travel_ravers_youtube.csv");
    if (skiddleFromTicket) notes.push("Skiddle URL moved from ticketUrl → ticketUrlSkiddle");
    if (!imageLicence && imageSource === "Unsplash") notes.push("imageLicence not in base; Unsplash default is CC0");

    // ── Aliases (reverse lookup) ──────────────────────────────────────────────

    const aliases = Object.entries(ALIAS_MAP)
      .filter(([, s]) => s === slug)
      .map(([name]) => name)
      .join(" | ");

    // ── Review flag ───────────────────────────────────────────────────────────

    if (!fest) {
      reviewRows.push({
        canonicalName: festivalName,
        slug,
        issue: "No match in travel_ravers_festivals.csv — imageUrl, headliners, imageLicence, ticketUrlOfficial may be stale",
        field: "imageUrl, imageLicence, headliners, lineupSourceUrl, ticketUrlOfficial",
        csvSource: "travel_ravers_festivals.csv",
        csvName: "",
        matchNote: "Festival exists in base but was not added to festivals CSV",
      });
    }

    masterRows.push({
      canonicalName: festivalName,
      slug,
      aliases,
      city: (festival.location ?? "").split(",")[0].trim(),
      country: festival.country,
      startDate: festival.startDate,
      endDate: festival.endDate,
      latitude: festival.lat,
      longitude: festival.lng,
      vibe: festival.genre,
      camping: festival.camping ? "true" : "false",
      expectedAttendance: festival.capacity ?? "",
      primaryLanguage: LANG_MAP[festival.country] ?? "",
      medicalDoctorLocal: "",
      medicalAllergyLocal: "",
      legalFreeToGoLocal: "",
      legalCallEmbassyLocal: "",
      scriptLostSquad: "",
      scriptSubstance: "",
      scriptMedicalTent: "",
      scriptCharging: "",
      imageUrl,
      imageSource,
      imageLicence,
      headliners,
      lineupSourceUrl,
      ticketUrlOfficial,
      ticketUrlSkiddle,
      youtubeVideoId,
      mergeConfidence_image: confImage,
      mergeConfidence_headliners: confHeadliners,
      mergeConfidence_skiddle: confSkiddle,
      mergeConfidence_youtube: confYoutube,
      mergeNotes: notes.join("; "),
    });
  }

  // ── Find enrichment rows that never matched a base record ──────────────────

  for (const row of festivalsCSV) {
    const { slug, confidence, note } = resolveSlug(row.festivalName);
    if (!consumedFestivals.has(slug)) {
      unmatchedFestivals.push(row.festivalName);
      reviewRows.push({
        canonicalName: "",
        slug,
        issue: "Enrichment row in travel_ravers_festivals.csv has no base match",
        field: "all",
        csvSource: "travel_ravers_festivals.csv",
        csvName: row.festivalName,
        matchNote: `${confidence}: ${note}`,
      });
    }
  }
  for (const row of skiddleCSV) {
    const { slug, confidence, note } = resolveSlug(row.festivalName);
    if (!consumedSkiddle.has(slug) && row.skiddleTicketUrl !== "NO_SKIDDLE") {
      unmatchedSkiddle.push(row.festivalName);
      reviewRows.push({
        canonicalName: "",
        slug,
        issue: "Enrichment row in travel_ravers_skiddle.csv has no base match",
        field: "skiddleTicketUrl",
        csvSource: "travel_ravers_skiddle.csv",
        csvName: row.festivalName,
        matchNote: `${confidence}: ${note}`,
      });
    }
  }
  for (const row of youtubeCSV) {
    const { slug, confidence, note } = resolveSlug(row.festivalName);
    if (!consumedYoutube.has(slug) && row.youtubeVideoId !== "NO_VIDEO") {
      unmatchedYoutube.push(row.festivalName);
      reviewRows.push({
        canonicalName: "",
        slug,
        issue: "Enrichment row in travel_ravers_youtube.csv has no base match",
        field: "youtubeVideoId",
        csvSource: "travel_ravers_youtube.csv",
        csvName: row.festivalName,
        matchNote: `${confidence}: ${note}`,
      });
    }
  }

  // ── Duplicate detection ────────────────────────────────────────────────────

  const slugCount: Record<string, number> = {};
  for (const r of masterRows) { const s = r.slug as string; slugCount[s] = (slugCount[s] || 0) + 1; }
  const duplicateGroups = Object.entries(slugCount).filter(([, c]) => c > 1);
  for (const [dslug, count] of duplicateGroups) {
    reviewRows.push({
      canonicalName: masterRows.find((r) => r.slug === dslug)?.canonicalName ?? "",
      slug: dslug,
      issue: `Duplicate slug — ${count} records share this slug`,
      field: "slug",
      csvSource: "base",
      csvName: dslug,
      matchNote: "Manual review required to merge or remove duplicates",
    });
  }

  // ── Missing data analysis ──────────────────────────────────────────────────

  const missingTicket = masterRows.filter((r) => !r.ticketUrlOfficial && !r.ticketUrlSkiddle);
  const missingVideo = masterRows.filter((r) => !r.youtubeVideoId);
  const missingImage = masterRows.filter((r) => !r.imageUrl);
  const missingHeadliners = masterRows.filter((r) => !r.headliners || r.headliners === "TBA");

  // ── Alias map output ───────────────────────────────────────────────────────

  const aliasRows = Object.entries(ALIAS_MAP).map(([csvName, resolvedSlug]) => {
    const base = csvFestivals.find((f) => f.slug === resolvedSlug);
    return {
      csvName,
      resolvedSlug,
      canonicalName: base?.festivalName ?? "(no base record — external name variant)",
      confidence: base ? "resolved" : "external-only",
      note: base
        ? `Resolves to base record "${base.festivalName}"`
        : "Name variant used in enrichment CSVs but festival not in base dataset",
    };
  });

  // ── Write outputs ──────────────────────────────────────────────────────────

  writeCsv(path.join(OUTPUT, "festival_brain_master.csv"), MASTER_HEADERS, masterRows);
  writeCsv(path.join(OUTPUT, "festival_brain_review_needed.csv"),
    ["canonicalName", "slug", "issue", "field", "csvSource", "csvName", "matchNote"],
    reviewRows
  );
  writeCsv(path.join(OUTPUT, "festival_brain_alias_map.csv"),
    ["csvName", "resolvedSlug", "canonicalName", "confidence", "note"],
    aliasRows
  );

  // ── Merge report ───────────────────────────────────────────────────────────

  const report = `# Festival Brain — Merge Report
Generated: ${new Date().toISOString()}

## ⚠️ Base File Substitution
\`festivals.csv-Sheet1-2.csv\` was **not found** in the repository.

**Substituted with:** \`src/data/csvFestivals.ts\` (the compiled TypeScript equivalent,
built from the same three enrichment CSVs and containing all logistics fields).

The following schema columns are **unavailable** because they were only in the missing base file:
- \`primaryLanguage\` — inferred from country using a fallback lookup (may be imprecise)
- \`medicalDoctorLocal\`
- \`medicalAllergyLocal\`
- \`legalFreeToGoLocal\`
- \`legalCallEmbassyLocal\`
- \`scriptLostSquad\`
- \`scriptSubstance\`
- \`scriptMedicalTent\`
- \`scriptCharging\`

These 8 fields are present as empty columns in the master CSV, ready to be filled from the original base file once located.

---

## Source Files
| File | Status | Rows |
|------|--------|------|
| festivals.csv-Sheet1-2.csv | ❌ NOT FOUND | — |
| src/data/csvFestivals.ts | ✅ Used as base substitute | ${csvFestivals.length} |
| travel_ravers_festivals.csv | ✅ | ${festivalsCSV.length} |
| travel_ravers_skiddle.csv | ✅ | ${skiddleCSV.length} |
| travel_ravers_youtube.csv | ✅ | ${youtubeCSV.length} |

---

## Merge Summary
| Metric | Count |
|--------|-------|
| Total festivals in base (csvFestivals.ts) | ${csvFestivals.length} |
| Master records built | ${masterRows.length} |
| Enriched from travel_ravers_festivals.csv | ${consumedFestivals.size} |
| Enriched from travel_ravers_skiddle.csv | ${consumedSkiddle.size} |
| Enriched from travel_ravers_youtube.csv | ${consumedYoutube.size} |
| Festivals only in base (no enrichment match) | ${csvFestivals.length - consumedFestivals.size} |
| Review rows flagged | ${reviewRows.length} |

---

## Unmatched Enrichment Rows

### travel_ravers_festivals.csv rows not matched to any base record (${unmatchedFestivals.length})
${unmatchedFestivals.length === 0 ? "_None — all rows matched._" : unmatchedFestivals.map((n) => `- \`${n}\``).join("\n")}

### travel_ravers_skiddle.csv rows not matched (${unmatchedSkiddle.length})
${unmatchedSkiddle.length === 0 ? "_None — all rows matched._" : unmatchedSkiddle.map((n) => `- \`${n}\``).join("\n")}

### travel_ravers_youtube.csv rows not matched (${unmatchedYoutube.length})
${unmatchedYoutube.length === 0 ? "_None — all rows matched._" : unmatchedYoutube.map((n) => `- \`${n}\``).join("\n")}

---

## Duplicate Groups Found
${duplicateGroups.length === 0
  ? "_No duplicate slugs detected._"
  : duplicateGroups.map(([s, c]) => `- \`${s}\`: ${c} records — manual resolution required`).join("\n")}

---

## Missing Data

### No ticket URL at all — official OR Skiddle (${missingTicket.length} festivals)
${missingTicket.map((r) => `- ${r.canonicalName} (\`${r.slug}\`)`).join("\n") || "_None_"}

### Missing YouTube video ID (${missingVideo.length} festivals)
${missingVideo.map((r) => `- ${r.canonicalName} (\`${r.slug}\`)`).join("\n") || "_None_"}

### Missing image URL (${missingImage.length} festivals)
${missingImage.map((r) => `- ${r.canonicalName} (\`${r.slug}\`)`).join("\n") || "_None_"}

### Headliners TBA or missing (${missingHeadliners.length} festivals)
${missingHeadliners.map((r) => `- ${r.canonicalName} (\`${r.slug}\`)`).join("\n") || "_None_"}

---

## Merge Priority Rules Applied
1. **Base (csvFestivals.ts):** city, country, startDate, endDate, lat/lng, genre/vibe, camping, capacity
2. **travel_ravers_festivals.csv:** imageUrl, imageSource, imageLicence, headliners, lineupSourceUrl, ticketUrlOfficial
3. **travel_ravers_skiddle.csv:** ticketUrlSkiddle only
4. **travel_ravers_youtube.csv:** youtubeVideoId only
5. **Placeholder conversion:** \`NO_SKIDDLE\` → blank, \`NO_VIDEO\` → blank
6. **Skiddle URLs found in ticketUrlOfficial:** moved to ticketUrlSkiddle field automatically
7. **Uncertain matches:** placed in festival_brain_review_needed.csv rather than auto-merged

---

## Alias Map Applied (${Object.keys(ALIAS_MAP).length} entries)
See \`festival_brain_alias_map.csv\` for full alias resolution table.
`;

  fs.writeFileSync(path.join(OUTPUT, "festival_brain_merge_report.md"), report, "utf-8");

  // ── Console summary ────────────────────────────────────────────────────────

  console.log("\n✅ Festival Brain build complete\n");
  console.log("=" .repeat(52));
  console.log(`  Total festivals in base:           ${csvFestivals.length}`);
  console.log(`  Master records built:               ${masterRows.length}`);
  console.log(`  Enriched from festivals CSV:        ${consumedFestivals.size} / ${festivalsCSV.length}`);
  console.log(`  Enriched from skiddle CSV:          ${consumedSkiddle.size} / ${skiddleCSV.length}`);
  console.log(`  Enriched from youtube CSV:          ${consumedYoutube.size} / ${youtubeCSV.length}`);
  console.log(`  Base-only (no enrichment match):    ${csvFestivals.length - consumedFestivals.size}`);
  console.log(`  Review rows flagged:                ${reviewRows.length}`);
  console.log(`  Duplicate slug groups:              ${duplicateGroups.length}`);
  console.log("=" .repeat(52));
  console.log(`  Missing ticket URL (any):           ${missingTicket.length}`);
  console.log(`  Missing YouTube video:              ${missingVideo.length}`);
  console.log(`  Missing image URL:                  ${missingImage.length}`);
  console.log(`  Headliners TBA/missing:             ${missingHeadliners.length}`);
  console.log("=" .repeat(52));
  console.log("\n  Output files:");
  console.log("  → output/festival_brain_master.csv");
  console.log("  → output/festival_brain_review_needed.csv");
  console.log("  → output/festival_brain_alias_map.csv");
  console.log("  → output/festival_brain_merge_report.md\n");
}

main();
