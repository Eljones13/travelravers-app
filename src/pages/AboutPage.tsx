// TRAVEL RAVERS: ABOUT PAGE — /about
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroFestival from "@/assets/hero-festival.jpg";
import { usePageMeta } from "@/hooks/use-page-meta";
import SectionHeader from "@/components/SectionHeader";
import { Mail, ExternalLink } from "lucide-react";

export default function AboutPage() {
  usePageMeta(
    "About Travel Ravers",
    "Travel Ravers is a UK-based festival travel and planning website helping first-time and returning ravers prepare for music festivals across the UK and Europe.",
  );

  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">About Travel Ravers</h1>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                We started Travel Ravers because we kept watching friends make the same mistakes at their first big festival abroad — forgotten earplugs, no rain gear at a UK camping festival, dead phones with no offline maps, and absolutely zero knowledge of how to actually get from the airport to the campsite.
              </p>
              <p className="text-lg">
                Travel Ravers is built for the people with no signal. The ones standing in a field at 3am trying to find their tent. The ones who've never been to a festival outside their home country and don't know where to start. The ones who want the experience of a lifetime but need a bit of help making it happen.
              </p>
              <p className="text-lg">
                We're ravers, travellers, and festival survivors. We believe in community care, harm reduction, and making sure everyone gets home safe with stories to tell.
              </p>
            </div>

            <div>
              <SectionHeader heading="Our Mission" className="mb-4" />
              <ul className="space-y-3">
                {[
                  "Make international festival travel accessible and less intimidating for first-timers",
                  "Provide honest, practical survival guides — not sponsored fluff",
                  "Build tools that work offline, because festival signal is a myth",
                  "Promote responsibility, harm reduction, and looking after each other",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground/70">
                    <span className="text-tr-cyan mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 space-y-5">
              <div>
                <h3 className="label-caps mb-3">What is Travel Ravers?</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Travel Ravers is a UK-based festival travel and planning website focused on helping first-time and returning ravers prepare for music festivals across the UK and Europe. We publish destination guides, packing advice, festival survival content, and travel resources designed to help users book accommodation, transport, and festival essentials with confidence.
                </p>
              </div>

              <div>
                <h3 className="label-caps mb-3">Get In Touch</h3>
                <p className="text-foreground/70 text-sm mb-4">Got a festival you want us to cover? Want to collaborate or work with us? Just want to say hi?</p>
                <a
                  href="mailto:info@travelravers.com"
                  className="inline-flex items-center gap-2 text-tr-cyan hover:text-tr-cyan/80 transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  info@travelravers.com
                </a>
              </div>

              <div>
                <h3 className="label-caps mb-3">Follow Us</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "TikTok",    url: "https://www.tiktok.com/@travel_ravers" },
                    { label: "Instagram", url: "https://www.instagram.com/travelravers.uk/" },
                    { label: "YouTube",   url: "https://www.youtube.com/@Travel-Ravers" },
                  ].map(({ label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground/60 hover:text-tr-cyan transition-colors text-sm"
                    >
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img src={heroFestival} alt="Festival crowd at night with dramatic stage lighting" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
