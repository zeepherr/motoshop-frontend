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
import { BrandGroupHeader } from "./MotoBrandGroupHeader";

import { MotoBrandTableRow } from "./MotoBrandTableRow";

export function MotoBrandTable({
  brands,
  onEdit,
  onStatusChange,
  onDelete,
  isFiltered,
  onClearFilters,
  status,
}) {
  const activeBrands = brands?.filter((brand) => brand.isActive) ?? [];

  const inactiveBrands = brands?.filter((brand) => !brand.isActive) ?? [];

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table className="min-w-180">
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-11 text-xs font-medium text-muted-foreground">
                Brand
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
            {brands?.length > 0 ? (
              status === "all" ? (
                <>
                  {activeBrands.length > 0 && (
                    <>
                      <BrandGroupHeader
                        label="Active Brands"
                        count={activeBrands.length}
                        active
                      />

                      {activeBrands.map((brand) => (
                        <MotoBrandTableRow
                          key={brand.id}
                          brand={brand}
                          onEdit={onEdit}
                          onStatusChange={onStatusChange}
                          onDelete={onDelete}
                        />
                      ))}
                    </>
                  )}

                  {inactiveBrands.length > 0 && (
                    <>
                      <BrandGroupHeader
                        label="Inactive Brands"
                        count={inactiveBrands.length}
                      />

                      {inactiveBrands.map((brand) => (
                        <MotoBrandTableRow
                          key={brand.id}
                          brand={brand}
                          onEdit={onEdit}
                          onStatusChange={onStatusChange}
                          onDelete={onDelete}
                        />
                      ))}
                    </>
                  )}
                </>
              ) : (
                brands.map((brand) => (
                  <MotoBrandTableRow
                    key={brand.id}
                    brand={brand}
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
                        ? "No matching brands found"
                        : "No motorcycle brands yet"}
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      {isFiltered
                        ? "Try changing your search or status filter to find what you're looking for."
                        : "Motorcycle brands you add will appear here."}
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
