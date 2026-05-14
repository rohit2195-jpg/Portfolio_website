import Clock from "../components/Clock";
import BackToMap from "../components/sections/BackToMap";

const CITIES = [
  { city: "Pittsburgh", timezone: "America/New_York" },
  { city: "London", timezone: "Europe/London" },
  { city: "Tokyo", timezone: "Asia/Tokyo" },
  { city: "San Francisco", timezone: "America/Los_Angeles" },
  { city: "Dubai", timezone: "Asia/Dubai" },
  { city: "Local Time", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
];

export default function Time() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <h2>
          Clock
          <span className="page-pronunciation">[klok]</span>
        </h2>
        <p className="page-lead">
          A few cities I care about, in their own time.
        </p>
      </section>

      <div className="misc-clock-grid misc-clock-grid--page">
        {CITIES.map(({ city, timezone }) => (
          <Clock key={city} city={city} timezone={timezone} />
        ))}
      </div>
      <BackToMap />
    </>
  );
}
