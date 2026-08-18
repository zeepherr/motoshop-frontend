import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MotoBrandTableRow } from "./MotoBrandTableRow";

export function MotoBrandTable({ brands, onEdit, onStatusChange, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Brand</TableHead>

            <TableHead className="w-36">Status</TableHead>

            <TableHead className="w-40">Updated</TableHead>

            <TableHead className="w-40">Created</TableHead>

            <TableHead className="w-14">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="p-3">
          {brands?.map((brand) => (
            <MotoBrandTableRow
              key={brand.id}
              brand={brand}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
