import { createMotoBrand } from "@/api/motor-brand/motor-brand.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motorBrandKeys } from "./motoBrand.keys";

export const useCreateMotorBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMotoBrand,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      queryClient.invalidateQueries({
        //impotant  concept to update data after created
        queryKey: motorBrandKeys.all,
      });
    },
    // onError: (error) => {
    //   toast.error(error.message);
    // },
  });
};
