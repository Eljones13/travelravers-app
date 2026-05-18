// TRAVEL RAVERS: Reusable email capture block — wired to console for now, ready for provider swap
import { useState } from "react";
import { Mail } from "lucide-react";

interface Props {
  heading?: string;
  subheading?: string;
}

export default function EmailCapture({
  heading = "Get festival intel in your inbox",
  subheading = "Lineup drops, travel tips, and gear reviews. No spam.",
}: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    console.log("Email capture:", email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-tr-cyan/20 p-5 sm:p-6 text-center"
        style={{ backgroundColor: "hsl(185 80% 50% / 0.04)" }}
      >
        <Mail className="w-6 h-6 text-tr-cyan mx-auto mb-3" aria-hidden="true" />
        <p className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-1">
          You're in.
        </p>
        <p className="text-foreground/55 text-sm">We'll be in touch before the season kicks off.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-tr-cyan/20 p-5 sm:p-6"
      style={{ backgroundColor: "hsl(185 80% 50% / 0.04)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-3.5 h-3.5 text-tr-cyan/70" aria-hidden="true" />
        <p className="label-caps text-[0.6rem] text-tr-cyan/60">Stay in the loop</p>
      </div>
      <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-1">
        {heading}
      </h2>
      <p className="text-foreground/55 text-sm mb-4 leading-relaxed">{subheading}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="
            flex-1 min-h-[44px] px-4 py-2 rounded-md
            border border-border/40 bg-secondary/30
            text-foreground placeholder:text-foreground/30 text-sm
            focus:outline-none focus:border-tr-cyan/50 focus:ring-1 focus:ring-tr-cyan/20
            transition-colors
          "
          aria-label="Email address"
        />
        <button
          type="submit"
          className="btn-primary min-h-[44px] flex-shrink-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
