import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  stroageKey = "motor-theme",
}) => {
  const item = localStorage.getItem(stroageKey);
  const [theme, setcurrentTheme] = useState(item || defaultTheme);
  useEffect(() => {
    const root = document.documentElement;
    const systemDarkMode = window.matchMedia("(prefers-color-scheme:dark)");
    const applyTheme = () => {
      let resolvedTheme = theme;
      if (theme === "system") {
        resolvedTheme = systemDarkMode.matches ? "dark" : "light";
      }
      const isDark = resolvedTheme === "dark";

      root.classList.toggle("dark", isDark);
      root.style.colorScheme = resolvedTheme;
    };
    applyTheme();
    if (theme === "system") {
      systemDarkMode.addEventListener("change", applyTheme);
    }
    return () => {
      systemDarkMode.removeEventListener("change", applyTheme);
    };
  }, [theme]);
  const setTheme = (newTheme) => {
    localStorage.setItem(stroageKey, newTheme);
    setcurrentTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
