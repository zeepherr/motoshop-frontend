import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X } from "lucide-react";

export function ProductFilters({
  products,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  hasActiveFilters,
  handleClearFilters,
}) {
  const categories = [
    ...new Map(
      products
        ?.map((product) => product.productCategory)
        .filter(Boolean)
        .map((category) => [category.id, category]),
    ).values(),
  ];

  return (
    <div
      className="
        flex flex-col gap-2
        sm:flex-row sm:flex-wrap sm:items-center
      "
    >
      {/* Search */}
      <div className="relative w-full sm:min-w-64 sm:flex-1 sm:max-w-md bg">
        <Search
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2 text-muted-foreground
          "
        />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search product name or SKU..."
          className="
            bg-card pl-9
            focus-visible:ring-ring
          "
        />
      </div>

      {/* Category */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full bg-card sm:w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>

          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-full bg-card sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All status</SelectItem>

          <SelectItem value="active">Active</SelectItem>

          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear */}
      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="
            cursor-pointer
            text-muted-foreground
            hover:text-foreground
          "
        >
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
