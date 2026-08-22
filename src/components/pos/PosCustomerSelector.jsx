import { Search, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePosStore } from "@/stores/pos/usePosStore";
export function PosCustomerSelector({ members = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const selectedMember = usePosStore((store) => store.selectedMember);

  const setSelectedMember = usePosStore((store) => store.setSelectedMember);

  const clearSelectedMember = usePosStore((store) => store.clearSelectedMember);

  const filteredMembers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return [];

    return members
      .filter((member) => {
        const name = member.name?.toLowerCase() ?? "";
        const phone = member.phone ?? "";

        return name.includes(keyword) || phone.includes(keyword);
      })
      .slice(0, 5);
  }, [members, searchTerm]);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setSearchTerm("");
  };

  const handleClearMember = () => {
    clearSelectedMember();
    setSearchTerm("");
  };

  return (
    <div className="border-b p-1.5 lg:p-2">
      {selectedMember ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Customer</p>

              <p className="truncate text-sm font-medium">
                {selectedMember.name}
              </p>

              {selectedMember.phone && (
                <p className="truncate text-xs text-muted-foreground">
                  {selectedMember.phone}
                </p>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleClearMember}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Customer</p>

            <p className="text-sm font-medium">Guest customer</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search member..."
              className="pl-9"
            />
          </div>

          {searchTerm.trim() && (
            <div className="overflow-hidden rounded-md border bg-popover">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleSelectMember(member)}
                    className="
                      flex w-full items-center justify-between
                      gap-3 px-3 py-2 text-left
                      hover:bg-muted
                    "
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {member.name}
                      </p>

                      {member.phone && (
                        <p className="text-xs text-muted-foreground">
                          {member.phone}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-3 py-3 text-sm text-muted-foreground">
                  No member found.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
