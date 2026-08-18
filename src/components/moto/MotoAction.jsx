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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function MotoActions({ motor, onEdit, onStatusChange, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="
              size-9 cursor-pointer
              opacity-0 transition-opacity
              group-hover:opacity-100
            "
            aria-label={`Actions for ${motor.model}`}
          />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => onEdit(motor)}
          className="cursor-pointer"
        >
          <Pencil className="size-4" />
          Edit Motorcycle
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusChange(motor)}
          className={cn(
            "cursor-pointer",
            motor.isActive
              ? "text-destructive focus:text-destructive"
              : "text-success focus:text-success",
          )}
        >
          {motor.isActive ? (
            <>
              <CircleOff className="size-4" />
              Deactivate
            </>
          ) : (
            <>
              <CircleCheck className="size-4" />
              Activate
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(motor)}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <Trash2 className="size-4" />
          Delete Motorcycle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
