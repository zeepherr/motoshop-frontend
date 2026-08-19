import { deleteProduct } from "@/api/product/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productKeys } from "./productKey";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      (toast.success(data.message, { position: "top-right" }),
        queryClient.invalidateQueries({
          queryKey: productKeys.all,
        }));
    },
  });
};
