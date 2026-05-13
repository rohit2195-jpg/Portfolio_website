// Coordinates expressed in the WMATA SVG viewBox (760 wide × 630 tall).
// Pulled directly from the station-circle path data in wmata-map.svg.
//
// `labelAnchor`: where the portfolio label sits relative to the station dot.
//   "right" | "left" | "top" | "bottom"

export const MAP_VIEWBOX = { w: 760, h: 630 };

export const PORTFOLIO_STATIONS = [
  {
    section: "about",
    label: "About",
    pronunciation: "[uh-bout]",
    realName: "Dupont Circle",
    x: 294,
    y: 200,
    labelAnchor: "right",
  },
  {
    section: "projects",
    label: "Projects",
    pronunciation: "[proj-ekts]",
    realName: "Metro Center",
    x: 374.5,
    y: 312.5,
    labelAnchor: "top",
  },
  {
    section: "timeline",
    label: "Timeline",
    pronunciation: "[tahym-lahyn]",
    realName: "U Street",
    x: 403,
    y: 232,
    labelAnchor: "right",
  },
  {
    section: "photos",
    label: "Photos",
    pronunciation: "[foh-tohz]",
    realName: "Eastern Market",
    x: 534,
    y: 374,
    labelAnchor: "bottom",
  },
  {
    section: "clock",
    label: "Clock",
    pronunciation: "[klok]",
    realName: "Union Station",
    x: 498,
    y: 312,
    labelAnchor: "right",
  },
  {
    section: "contact",
    label: "Contact",
    pronunciation: "[kon-takt]",
    realName: "L'Enfant Plaza",
    x: 415.3,
    y: 373,
    labelAnchor: "left",
  },
];
