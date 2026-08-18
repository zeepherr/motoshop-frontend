import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function SidebarBrand({ workspace, collapsed, onToggle }) {
  if (collapsed) {
    return (
      <div className="flex h-16 shrink-0 items-center justify-center border-b px-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="
            group relative flex size-10
            items-center justify-center rounded-xl
            transition-colors hover:bg-muted
          "
        >
          <div
            className="
              flex size-9 items-center justify-center
              rounded-xl bg-primary text-sm font-semibold
              text-primary-foreground
              transition-all
              group-hover:scale-90
              group-hover:opacity-0
            "
          >
            H
          </div>

          <PanelLeftOpen
            className="
              absolute size-5 opacity-0
              transition-all group-hover:opacity-100
            "
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-16 shrink-0 items-center border-b px-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className="
            flex size-9 shrink-0 items-center justify-center
            rounded-xl bg-primary text-sm font-semibold
            text-primary-foreground
          "
        >
          H
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">HrungMoto</p>

          <p className="truncate text-xs text-muted-foreground">{workspace}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label="Collapse sidebar"
        className="
          flex size-9 items-center justify-center
          rounded-lg text-muted-foreground
          transition-colors
          hover:bg-muted hover:text-foreground
        "
      >
        <PanelLeftClose className="size-5" />
      </button>
    </div>
  );
}
