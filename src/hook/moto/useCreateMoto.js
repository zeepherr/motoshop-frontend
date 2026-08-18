import { createMotor } from "@/api/moto/moto.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motoKeys } from "./motoKey";

export const useCreateMoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMotor,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries({
        //impotant  concept to update data after created
        queryKey: motoKeys.all,
      });
    },
  });
};
