import { useState } from "react";
import { Mail } from "lucide-react";

const GENRES = ["Techno", "House", "Drum & Bass", "Psytrance", "Multi-genre"] as const;
type Genre = (typeof GENRES)[number];

interface Props {
  heading?: string;
  subheading?: string;
}

export default function EmailCapture({
  heading = "Get festival intel in your inbox",
  subheading = "Lineup drops, travel tips, and gear reviews. No spam.",
}: Props) {
  const [email, setEmail]     = useState("");
  const [genre, setGenre]     = useState<Genre | "">("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !genre) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, genre }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const inputClass = `
    w-full min-h-[44px] px-4 py-2 rounded-md
    border border-border/40 bg-secondary/30
    text-foreground placeholder:text-foreground/30 text-sm
    focus:outline-none focus:border-tr-cyan/50 focus:ring-1 focus:ring-tr-cyan/20
    transition-colors
  `;

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={loading}
          className={inputClass}
          aria-label="Email address"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value as Genre)}
          required
          disabled={loading}
          className={`${inputClass} appearance-none cursor-pointer`}
          aria-label="Festival genre interest"
        >
          <option value="" disabled>
            Your festival vibe…
          </option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-red-400 text-xs px-1" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email || !genre}
          className="btn-primary min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
