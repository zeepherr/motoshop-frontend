import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export function AppSidebar({
  navigation,
  user,
  workspace = "Shop management",
}) {
  return (
    <aside
      className="
        hidden
        h-svh
        flex-col
        border-r
        border-sidebar-border
        bg-sidebar
        text-sidebar-foreground
        lg:flex
      "
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div
          className="
            flex size-9 items-center justify-center
            rounded-lg
            bg-primary
            font-semibold
            text-primary-foreground
          "
        >
          H
        </div>

        <div className="min-w-0">
          <p className="font-semibold leading-none">HurngMoto</p>

          <p className="mt-1 text-xs text-muted-foreground">{workspace}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  `
                    flex h-10 items-center gap-3
                    rounded-lg px-3
                    text-sm
                    transition-colors
                  `,
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : `
                        text-muted-foreground
                        hover:bg-sidebar-accent
                        hover:text-sidebar-accent-foreground
                      `,
                )
              }
            >
              {Icon && <Icon className="size-4 shrink-0" />}

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t p-3">
        <div
          className="
            flex items-center gap-3
            rounded-xl
            bg-sidebar-accent
            p-3
          "
        >
          <div
            className="
              flex size-9 shrink-0 items-center justify-center
              rounded-full
              bg-primary
              text-xs font-semibold
              text-primary-foreground
            "
          >
            {user?.initials || "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user?.name || "Admin HurngMoto"}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.role || "Admin"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
