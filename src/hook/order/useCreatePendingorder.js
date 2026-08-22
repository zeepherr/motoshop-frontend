// src/hooks/order/useCreateOrder.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPendingOrder } from "@/api/order/order.api";

export function useCreatePendingOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      return createPendingOrder(payload);
    },

    onSuccess: () => {
      toast.success("Order held successfully.", { position: "top-right" });

      queryClient.invalidateQueries({
        queryKey: ["pending-orders"],
      });
    },
  });
}
