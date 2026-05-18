// TRAVEL RAVERS: SECTION HEADER — shared section heading pattern
// Props: eyebrow (label-caps label above heading), heading (main text),
// description (optional supporting line), align, as (h2|h3), size, className.

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  as: Tag = "h2",
  size = "md",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "";
  const headingClass =
    size === "lg"
      ? "font-display text-2xl sm:text-3xl font-bold text-foreground"
      : "font-display text-lg font-bold text-foreground uppercase tracking-wider";

  return (
    <div className={[alignClass, className].filter(Boolean).join(" ")}>
      {eyebrow && <p className="label-caps mb-2">{eyebrow}</p>}
      <Tag className={headingClass}>{heading}</Tag>
      {description && (
        <p className="text-foreground/60 text-sm mt-2">{description}</p>
      )}
    </div>
  );
}
