// TRAVEL RAVERS: Contact page — /contact
import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";

const SOCIALS = [
  { label: "TikTok",    url: "https://www.tiktok.com/@travel_ravers",          handle: "@travel_ravers" },
  { label: "Instagram", url: "https://www.instagram.com/travelravers.uk/",     handle: "@travelravers.uk" },
  { label: "YouTube",   url: "https://www.youtube.com/@Travel-Ravers",         handle: "@Travel-Ravers" },
];

export default function ContactPage() {
  usePageMeta(
    "Contact — Travel Ravers",
    "Get in touch with Travel Ravers. Email us at info@travelravers.com or follow us on TikTok, Instagram, and YouTube.",
  );

  return (
    <div className="page-container">
      <div className="page-inner max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <header>
            <p className="label-caps text-[0.6rem] text-tr-cyan/60 mb-2">Travel Ravers</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground mb-4">
              Contact
            </h1>
            <p className="text-foreground/60 text-base leading-relaxed">
              Travel Ravers is a UK-based festival travel and planning website focused on helping first-time and returning ravers prepare for music festivals across the UK and Europe. We publish destination guides, packing advice, festival survival content, and travel resources designed to help users book accommodation, transport, and festival essentials with confidence.
            </p>
          </header>

          {/* Email */}
          <section className="glass-card p-6 space-y-4">
            <h2 className="label-caps text-[0.6rem] text-tr-cyan/60">Email</h2>
            <p className="text-foreground/65 text-sm leading-relaxed">
              Readers, brands, and affiliate partners are welcome to reach out by email. Whether you want to suggest a festival, discuss a collaboration, or ask a question about the site — we read everything.
            </p>
            <a
              href="mailto:info@travelravers.com"
              className="inline-flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wider text-tr-cyan hover:text-tr-cyan/80 transition-colors"
            >
              <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              info@travelravers.com
            </a>
          </section>

          {/* Socials */}
          <section className="space-y-4">
            <h2 className="label-caps text-[0.6rem] text-tr-cyan/60">Follow Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SOCIALS.map(({ label, url, handle }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-between
                    rounded-lg border border-border/20 hover:border-tr-cyan/30
                    px-4 py-3.5 group transition-colors
                  "
                  style={{ backgroundColor: "hsl(220 40% 3.5%)" }}
                >
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-tr-cyan transition-colors">
                      {label}
                    </p>
                    <p className="text-foreground/35 text-[0.65rem] mt-0.5">{handle}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-foreground/20 group-hover:text-tr-cyan/50 transition-colors flex-shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          {/* Affiliate disclosure */}
          <section className="rounded-lg border border-border/15 px-5 py-4" style={{ backgroundColor: "hsl(220 40% 3.5%)" }}>
            <h2 className="label-caps text-[0.6rem] text-foreground/35 mb-2">Affiliate Disclosure</h2>
            <p className="text-foreground/40 text-xs leading-relaxed">
              This site may contain affiliate links. If you book or buy through them, Travel Ravers may earn a commission at no extra cost to you. We only recommend products and services we believe are genuinely useful to festival-goers.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
