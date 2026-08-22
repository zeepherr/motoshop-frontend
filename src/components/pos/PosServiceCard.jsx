import { Plus, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePosStore } from "@/stores/pos/usePosStore";
import { serviceToCartItem } from "@/utils/cart.util";

export function PosServiceCard({ service }) {
  const addItem = usePosStore((store) => store.addItem);
  const handleAddService = (service) => {
    const cartItem = serviceToCartItem(service);
    addItem(cartItem);
  };
  return (
    <article
      className="
        flex min-h-36 flex-col
        rounded-xl border bg-background p-3
        transition-colors
        hover:border-primary/40
        cursor-pointer
      "
      onClick={() => handleAddService(service)}
    >
      <div
        className="
          flex size-9 items-center justify-center
          rounded-lg bg-primary/10 text-primary
        "
      >
        <Wrench className="size-4" />
      </div>

      <div className="mt-3 min-w-0">
        <h3 className="truncate text-sm font-medium">{service.name}</h3>

        {service.description && (
          <p
            className="
              mt-1 line-clamp-2
              text-xs text-muted-foreground
            "
          >
            {service.description}
          </p>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <p className="text-base font-semibold">
          ฿{Number(service.price).toLocaleString()}
        </p>

        <Button
          type="button"
          size="icon-sm"
          className="shrink-0 cursor-pointer"
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </article>
  );
}
