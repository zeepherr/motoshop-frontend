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
        "transition-colors",
        !brand.isActive && "bg-muted/20 text-muted-foreground",
      )}
    >
      <TableCell
        className={cn(
          "font-medium",
          !brand.isActive && "text-muted-foreground",
        )}
      >
        {brand.name}
      </TableCell>

      <TableCell>
        <MotoBrandStatusBadge isActive={brand.isActive} />
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatTableDate(brand.updatedAt)}
      </TableCell>

      <TableCell className="text-muted-foreground">
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
