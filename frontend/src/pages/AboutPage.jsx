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
              <p>Python, Java, C/C++, SQL, JavaScript/TypeScript, R, HTML/CSS</p>
            </div>
            <div className="definition-item">
              <h2>Frameworks &amp; libraries</h2>
              <p>
                React, Flask, Node.js, Pandas, NumPy, Scikit-Learn, PyTorch,
                TensorFlow, LangChain
              </p>
            </div>
            <div className="definition-item">
              <h2>Tools</h2>
              <p>Git, AWS, Firebase, VS Code, Ubuntu, LaTeX, Microsoft Office</p>
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
<p> Data Engineering in Python, Object-Oriented
          Programming in Java, Programming in C, Great Issues in Computer Science,
          Computer Architecture, Data Structures and Algorithms, Systems Programming,
          and Information Systems. </p>
            </div>
          </div>
        </article>


        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-briefcase icon-inline" aria-hidden="true"></i>
            Experience
          </p>
          <div className="timeline">
            <section className="timeline-item">
              <div className="timeline-heading">
                <h2>Incoming Technology Intern, Duke Energy</h2>
                <p>Charlotte, NC</p>
              </div>
              <p className="timeline-meta">May 2026 - Aug 2026</p>
              <p>Incoming role.</p>
            </section>

            <section className="timeline-item">
              <div className="timeline-heading">
                <h2>Machine Learning Researcher, The Data Mine - Purdue University</h2>
                <p>West Lafayette, IN</p>
              </div>
              <p className="timeline-meta">Aug 2025 - Present</p>
              <ul className="detail-list">
                <li>
                  Collaborating with Johnson &amp; Johnson to automate departmental
                  budget and invoice reports by integrating financial data pipelines
                  directly into Power BI.
                </li>
                <li>
                  Designing interactive dashboards in Power BI to visualize budgets,
                  invoices, and committed spending, enabling faster financial tracking
                  across departments.
                </li>
              </ul>
            </section>

            <section className="timeline-item">
              <div className="timeline-heading">
                <h2>Software Developer Intern, Eaton Corporation</h2>
                <p>Pittsburgh, PA</p>
              </div>
              <p className="timeline-meta">Dec 2023 - Feb 2024</p>
              <ul className="detail-list">
                <li>
                  Developed a full-stack web application using Node.js, HTML, CSS,
                  and JavaScript to generate customized power meter recommendations.
                </li>
                <li>
                  Designed and implemented a centralized database of 12 power meters,
                  consolidating technical specifications into one source.
                </li>
              </ul>
            </section>
          </div>
        </article>

        <article className="section-card">
          <p className="eyebrow">
            <i className="fa-regular fa-handshake icon-inline" aria-hidden="true"></i>
            Leadership
          </p>
          <div className="timeline">
            <section className="timeline-item">
              <div className="timeline-heading">
                <h2>Resident Hall Advisor, Foundation for Free Enterprise Education</h2>
                <p>Williamsport, PA</p>
              </div>
              <p className="timeline-meta">June 2025 - Aug 2025</p>
              <ul className="detail-list">
                <li>
                  Supervised students during meals, free time, and overnight hours and
                  responded to unexpected situations, including medical emergencies.
                </li>
                <li>
                  Processed keys, prepared dorms, and organized materials to support
                  smooth day-to-day operations.
                </li>
              </ul>
            </section>

            <section className="timeline-item">
              <div className="timeline-heading">
                <h2>Summer Camp Counselor, Mt. Lebanon Parks &amp; Recreation</h2>
                <p>Pittsburgh, PA</p>
              </div>
              <p className="timeline-meta">Jun 2024 - Aug 2024</p>
              <ul className="detail-list">
                <li>
                  Supervised and engaged campers in daily activities while helping
                  maintain a safe, inclusive, and positive environment.
                </li>
                <li>
                  Collaborated with staff on a six-week program that supported camper
                  growth and development.
                </li>
              </ul>
            </section>
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
