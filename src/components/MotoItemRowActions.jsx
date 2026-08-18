import {
  CircleCheck,
  CircleOff,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MotoItemRowActions({
  tableName,
  item,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${item.name}`}
          />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between font-normal">
            <span className="text-xs text-muted-foreground">Status</span>

            <span
              className={`flex items-center gap-1.5 text-xs font-medium ${
                item.isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  item.isActive
                    ? "bg-emerald-500 animate-ping opacity-75 inline-flex"
                    : "bg-muted-foreground"
                }`}
              />

              {item.isActive ? "Active" : "Inactive"}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onEdit(item)}>
          <Pencil className="size-4" />
          Edit {tableName}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusChange(item)}
          className={
            item.isActive
              ? "text-destructive focus:text-destructive"
              : "text-emerald-600 focus:text-emerald-600 dark:text-emerald-400"
          }
        >
          {item.isActive ? (
            <>
              <CircleOff className="size-4" />
              Deactivate {tableName}
            </>
          ) : (
            <>
              <CircleCheck className="size-4" />
              Activate {tableName}
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(item)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete {tableName}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
