import { createProduct } from "@/api/product/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productKeys } from "./productKey";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries({
        //impotant  concept to update data after created
        queryKey: productKeys.all,
      });
    },
  });
};
