import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cancelOrder } from "@/api/order/order.api";
import { productKeys } from "../product/productKey";
import { orderKeys } from "./orderKeys";

export function useCancelPendingOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });

      queryClient.invalidateQueries({
        queryKey: orderKeys.pending,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.active,
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to cancel order.");
    },
  });
}
