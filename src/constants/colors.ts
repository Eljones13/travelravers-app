// Tron HUD palette — raw HSL values for inline style={{ backgroundColor: ... }}
// Tailwind utilities (tr-cyan, tr-green, etc.) reference these same values via CSS variables.
export const HUD = {
  cyanBg:       "hsl(185 80% 50% / 0.04)",
  cyanBgStrong: "hsl(185 80% 50% / 0.10)",
  greenBg:      "hsl(140 60% 40% / 0.04)",
  purpleBg:     "hsl(270 40% 6%)",
  amberBg:      "hsl(40 80% 50% / 0.04)",
  redBg:        "hsl(0 80% 50% / 0.04)",
  darkBg:       "hsl(220 40% 6%)",
  overlayBg:    "hsl(220 60% 3% / 0.80)",
} as const;
