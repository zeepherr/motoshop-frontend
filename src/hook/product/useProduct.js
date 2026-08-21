import { getAllProducts, getProducts } from "@/api/product/product.api";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./productKey";

export const useProduct = ({ includeInactive = false } = {}) => {
  return useQuery({
    queryKey: includeInactive
      ? productKeys.includeInactive()
      : productKeys.active(),
    queryFn: includeInactive ? getAllProducts : getProducts,
    staleTime: 5 * 60 * 1000,
    retry: false, // if fail -> call 3 times
  });
};
