import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const THEME_STORAGE_KEY = "portfolio-theme";

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Layout() {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="page-shell">
      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
        }
      />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
