// NYC-MetroCard-style fare card (goldenrod, cut corner, blue ink) used as a
// "business card" in the Contact section.
export default function MetroCard({ name, subtitle, serial }) {
  return (
    <div className="metrocard" aria-label={`${name} fare card`}>
      <div className="metrocard-row metrocard-row--top">
        <span className="metrocard-brand">FARECARD</span>
        <span className="metrocard-chip" aria-hidden="true" />
      </div>
      <div className="metrocard-body">
        <span className="metrocard-name">{name}</span>
        {subtitle ? <span className="metrocard-sub">{subtitle}</span> : null}
      </div>
      <div className="metrocard-row metrocard-row--foot">
        <span className="metrocard-valid">VALID FOR TRAVEL</span>
        {serial ? <span className="metrocard-serial">{serial}</span> : null}
      </div>
    </div>
  );
}
