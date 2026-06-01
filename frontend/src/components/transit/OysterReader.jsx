// Contactless fare reader ("tap to ride") — a decorative-but-functional pad that
// taps you into the journey (scrolls to the first section).
export default function OysterReader({ onTap }) {
  return (
    <button type="button" className="oyster-reader" onClick={onTap} aria-label="Tap to ride — go to About">
      <span className="oyster-pad" aria-hidden="true">
        <i className="fa-solid fa-wifi oyster-waves" />
      </span>
      <span className="oyster-text">
        <span className="oyster-title">Tap to Ride</span>
        <span className="oyster-sub">Valid on all lines</span>
      </span>
    </button>
  );
}
