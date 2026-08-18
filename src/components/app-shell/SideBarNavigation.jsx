import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export function SidebarNavigation({ navigation, collapsed }) {
  return (
    <nav
      className="
        min-h-0 flex-1 space-y-1
        overflow-y-auto overflow-x-hidden p-3
      "
    >
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) => getNavClass(isActive, collapsed)}
          >
            {Icon && <Icon className="size-5 shrink-0 stroke-[1.8]" />}

            {!collapsed && (
              <span className="truncate text-sm">{item.label}</span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

function getNavClass(isActive, collapsed) {
  return cn(
    "flex h-10 items-center rounded-xl transition-colors",

    collapsed ? "justify-center" : "gap-3 px-3",

    isActive
      ? collapsed
        ? "bg-muted text-primary"
        : "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );
}
