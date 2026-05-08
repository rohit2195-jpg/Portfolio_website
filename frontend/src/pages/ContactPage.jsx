import resumePdf from "../assets/Rohit_Sattuluri_Resume.pdf";

export default function ContactPage() {
  return (
    <section className="contact-card">
      <h2>Contact</h2>
      <p className="page-lead">
        an establishing of communication with someone.
      </p>

      <div className="contact-links">
        <a className="contact-link" href="mailto:rohit.sattuluri@gmail.com">
          <span className="contact-label">
            <i className="fa-regular fa-envelope icon-inline" aria-hidden="true"></i>
            Email
          </span>
          <span className="contact-value">rohit.sattuluri@gmail.com</span>
        </a>

        <a className="contact-link" href="https://github.com/rohit2195-jpg">
          <span className="contact-label">
            <i className="fa-brands fa-github" aria-hidden="true"></i>
            Github
          </span>
          <span className="contact-value"> https://github.com/rohit2195-jpg</span>
        </a>

        <a className="contact-link" href="https://www.linkedin.com/in/rohit-sattuluri/">
          <span className="contact-label">
            <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
             Linkedin 
          </span>
          <span className="contact-value">https://www.linkedin.com/in/rohit-sattuluri/ </span>
        </a>

        <span className="contact-link"> 
           <i className="fa-solid fa-file" aria-hidden="true"></i>
          <a href={resumePdf} download="Rohit_Sattuluri_Resume.pdf"> Resume </a>
        </span>



      </div>


    </section>
  );
}
