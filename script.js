function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
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
    // Only apply light mode if explicitly set
    syncToggles(false);
  } else {
    // Default to dark mode (either if saved as dark or if no preference is set)
    document.body.classList.add("dark-mode");
    syncToggles(true);
    // Save the preference if it wasn't already set
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
    }
  }
}

// Initialize theme and event listeners when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const desktopToggle = document.getElementById("theme-toggle-checkbox");
  const mobileToggle = document.getElementById("mobile-theme-toggle-checkbox");

  // Apply saved theme preference
  applyTheme();

  // Add event listeners to toggles
  desktopToggle.addEventListener("change", () => {
    toggleDarkMode();
    syncToggles(desktopToggle.checked);
  });

  mobileToggle.addEventListener("change", () => {
    toggleDarkMode();
    syncToggles(mobileToggle.checked);
  });

  // Get all contact links
  const contactLinks = document.querySelectorAll(".contact-info-container p a");

  contactLinks.forEach((link) => {
    const container = link.closest(".contact-info-container");
    const icon = container.querySelector(".contact-icon");

    // When hovering over the link, move both link and icon
    link.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-3px)";
    });

    link.addEventListener("mouseleave", () => {
      icon.style.transform = "none";
    });
  });
});
