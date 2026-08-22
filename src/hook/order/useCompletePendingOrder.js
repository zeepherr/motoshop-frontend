import { completeOrder } from "@/api/order/order.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productKeys } from "../product/productKey";
import { orderKeys } from "./orderKeys";

export function useCompletePendingOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, data }) => completeOrder(orderId, data),

    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });

      queryClient.invalidateQueries({
        queryKey: orderKeys.pending,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.active,
      });
    },
  });
}
