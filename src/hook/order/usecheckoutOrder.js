import { checkoutOrder } from "@/api/order/order.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productKeys } from "../product/productKey";

export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return checkoutOrder(payload);
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: productKeys.active(),
      });
    },
  });
};
