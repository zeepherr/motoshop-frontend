import { updateMotoBrand } from "@/api/motor-brand/motor-brand.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorBrandKeys } from "./motoBrand.keys";

export const useUpdateMotoBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      return updateMotoBrand(id, payload);
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: motorBrandKeys.all,
      });
    },
  });
};
