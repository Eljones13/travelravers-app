// TRAVEL RAVERS: PACKING & GEAR PRODUCT CARD — affiliate-ready
// Used at /gear (and /merch product grids in future).
// No internal routing — affiliateUrl is always an external link.

import { ExternalLink } from "lucide-react";

export interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  affiliateUrl: string;
  /** Button label, e.g. "View on Amazon" or "View on Retailer" */
  affiliateLabel: string;
  category: string;
  price?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  affiliateUrl,
  affiliateLabel,
  category,
  price,
}: ProductCardProps) {
  return (
    <article className="tr-product-card glass-card-hover p-5 flex flex-col">
      <figure className="aspect-[4/3] rounded-md overflow-hidden mb-4 m-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </figure>

      <span className="tr-status-pill bg-secondary text-muted-foreground border border-border mb-3 inline-flex self-start">
        {category}
      </span>

      <h3 className="font-display text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider mb-2 line-clamp-2">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between gap-3">
        {price && (
          <span className="text-foreground font-bold text-lg">{price}</span>
        )}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-secondary text-[0.6rem] ml-auto"
          aria-label={`${affiliateLabel} — ${title}`}
        >
          {affiliateLabel} <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
