function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Toggle the open class to show/hide the menu
  menu.classList.toggle("open");
  
  // Toggle the open class on the icon to animate the hamburger
  icon.classList.toggle("open");
}
