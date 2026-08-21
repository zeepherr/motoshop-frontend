import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MotoHeader({ onAdd, tableName }) {
  return (
    <div
      className="
        flex flex-col gap-3 sm:mt-3 mt-1.5
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      <div className="min-w-0">
        <h1
          className="
            text-lg font-semibold tracking-tight
            text-foreground
            sm:text-xl
            lg:text-2xl
          "
        >
          Motorcycle {tableName}
        </h1>

        <p
          className="
            mt-0.5 max-w-xl
            text-xs leading-5 text-muted-foreground
            sm:text-sm
          "
        >
          Manage motorcycle {tableName}s used throughout your shop.
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        onClick={onAdd}
        className="
          h-8 w-full cursor-pointer
          gap-1.5 px-3 text-xs
          sm:h-9 sm:w-auto sm:text-sm
        "
      >
        <Plus className="size-3.5 sm:size-4" />
        Add {tableName}
      </Button>
    </div>
  );
}
