import { updateMotor } from "@/api/moto/moto.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motoKeys } from "./motoKey";

export const useUpdateMoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      return updateMotor(id, payload);
    },
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-right" });
      queryClient.invalidateQueries({
        queryKey: motoKeys.all,
      });
    },
  });
};
