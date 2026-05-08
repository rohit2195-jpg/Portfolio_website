import { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function AnalogWorldClock({ city, timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert current time to the target timezone
  const targetTime = new Date(time.toLocaleString('en-US', { timeZone: timezone }));
  return (
    <div className="clock-container">
      <p>{city}</p>
      <div className="clock-frame">
        <Clock className="world-clock" value={targetTime} size={150} />
      </div>
    </div>
  );
}
