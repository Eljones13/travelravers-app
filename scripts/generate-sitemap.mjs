// TRAVEL RAVERS: Build-time sitemap generator
// Run: node scripts/generate-sitemap.mjs
// Reads src/data/csvFestivals.ts and src/data/content.ts as plain text.
// Extracts slug + startDate via regex — no TypeScript compiler needed.
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, "..");
const BASE_URL  = "https://travelravers.com";
const TODAY     = new Date().toISOString().split("T")[0];

// ── 1. Static routes ──────────────────────────────────────────────────────────
const STATIC_ROUTES = [
  { path: "/",          priority: "1.0", changefreq: "weekly"  },
  { path: "/festivals", priority: "0.9", changefreq: "weekly"  },
  { path: "/calendar",  priority: "0.8", changefreq: "weekly"  },
  { path: "/blogs",     priority: "0.8", changefreq: "weekly"  },
  { path: "/gear",      priority: "0.8", changefreq: "monthly" },
  { path: "/guides",    priority: "0.7", changefreq: "monthly" },
  { path: "/travel",    priority: "0.6", changefreq: "monthly" },
  { path: "/safety",    priority: "0.6", changefreq: "monthly" },
  { path: "/music",     priority: "0.6", changefreq: "monthly" },
  { path: "/merch",     priority: "0.5", changefreq: "monthly" },
  { path: "/about",     priority: "0.4", changefreq: "yearly"  },
  { path: "/app",       priority: "0.5", changefreq: "monthly" },
];

// ── 2. Blog routes — slugs hard-coded; publishDate parsed from each source file
const BLOG_FILES = [
  { slug: "amazon-games-guide",      file: "AmazonGamesGuide.tsx"      },
  { slug: "rave-makeup-guide",       file: "RaveMakeupGuide.tsx"       },
  { slug: "best-festival-outfits",   file: "BestFestivalOutfits.tsx"   },
  { slug: "best-luggage",            file: "BestLuggage.tsx"           },
  { slug: "bluetooth-airtags-guide", file: "BluetoothAirTagsGuide.tsx" },
  { slug: "croatia-festival-guide",  file: "CroatiaFestivalGuide.tsx"  },
  { slug: "best-festival-tents",     file: "BestFestivalTents.tsx"     },
  { slug: "best-power-banks",        file: "BestPowerBanks.tsx"        },
];

function extractPublishDate(src) {
  const m = src.match(/publishDate:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  return m ? m[1] : TODAY;
}

const blogEntries = BLOG_FILES.map(({ slug, file }) => {
  const src = readFileSync(resolve(ROOT, "src/pages/blogs", file), "utf8");
  return {
    path: `/blogs/${slug}`,
    lastmod: extractPublishDate(src),
    priority: "0.7",
    changefreq: "monthly",
  };
});

// ── 3. Festival routes — parse slug + startDate from TypeScript source files ──
// Strategy: split the file on object boundaries so each chunk is one festival
// entry, then regex within each chunk independently.
function parseFestivals(src) {
  const chunks = src.split(/\},\s*\{/);
  return chunks.flatMap((chunk) => {
    const slugM = chunk.match(/slug:\s*["']([^"']+)["']/);
    const dateM = chunk.match(/startDate:\s*["'](\d{4}-\d{2}-\d{2})["']/);
    return slugM ? [{ slug: slugM[1], startDate: dateM ? dateM[1] : null }] : [];
  });
}

const csvSrc  = readFileSync(resolve(ROOT, "src/data/csvFestivals.ts"), "utf8");
const richSrc = readFileSync(resolve(ROOT, "src/data/content.ts"),      "utf8");

const csvFestivals  = parseFestivals(csvSrc);
// Rich festivals in content.ts use a human-readable `dates:` field, not ISO
// startDate — fall back to TODAY so lastmod is always present.
const richFestivals = parseFestivals(richSrc).map(f => ({
  ...f,
  startDate: f.startDate ?? TODAY,
}));

// Deduplicate: content.ts (rich) entries take priority over CSV entries
const richSlugs    = new Set(richFestivals.map(f => f.slug));
const allFestivals = [
  ...richFestivals,
  ...csvFestivals.filter(f => !richSlugs.has(f.slug)),
];

// ── 4. XML helpers ────────────────────────────────────────────────────────────
function urlBlock({ path, lastmod, priority, changefreq }) {
  const lines = [
    "  <url>",
    `    <loc>${BASE_URL}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ];
  return lines.filter(Boolean).join("\n");
}

// ── 5. Assemble & write ───────────────────────────────────────────────────────
const sections = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "",
  "  <!-- ── Static routes ── -->",
  ...STATIC_ROUTES.map(r => urlBlock({ ...r, lastmod: null })),
  "",
  "  <!-- ── Blog posts ── -->",
  ...blogEntries.map(urlBlock),
  "",
  "  <!-- ── Festival pages ── -->",
  ...allFestivals.map(f =>
    urlBlock({
      path: `/festivals/${f.slug}`,
      lastmod: f.startDate,
      priority: "0.8",
      changefreq: "monthly",
    })
  ),
  "",
  "</urlset>",
];

const xml     = sections.join("\n");
const outPath = resolve(ROOT, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");

const total = STATIC_ROUTES.length + BLOG_FILES.length + allFestivals.length;
console.log(
  `✓ sitemap.xml written → public/sitemap.xml\n` +
  `  ${STATIC_ROUTES.length} static routes\n` +
  `  ${BLOG_FILES.length}  blog posts\n` +
  `  ${allFestivals.length} festival pages  (${richFestivals.length} rich + ${allFestivals.length - richFestivals.length} CSV)\n` +
  `  ${total} URLs total`
);
