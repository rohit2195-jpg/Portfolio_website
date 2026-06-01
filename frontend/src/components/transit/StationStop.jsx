// Bold mid-century "Next Stop" poster panel that doubles as a station on the
// page's route line. Sits between content sections.
export default function StationStop({ color, destination, lineName }) {
  return (
    <div className="station-stop" style={{ "--stop-color": color }} aria-hidden="true">
      <span className="station-stop-rail station-stop-rail--in" />
      <div className="station-stop-poster">
        <span className="station-stop-node" />
        <div className="station-stop-text">
          <span className="station-stop-kicker">● Next Stop</span>
          <span className="station-stop-name">{destination}</span>
          <span className="station-stop-line">{lineName}</span>
        </div>
      </div>
      <span className="station-stop-rail station-stop-rail--out" />
    </div>
  );
}
