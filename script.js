// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));

      target.scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Toggle navigation menu for desktop and mobile views
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Form validation for the contact section
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
  }

  // Additional validation for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Form submission logic (e.g., sending data to backend or displaying success message)
  // This is a placeholder for the actual submission process
  alert("Form submitted successfully!");
  form.reset();
});
