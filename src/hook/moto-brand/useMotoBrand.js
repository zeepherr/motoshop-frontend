import {
  getAllMotorBrands,
  getMotorBrands,
} from "@/api/motor-brand/motor-brand.api";
import { useQuery } from "@tanstack/react-query";
import { motorBrandKeys } from "./motoBrand.keys";

export const useMotoBrands = ({ includeInactive = true } = {}) => {
  return useQuery({
    queryKey: includeInactive
      ? motorBrandKeys.includingInactive()
      : motorBrandKeys.active(),
    queryFn: includeInactive ? getAllMotorBrands : getMotorBrands,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
