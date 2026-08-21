import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export function AppHeader({ section, title = "Dashboard", icon: Icon }) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <>
      {/* Left current-page control */}
      <div
        className="
          absolute left-3 top-3 z-30
          flex h-12 items-center gap-2
          rounded-lg
          bg-muted/80
          px-2
          shadow-sm
          backdrop-blur-md
          sm:left-6 sm:top-3
    sm:h-12 sm:gap-3
    sm:rounded-xl sm:px-3
        "
      >
        {Icon && (
          <div className="flex size-8 items-center justify-center rounded-lg bg-background">
            <Icon className="size-4 text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] text-muted-foreground">
            {section} / {title}
          </p>

          <p className="truncate text-sm font-semibold">{title}</p>
        </div>
      </div>

      {/* Right theme control */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="
          absolute right-6 top-3 z-40
          size-12 rounded-full
          text-muted-foreground
          shadow-sm
          backdrop-blur-md
          transition-all
          hover:bg-muted
          hover:text-foreground
          sm:right-
          cursor-pointer
        "
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </Button>
    </>
  );
}
