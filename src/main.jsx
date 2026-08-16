import { createRoot } from "react-dom/client";
import { setupAuthInterceptors } from "./api/auth/auth.interceptor.js";
import { setupGlobalErrorInterceptors } from "./api/error.interceptor.js";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";
import "./index.css";
setupAuthInterceptors();
setupGlobalErrorInterceptors();
createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" stroageKey="motor-theme">
    <App />
  </ThemeProvider>,
);
