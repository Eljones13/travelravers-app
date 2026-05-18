// TRAVEL RAVERS: MERCH CARD COMPONENT — used at /merch
// Internal-routing card for merchandise items.
// Distinct from ProductCard (which is affiliate/external-link-only).
// Links to /merch/[slug] for the full product detail page.

import { Link } from "react-router-dom";

export interface MerchCardProps {
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  price: string;
}

export default function MerchCard({
  title,
  slug,
  category,
  description,
  image,
  price,
}: MerchCardProps) {
  return (
    <article className="tr-merch-card">
      <Link to={`/merch/${slug}`} className="group block">
        <figure className="aspect-square rounded-lg overflow-hidden mb-4 m-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </figure>

        <span className="tr-status-pill bg-secondary text-muted-foreground border border-border mb-3 inline-flex">
          {category}
        </span>

        <h2 className="font-display text-xs sm:text-sm font-bold text-foreground mb-2 uppercase tracking-wider group-hover:text-tr-cyan transition-colors">
          {title}
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        <p className="text-foreground font-bold text-lg">{price}</p>
      </Link>
    </article>
  );
}
