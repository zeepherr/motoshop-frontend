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

export function MotoFilters({
  motors,
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  selectedStatus,
  setSelectedStatus,
  hasActiveFilters,
  handleClearFilters,
}) {
  return (
    <div
      className="
        flex flex-col gap-2
        sm:flex-row sm:flex-wrap sm:items-center
      "
    >
      <div className="relative w-full sm:min-w-60 sm:flex-1 sm:max-w-sm">
        <Search
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2 text-muted-foreground
          "
        />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search motorcycle model or brand..."
          className="
            bg-card pl-9
            focus-visible:ring-ring
          "
        />
      </div>

      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
        <SelectTrigger className="w-full bg-card sm:w-40">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All brands</SelectItem>

          {[
            ...new Set(
              motors?.map((motor) => motor.motorBrand?.name).filter(Boolean),
            ),
          ].map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
