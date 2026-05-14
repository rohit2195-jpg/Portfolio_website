// Coordinates expressed in the WMATA SVG viewBox (760 wide × 630 tall).
// Hub stations (double-circle) computed from <g transform="translate(tx,ty)">
// with inner center at (219.5+tx, 762.5+ty).
// Regular stations use M cx+5, cy → center = (M_x−5, M_y).
//
// `tier`: "primary" = hub/transfer station (larger marker + bigger label)
//         "secondary" = regular station (smaller marker + smaller label)
// `labelAnchor`: where the label sits relative to the dot.

export const MAP_VIEWBOX = { w: 760, h: 630 };

export const PORTFOLIO_STATIONS = [
  {
    section: "about",
    label: "About",
    pronunciation: "[uh-bout]",
    definition: "a collection of facts regarding a specific entity",
    realName: "Rosslyn",
    color: "#BF0D3E",
    x: 214.3,
    y: 303,
    labelAnchor: "right",
    tier: "primary",
  },
  {
    section: "projects",
    label: "Projects",
    pronunciation: "[proj-ekts]",
    definition: "a large undertaking that is usually contemplated or planned",
    realName: "Metro Center",
    color: "#0072CE",
    x: 374.469,
    y: 312.5,
    labelAnchor: "top",
    tier: "primary",
  },
  {
    section: "timeline",
    label: "Timeline",
    pronunciation: "[tahym-lahyn]",
    definition: "a sequence of related events over a period of time",
    realName: "Fort Totten",
    color: "#00B140",
    x: 457.3,
    y: 157,
    labelAnchor: "right",
    tier: "primary",
  },
  {
    section: "contact",
    label: "Contact",
    pronunciation: "[kon-takt]",
    definition: "a means of communication or connection between people",
    realName: "L'Enfant Plaza",
    color: "#FFD200",
    x: 415.3,
    y: 373,
    labelAnchor: "left",
    tier: "primary",
  },
  {
    section: "photos",
    label: "Photos",
    pronunciation: "[foh-tohz]",
    definition: "images captured and preserved as visual records",
    realName: "Eastern Market",
    color: "#E3801C",
    x: 529.3,
    y: 374,
    labelAnchor: "bottom",
    tier: "secondary",
  },
  {
    section: "clock",
    label: "Clock",
    pronunciation: "[klok]",
    definition: "an instrument for measuring and indicating time",
    realName: "Stadium-Armory",
    color: "#0072CE",
    x: 600.3,
    y: 321,
    labelAnchor: "left",
    tier: "secondary",
  },
];
