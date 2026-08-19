import {
  getAllCategories,
  getCategories,
} from "@/api/moto-category/moto-category";
import { useQuery } from "@tanstack/react-query";
import { motorCategoryKeys } from "./motoCategory.keys";

export const useMotoCategories = ({ includeInactive = true } = {}) => {
  return useQuery({
    queryKey: includeInactive
      ? motorCategoryKeys.includingInactive()
      : motorCategoryKeys.active(),
    queryFn: includeInactive ? getAllCategories : getCategories,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
