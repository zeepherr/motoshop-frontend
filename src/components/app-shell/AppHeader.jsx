import { Bell, Moon, Search } from "lucide-react";

export function AppHeader({ section = "Admin", title = "Dashboard", actions }) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center
        border-b
        bg-card/95
        px-4
        backdrop-blur
        sm:px-6
      "
    >
      {/* Current page */}
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {section} / {title}
        </p>

        <h2 className="truncate text-sm font-semibold">{title}</h2>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="
            hidden h-9 w-44 items-center gap-2
            rounded-lg
            bg-muted
            px-3
            text-sm
            text-muted-foreground
            md:flex
          "
        >
          <Search className="size-4" />

          <span>Search HurngMoto...</span>
        </button>

        {/* Custom actions */}
        {actions}

        {/* Temporary global actions */}
        <button
          type="button"
          className="
            flex size-9 items-center justify-center
            rounded-lg border bg-background
          "
          aria-label="Change theme"
        >
          <Moon className="size-4" />
        </button>

        <button
          type="button"
          className="
            flex size-9 items-center justify-center
            rounded-lg border bg-background
          "
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </button>

        <button
          type="button"
          className="
            flex size-9 items-center justify-center
            rounded-full
            bg-primary
            text-xs font-semibold
            text-primary-foreground
          "
        >
          AH
        </button>
      </div>
    </header>
  );
}
