import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MotoBrandHeader({ onAddBrand }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Motorcycle Brands
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage motorcycle brands used throughout your shop.
        </p>
      </div>

      <Button
        type="button"
        onClick={onAddBrand}
        className="shrink-0 cursor-pointer"
      >
        <Plus className="size-4" />
        Add Brand
      </Button>
    </div>
  );
}
