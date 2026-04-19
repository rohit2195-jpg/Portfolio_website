const currentYear = document.querySelectorAll(".footer-year");

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navItems = document.querySelectorAll("nav a");

navItems.forEach((item) => {
  const itemPage = item.getAttribute("href");

  if (itemPage === currentPage) {
    item.setAttribute("aria-current", "page");
  }
});

currentYear.forEach((item) => {
  item.textContent = new Date().getFullYear();
});
