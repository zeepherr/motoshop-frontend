import { Clock3, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePendingOrders } from "@/hook/order/usePendingOrder";
export function PendingOrders({ onSelectOrder, isPending }) {
  const { data, isLoading, isError } = usePendingOrders();

  const orders =
    data?.orders ?? data?.data ?? (Array.isArray(data) ? data : []);

  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-6 text-center text-sm text-destructive">
        Failed to load pending orders.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-8 text-center">
        <Clock3 className="mx-auto mb-2 size-7 text-muted-foreground/50" />

        <p className="text-sm font-medium">No pending orders</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Held orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {orders.map((order) => (
        <Button
          key={order.id}
          type="button"
          variant="outline"
          onClick={() => onSelectOrder(order.id)}
          className="
            h-auto w-full
            justify-between
            px-3 py-2
            text-left
          "
        >
          <div className="min-w-0">
            <p className="text-sm font-medium">
              Order #{order.orderSeq ?? order.id}
            </p>

            <p className="text-xs text-muted-foreground">
              {order.member
                ? `${order.member.firstName ?? ""} ${
                    order.member.lastName ?? ""
                  }`.trim()
                : "Guest customer"}
            </p>
          </div>

          {order.finalTotal != null && (
            <span className="shrink-0 text-sm font-semibold">
              ฿{Number(order.finalTotal).toLocaleString()}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
