import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MotoHeader({ onAdd, tableName }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Motorcycle {tableName}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage motorcycle {tableName}s used throughout your shop.
        </p>
      </div>

      <Button
        type="button"
        onClick={onAdd}
        className="shrink-0 cursor-pointer mr-4"
      >
        <Plus className="size-4" />
        Add {tableName}
      </Button>
    </div>
  );
}
