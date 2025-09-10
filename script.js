function setMenuState(open) {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".hamburger-icon");
  if (!menu || !button) return;
  button.classList.toggle("open", open);
  button.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
}

function toggleMenu() {
  const isOpen = document.querySelector(".hamburger-icon")?.classList.contains("open");
  setMenuState(!isOpen);
}

function closeMenuOnOutsideClick(e) {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".hamburger-icon");
  if (!menu || !button) return;
  if (menu.classList.contains("open") && !menu.contains(e.target) && !button.contains(e.target)) {
    setMenuState(false);
  }
}

function onNavLinkClick() {
  setMenuState(false);
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  syncToggles(isDark);
}

function syncToggles(isChecked) {
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");
  if (desktopToggle) desktopToggle.checked = isChecked;
  if (mobileToggle) mobileToggle.checked = isChecked;
}

function applyTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = saved ? saved === "dark" : prefersDark;
  document.body.classList.toggle("dark-mode", useDark);
  syncToggles(useDark);
  if (!saved) localStorage.setItem("theme", useDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  if (mobileToggle) mobileToggle.addEventListener("change", toggleDarkMode);
  if (desktopToggle) desktopToggle.addEventListener("change", toggleDarkMode);

  const hamburgerBtn = document.querySelector(".hamburger-icon");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu);
    hamburgerBtn.addEventListener("touchstart", (e) => { e.preventDefault(); toggleMenu(); }, { passive: false });
  }

  document.addEventListener("click", closeMenuOnOutsideClick);

  document.querySelectorAll("#mobile-menu a").forEach((a) => {
    a.addEventListener("click", onNavLinkClick);
    a.addEventListener("touchstart", () => setTimeout(() => setMenuState(false), 150));
  });

  let lastScrollY = window.scrollY;
  const mobileNav = document.getElementById("hamburger-nav");
  if (mobileNav) {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      const hidden = current > lastScrollY && current > 10;
      mobileNav.style.transform = hidden ? "translateY(-100%)" : "translateY(0)";
      mobileNav.style.transition = "transform .25s ease";
      lastScrollY = current;
    });
  }
});
