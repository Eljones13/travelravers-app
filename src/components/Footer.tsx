// TRAVEL RAVERS: Global footer with quick links, social, and affiliate disclaimer
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const footerSections = [
  {
    title: "Discover",
    links: [
      { label: "Festivals 2026",  path: "/festivals" },
      { label: "Blog & Guides",   path: "/blogs"     },
      { label: "Festival Guides", path: "/guides"    },
      { label: "Packing & Gear",  path: "/gear"      },
      { label: "Travel & Stays",  path: "/travel"    },
      { label: "Calendar",        path: "/calendar"  },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "TR Music & Mixes", path: "/music" },
      { label: "Safety & Welfare", path: "/safety" },
      { label: "Merch Store", path: "/merch" },
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "App",
    links: [
      { label: "Install the App", path: "/install" },
      { label: "Survival App", path: "/app" },
      { label: "App Demo", path: "/demo" },
      { label: "Offline Checklist", path: "/app" },
      { label: "SOS Features", path: "/app" },
    ],
  },
];

const socialLinks = [
  { label: "TikTok",     url: "https://www.tiktok.com/@travel_ravers" },
  { label: "Instagram",  url: "https://www.instagram.com/travelravers.uk/" },
  { label: "YouTube",    url: "https://www.youtube.com/@Travel-Ravers" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-base font-bold text-foreground tracking-[0.15em] uppercase inline-block mb-4">
              Travel<span className="text-tr-cyan"> Ravers</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Your festival travel OS. Built for the people with no signal.
            </p>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="text-muted-foreground hover:text-tr-cyan transition-colors text-xs font-display uppercase tracking-wider"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:info@travelravers.com"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-tr-cyan transition-colors text-xs"
            >
              <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              info@travelravers.com
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-[0.2em] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 space-y-4">
          <p className="flex items-center gap-2 text-muted-foreground/70 text-xs">
            <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>Contact: </span>
            <a href="mailto:info@travelravers.com" className="hover:text-tr-cyan transition-colors">
              info@travelravers.com
            </a>
          </p>
          <p className="text-muted-foreground/60 text-xs leading-relaxed max-w-3xl">
            This site may contain affiliate links. If you book or buy through them, Travel Ravers may earn a commission at no extra cost to you. We only recommend products and services we believe are genuinely useful to festival-goers. As an Amazon Associate, we earn from qualifying purchases. Travel Ravers is an independent project and is not affiliated with any festival organiser.
          </p>
          <p className="text-muted-foreground/40 text-xs">
            © {new Date().getFullYear()} Travel Ravers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
