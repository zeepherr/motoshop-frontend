// components/moto-brands/MotoBrandTableRow.jsx

import { cn } from "@/lib/utils";

import { TableCell, TableRow } from "@/components/ui/table";
import { MotoStatusBadge } from "./MotoStatusBudge";

import { formatTableDate } from "@/utils/date";
import { MotoItemRowActions } from "./MotoItemRowActions";

export function MotoItemTableRow({
  tableName,
  item,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <TableRow
      className={cn(
        "group transition-colors",
        "hover:bg-muted/30",
        !item.isActive && "bg-muted/15",
      )}
    >
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background",
              "text-sm font-semibold uppercase shadow-xs",
              !item.isActive && "text-muted-foreground opacity-70",
            )}
          >
            {item.name?.charAt(0)}
          </div>

          <div className="min-w-0">
            <p
              className={cn(
                "truncate font-medium text-foreground",
                !item.isActive && "text-muted-foreground",
              )}
            >
              {item.name}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Motorcycle {tableName.toLowerCase()}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <MotoStatusBadge isActive={item.isActive} />
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatTableDate(item.updatedAt)}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatTableDate(item.createdAt)}
      </TableCell>

      <TableCell className="text-right">
        <MotoItemRowActions
          tableName={tableName}
          item={item}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
