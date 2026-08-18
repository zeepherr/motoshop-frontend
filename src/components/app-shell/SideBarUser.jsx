import { cn } from "@/lib/utils";

export function SidebarUser({ user, collapsed }) {
  const initials = getInitials(user);

  return (
    <div className="shrink-0 border-t p-3">
      <div
        className={cn(
          "flex items-center rounded-xl transition-colors hover:bg-muted",
          collapsed ? "justify-center p-1" : "gap-3 p-3",
        )}
      >
        <div
          className="
            flex size-9 shrink-0 items-center justify-center
            rounded-full bg-primary text-xs font-semibold
            text-primary-foreground
          "
        >
          {initials}
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getInitials(user) {
  const first = user?.firstName?.[0] ?? "";
  const last = user?.lastName?.[0] ?? "";

  return `${first}${last}`.toUpperCase() || "A";
}
