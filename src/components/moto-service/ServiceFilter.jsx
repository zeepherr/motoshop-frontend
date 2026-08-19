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

export function ServiceFilters({
  searchTerm,
  setSearchTerm,
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
      <div className="relative w-full sm:max-w-sm sm:min-w-60 sm:flex-1">
        <Search
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2 text-muted-foreground
          "
        />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search service name or description..."
          className="
            bg-card pl-9
            focus-visible:ring-ring
          "
        />
      </div>

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
