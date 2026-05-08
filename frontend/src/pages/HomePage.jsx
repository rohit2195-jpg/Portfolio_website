export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h2>Portfolio</h2>
          <h1></h1>
          <p className="hero-lead">
            Welcome to my corner of the internet!
            {" "}
            I am a Computer Science student at Purdue University working across
            full-stack development, machine learning, and practical AI applications.
          </p>
        </div>

      </section>

      <section className="content-grid">
        <article className="content-panel">
          <p className="eyebrow">
            <i className="fa-regular fa-star icon-inline" aria-hidden="true"></i>
            What I do
          </p>
          <p>
            I am passionate about building software that has an beneficial impact on daily life 
          </p>
        </article>

        <article className="content-panel">
          <p className="eyebrow">
            <i className="fa-solid fa-seedling icon-inline" aria-hidden="true"></i>
            What I am learning
          </p>
          <p>
            I am continuing to deepen my understanding in machine learning, AI
            applications, systems programming, and data engineering.
          </p>
        </article>

        <article className="content-panel">
          <p className="eyebrow">
            <i className="fa-regular fa-compass icon-inline" aria-hidden="true"></i>
            What to explore
          </p>
          <p>
            Use this site to get a quick view of my background, technical skills,
            project work, and the areas I am actively building in.
          </p>
        </article>
      </section>
    </>
  );
}
