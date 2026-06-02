import { Link } from "react-router-dom";

/**
 * Empty state styled as station wayfinding: a diagrammatic notice with an exit
 * pictogram, a clear message, and a route back. Turns "nothing here" into
 * orientation rather than a dead end.
 */
export default function EmptyWayfindingState({
  title = "No service on this platform",
  message,
  action,
  color = "var(--metro-line-orange)",
}) {
  return (
    <section className="wayfind-empty" style={{ "--wf-color": color }}>
      <div className="wayfind-empty__sign" aria-hidden="true">
        <i className="fa-solid fa-triangle-exclamation" />
      </div>
      <p className="wayfind-empty__title">{title}</p>
      {message ? <p className="wayfind-empty__msg">{message}</p> : null}
      {action ? (
        <Link to={action.to} state={action.state} className="wayfind-empty__action">
          <span aria-hidden="true">→</span> {action.label}
        </Link>
      ) : null}
    </section>
  );
}
