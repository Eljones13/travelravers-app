// TRAVEL RAVERS: GUIDE CARD COMPONENT — used at /guides
// Presentational grid card for a single guide article.
// coverImage is optional; card degrades gracefully without it.

import { Link } from "react-router-dom";

export interface GuideCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readingTime: string;
  coverImage?: string;
}

export default function GuideCard({
  title,
  slug,
  excerpt,
  category,
  readingTime,
  coverImage,
}: GuideCardProps) {
  return (
    <article className="tr-guide-card">
      <Link to={`/guides/${slug}`} className="group block">
        {coverImage && (
          <figure className="aspect-[16/10] rounded-lg overflow-hidden mb-4 relative m-0">
            <img
              src={coverImage}
              alt={`Cover image for ${title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300"
              aria-hidden="true"
            />
          </figure>
        )}

        <span className="tr-status-pill bg-secondary text-muted-foreground border border-border mb-3 inline-flex">
          {category}
        </span>

        <h2 className="font-display text-sm sm:text-base font-bold text-foreground mb-2 uppercase tracking-wider group-hover:text-tr-cyan transition-colors leading-snug">
          {title}
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-2">
          {excerpt}
        </p>

        <p className="text-foreground/30 text-xs font-display uppercase tracking-wider">
          {readingTime}
        </p>
      </Link>
    </article>
  );
}
