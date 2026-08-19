import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Package } from "lucide-react";

export function ProductRow({ product, checked, onCheckedChange }) {
  const hasImage = Boolean(product.imgUrl?.trim());

  return (
    <tr
      className="
        border-b transition-colors
        last:border-b-0
        hover:bg-muted/30
      "
    >
      {/* Select */}
      <td className="w-12 px-4 py-3">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={`Select ${product.name}`}
        />
      </td>

      {/* Product */}
      <td className="px-4 py-3">
        <div className="flex min-w-60 items-center gap-3">
          <div
            className="
              flex size-12 shrink-0 items-center
              justify-center overflow-hidden
              rounded-lg border bg-muted/30
            "
          >
            {hasImage ? (
              <img
                src={product.imgUrl}
                alt={product.name}
                className="size-full object-cover"
              />
            ) : (
              <Package className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {product.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {product.sku}
            </p>
          </div>
        </div>
      </td>

      {/* Details */}
      <td className="px-4 py-3">
        <div className="max-w-70">
          <p className="truncate text-sm font-medium">
            {product.productCategory?.name ?? "Unknown category"}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {product.description || "No description"}
          </p>
        </div>
      </td>

      {/* Price */}
      <td className="whitespace-nowrap px-4 py-3">
        <span className="font-semibold">
          {formatPrice(product.sellingPrice)}
        </span>
      </td>

      {/* Stock */}
      <td className="whitespace-nowrap px-4 py-3">
        <StockStatus quantity={product.stockQuantity} unit={product.unit} />
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-4 py-3">
        <ProductStatus isActive={product.isActive} />
      </td>

      {/* Actions - temporary */}
      <td className="w-16 px-4 py-3 text-right">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer"
          aria-label={`Actions for ${product.name}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </td>
    </tr>
  );
}

function ProductStatus({ isActive }) {
  return (
    <div
      className={
        isActive
          ? "flex items-center gap-1.5 text-xs font-medium text-success"
          : "flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
      }
    >
      <span
        className={
          isActive
            ? "size-1.5 rounded-full bg-success"
            : "size-1.5 rounded-full bg-muted-foreground"
        }
      />

      {isActive ? "Active" : "Inactive"}
    </div>
  );
}

function StockStatus({ quantity, unit }) {
  const isOutOfStock = quantity === 0;
  const isLowStock = quantity > 0 && quantity <= 5;

  return (
    <div>
      <p className="font-medium">
        {quantity} {unit}
      </p>

      <p
        className={
          isOutOfStock
            ? "text-xs text-destructive"
            : isLowStock
              ? "text-xs text-amber-600"
              : "text-xs text-success"
        }
      >
        {isOutOfStock ? "Out of stock" : isLowStock ? "Low stock" : "In stock"}
      </p>
    </div>
  );
}

function formatPrice(price) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
  }).format(Number(price));
}
