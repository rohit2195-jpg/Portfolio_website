import DictionaryHeader from "./DictionaryHeader";
import LineHeader from "./LineHeader";
import Roundel from "../transit/Roundel";

export default function SectionHeader({
  color,
  title,
  pronunciation,
  definition,
}) {
  return (
    <div className="section-header">
      <div className="section-header-row">
        <Roundel color={color} monogram={title.charAt(0)} size={46} />
        <LineHeader color={color} />
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
