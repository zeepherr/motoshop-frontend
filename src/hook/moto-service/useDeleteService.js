import { deleteService } from "@/api/moto-service/moto-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorServiceKeys } from "./motoService.keys";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: (data) => {
      (toast.success(data.message, { position: "top-right" }),
        queryClient.invalidateQueries({
          queryKey: motorServiceKeys.all,
        }));
    },
  });
};
