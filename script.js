console.log("Portfolio script loaded");

// Backdrop for mobile menu
document.body.insertAdjacentHTML(
  "beforeend",
  '<div class="menu-backdrop"></div>'
);
const backdrop = document.querySelector(".menu-backdrop");

function setMenuState(open) {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".hamburger-icon");

  if (!menu || !button) return;

  button.classList.toggle("open", open);
  button.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  backdrop.classList.toggle("active", open);
}

function smoothScrollTo(targetId) {
  console.log("Smooth scrolling to:", targetId);
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const headerOffset = 70;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
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
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = saved ? saved === "dark" : prefersDark;
  document.body.classList.toggle("dark-mode", useDark);
  syncToggles(useDark);
  if (!saved) localStorage.setItem("theme", useDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready, initializing...");

  // Apply theme
  applyTheme();

  // Theme toggles
  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  if (mobileToggle) mobileToggle.addEventListener("change", toggleDarkMode);
  if (desktopToggle) desktopToggle.addEventListener("change", toggleDarkMode);

  // Hamburger menu toggle
  const hamburgerBtn = document.querySelector(".hamburger-icon");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
      console.log("Hamburger clicked");
      const isOpen = this.classList.contains("open");
      setMenuState(!isOpen);
    });
  }

  // Backdrop click to close menu
  if (backdrop) {
    backdrop.addEventListener("click", () => setMenuState(false));
  }

  // Mobile navigation links
  const mobileLinks = document.querySelectorAll("#mobile-menu a");
  console.log("Setting up mobile navigation links:", mobileLinks.length);

  mobileLinks.forEach((link, index) => {
    console.log(`Mobile link ${index}:`, link.getAttribute("href"));

    link.addEventListener("click", function (e) {
      console.log("Mobile nav clicked:", this.getAttribute("href"));
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        // Close menu immediately
        setMenuState(false);

        // Small delay for menu animation, then scroll
        setTimeout(() => {
          smoothScrollTo(targetId);
        }, 150);
      }
    });
  });

  // Desktop navigation links
  const desktopLinks = document.querySelectorAll("#desktop-nav .nav-links a");
  desktopLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  // Footer navigation links
  const footerLinks = document.querySelectorAll("footer .nav-links a");
  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  // Mobile nav hide/show on scroll
  let lastScrollY = window.scrollY;
  const mobileNav = document.getElementById("hamburger-nav");
  if (mobileNav) {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      const hidden = current > lastScrollY && current > 10;
      mobileNav.style.transform = hidden
        ? "translateY(-100%)"
        : "translateY(0)";
      mobileNav.style.transition = "transform .25s ease";
      lastScrollY = current;
    });
  }

  // Close menu on outside click
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("mobile-menu");
    const button = document.querySelector(".hamburger-icon");

    if (menu && button && menu.classList.contains("open")) {
      if (!menu.contains(e.target) && !button.contains(e.target)) {
        setMenuState(false);
      }
    }
  });
});
