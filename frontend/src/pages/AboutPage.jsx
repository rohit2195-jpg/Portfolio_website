import { skills, coursework } from "../data/about";
import { experience, leadership } from "../data/timeline";

export default function AboutPage() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <h2>
          About
          <span className="page-pronunciation">[uh-bout]</span>
        </h2>

        <p className="page-lead">a collection of facts regarding a specific entity</p>


      </section>

      <section className="stacked-sections">
        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-lightbulb icon-inline" aria-hidden="true"></i>
            Technical skills
          </p>
          <div className="definition-list">
            <div className="definition-item">
              <h2>Languages</h2>
              <p>{skills.languages.map((s) => s.name).join(", ")}</p>
            </div>
            <div className="definition-item">
              <h2>Frameworks &amp; libraries</h2>
              <p>{skills.libraries.map((s) => s.name).join(", ")}</p>
            </div>
            <div className="definition-item">
              <h2>Tools</h2>
              <p>{skills.tools.map((s) => s.name).join(", ")}</p>
            </div>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-lightbulb icon-inline" aria-hidden="true"></i>
            CourseWork
          </p>
          <div className="definition-list">
            <div className="definition-item">
              <h2>Courses </h2>
              <p>{coursework.join(", ")}</p>
            </div>
          </div>
        </article>


        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-briefcase icon-inline" aria-hidden="true"></i>
            Experience
          </p>
          <div className="timeline">
            {experience.map((item) => (
              <section key={item.title + item.company} className="timeline-item">
                <div className="timeline-heading">
                  <h2>{item.title}, {item.company}</h2>
                  <p>{item.location}</p>
                </div>
                <p className="timeline-meta">{item.dateRange}</p>
                {item.bullets.length === 1 ? (
                  <p>{item.bullets[0]}</p>
                ) : (
                  <ul className="detail-list">
                    {item.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-handshake icon-inline" aria-hidden="true"></i>
            Leadership
          </p>
          <div className="timeline">
            {leadership.map((item) => (
              <section key={item.title + item.company} className="timeline-item">
                <div className="timeline-heading">
                  <h2>{item.title}, {item.company}</h2>
                  <p>{item.location}</p>
                </div>
                <p className="timeline-meta">{item.dateRange}</p>
                <ul className="detail-list">
                  {item.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-heart icon-inline" aria-hidden="true"></i>
            Interests
          </p>
          <p>
            I enjoy building practical software that combines clean engineering with
            data and machine learning. I am especially interested in AI applications,
            predictive systems, analytics, and full-stack products that help people
            make better decisions.
          </p>
        </article>
      </section>
    </>
  );
}
