import { Link } from "react-router-dom";
import LineManifest from "./LineManifest";
import SectionHeader from "./SectionHeader";

export default function MiscellaneousSection() {
  return (
    <section
      id="miscellaneous"
      data-line="orange"
      className="section section-misc"
    >
      <SectionHeader
        color="#E3801C"
        title="Miscellaneous"
        pronunciation="[mis-uh-ley-nee-uhs]"
        definition="a collection of things that do not fit anywhere else."
      />

      <LineManifest lineCode="OR" color="#E3801C" label="ORANGE LINE · ALL STOPS" />

      <div className="misc-strip">
        <article id="photos" className="misc-strip-stop">
          <div className="misc-strip-marker" aria-hidden="true">
            <div className="misc-strip-node" />
          </div>
          <div className="misc-strip-body">
            <header className="misc-strip-head">
              <h3 className="misc-strip-title">Photos</h3>
              <p className="misc-strip-pron">[foh-tohz]</p>
            </header>
            <p className="misc-strip-blurb">
              A small archive of moments — landscapes, travels, and quiet stops.
            </p>
            <Link to="/miscellaneous/photos" className="misc-card-link">
              Browse albums →
            </Link>
          </div>
        </article>

        <article id="clock" className="misc-strip-stop">
          <div className="misc-strip-marker" aria-hidden="true">
            <div className="misc-strip-node" />
          </div>
          <div className="misc-strip-body">
            <header className="misc-strip-head">
              <h3 className="misc-strip-title">Clock</h3>
              <p className="misc-strip-pron">[klok]</p>
            </header>
            <p className="misc-strip-blurb">
              A few cities I care about, in their own time.
            </p>
            <Link to="/miscellaneous/time" className="misc-card-link">
              View clocks →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
