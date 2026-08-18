import { createCategory } from "@/api/moto-category/moto-category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorCategoryKeys } from "./motoCategory.keys";

export const useCreateMotoCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries({
        queryKey: motorCategoryKeys.all,
      });
    },
  });
};
