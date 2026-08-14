import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
    <ThemeProvider defaultTheme="system" stroageKey="motor-theme">
        <App />
    </ThemeProvider>
);
