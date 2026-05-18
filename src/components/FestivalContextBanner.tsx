// TRAVEL RAVERS: Festival Context Banner
// Persistent pill shown below the header when a festival is focused.
// Mobile-first: full width, min 44px touch targets throughout.
// "Change festival" clears focus and returns user to /festivals.
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useFestivalFocus } from "@/context/FestivalFocusContext";

// Country → flag emoji lookup
const COUNTRY_FLAGS: Record<string, string> = {
  "Belgium":     "🇧🇪",
  "UK":          "🇬🇧",
  "Scotland":    "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Croatia":     "🇭🇷",
  "Spain":       "🇪🇸",
  "Germany":     "🇩🇪",
  "Netherlands": "🇳🇱",
  "Malta":       "🇲🇹",
  "Denmark":     "🇩🇰",
  "Montenegro":  "🇲🇪",
  "Serbia":      "🇷🇸",
  "Hungary":     "🇭🇺",
  "Romania":     "🇷🇴",
  "Slovakia":    "🇸🇰",
  "Portugal":    "🇵🇹",
  "Austria":     "🇦🇹",
  "Switzerland": "🇨🇭",
  "Sweden":      "🇸🇪",
  "Norway":      "🇳🇴",
  "USA":         "🇺🇸",
};

export default function FestivalContextBanner() {
  const { selectedMeta, clearFocus } = useFestivalFocus();
  const navigate = useNavigate();

  // Render nothing when no festival is focused
  if (!selectedMeta) return null;

  const flag = COUNTRY_FLAGS[selectedMeta.country] ?? "🎪";

  function handleChange() {
    clearFocus();
    navigate("/festivals");
  }

  function handleClear() {
    clearFocus();
  }

  return (
    <div
      className="w-full border-b border-tr-cyan/20 bg-tr-cyan/5"
      role="status"
      aria-label={`Festival focus active: ${selectedMeta.name}`}
    >
      {/* Inner: centred on wide screens, full-width on mobile */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 min-h-[44px] py-1.5">

        {/* Left: label + festival name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span
            className="hidden sm:inline-flex label-caps text-[0.55rem] text-tr-cyan/50 flex-shrink-0"
            aria-hidden="true"
          >
            Planning:
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-wide text-tr-cyan truncate">
            {flag} {selectedMeta.name}
          </span>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Change festival — prominent tappable button */}
          <button
            type="button"
            onClick={handleChange}
            className="
              min-h-[44px] px-3 py-2
              font-display text-[0.6rem] uppercase tracking-wider
              text-tr-cyan/70 hover:text-tr-cyan
              border border-tr-cyan/20 hover:border-tr-cyan/40
              rounded transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tr-cyan/50
            "
            aria-label="Change focused festival"
          >
            Change
          </button>

          {/* Dismiss / clear focus — X icon, still 44px touch target */}
          <button
            type="button"
            onClick={handleClear}
            className="
              min-h-[44px] min-w-[44px] flex items-center justify-center
              text-tr-cyan/40 hover:text-tr-cyan/80
              rounded transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-tr-cyan/50
            "
            aria-label="Dismiss festival focus"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
