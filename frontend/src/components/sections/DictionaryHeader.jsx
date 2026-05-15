import FadeIn from "../FadeIn";

export default function DictionaryHeader({ title, pronunciation, definition, color }) {
  return (
    <FadeIn as="header" className="dictionary-header">
      <div className="station-sign" style={{ "--sign-color": color }}>
        <span className="station-sign-label" aria-hidden="true">STATION</span>
        <h2 className="dictionary-title station-sign-title">{title}</h2>
      </div>
      {pronunciation && (
        <span className="dictionary-pron" aria-hidden="true">
          {pronunciation}
        </span>
      )}
      {definition && <p className="dictionary-def">{definition}</p>}
    </FadeIn>
  );
}
