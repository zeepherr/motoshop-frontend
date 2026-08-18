import { deleteMotoBrand } from "@/api/motor-brand/motor-brand.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorBrandKeys } from "./motoBrand.keys";

export const useDeleteMotoBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMotoBrand,
    onSuccess: (data) => {
      (toast.success(data.message, { position: "top-right" }),
        queryClient.invalidateQueries({
          queryKey: motorBrandKeys.all,
        }));
    },
  });
};
