// DEV ONLY — Festival Brain debug page at /dev/festival-brain
// Lists all festivalBrain entries with field presence indicators.
import { festivalBrain } from "@/data/festivalBrain";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Check, X } from "lucide-react";

function FieldBadge({ value }: { value: string | number | boolean | null }) {
  const present =
    value !== null &&
    value !== undefined &&
    value !== "" &&
    value !== "TBA" &&
    value !== false;
  return present ? (
    <Check className="w-3 h-3 text-green-400 inline" aria-label="present" />
  ) : (
    <X className="w-3 h-3 text-red-400/60 inline" aria-label="missing" />
  );
}

const COLS: { label: string; key: keyof typeof festivalBrain[0] }[] = [
  { label: "Ticket (official)", key: "ticketUrlOfficial" },
  { label: "Ticket (Skiddle)", key: "ticketUrlSkiddle" },
  { label: "YouTube ID", key: "youtubeVideoId" },
  { label: "Image URL", key: "imageUrl" },
  { label: "Headliners", key: "headliners" },
  { label: "Start date", key: "startDate" },
  { label: "Lat/Lng", key: "latitude" },
];

export default function DevFestivalBrainPage() {
  usePageMeta("Festival Brain — Dev Debug", "Internal dev page");

  return (
    <div className="page-container">
      <div className="page-inner">
        <h1 className="font-display text-xl font-bold uppercase tracking-wider mb-1">
          Festival Brain — {festivalBrain.length} festivals
        </h1>
        <p className="text-foreground/40 text-xs mb-6">
          Auto-generated from output/festival_brain_master.csv · dev only
        </p>

        <div className="overflow-x-auto rounded-lg border border-border/20">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/20 bg-white/3">
                <th className="text-left px-3 py-2 font-display uppercase tracking-wider text-foreground/50 whitespace-nowrap">
                  #
                </th>
                <th className="text-left px-3 py-2 font-display uppercase tracking-wider text-foreground/50 whitespace-nowrap">
                  Slug
                </th>
                <th className="text-left px-3 py-2 font-display uppercase tracking-wider text-foreground/50 whitespace-nowrap">
                  Name
                </th>
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    className="text-center px-3 py-2 font-display uppercase tracking-wider text-foreground/50 whitespace-nowrap"
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {festivalBrain.map((f, i) => (
                <tr
                  key={f.slug}
                  className="border-b border-border/10 hover:bg-white/2 transition-colors"
                >
                  <td className="px-3 py-2 text-foreground/30">{i + 1}</td>
                  <td className="px-3 py-2 font-mono text-foreground/60 whitespace-nowrap">
                    <a
                      href={`/festivals/${f.slug}`}
                      className="hover:text-tr-cyan transition-colors"
                    >
                      {f.slug}
                    </a>
                  </td>
                  <td className="px-3 py-2 text-foreground/80 whitespace-nowrap">
                    {f.canonicalName}
                  </td>
                  {COLS.map((c) => (
                    <td key={c.key} className="px-3 py-2 text-center">
                      <FieldBadge value={f[c.key] as string | number | boolean | null} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-foreground/25 text-[0.6rem] mt-4 font-display uppercase tracking-wider">
          Green = field present · Red = missing or TBA
        </p>
      </div>
    </div>
  );
}
