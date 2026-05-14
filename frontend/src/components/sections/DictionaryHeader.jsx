import FadeIn from "../FadeIn";

export default function DictionaryHeader({ title, pronunciation, definition }) {
  return (
    <FadeIn as="header" className="dictionary-header">
      <h2 className="dictionary-title">{title}</h2>
      {pronunciation && (
        <span className="dictionary-pron" aria-hidden="true">
          {pronunciation}
        </span>
      )}
      {definition && <p className="dictionary-def">{definition}</p>}
    </FadeIn>
  );
}
