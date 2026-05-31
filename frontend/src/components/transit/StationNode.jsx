// A metro station node. variant: "tick" (normal) | "interchange" | "terminus".
export default function StationNode({ variant = "tick", color, className = "", style = {} }) {
  return (
    <span
      className={`station-node station-node--${variant} ${className}`}
      style={{ "--node-color": color, ...style }}
      aria-hidden="true"
    />
  );
}
