import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExitSign from "../components/transit/ExitSign";
import { getPhotoAlbum } from "../photoAlbums";

export default function PhotoAlbumPage() {
  const { albumSlug } = useParams();
  const album = getPhotoAlbum(albumSlug ?? "");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(null);
  }, [albumSlug]);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % album.images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + album.images.length) % album.images.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, album]);

  if (!album) {
    return (
      <section className="empty-state">
        <p className="eyebrow">
          <i className="fa-regular fa-image icon-inline" aria-hidden="true"></i>
          Album not found
        </p>
        <p>
          The album you requested does not exist or is missing a cover image.
          <br />
          <Link to="/miscellaneous/photos">Return to all photos</Link>
        </p>
      </section>
    );
  }

  const activeImage = activeIndex === null ? null : album.images[activeIndex];

  return (
    <>
      <section className="page-intro page-intro-compact">
        <ExitSign to="/miscellaneous/photos" />
        <h2>{album.title}</h2>

        <p className="page-lead">
          {album.images.length} {album.images.length === 1 ? "photo" : "photos"} in this album.
        </p>
      </section>

      {album.images.length ? (
        <section className="photo-grid" aria-label={`${album.title} photo gallery`}>
          {album.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="photo-tile"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open photo ${index + 1} from ${album.title}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <p className="eyebrow">
            <i className="fa-regular fa-images icon-inline" aria-hidden="true"></i>
            Empty album
          </p>
          <p>Add image files to this album folder and they will appear here automatically.</p>
        </section>
      )}

      {activeImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${album.title} viewer`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image viewer"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>

          {album.images.length > 1 ? (
            <button
              type="button"
              className="lightbox-nav lightbox-nav-prev"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((activeIndex - 1 + album.images.length) % album.images.length);
              }}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
          ) : null}

          <figure
            className="lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeImage.src} alt={activeImage.alt} />
            <figcaption>
              {activeIndex + 1} / {album.images.length}
            </figcaption>
          </figure>

          {album.images.length > 1 ? (
            <button
              type="button"
              className="lightbox-nav lightbox-nav-next"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((activeIndex + 1) % album.images.length);
              }}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
