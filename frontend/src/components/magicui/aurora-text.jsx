import { cn } from "../../lib/utils";

const DC_METRO_COLORS = [
  "#6950A1",
  "#0072CE",
  "#00B140",
  "#BF0D3E",
  "#E3801C",
  "#FFD200",
  "#6950A1",
];

export function AuroraText({
  children,
  className,
  colors = DC_METRO_COLORS,
  speed = 5,
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={cn(className)}
      style={{
        background: gradient,
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        animation: `aurora-shift ${speed}s ease infinite`,
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}
