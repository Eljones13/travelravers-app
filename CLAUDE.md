# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools directly.

Available gstack skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/document-generate`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

## Commands

```bash
npm run dev          # Dev server (Vite, hot reload)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Tests in watch mode
node_modules/.bin/tsc --noEmit  # TypeScript check (no build output)
```

> **OS:** Windows 11 — use `node_modules/.bin/tsc` directly; `bun` is not available in PATH despite `bun.lock` being present.

## Architecture

### Routing (`src/App.tsx`)
All routes are registered here with React Router v6. Every page renders inside `<Layout />` (which provides `<Header>`, `<main><Outlet/>`, `<Footer>`). The `*` catch-all renders `<NotFound />` outside the layout.

**Current routes:** `/`, `/my-weekends`, `/festivals`, `/festivals/:slug`, `/guides`, `/guides/:slug`, `/gear`, `/travel`, `/safety`, `/music`, `/merch`, `/merch/:slug`, `/about`, `/app`, `/calendar`, `/timetable`, `/blogs`, `/blogs/:blog-slug`

### Festival data (two-tier system)
Festival detail pages (`FestivalDetailPage`) resolve slugs in priority order:
1. **Rich festivals** — `src/data/content.ts` → `festivals[]` array. Full editorial content with travel tips, affiliate URLs, packing lists.
2. **CSV festivals** — `src/data/csvFestivals.ts` → `getCsvFestivalBySlug()`. Derived from CSV imports, less editorial detail.

Rich festivals render `FestivalDetailLayout`; CSV festivals render `CsvFestivalDetailLayout`. Adding a new festival with full editorial content means adding to the `festivals[]` array in `content.ts`.

### State: Festival planner (`src/context/FestivalStoreContext.tsx`)
Wraps the entire app. Stores `TicketStatus` (`"going" | "maybe" | "none"`) per festival slug in `localStorage` under `tr_ticket_statuses`. Use `useFestivalStore()` to read/write. This drives the `/my-weekends` page and the plan-bar on each festival detail page.

### SEO pattern
Every page calls `usePageMeta(title, description, imageUrl?)` from `src/hooks/use-page-meta.ts`. This updates `<title>` and all open graph / Twitter meta tags. Detail pages also render `<SchemaScript>` with structured data (Event, BlogPosting, Product schemas). The hook cleans up on unmount — no react-helmet dependency.

### Tailwind color system
Brand colors are CSS variables mapped as Tailwind utilities in `tailwind.config.ts`:
- `tr-cyan` — primary CTA / interactive elements
- `tr-green` — travel/navigation/maps
- `tr-purple` — music/squad/radar
- `tr-red` — safety/SOS only
- `tr-amber` — "maybe" status indicator

### Blog pages (`src/pages/blogs/`)
Each blog is a standalone TSX file (not a slug-driven template). To add a new blog: create the file, wire a `<Route>` in `App.tsx`, and add a card to `BlogListPage.tsx`.

### Affiliate link conventions
Skiddle links use `?sktag=15628`. Skyscanner, Booking.com, and SafetyWing are also affiliate partners. Link overrides per festival go on the `Festival` object in `content.ts` (`ticketUrl`, `flightsUrl`, `hotelUrl`). The `SKIDDLE_MAP` in `csvFestivals.ts` maps festival names to Skiddle affiliate URLs.

## CSS layout conventions
- `Layout.tsx` wraps all pages in `<main>` — pages must **not** add their own `<main>` tag
- Static pages: root element is `<div className="page-container">`
- Detail/article pages: root element is `<article className="page-container">`
- One `<h1>` per page, always
- Utility classes: `.page-container`, `.page-inner`, `.glass-card`, `.glass-card-hover`, `.btn-primary`, `.btn-secondary`, `.label-caps`, `.tr-status-pill`, `.content-grid`
# Travel Ravers — Festival Brain Rules

## Data ownership — READ THIS FIRST

| File | Owner | Edit rule |
|------|-------|-----------|
| src/data/festival-brain-master.json | Canonical source | ONLY file you hand-edit for festival facts |
| src/data/content.ts | Editorial copy | ONLY file you hand-edit for guide prose |
| src/data/festivalBrain.ts | Generated | DO NOT manually edit — overwritten by scripts |
| src/db/seed-data/festivalBrainAppSeed.json | Generated | DO NOT manually edit — overwritten by scripts |
| src/data/generated/* | Generated reports | DO NOT manually edit |

## Canonical field names (use these everywhere)

| Concept | Canonical name | Retired names to stop using |
|---------|---------------|----------------------------|
| Display name | canonicalName | name, festivalName |
| City | city | location |
| Latitude | lat | latitude, coords.lat |
| Longitude | lng | longitude, coords.lng |
| Hero image | heroImageUrl | image, imageUrl, heroImageUrl |
| YouTube video | youtubeVideoId | youtubePromoId |
| Official ticket URL | ticketUrlOfficial | ticketUrl, officialTicketUrl |
| Skiddle affiliate URL | skiddleUrl | ticketUrlSkiddle, skiddleTicketUrl |

## Slug rules

- Slug is the single route key. It must be identical across festivalBrain, content.ts, and csvFestivals.
- Use short, lowercase, hyphenated slugs: tomorrowland not tomorrowland-belgium-2026.
- Known mismatches to fix (do not touch URLs yet — fix internal cross-refs first):
  - exit-serbia → exit-festival
  - time-warp-mannheim → time-warp
  - mystic-garden-amsterdam → mystic-garden
  - hospitality-in-the-park → hospitality-in-park

## Required fields (every festival must have these)

slug, canonicalName, startDate, endDate, city, country, lat, lng,
ticketUrlOfficial, heroImageUrl, youtubeVideoId,
officialUrl, lastVerifiedAt, sourceOfficial

## App-only fields (never render these on the website)

medicalDoctorLocal, medicalAllergyLocal, legalFreeToGoLocal,
legalCallEmbassyLocal, scriptLostSquad, scriptSubstance,
scriptMedicalTent, scriptCharging

## Task protocol

1. PLAN first — use plan mode. List files you will touch and why.
2. WAIT for approval before touching more than 3 files at once.
3. EXECUTE in the smallest safe batch.
4. OUTPUT a summary of changed files and remaining risks.
5. NEVER touch page components during data-only tasks.
6. NEVER guess missing field values — mark as null and flag.

## Validation checklist (run after every data task)

- [ ] No duplicate slugs
- [ ] No missing required fields
- [ ] Every content.ts slug has a matching festivalBrain entry
- [ ] No festivals within 45 days missing ticketUrlOfficial
- [ ] App-only fields absent from web output files
- [ ] Shared fields identical across web and app outputs

## Legacy files (do not delete until approved)

- src/data/mockFestivals.ts → retire after homepage featured strip migrated
- src/data/new_festivals_2026.json → merge into CSV layer then delete
- src/data/travel_ravers_editorial.json → re-key from festivalName to slug before consolidating

## Stack context

- Website: Vite + React + TypeScript
- App: React Native + Expo + Drizzle ORM + SQLite
- Deployment: web.travelravers.com
- Brand: Tactical Anime HUD — Cyber Cyan, Magenta, Safety Orange
- Target: anxious first-time ravers + experienced crew leaders aged 18–30
