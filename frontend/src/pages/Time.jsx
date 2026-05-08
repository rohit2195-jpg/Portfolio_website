import AnalogWorldClock  from '../components/Clock.jsx'

export default function Miscellaneous() {
  return (
    <>
    <div className="clock-grid">
      <AnalogWorldClock city="London" timezone="Europe/London" />
      <AnalogWorldClock city="New York" timezone="America/New_York" />
      <AnalogWorldClock city="Tokyo" timezone="Asia/Tokyo" />
      <AnalogWorldClock city="San Francisco" timezone="America/Los_Angeles" />
      <AnalogWorldClock city="Dubai" timezone="Asia/Dubai" />
      <AnalogWorldClock city="Local Time" timezone={Intl.DateTimeFormat().resolvedOptions().timeZone} />
    </div>

    </>
  );
}
