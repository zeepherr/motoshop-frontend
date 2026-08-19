import { updateProduct } from "@/api/product/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productKeys } from "./productKey";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      return updateProduct(id, payload);
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
};
