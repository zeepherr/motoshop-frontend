import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ProductHeader({ onAddProduct }) {
  return (
    <div
      className="
        sticky top-0 z-20
        bg-background/95 backdrop-blur
      "
    >
      <div
        className="
          flex w-full items-center
          justify-between gap-4
        "
      >
        <div className="mb-4 min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>

          <p className="text-sm text-muted-foreground">
            Manage your shop products, pricing and inventory
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          onClick={onAddProduct}
          className="
            h-8 shrink-0 cursor-pointer
            gap-1.5 px-3 text-xs
            sm:h-9 sm:text-sm
          "
        >
          <Plus className="size-3.5 sm:size-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
