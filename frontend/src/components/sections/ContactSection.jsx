import resumePdf from "../../assets/Rohit_Sattuluri_Resume.pdf";
import SectionHeader from "./SectionHeader";
import MetroCard from "../transit/MetroCard";

const CONTACTS = [
  {
    icon: "fa-regular fa-envelope",
    label: "Email",
    value: "rohit.sattuluri@gmail.com",
    href: "mailto:rohit.sattuluri@gmail.com",
    platform: "A1",
  },
  {
    icon: "fa-brands fa-github",
    label: "GitHub",
    value: "github.com/rohit2195-jpg",
    href: "https://github.com/rohit2195-jpg",
    platform: "B2",
  },
  {
    icon: "fa-brands fa-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rohit-sattuluri",
    href: "https://www.linkedin.com/in/rohit-sattuluri/",
    platform: "C3",
  },
  {
    icon: "fa-solid fa-file",
    label: "Resume",
    value: "Rohit_Sattuluri_Resume.pdf",
    href: resumePdf,
    download: "Rohit_Sattuluri_Resume.pdf",
    platform: "D4",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" data-line="yellow" className="section section-contact">
      <SectionHeader
        color="#FFD200"
        title="Contact"
        pronunciation="[kon-takt]"
        definition="an establishing of communication with someone"
      />

      <MetroCard name="Rohit Sattuluri" subtitle="Software Engineer" serial="No. 2195" />

      <div className="contact-board-wrapper">
        <div className="station-entrance-sign" aria-hidden="true">
          <span className="station-entrance-arrow">↓</span>
          <span className="station-entrance-text">YELLOW LINE · CONTACT PLATFORM</span>
        </div>
        <div className="departure-board">
        <div className="departure-board-header" aria-hidden="true">
          <span className="departure-board-col">ROUTE</span>
          <span className="departure-board-col">DESTINATION</span>
          <span className="departure-board-col departure-board-col--platform">PLATFORM</span>
        </div>
        <div className="contact-list">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              className="contact-row"
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              download={c.download}
            >
              <span className="departure-route-badge" aria-hidden="true">
                <i className={c.icon} />
              </span>
              <span className="contact-row-text">
                <span className="contact-row-label">{c.label}</span>
                <span className="contact-row-value">{c.value}</span>
              </span>
              <span className="departure-platform" aria-hidden="true">
                <span className="departure-platform-code">{c.platform}</span>
                <span className="departure-platform-dot" />
              </span>
            </a>
          ))}
        </div>
        <div className="departure-board-footer" aria-hidden="true">
          ROHIT SATTULURI · DEPARTURES
        </div>
      </div>
      </div>
    </section>
  );
}
