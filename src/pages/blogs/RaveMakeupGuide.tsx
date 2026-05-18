// TRAVEL RAVERS: Blog — Rave Makeup That Lasts 3 Days
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import SchemaScript from "@/components/SchemaScript";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const BLOG_META = {
  title: "How to Apply Rave Makeup: Festival Beauty Guide 2026",
  description: "Step-by-step rave makeup tutorial with the best UV, glitter and neon products. Look incredible at every festival.",
  keywords: ["rave makeup", "festival makeup tutorial", "uv face paint", "body glitter festival", "makeup that lasts", "festival beauty 2026"],
  publishDate: "2026-03-05",
  affiliatePrograms: ["Amazon UK (travelravers-21)"],
};

interface ProductCardProps {
  name: string;
  description: string;
  href: string;
  price?: string;
  step?: number;
}

function ProductCard({ name, description, href, price, step }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-tr-purple/20 p-5 relative overflow-hidden" style={{ backgroundColor: "hsl(270 40% 3%)" }}>
      {step && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-tr-purple/20 border border-tr-purple/30 flex items-center justify-center">
          <span className="font-display text-[0.55rem] text-tr-purple/80 font-bold">{step}</span>
        </div>
      )}
      <span aria-hidden="true" className="absolute top-1 left-1 w-3 h-3 border-t border-l border-tr-purple/40" />
      <span aria-hidden="true" className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-tr-purple/40" />
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mb-1">{name}</h3>
      {price && <p className="font-mono text-tr-green text-xs mb-2">{price}</p>}
      <p className="text-foreground/60 text-sm leading-relaxed mb-4">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[0.65rem] font-display uppercase tracking-wider text-tr-green border border-tr-green/30 hover:border-tr-green/60 hover:text-tr-green px-3 py-2 rounded transition-colors"
      >
        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
        BUY ON AMAZON →
        <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
      </a>
    </div>
  );
}

const STEPS = [
  { title: "Step 1: Primer", body: "Start with a silicone-based primer across your whole face. This creates a barrier between your skin and whatever gets thrown at it — sweat, rain, glitter, dust. Don't skip this." },
  { title: "Step 2: UV / Neon Base", body: "Apply your UV neon base colours where you want them to glow under blacklights. Use a fluffy brush for blending and a fine brush for sharp lines. Lighter skin tones pick up UV colour more easily." },
  { title: "Step 3: Glitter", body: "Use cosmetic-grade glitter mixed with a chunky glitter gel or a dedicated glitter primer. Apply with your fingers for maximum coverage. Focus on cheekbones, temples, and décolletage." },
  { title: "Step 4: Setting Spray", body: "Douse your face in a heavy-duty setting spray — not a standard one. Look for phrases like '16-hour hold' or 'waterproof lock'. Do two passes: one with eyes closed, one with eyes open." },
  { title: "Step 5: Touch-Up Kit", body: "Pack a small zip bag with your setting spray, a travel UV paint, glitter gel, and a mirror. Festival toilets are grim but a 90-second touch-up at the mirror on your phone camera works fine." },
];

const heroImage = "/blogs/makeup-hero.jpg";
const heroAlt = "UV face paint, glitter and rave makeup products arranged on a black surface";

export default function RaveMakeupGuide() {
  usePageMeta(BLOG_META.title, BLOG_META.description, "/og/rave-makeup-guide.jpg", "https://travelravers.com/blogs/rave-makeup-guide");

  return (
    <article className="page-container">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://travelravers.com/" },
          { name: "Blog", url: "https://travelravers.com/blogs" },
          { name: BLOG_META.title, url: "https://travelravers.com/blogs/rave-makeup-guide" },
        ]}
      />
      <SchemaScript
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: BLOG_META.title,
          description: BLOG_META.description,
          datePublished: BLOG_META.publishDate,
          dateModified: BLOG_META.publishDate,
          author: { "@type": "Organization", name: "Travel Ravers" },
          url: "https://travelravers.com/blogs/rave-makeup-guide",
          image: "https://travelravers.com/blogs/makeup-hero.jpg",
        }}
      />
      <div className="page-inner">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-tr-cyan transition-colors mb-8 text-sm font-display uppercase tracking-wider text-[0.65rem]">
          ← Back to Guides
        </Link>

        {/* Hero image — replace /blogs/makeup-hero.jpg with final artwork at any time */}
        <div className="w-full rounded-xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
          <img
            src={heroImage}
            alt={heroAlt}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <header className="mb-8">
          <p className="label-caps text-[0.6rem] text-tr-purple/60 mb-2">Beauty · Festival Guide 2026</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-3">
            How to Do Rave Makeup That Lasts 3 Days
          </h1>
          <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
            The ultimate festival makeup guide for surviving sweat, rain, mosh pits, and three days without a mirror. These products and techniques are used by regular festival ravers — not beauty influencers who've never been to a field.
          </p>
        </header>

        {/* 5-step guide */}
        <section className="mb-8">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            The 5-Step Festival Makeup System
          </h2>
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4 items-start rounded-lg border border-border/20 p-4" style={{ backgroundColor: "hsl(220 40% 3.5%)" }}>
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-tr-purple/15 border border-tr-purple/30 flex items-center justify-center">
                  <span className="font-display text-[0.65rem] text-tr-purple/80 font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="font-display text-[0.7rem] uppercase tracking-wider text-foreground/80 mb-1">{s.title}</p>
                  <p className="text-foreground/55 text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-8">
          <h2 className="font-display text-base font-bold uppercase tracking-wider text-foreground mb-5">
            The Kit (Amazon UK)
          </h2>
          <div className="space-y-4">
            <ProductCard
              name="UV Neon Face Paint"
              description="Blacklight-reactive face paint in vivid neon shades. Water-activated, easy to blend, and survives sweat far better than cream alternatives. Get a set with multiple colours."
              href="https://www.amazon.co.uk/s?k=uv+neon+face+paint+festival&tag=travelravers-21"
              price="~£8–15"
              step={2}
            />
            <ProductCard
              name="Cosmetic Body Glitter"
              description="Fine-grade loose glitter that's safe for face and body. Mix with aloe vera gel for easier application. Chunky glitter mixes add dimension and catch stage lights perfectly."
              href="https://www.amazon.co.uk/s?k=cosmetic+body+glitter+festival&tag=travelravers-21"
              price="~£5–12"
              step={3}
            />
            <ProductCard
              name="Makeup Setting Spray (Long Lasting)"
              description="A proper waterproof setting spray is the single most important item in festival makeup. Urban Decay All Nighter or NYX Matte Finish both perform well in mud and rain."
              href="https://www.amazon.co.uk/s?k=makeup+setting+spray+long+lasting&tag=travelravers-21"
              price="~£10–22"
              step={4}
            />
            <ProductCard
              name="Festival Makeup Bag Organiser"
              description="A compact, waterproof rollup organiser keeps your kit safe in a bumbag or dry bag. Look for one with a clear window panel so you can see what's inside without rummaging."
              href="https://www.amazon.co.uk/s?k=festival+makeup+bag+organiser&tag=travelravers-21"
              price="~£10–18"
              step={5}
            />
          </div>
        </section>

        {/* Shop kit CTA */}
        <div className="rounded-lg border border-tr-purple/20 bg-tr-purple/5 p-5 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-3">
            Shop the full rave makeup kit →
          </p>
          <a
            href="https://store.travelravers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            Travel Ravers Store
          </a>
        </div>
      </div>
    </article>
  );
}
