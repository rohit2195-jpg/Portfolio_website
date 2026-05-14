// To attach a screenshot to a project: drop the file in `src/assets/projects/`
// (e.g. `airport.png`), import it at the top of this file, and set `image: <import>`
// on the project. Without an `image`, the card falls back to the gradient + kicker icon.

import musicTranslatorImg from "../assets/projects/music-translator.png";
import nycSubwayImg from "../assets/projects/nyc-subway.png";
import siteScouterImg from "../assets/projects/site-scouter.png";

export const projects = [
  {
    kickerIcon: "fa-solid fa-brain",
    title: "Airport Wait Time Predictor",
    description: [
      "This project is a machine learning-powered airport wait time prediction system that uses models like XGBoost and custom feature engineering to deliver accurate real-time congestion forecasts from large-scale passenger data.",
    ],
    stack: "JavaScript, Python, Flask, HTML",
    repoHref: "https://github.com/rohit2195-jpg/Airport-Wait-Time-Predictor",
  },
  {
    kickerIcon: "fa-regular fa-star",
    title: "Veritas - AI Financial Assistant",
    description: [
      "Veritas-AI_Accountant is a personal finance platform that utilizes LLMs to automatically categorize, analyze, and visualize spending data for individuals and organizations.",
    ],
    stack: "ReactJS, Python, PostgreSQL, AWS, Firebase",
    repoHref: "https://github.com/rohit2195-jpg/Veritas-AI_Accountant",
  },
  {
    kickerIcon: "fa-regular fa-map",
    title: "Site Scouter",
    description: [
      "Site Scouter is a map-first decision-support tool for analyzing a user-selected polygon and recommending subregions for solar panels, wind turbines, and data centers.",
    ],
    stack: "Python, JavaScript",
    repoHref: "https://github.com/Reversal9/catapult2026",
    image: siteScouterImg,
  },
  {
    kickerIcon: "fa-regular fa-music",
    title: "Music Translator App",
    description: [
      "This project delivers a real-time Spotify lyric translation experience that uses Google Translate and AI-assisted translation to provide listeners with more accurate meanings and contextual interpretations as songs play.",
    ],
    stack: "React, TypeScript, Node.js, AWS S3",
    repoHref: "https://github.com/rohit2195-jpgi/Music-Translator",
    liveHref: "https://dukz8h8o1lsds.cloudfront.net",
    image: musicTranslatorImg,
  },
  {
    kickerIcon: "fa-regular fa-clock",
    title: "NYC Subway Tracker",
    description: [
      "This project is a real-time NYC subway tracking system that uses MTA API data, interpolation algorithms, and interactive maps to estimate and visualize live train locations across the city.",
    ],
    stack: "JavaScript, Python",
    repoHref: "https://github.com/rohit2195-jpg/NYC-subway-tracker",
    image: nycSubwayImg,
  },
  {
    kickerIcon: "fa-regular fa-folder-open",
    title: "Additional projects",
    description: [
      "I have additional builds beyond the projects listed here, including work across software engineering, machine learning, and personal technical interests.",
    ],
    repoHref: "https://github.com/rohit2195-jpg",
    muted: true,
    linkLabel: "Browse GitHub",
  },
];
