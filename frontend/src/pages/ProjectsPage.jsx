const projects = [
  {
    kickerIcon: "fa-regular fa-star",
    kicker: "Featured build",
    title: "Veritas - AI Financial Assistant",
    description: [
      "Built a secure full-stack budgeting application with React, Flask, Firebase Auth, PostgreSQL, and AWS that helps users track and analyze personal spending through a personalized dashboard with spending breakdowns, trends, and charts.",
      "Implemented an LLM-powered transaction parsing and categorization system that reached 92% accuracy against manual labels on a test set, and created a RAG-based conversational assistant for custom finance Q&A.",
    ],
    stack: "ReactJS, Python, PostgreSQL, AWS, Firebase",
    href: "https://github.com/rohit2195-jpg",
  },
  {
    kickerIcon: "fa-regular fa-clock",
    kicker: "Real-time systems",
    title: "NYC Subway Tracker",
    description: [
      "Developed a live tracking system using the MTA API and static transit datasets to gather real-time updates on more than 500 trains and estimate train positions every three seconds using linear interpolation.",
      "Optimized distance calculations with the Haversine formula, reducing update time and improving efficiency by 85%.",
    ],
    stack: "JavaScript, Python",
    href: "https://github.com/rohit2195-jpg",
  },
  {
    kickerIcon: "fa-solid fa-brain",
    kicker: "Machine learning",
    title: "Airport Wait Time Predictor",
    description: [
      "Engineered machine learning models including Gradient Boosting, Neural Networks, and Decision Trees on more than 200,000 rows of passenger data to predict airport wait times.",
      "Designed holiday-based feature engineering that improved R² by 10%, uncovered key congestion patterns, and supported a full-stack prototype built with Flask and JavaScript/HTML for real-time predictions.",
    ],
    stack: "JavaScript, Python, Flask, HTML",
    href: "https://github.com/rohit2195-jpg",
  },
  {
    kickerIcon: "fa-regular fa-music",
    kicker: "Experimental app",
    title: "Music Translator App",
    description: [
      "Created a live real-time translation experience connected to Spotify playback to help listeners understand songs as they play.",
      "Used Google Translate and AI-assisted translation to improve the quality of meanings and contextual definitions.",
    ],
    href: "https://github.com/rohit2195-jpg",
  },
  {
    kickerIcon: "fa-regular fa-map",
    kicker: "Decision-support",
    title: "Catapult 2026",
    description: [
      "Site Scouter is a map-first decision-support tool for analyzing a user-selected polygon and recommending subregions for solar panels, wind turbines, and data centers.",
    ],
    stack: "Repository: Reversal9/catapult2026",
    href: "https://github.com/Reversal9/catapult2026",
  },
  {
    kickerIcon: "fa-regular fa-folder-open",
    kicker: "More work",
    title: "Additional projects and experiments",
    description: [
      "I have additional builds beyond the projects listed here, including work across software engineering, machine learning, and personal technical interests.",
    ],
    href: "https://github.com/rohit2195-jpg",
    muted: true,
    linkLabel: "Browse GitHub",
  },
];

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
