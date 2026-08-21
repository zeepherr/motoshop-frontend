import { ImageOff, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PosProductCard({ product }) {
  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;

  return (
    <article
      className="
        group flex min-w-0 flex-col
        overflow-hidden rounded-xl border bg-background
        transition-colors
        hover:border-primary/40 cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted/40">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              h-full w-full object-cover
              transition-transform duration-200
              group-hover:scale-[1.02]
            "
          />
        ) : (
          <div
            className="
              flex h-full items-center justify-center
              text-muted-foreground
            "
          >
            <ImageOff className="size-7" />
          </div>
        )}

        {/* Stock state */}
        {(isLowStock || isOutOfStock) && (
          <span
            className={`
              absolute left-1 top-1
              rounded px-1.5 py-0.5
              text-[9px] font-medium
              sm:text-[10px]
              ${
                isOutOfStock
                  ? "bg-destructive/10 text-destructive"
                  : "bg-amber-500/10 text-amber-600"
              }
            `}
          >
            {isOutOfStock ? "Out of stock" : "Low stock"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <div className="min-w-0">
          <h3
            className="
            line-clamp-2
            min-h-8
            text-xs font-medium leading-4
            sm:text-sm
          "
          >
            {product.name}
          </h3>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {product.sku}
          </p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p
              className="mt-2
            text-sm font-semibold
            sm:text-base"
            >
              ฿{Number(product.sellingPrice).toLocaleString()}
            </p>

            <p className="text-xs text-muted-foreground">
              Stock: {product.stockQuantity}
            </p>
          </div>

          <Button
            type="button"
            size="icon-sm"
            disabled={isOutOfStock}
            className="shrink-0 cursor-pointer"
          >
            <Plus
              className="
                size-3.5
                sm:size-4
              "
            />
          </Button>
        </div>
      </div>
    </article>
  );
}
