import { Link } from "react-router-dom";
import { photoAlbums } from "../photoAlbums";

export default function PhotosPage() {
  return (
    <>
      <section className="page-intro page-intro-compact">
        <h2>Photos</h2>

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
        <section className="empty-state">
          <p className="eyebrow">
            <i className="fa-regular fa-folder-open icon-inline" aria-hidden="true"></i>
            No albums yet
          </p>
          <p>
            Add folders under <code>frontend/src/assets/photos</code>, include a{" "}
            <code>cover.jpg</code> or similar file in each one, and the albums will
            appear here automatically.
          </p>
        </section>
      )}
    </>
  );
}
