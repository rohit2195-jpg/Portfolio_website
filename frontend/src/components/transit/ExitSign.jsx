import { Link } from "react-router-dom";

/**
 * Emergency-exit "running man" sign used as the back / way-out control on
 * sub-pages (Settings, Photos, Time, photo albums). White pictogram + EXIT
 * wording + left arrow on the Metro green field, styled after ISO 7010 / NYC
 * exit signage.
 *
 * Props:
 *   to     – router target (default "/")
 *   state  – optional router location state (e.g. { scrollTo: "miscellaneous" })
 *   label  – wording (default "EXIT")
 */
export default function ExitSign({ to = "/", state, label = "EXIT", className = "" }) {
  return (
    <Link
      to={to}
      state={state}
      className={`exit-sign ${className}`.trim()}
      aria-label={`${label} — back`}
    >
      <i className="fa-solid fa-arrow-left exit-sign__arrow" aria-hidden="true" />
      <svg
        className="exit-sign__man"
        viewBox="0 0 24 26"
        aria-hidden="true"
        focusable="false"
      >
        {/* running figure (Material "directions_run" silhouette) */}
        <path
          fill="currentColor"
          d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4
             2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3
             0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
        />
        {/* doorway post */}
        <rect x="20.4" y="1.5" width="2.4" height="23" rx="1" fill="currentColor" opacity="0.92" />
      </svg>
      <span className="exit-sign__text">{label}</span>
    </Link>
  );
}
