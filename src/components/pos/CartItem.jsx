import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePosStore } from "@/stores/pos/usePosStore";
export function PosCartItem({ item }) {
  const increaseQuantity = usePosStore((store) => store.increaseQuantity);

  const decreaseQuantity = usePosStore((store) => store.decreaseQuantity);

  const removeItem = usePosStore((store) => store.removeItem);

  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex gap-2 border-b py-1.5 last:border-b-0">
      {/* ITEM INFO */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{item.name}</p>

            <p className="text-xs text-muted-foreground">{item.itemType}</p>
          </div>

          <p className="shrink-0 text-sm font-semibold">
            ฿{lineTotal.toLocaleString()}
          </p>
        </div>

        {/* PRICE + QUANTITY */}
        <div className=" flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            ฿{item.unitPrice.toLocaleString()} each
          </p>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => decreaseQuantity(item.itemType, item.id)}
              className="size-7 cursor-pointer"
            >
              <Minus className="size-3.5" />
            </Button>

            <span className="min-w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => increaseQuantity(item.itemType, item.id)}
              disabled={
                item.availableStock != null &&
                item.quantity >= item.availableStock
              }
              className="size-7 cursor-pointer"
            >
              <Plus className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removeItem(item.itemType, item.id)}
              className="ml-1 size-7 cursor-pointer text-destructive hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
