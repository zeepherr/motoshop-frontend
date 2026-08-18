import { getCategory } from "@/api/moto-category/moto-category";
import { useQuery } from "@tanstack/react-query";
import { motorCategoryKeys } from "./motoCategory.keys";

export const useMotoCategories = () => {
  return useQuery({
    queryKey: motorCategoryKeys.all,
    queryFn: getCategory,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
