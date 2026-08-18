import { getMotors } from "@/api/moto/moto.api";
import { useQuery } from "@tanstack/react-query";
import { motoKeys } from "./motoKey";

export const useMoto = () => {
  return useQuery({
    queryKey: motoKeys.all,
    queryFn: getMotors,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
