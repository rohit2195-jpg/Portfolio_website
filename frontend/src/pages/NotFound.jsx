import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound-stripe" aria-hidden="true" />
      <p className="notfound-kicker">Service Information</p>
      <h1 className="notfound-title">Mind the Gap</h1>
      <p className="notfound-text">
        This platform doesn't exist on the network. The page you're looking for has been
        taken out of service or never opened.
      </p>
      <Link to="/" className="notfound-link">↑ Back to the map</Link>
    </section>
  );
}
