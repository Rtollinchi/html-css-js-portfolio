function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const hamburgerNav = document.querySelector("#hamburger-nav");

  // Toggle classes
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Toggle fixed positioning for hamburger nav
  if (menu.classList.contains("open")) {
    hamburgerNav.style.position = "fixed";
    hamburgerNav.style.top = "0";
    hamburgerNav.style.left = "0";
    menu.style.display = "block";

    setTimeout(() => {
      menu.style.opacity = "1";
      menu.style.transform = "translateY(0)";
    }, 10);
  } else {
    hamburgerNav.style.position = "absolute";
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px)";

    // Delay hiding the menu to allow for fade-out animation
    setTimeout(() => {
      menu.style.display = "none";
    }, 300);
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

// Function to close menu when clicking outside
function closeMenuOnClickOutside(event) {
  const menu = document.querySelector(".menu-links");
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  // If menu is open and click is outside menu and hamburger icon
  if (
    menu &&
    menu.classList.contains("open") &&
    !menu.contains(event.target) &&
    !hamburgerIcon.contains(event.target)
  ) {
    toggleMenu();
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

  // Initialize mobile menu
  const menuLinks = document.querySelector(".menu-links");
  if (menuLinks) {
    // Ensure proper initial state
    menuLinks.style.display = "none";
    menuLinks.style.opacity = "0";

    // Make sure hamburger nav is properly positioned initially
    const hamburgerNav = document.querySelector("#hamburger-nav");
    hamburgerNav.style.position = "absolute";

    // Add touch event support for mobile devices
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    if (hamburgerIcon) {
      hamburgerIcon.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          toggleMenu();
        },
        { passive: false }
      );
    }

    // Add touch events to menu links for mobile
    const menuItems = document.querySelectorAll(".menu-links a");
    menuItems.forEach((item) => {
      item.addEventListener("touchstart", function (e) {
        // Allow default behavior for links but ensure toggle works
        setTimeout(() => toggleMenu(), 300);
      });
    });
  }

  // Close menu on click outside
  document.addEventListener("click", closeMenuOnClickOutside);
});
