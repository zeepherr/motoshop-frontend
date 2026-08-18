import { getMotorBrands } from "@/api/motor-brand/motor-brand.api";
import { useQuery } from "@tanstack/react-query";
import { motorBrandKeys } from "./motoBrand.keys";

export const useMotoBrands = () => {
  return useQuery({
    queryKey: motorBrandKeys.all,
    queryFn: getMotorBrands,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
