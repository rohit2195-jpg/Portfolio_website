// London-Underground-style roundel. Either a monogram (single glyph) or a
// name bar across the ring. color tints the ring + bar.
export default function Roundel({ color = "#BF0D3E", monogram, label, size = 58 }) {
  return (
    <span className="roundel" style={{ "--roundel-color": color, "--roundel-size": `${size}px` }} aria-hidden="true">
      {monogram ? <span className="roundel-monogram">{monogram}</span> : null}
      {label ? <span className="roundel-bar">{label}</span> : null}
    </span>
  );
}
