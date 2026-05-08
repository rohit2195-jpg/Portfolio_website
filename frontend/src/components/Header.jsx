import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Home",
    regularIcon: "fa-regular fa-house",
    solidIcon: "fa-solid fa-house",
    end: true,
  },
  {
    to: "/about",
    label: "About",
    regularIcon: "fa-regular fa-user",
    solidIcon: "fa-solid fa-user",
  },
  {
    to: "/projects",
    label: "Projects",
    regularIcon: "fa-regular fa-folder-open",
    solidIcon: "fa-solid fa-folder-open",
  },
  {
    to: "/contact",
    label: "Contact",
    regularIcon: "fa-regular fa-envelope",
    solidIcon: "fa-solid fa-envelope",
  },
  {
    to: "/miscellaneous",
    label: "Miscellaneous",
    regularIcon: "fa-regular fa-image",
    solidIcon: "fa-solid fa-image",
  },
];

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Rohit Sattuluri home" end>
        <span className="brand-text">
          <span className="brand-name">Rohit Sattuluri</span>
          <span className="brand-role">Purdue CS student</span>
        </span>
      </NavLink>

      <div className="site-header-controls">
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map(({ to, label, regularIcon, solidIcon, end }) => (
            <NavLink key={label} to={to} aria-label={label} title={label} end={end}>
              {({ isActive }) => (
                <>
                  <i
                    className={`${regularIcon} nav-icon nav-icon-regular`}
                    aria-hidden="true"
                    data-active={isActive ? "false" : "true"}
                  />
                  <i
                    className={`${solidIcon} nav-icon nav-icon-solid`}
                    aria-hidden="true"
                    data-active={isActive ? "true" : "false"}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

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
      </div>
    </header>
  );
}
