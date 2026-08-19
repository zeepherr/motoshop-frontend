import { Checkbox } from "@/components/ui/checkbox";

import { ArrowDownUp } from "lucide-react";

export function ProductTableHeader({ allSelected, onSelectAll, onSort }) {
  return (
    <thead>
      <tr className="border-b">
        {/* Select All */}
        <th className="w-14 px-4 py-3 text-center">
          <Checkbox
            checked={allSelected}
            onCheckedChange={onSelectAll}
            aria-label="Select all products"
          />
        </th>

        {/* Product */}
        <th className="px-3 py-3 text-left font-medium">
          <SortButton label="Product" onClick={() => onSort("name")} />
        </th>

        {/* Details */}
        <th className="px-3 py-3 text-left font-medium">Details</th>

        {/* Price */}
        <th className="px-3 py-3 text-left font-medium">
          <SortButton label="Price" onClick={() => onSort("sellingPrice")} />
        </th>

        {/* Stock */}
        <th className="px-3 py-3 text-left font-medium">
          <SortButton label="Stock" onClick={() => onSort("stockQuantity")} />
        </th>

        {/* Status */}
        <th className="px-3 py-3 text-left font-medium">Status</th>

        {/* Actions */}
        <th className="w-32 px-3 py-3 text-center font-medium">Actions</th>
      </tr>
    </thead>
  );
}

function SortButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex cursor-pointer
        items-center gap-1 font-medium
      "
    >
      {label}

      <ArrowDownUp className="size-3.5" />
    </button>
  );
}
