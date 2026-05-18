// TRAVEL RAVERS: Main header — 5-item nav (IA review 2026-03-30)
// Festivals · Calendar · Blog · Gear · My Plans
// All other routes (Guides, Travel, Music, Safety, Merch, About, App)
// remain reachable via the footer.
import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useFestivalStore } from "@/context/FestivalStoreContext";

// 5-item nav: discovery → calendar → content → affiliate → personal
const navLinks = [
  { label: "Festivals", path: "/festivals"  },
  { label: "Calendar",  path: "/calendar"   },
  { label: "Blog",      path: "/blogs"      },
  { label: "Gear",      path: "/gear"       },
  { label: "My Plans",  path: "/my-weekends"},
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleMobileNav(path: string) {
    setMobileOpen(false);
    navigate(path);
  }
  const { ticketStatuses } = useFestivalStore();
  const goingCount = useMemo(
    () => Object.values(ticketStatuses).filter((s) => s === "going").length,
    [ticketStatuses],
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 tr-header-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-display text-sm sm:text-base font-bold text-foreground tracking-[0.15em] uppercase">
              Travel<span className="text-tr-cyan"> Ravers</span>
            </span>
          </Link>

          {/* Desktop nav — 5 items + Get App CTA */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                  pathname.startsWith(link.path)
                    ? "text-tr-cyan underline underline-offset-4 decoration-tr-cyan/50"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {link.label}
                {link.path === "/my-weekends" && goingCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-3 w-3.5 h-3.5 rounded-full bg-tr-cyan text-primary-foreground flex items-center justify-center"
                    style={{ fontSize: "0.45rem", lineHeight: 1, fontFamily: "Orbitron, sans-serif" }}
                    aria-label={`${goingCount} festivals tracked`}
                  >
                    {goingCount}
                  </span>
                )}
              </Link>
            ))}
            <Link to="/install" className="btn-primary !px-4 !py-1.5">
              Get App
            </Link>
          </nav>

          {/* Mobile hamburger — 44px tap target */}
          <button
            type="button"
            className="lg:hidden text-foreground p-3 -mr-3"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen nav — conditionally mounted; no AnimatePresence so
           the overlay is immediately removed from the DOM when mobileOpen=false */}
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.25 }}
          className="fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center gap-8"
          aria-label="Mobile navigation"
          role="dialog"
          aria-modal="true"
        >
          {/* Close — 44px tap target */}
          <button
            type="button"
            className="absolute top-3 right-3 text-foreground p-3"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>

          {navLinks.map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => handleMobileNav(link.path)}
              className={`relative font-display text-2xl font-semibold uppercase tracking-widest transition-colors ${
                pathname.startsWith(link.path)
                  ? "text-tr-cyan"
                  : "text-foreground hover:text-foreground/60"
              }`}
            >
              {link.label}
              {link.path === "/my-weekends" && goingCount > 0 && (
                <span
                  className="absolute -top-1 -right-5 w-4 h-4 rounded-full bg-tr-cyan text-primary-foreground flex items-center justify-center"
                  style={{ fontSize: "0.5rem", lineHeight: 1, fontFamily: "Orbitron, sans-serif" }}
                  aria-label={`${goingCount} festivals tracked`}
                >
                  {goingCount}
                </span>
              )}
            </button>
          ))}
          <Link
            to="/install"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-2"
          >
            Get App
          </Link>
        </motion.div>
      )}
    </>
  );
}
