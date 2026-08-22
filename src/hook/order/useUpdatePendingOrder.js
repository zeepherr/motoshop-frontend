import { updatePendingOrder } from "@/api/order/order.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdatePendingOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, data }) => updatePendingOrder(orderId, data),

    onSuccess: () => {
      toast.success("Pending order updated.", { position: "top-right" });

      queryClient.invalidateQueries({
        queryKey: ["pending-orders"],
      });
    },
  });
}
