import { Link, Outlet } from "react-router-dom";

export default function Miscellaneous() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <h2>
          Miscellaneous
          <span className="page-pronunciation">[mis-uh-lay-nee-uhs]</span>
        </h2>
        <p className="page-lead">
          a collection of things that do not fit anywhere else.
        </p>
      </section>

      <section className="project-grid" aria-label="Miscellaneous links">
        <Link className="project-card" to="photos">
        <a>
            <i className="fa-regular fa-image icon-inline" aria-hidden="true"></i>
          <h3>Photos</h3>
          </a>
        </Link>

        <Link className="project-card" to="time">
         <i className="fa-regular fa-image icon-inline" area-hidden="true"></i>
         <h3>Time</h3>
       </Link>



      </section>


    </>
  );
}
