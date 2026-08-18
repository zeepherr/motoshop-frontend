import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusFilters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];

export function MotoItemToolbar({
  tableName,
  search,
  onSearchChange,
  status,
  onStatusChange,
  itemCounts,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={`Search ${tableName}...`}
          className="pl-9"
        />
      </div>

      {/* Status filter */}
      <div
        className="flex w-full items-center rounded-lg bg-muted/60 p-1 sm:w-auto"
        role="group"
        aria-label="Filter by status"
      >
        {statusFilters.map((filter) => {
          const isSelected = status === filter.value;

          return (
            <Button
              key={filter.value}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onStatusChange(filter.value)}
              aria-pressed={isSelected}
              className={cn(
                "flex-1 gap-2 px-3 text-muted-foreground transition-all sm:flex-none",
                "hover:bg-background/60 hover:text-foreground",
                isSelected &&
                  "bg-background text-foreground shadow-sm hover:bg-background",
              )}
            >
              {filter.value === "active" && (
                <span className="size-1.5 rounded-full bg-emerald-500" />
              )}

              {filter.value === "inactive" && (
                <span className="size-1.5 rounded-full bg-muted-foreground" />
              )}

              <span>{filter.label}</span>

              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[11px] tabular-nums",
                  isSelected
                    ? "bg-muted text-foreground"
                    : "bg-background/70 text-muted-foreground",
                )}
              >
                {itemCounts?.[filter.value] ?? 0}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
