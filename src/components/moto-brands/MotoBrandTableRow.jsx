// components/moto-brands/MotoBrandTableRow.jsx

import { cn } from "@/lib/utils";

import { TableCell, TableRow } from "@/components/ui/table";
import { MotoBrandStatusBadge } from "./MotoBrandStatusBudge";

import { formatTableDate } from "@/utils/date";
import { MotoBrandRowActions } from "./MotoBrandRowActions";

export function MotoBrandTableRow({ brand, onEdit, onStatusChange, onDelete }) {
  return (
    <TableRow
      className={cn(
        "group transition-colors",
        "hover:bg-muted/30",
        !brand.isActive && "bg-muted/15",
      )}
    >
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background",
              "text-sm font-semibold uppercase shadow-xs",
              !brand.isActive && "text-muted-foreground opacity-70",
            )}
          >
            {brand.name?.charAt(0)}
          </div>

          <div className="min-w-0">
            <p
              className={cn(
                "truncate font-medium text-foreground",
                !brand.isActive && "text-muted-foreground",
              )}
            >
              {brand.name}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Motorcycle brand
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <MotoBrandStatusBadge isActive={brand.isActive} />
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatTableDate(brand.updatedAt)}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatTableDate(brand.createdAt)}
      </TableCell>

      <TableCell className="text-right">
        <MotoBrandRowActions
          brand={brand}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
