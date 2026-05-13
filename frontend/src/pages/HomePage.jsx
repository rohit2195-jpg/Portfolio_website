import MetroMap from "../components/MetroMap/MetroMap";

export default function HomePage() {
  const handleNavigate = (section) => {
    console.log("Navigate to section:", section);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h2>
            Portfolio
            <span className="page-pronunciation">[pawrt-foh-lee-oh]</span>
          </h2>
          <p className="hero-lead">
            a curated collection of materials or work compiled over a period of time
          </p>
        </div>
      </section>

      <MetroMap onNavigateToSection={handleNavigate} />
    </>
  );
}
