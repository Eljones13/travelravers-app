// TRAVEL RAVERS: Stay22 URL helpers
// AID is centralised here — never hardcode it in components.
const AID = "travelravers";

export type Stay22Options = {
  lat?: number | null;
  lng?: number | null;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  slug: string;
};

/**
 * Build the Stay22 map embed URL (for an iframe).
 * Uses Stay22's /embed/gm endpoint with the `gm` (Google Maps) map style.
 */
export function buildStay22EmbedUrl(opts: Stay22Options): string {
  const params = new URLSearchParams({
    aid: AID,
    campaign: opts.slug,
  });
  if (opts.lat != null) params.set("lat", String(opts.lat));
  if (opts.lng != null) params.set("lng", String(opts.lng));
  if (opts.startDate) params.set("checkin", opts.startDate);
  if (opts.endDate) params.set("checkout", opts.endDate);
  return `https://www.stay22.com/embed/gm?${params.toString()}`;
}

/**
 * Build the Stay22 deep-link URL (for an anchor button).
 * Uses Stay22's /allez/roam endpoint so users land on a pre-filtered map.
 */
export function buildStay22DeepLinkUrl(opts: Stay22Options): string {
  const params = new URLSearchParams({
    aid: AID,
    campaign: opts.slug,
  });
  if (opts.lat != null) params.set("lat", String(opts.lat));
  if (opts.lng != null) params.set("lng", String(opts.lng));
  if (opts.startDate) params.set("checkin", opts.startDate);
  if (opts.endDate) params.set("checkout", opts.endDate);
  return `https://www.stay22.com/allez/roam?${params.toString()}`;
}
