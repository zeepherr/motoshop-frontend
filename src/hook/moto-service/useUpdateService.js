import { updateService } from "@/api/moto-service/moto-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorServiceKeys } from "./motoService.keys";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      return updateService(id, payload);
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: motorServiceKeys.all,
      });
    },
  });
};
