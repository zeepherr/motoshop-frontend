import { getOrderById } from "@/api/order/order.api";
import { useMutation } from "@tanstack/react-query";

export function useOrderById() {
  return useMutation({
    mutationFn: (id) => {
      return getOrderById(id);
    },
  });
}
