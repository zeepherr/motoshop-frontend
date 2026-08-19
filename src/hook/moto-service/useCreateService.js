import { createService } from "@/api/moto-service/moto-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorServiceKeys } from "./motoService.keys";

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries({
        //impotant  concept to update data after created
        queryKey: motorServiceKeys.all,
      });
    },
  });
};
