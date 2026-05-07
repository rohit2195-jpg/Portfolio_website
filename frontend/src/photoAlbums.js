const imageModules = import.meta.glob(
  "./assets/photos/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    import: "default",
  },
);

function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getFileName(path) {
  return path.split("/").pop() ?? "";
}

function getAlbumSlug(path) {
  return path.split("/").at(-2) ?? "";
}

const albumMap = new Map();

for (const [path, source] of Object.entries(imageModules)) {
  const albumSlug = getAlbumSlug(path);
  const fileName = getFileName(path);
  const isCover = /^cover\./i.test(fileName);

  if (!albumSlug) {
    continue;
  }

  if (!albumMap.has(albumSlug)) {
    albumMap.set(albumSlug, {
      slug: albumSlug,
      title: toTitleCase(albumSlug),
      coverSrc: "",
      images: [],
    });
  }

  const album = albumMap.get(albumSlug);
  const image = {
    src: source,
    alt: `${album.title} photo ${album.images.length + 1}`,
    name: fileName,
  };

  if (isCover) {
    album.coverSrc = source;
    continue;
  }

  album.images.push(image);
}

export const photoAlbums = [...albumMap.values()]
  .filter((album) => album.coverSrc)
  .map((album) => ({
    ...album,
    images: album.images.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })),
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

export function getPhotoAlbum(albumSlug) {
  return photoAlbums.find((album) => album.slug === albumSlug) ?? null;
}
