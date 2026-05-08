export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h2>Portfolio</h2>
          <h1></h1>
          
          <p className="hero-lead">
            a curated collection of materials or work compiled over a period of time
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
            I am a Computer Science student at Purdue University and continuing to deepen my understanding in machine learning, AI applications, systems programming, and data engineering.
          </p>
        </article>

        <article className="content-panel">
          <p className="eyebrow">
            <i className="fa-regular fa-compass icon-inline" aria-hidden="true"></i>
            What to explore
          </p>
          <p>
            Check out this website to view my background, technical skills,
            project work, and the areas I am actively building in.
          </p>
        </article>
      </section>
    </>
  );
}
