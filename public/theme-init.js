const savedTheme = localStorage.getItem("motor-theme") || "system";

const isDark =
  savedTheme === "dark" ||
  (savedTheme === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

document.documentElement.classList.toggle("dark", isDark);

document.documentElement.style.colorScheme = isDark ? "dark" : "light";
