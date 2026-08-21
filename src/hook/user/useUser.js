import { getAllusers } from "@/api/user/user.api";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./userKey";

export const useUser = ({ includeInactive = false } = {}) => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllusers,
    staleTime: 5 * 60 * 1000,
    retry: false, // if fail -> call 3 times
  });
};
