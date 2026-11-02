(function () {
  var root = document.documentElement;

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle (remembers the choice when storage is available)
  var themeBtn = document.getElementById("themeToggle");
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncThemeLabel() {
    themeBtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
  }
  syncThemeLabel();
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeLabel();
  });

  // Mobile menu
  var menuBtn = document.getElementById("menuToggle");
  var nav = document.getElementById("siteNav");
  function closeMenu() {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // Project filter
  var chips = document.querySelectorAll(".chip");
  var projects = document.querySelectorAll(".project");
  var count = document.getElementById("projectCount");
  function applyFilter(key) {
    var shown = 0;
    projects.forEach(function (p) {
      var tags = (p.getAttribute("data-tags") || "").split(" ");
      var match = key === "all" || tags.indexOf(key) !== -1;
      p.hidden = !match;
      if (match) shown++;
    });
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", c.getAttribute("data-filter") === key ? "true" : "false");
    });
    count.textContent = key === "all"
      ? "Showing all " + shown + " projects"
      : "Showing " + shown + (shown === 1 ? " project" : " projects");
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () { applyFilter(c.getAttribute("data-filter")); });
  });
  applyFilter("all");

  // Highlight the current section in the navigation
  var links = {};
  nav.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href")] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("is-active"); });
          var l = links["#" + entry.target.id];
          if (l) l.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
