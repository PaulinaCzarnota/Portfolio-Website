function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Toggle the 'open' class on the menu and the icon
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  // Optional: Update aria-expanded attribute for accessibility
  const isOpen = menu.classList.contains("open");
  menu.setAttribute("aria-expanded", isOpen);
}
