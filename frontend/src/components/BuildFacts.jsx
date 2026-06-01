import { useEffect, useState } from "react";
import { fetchRepoFacts, relativeTime, REPO_URL } from "../lib/github";
import { INSPIRATION } from "../data/inspiration";

const DASH = "—";

function StatTile({ label, value, loading }) {
  return (
    <div className="build-stat">
      <span className="build-stat__value">{loading ? "···" : value ?? DASH}</span>
      <span className="build-stat__label">{label}</span>
    </div>
  );
}

export default function BuildFacts() {
  const [facts, setFacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // inspiration item or null

  useEffect(() => {
    let alive = true;
    fetchRepoFacts()
      .then((f) => alive && setFacts(f))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // Esc closes the lightbox.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const commits = facts?.commits != null ? facts.commits.toLocaleString() : null;
  const stars = facts?.stars != null ? facts.stars.toLocaleString() : null;
  const updated = relativeTime(facts?.updated);

  return (
    <div className="build-facts">
      <p className="build-facts__kicker">Live service data · via GitHub</p>
      <div className="build-stats" role="list">
        <StatTile label="Commits" value={commits} loading={loading} />
        <StatTile label="Stars" value={stars} loading={loading} />
        <StatTile label="Last updated" value={updated} loading={loading} />
        <StatTile label="Built with" value={facts?.language} loading={loading} />
      </div>
      <p className="build-facts__repo">
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          <i className="fa-brands fa-github" aria-hidden="true" /> View the source repo
        </a>
      </p>

      <h3 className="build-facts__subhead">Design inspiration</h3>
      <p className="build-facts__sub">
        Transit posters &amp; maps this build borrowed from.
      </p>
      <ul className="build-gallery" aria-label="Design inspiration gallery">
        {INSPIRATION.map((item) => (
          <li key={item.src} className="build-gallery__item">
            <button
              type="button"
              className="build-gallery__btn"
              onClick={() => setLightbox(item)}
              aria-label={`Enlarge: ${item.title}`}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
              <span className="build-gallery__cap">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {lightbox && (
        <div
          className="build-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <figure className="build-lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} />
            <figcaption>
              <strong>{lightbox.title}</strong>
              <span>{lightbox.note}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="build-lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
