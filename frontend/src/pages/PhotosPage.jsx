import { Link } from "react-router-dom";
import ExitSign from "../components/transit/ExitSign";
import EmptyWayfindingState from "../components/transit/EmptyWayfindingState";
import { photoAlbums } from "../photoAlbums";

export default function PhotosPage() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <ExitSign to="/" state={{ scrollTo: "miscellaneous" }} />
        <h2>
          Photos
          <span className="page-pronunciation">[foh-tohz]</span>
        </h2>

        <p className="page-lead">
          A small collection of albums. Open any album to browse the full set.
        </p>
      </section>

      {photoAlbums.length ? (
        <section className="album-grid" aria-label="Photo albums">
          {photoAlbums.map((album) => (
            <Link key={album.slug} className="album-card" to={album.slug}>
              <div className="album-cover-frame">
                <img className="album-cover" src={album.coverSrc} alt={`${album.title} cover`} />
              </div>

              <div className="album-copy">
                <p className="album-meta">
                  <i className="fa-regular fa-images icon-inline" aria-hidden="true"></i>
                  {album.images.length} {album.images.length === 1 ? "photo" : "photos"}
                </p>
                <h3>{album.title}</h3>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <EmptyWayfindingState
          title="No albums in service"
          message="This route has no albums running right now. Take the transfer back to Miscellaneous for other destinations."
          action={{ to: "/", state: { scrollTo: "miscellaneous" }, label: "Transfer to Miscellaneous" }}
        />
      )}
    </>
  );
}
