function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");

  if (menu.classList.contains("open") && window.innerWidth <= 480) {
    const profileSection = document.getElementById("profile");
    if (profileSection) {
      profileSection.style.position = "relative";
      profileSection.style.zIndex = "1";
    }
  }
}

// Dark mode functionality
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Save preference to localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

function syncToggles(isChecked) {
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");

  if (desktopToggle) desktopToggle.checked = isChecked;
  if (mobileToggle) mobileToggle.checked = isChecked;
}

// Apply theme based on user's saved preference
function applyTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    syncToggles(false);
  } else {
    document.body.classList.add("dark-mode");
    syncToggles(true);
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
    }
  }
}

// Initialize theme and event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");

  applyTheme();

  desktopToggle.addEventListener("change", () => {
    toggleDarkMode();
    syncToggles(desktopToggle.checked);
  });

  mobileToggle.addEventListener("change", () => {
    toggleDarkMode();
    syncToggles(mobileToggle.checked);
  });

  const contactLinks = document.querySelectorAll(".contact-info-container p a");

  contactLinks.forEach((link) => {
    const container = link.closest(".contact-info-container");
    const icon = container.querySelector(".contact-icon");
    
    link.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-3px)";
    });

    link.addEventListener("mouseleave", () => {
      icon.style.transform = "none";
    });
  });
});
