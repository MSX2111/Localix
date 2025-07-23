document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  // Set initial state
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && prefersDark)
  ) {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }

  themeToggle.onchange = function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };
});
