import { NavLink } from "react-router-dom";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Rohit Sattuluri home" end>
        <span className="brand-text">
          <span className="brand-name">Rohit Sattuluri</span>
          <span className="brand-role">Purdue CS student</span>
        </span>
      </NavLink>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <i
          className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
          aria-hidden="true"
        ></i>
      </button>
    </header>
  );
}
