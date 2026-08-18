import { TableCell, TableRow } from "../ui/table";
export function BrandGroupHeader({ label, count, active }) {
  return (
    <TableRow className="border-y bg-muted/20 hover:bg-muted/20">
      <TableCell colSpan={5} className="h-9 py-0">
        <div className="flex items-center gap-2">
          <span
            className={
              active
                ? "size-1.5 rounded-full bg-emerald-500"
                : "size-1.5 rounded-full bg-muted-foreground"
            }
          />

          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>

          <span className="text-xs tabular-nums text-muted-foreground/70">
            {count}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
