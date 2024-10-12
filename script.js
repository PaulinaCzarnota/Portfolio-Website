function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Toggle 'open' class on both menu and icon
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Set aria-expanded attribute for accessibility
  const isOpen = menu.classList.contains("open");
  icon.setAttribute("aria-expanded", isOpen);

  // Optionally, add a focus trap to keep keyboard navigation within the menu when it's open
  if (isOpen) {
    menu.querySelector("a").focus();
  }
}
