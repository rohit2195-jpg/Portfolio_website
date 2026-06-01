import DictionaryHeader from "./DictionaryHeader";
import LineHeader from "./LineHeader";

export default function SectionHeader({
  color,
  title,
  pronunciation,
  definition,
}) {
  return (
    <div className="section-header">
      <div className="section-header-row">
        <LineHeader color={color} letter={title.charAt(0)} />
        <DictionaryHeader
          color={color}
          title={title}
          pronunciation={pronunciation}
          definition={definition}
        />
      </div>
    </div>
  );
}
