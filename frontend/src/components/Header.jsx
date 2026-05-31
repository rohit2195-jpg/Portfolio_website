import { NavLink } from "react-router-dom";
import Roundel from "./transit/Roundel";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Rohit Sattuluri home" end>
        <Roundel color="#BF0D3E" monogram="R" size={48} />
        <span className="brand-text">
          <span className="brand-name">Rohit Sattuluri</span>
          <span className="brand-role">Purdue CS · Pittsburgh, PA</span>
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
