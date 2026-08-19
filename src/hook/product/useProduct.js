import { getAllProducts } from "@/api/product/product.api";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./productKey";

export const useProduct = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
    retry: false, // if fail -> call 3 times
  });
};
