// TRAVEL RAVERS: Per-page SEO hook
// Updates document.title, meta[name="description"], og:title, og:description,
// og:image, twitter:image, og:url, and <link rel="canonical"> on every route change.
// Zero new dependencies — plain useEffect on document.head.
// To add SSR later: swap the body for react-helmet-async without touching any page file.

import { useEffect } from "react";

const SITE_NAME = "Travel Ravers";
const DEFAULT_TITLE = `${SITE_NAME} — Your Festival Travel OS`;
const DEFAULT_DESC =
  "Plan your first big festival abroad — guides, packing lists, travel intel, and safety tips for UK and EU ravers.";
const DEFAULT_IMAGE = "https://travelravers.com/og-default.jpg";
const DEFAULT_CANONICAL = "https://travelravers.com";

function setMeta(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function usePageMeta(
  title: string,
  description: string,
  imageUrl?: string,
  canonicalUrl?: string,
) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESC;
    const img = imageUrl || DEFAULT_IMAGE;
    const canonical = canonicalUrl || DEFAULT_CANONICAL;

    document.title = fullTitle;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[name="twitter:image"]', img);
    setMeta('meta[property="og:url"]', canonical);
    setCanonical(canonical);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', DEFAULT_DESC);
      setMeta('meta[property="og:title"]', DEFAULT_TITLE);
      setMeta('meta[property="og:description"]', DEFAULT_DESC);
      setMeta('meta[property="og:image"]', DEFAULT_IMAGE);
      setMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
      setMeta('meta[property="og:url"]', DEFAULT_CANONICAL);
      setCanonical(DEFAULT_CANONICAL);
    };
  }, [title, description, imageUrl, canonicalUrl]);
}
