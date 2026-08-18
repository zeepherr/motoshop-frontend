import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchX, Tags } from "lucide-react";
import { ItemGroupHeader } from "./moto-brands/MotoItemGroupHeader";

import { MotoItemTableRow } from "./MotoItemTableRow";

export function MotoItemTable({
  tableName,
  items,
  onEdit,
  onStatusChange,
  onDelete,
  isFiltered,
  onClearFilters,
  status,
}) {
  const activeItems = items?.filter((item) => item.isActive) ?? [];

  const inactiveItems = items?.filter((item) => !item.isActive) ?? [];

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table className="min-w-180">
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-11 text-xs font-medium text-muted-foreground">
                {tableName}
              </TableHead>

              <TableHead className="h-11 w-36 text-xs font-medium text-muted-foreground">
                Status
              </TableHead>

              <TableHead className="h-11 w-40 text-xs font-medium text-muted-foreground">
                Updated
              </TableHead>

              <TableHead className="h-11 w-40 text-xs font-medium text-muted-foreground">
                Created
              </TableHead>

              <TableHead className="h-11 w-14">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items?.length > 0 ? (
              status === "all" ? (
                <>
                  {activeItems.length > 0 && (
                    <>
                      <ItemGroupHeader
                        label={`Active ${tableName.toLowerCase()}`}
                        count={activeItems.length}
                        active
                      />

                      {activeItems.map((item) => (
                        <MotoItemTableRow
                          tableName={tableName}
                          key={item.id}
                          item={item}
                          onEdit={onEdit}
                          onStatusChange={onStatusChange}
                          onDelete={onDelete}
                        />
                      ))}
                    </>
                  )}

                  {inactiveItems.length > 0 && (
                    <>
                      <ItemGroupHeader
                        label={`Inactive ${tableName.toLowerCase()}`}
                        count={inactiveItems.length}
                      />

                      {inactiveItems.map((item) => (
                        <MotoItemTableRow
                          tableName={tableName}
                          key={item.id}
                          item={item}
                          onEdit={onEdit}
                          onStatusChange={onStatusChange}
                          onDelete={onDelete}
                        />
                      ))}
                    </>
                  )}
                </>
              ) : (
                items.map((item) => (
                  <MotoItemTableRow
                    tableName={tableName}
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                ))
              )
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="h-72">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl border bg-muted/30">
                      {isFiltered ? (
                        <SearchX className="size-5 text-muted-foreground" />
                      ) : (
                        <Tags className="size-5 text-muted-foreground" />
                      )}
                    </div>

                    <h3 className="font-medium text-foreground">
                      {isFiltered
                        ? `No matching ${tableName.toLowerCase()} found`
                        : `No motorcycle ${tableName.toLowerCase()} yet`}
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      {isFiltered
                        ? "Try changing your search or status filter to find what you're looking for."
                        : `Motorcycle ${tableName.toLowerCase()} you add will appear here.`}
                    </p>

                    {isFiltered && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={onClearFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

{
  /* <Item
  variant="outline"
  className="
    border-border
    bg-card/90
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:border-primary/50
    hover:shadow-[0_10px_30px_var(--glow-primary)]
  "
></Item> */
}
