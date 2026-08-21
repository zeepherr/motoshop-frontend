import { getAllServices, getServices } from "@/api/moto-service/moto-service";
import { useQuery } from "@tanstack/react-query";
import { motorServiceKeys } from "./motoService.keys";

export const useService = ({ includeInactive = false } = {}) => {
  return useQuery({
    queryKey: includeInactive
      ? motorServiceKeys.includingInactive()
      : motorServiceKeys.active(),
    queryFn: includeInactive ? getAllServices : getServices,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
