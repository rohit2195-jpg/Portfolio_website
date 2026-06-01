export default function Footer() {
  return (
    <footer className="site-footer tactile">
      <div className="eol-terminus" aria-hidden="true">
        <span className="eol-bar" />
        <span className="eol-text">END OF LINE</span>
        <span className="eol-bar" />
      </div>
      <p className="safety-slogans" aria-hidden="true">
        Mind the gap · Stand on the right · See it. Say it. Sorted. · Mind the closing doors
      </p>
      <p className="eol-credit">
        ROHIT SATTULURI &nbsp;&middot;&nbsp; &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
