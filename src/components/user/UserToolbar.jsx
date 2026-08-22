import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserToolbar({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}) {
  return (
    <div
      className="
        flex flex-col gap-3
        border-b p-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="relative w-full sm:max-w-md">
        <Search
          className="
            absolute left-3 top-1/2 size-4
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search name, email or phone..."
          className="pl-9"
        />
      </div>

      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All roles</SelectItem>

          <SelectItem value="MEMBER">Members</SelectItem>

          <SelectItem value="STAFF">Staff</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
