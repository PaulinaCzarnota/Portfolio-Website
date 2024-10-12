function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  // Toggle 'open' class on both menu and icon
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Set aria-expanded attribute for accessibility
  const isOpen = menu.classList.contains("open");
  icon.setAttribute("aria-expanded", isOpen);
  
  // Focus the first link when the menu opens
  if (isOpen) {
      const firstLink = menu.querySelector("a");
      if (firstLink) {
          firstLink.focus();
      }
  }

  // Close the menu when a link is clicked
  menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
          menu.classList.remove("open");
          icon.classList.remove("open");
          icon.setAttribute("aria-expanded", "false");
      });
  });
}

// Optional: Close menu on outside click
document.addEventListener("click", (event) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (!menu.contains(event.target) && !icon.contains(event.target)) {
      menu.classList.remove("open");
      icon.classList.remove("open");
      icon.setAttribute("aria-expanded", "false");
  }
});
