import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { setupAuthInterceptors } from "./api/auth/auth.interceptor.js";
import { setupGlobalErrorInterceptors } from "./api/error.interceptor.js";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.jsx";
import "./index.css";
import { queryClient } from "./lib/query-client.js";
setupAuthInterceptors();
setupGlobalErrorInterceptors();
createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="system" stroageKey="motor-theme">
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>,
);
