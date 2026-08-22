import { changeUserRole } from "@/api/user/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userKeys } from "./userKey";

export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => changeUserRole(userId, role),

    onSuccess: (data) => {
      toast.success(data?.message || "User role updated successfully.", {
        position: "top-right",
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
}
