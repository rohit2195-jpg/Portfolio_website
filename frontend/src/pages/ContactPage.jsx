export default function ContactPage() {
  return (
    <section className="contact-card">
      <h2>Contact</h2>
      <p className="page-lead">
        The best way to reach me is by email. Thanks for reaching out!
      </p>

      <div className="contact-links">
        <a className="contact-link" href="mailto:rohit.sattuluri@gmail.com">
          <span className="contact-label">
            <i className="fa-regular fa-envelope icon-inline" aria-hidden="true"></i>
            Email
          </span>
          <span className="contact-value">rohit.sattuluri@gmail.com</span>
        </a>
      </div>
    </section>
  );
}
