import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <h2>
          Projects
          <span className="page-pronunciation">[proj-ekts]</span>
        </h2>

        <p className="page-lead">
         a large undertaking that is usually contemplated or planned
         </p>
      </section>

      <section className="project-grid">
        {projects.map((project) => (
          <article
            key={project.title}
            className={`project-card${project.muted ? " project-card-muted" : ""}`}
          >
            <div className="project-header">
              <p className="project-kicker">
                <i className={`${project.kickerIcon} icon-inline`} aria-hidden="true"></i>
                {project.kicker}
              </p>
              <h2>{project.title}</h2>
            </div>

            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {project.stack ? <p className="project-stack">{project.stack}</p> : null}

            <a href={project.href} target="_blank" rel="noreferrer">
              {project.linkLabel ?? "View on GitHub"}
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
