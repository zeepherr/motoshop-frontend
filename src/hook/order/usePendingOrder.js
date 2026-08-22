import { getPendingOrders } from "@/api/order/order.api";
import { useQuery } from "@tanstack/react-query";
import { orderKeys } from "./orderKeys";

export function usePendingOrders() {
  return useQuery({
    queryKey: orderKeys.pending,
    queryFn: getPendingOrders,
  });
}
