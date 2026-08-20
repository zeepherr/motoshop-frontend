import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { ProductRow } from "./ProductRow";

export function ProductTable({
  products,
  sort,
  onSort,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-250 text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b bg-muted/30">
              <TableHeading
                label="Product"
                sortKey="name"
                sort={sort}
                onSort={onSort}
              />

              <th
                className="
                  px-4 py-3 text-left
                  font-medium text-muted-foreground
                "
              >
                Category
              </th>

              <TableHeading
                label="Price"
                sortKey="sellingPrice"
                sort={sort}
                onSort={onSort}
              />

              <TableHeading
                label="Stock"
                sortKey="stockQuantity"
                sort={sort}
                onSort={onSort}
              />

              <th
                className="
                  px-4 py-3 text-left
                  font-medium text-muted-foreground
                "
              >
                Status
              </th>

              <th
                className="
                  w-16 px-4 py-3 text-right
                  font-medium text-muted-foreground
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products?.length ? (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <ProductEmptyRow />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeading({ label, sortKey, sort, onSort }) {
  const isActive = sort.key === sortKey;

  return (
    <th className="px-4 py-3 text-left">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="
          inline-flex cursor-pointer
          items-center gap-1.5
          font-medium text-muted-foreground
          transition-colors
          hover:text-foreground
        "
      >
        {label}

        {!isActive ? (
          <ArrowUpDown className="size-3.5" />
        ) : sort.direction === "asc" ? (
          <ArrowUp className="size-3.5" />
        ) : (
          <ArrowDown className="size-3.5" />
        )}
      </button>
    </th>
  );
}

function ProductEmptyRow() {
  return (
    <tr>
      <td
        colSpan={7}
        className="
          h-32 px-4
          text-center text-sm
          text-muted-foreground
        "
      >
        No products found.
      </td>
    </tr>
  );
}
