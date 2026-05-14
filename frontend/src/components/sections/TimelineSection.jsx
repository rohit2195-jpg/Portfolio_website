import { experience, leadership } from "../../data/timeline";
import LineManifest from "./LineManifest";
import SectionHeader from "./SectionHeader";

function StationEntry({ item }) {
  const isCurrent = item.dateRange.toLowerCase().includes("present");
  const isIncoming = item.title.toLowerCase().includes("incoming");
  return (
    <article className="timeline-entry">
      <div className="timeline-entry-marker" aria-hidden="true">
        <span className="timeline-entry-ring">
          <span className="timeline-entry-ring-inner" />
        </span>
      </div>
      <div className="timeline-entry-body">
        <div className="timeline-entry-codes">
          <span className="timeline-entry-date">{item.dateRange}</span>
          {isCurrent && (
            <span className="timeline-entry-status timeline-entry-status--now">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              {" Now"}
            </span>
          )}
          {isIncoming && (
            <span className="timeline-entry-status timeline-entry-status--incoming">
              <i className="fa-solid fa-arrow-up" aria-hidden="true" />
              {" Incoming"}
            </span>
          )}
        </div>
        <h4 className="timeline-entry-title">
          {item.title}, {item.company}
        </h4>
        {item.location && (
          <p className="timeline-entry-location">{item.location}</p>
        )}
        {item.bullets.length === 1 ? (
          <p className="timeline-entry-text">{item.bullets[0]}</p>
        ) : (
          <ul className="timeline-entry-list">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function TimelineGroup({ heading, items, variant }) {
  return (
    <div className="timeline-group" data-variant={variant}>
      <h3 className="timeline-group-heading">
        <span className="timeline-group-text">{heading}</span>
      </h3>
      <div className="timeline-track">
        {items.map((item) => (
          <StationEntry
            key={`${item.title}-${item.company}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section id="timeline" data-line="green" className="section section-timeline">
      <SectionHeader
        color="#00B140"
        title="Timeline"
        pronunciation="[tahym-lahyn]"
        definition="a sequence of related events over a period of time"
      />

      <LineManifest lineCode="GR" color="#00B140" label="GREEN LINE · ALL STOPS" />
      <TimelineGroup heading="Experience" items={experience} variant="experience" />

      <div className="timeline-transfer" aria-hidden="true" />

      <TimelineGroup heading="Leadership" items={leadership} variant="leadership" />
    </section>
  );
}
