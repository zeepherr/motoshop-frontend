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

export function ProductActions({ product, onEdit, onStatusChange, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="
              size-8 cursor-pointer
              opacity-60 transition-opacity
              hover:opacity-100
              group-hover:opacity-100
            "
            aria-label={`Actions for ${product.name}`}
          />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48" sideOffset={6}>
        {/* Edit */}
        <DropdownMenuItem
          onClick={() => onEdit(product)}
          className="cursor-pointer"
        >
          <Pencil className="size-4" />
          Edit Product
        </DropdownMenuItem>

        {/* Status */}
        <DropdownMenuItem
          onClick={() => onStatusChange(product)}
          className={cn(
            "cursor-pointer",
            product.isActive
              ? "text-destructive focus:text-destructive"
              : "text-success focus:text-success",
          )}
        >
          {product.isActive ? (
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

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => onDelete(product)}
          className="
            cursor-pointer
            text-destructive
            focus:text-destructive
          "
        >
          <Trash2 className="size-4" />
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
