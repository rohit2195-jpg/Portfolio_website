// Curated transit-design posters that inspired this build. Imported so Vite
// fingerprints + base-paths them correctly (don't hardcode /assets URLs).
import vignelli from "../assets/inspiration/vignelli.jpg";
import helvetica from "../assets/inspiration/helvetica.jpg";
import warsawOla from "../assets/inspiration/warsaw-ola.jpg";
import tubeBauhaus from "../assets/inspiration/tube-bauhaus.jpg";
import tombolare from "../assets/inspiration/tombolare.jpg";
import nycConcept from "../assets/inspiration/nyc-concept.jpg";
import rmNeueNyc from "../assets/inspiration/rm-neue-nyc.jpg";
import db1963 from "../assets/inspiration/db-1963.jpg";

export const INSPIRATION = [
  { src: vignelli, title: "Massimo Vignelli", note: "NYC subway diagram — line weight & color discipline" },
  { src: helvetica, title: "Helvetica as a Metro Map", note: "Type weights drawn as transit lines" },
  { src: nycConcept, title: "New York, 2012", note: "Waterhouse Cifuentes — macro map photography" },
  { src: rmNeueNyc, title: "RM Neue NYC System", note: "Route bullets, MetroCard & signage grammar" },
  { src: tubeBauhaus, title: "Tube — Bauhaus", note: "Route arcs as spatial architecture" },
  { src: warsawOla, title: "Metro — Ola Jasionowska", note: "Hard geometry & train-window thumbnails" },
  { src: db1963, title: "Deutsche Bundesbahn, 1963", note: "Destination lists & locomotive wedge" },
  { src: tombolare, title: "Tombolare", note: "Night-train atmosphere → dark mode" },
];
