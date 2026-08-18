import { deleteMotor } from "@/api/moto/moto.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motoKeys } from "./motoKey";

export const useDeleteMoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMotor,
    onSuccess: (data) => {
      (toast.success(data.message, { position: "top-right" }),
        queryClient.invalidateQueries({
          queryKey: motoKeys.all,
        }));
    },
  });
};
