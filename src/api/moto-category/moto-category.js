import { authApi } from "../axios";

export const getAllCategories = async () => {
  const res = await authApi.get("/categories/all-categories", {
    globalLoading: false,
  });
  return res.data.data;
};
export const getCategories = async () => {
  const res = await authApi.get("/categories/all", {
    globalLoading: false,
  });
  return res.data.data;
};

export const createCategory = async (payload) => {
  const res = await authApi.post("/categories", payload, {
    globalLoading: false,
  });

  return res.data;
};
export const updateCategory = async (id, payload) => {
  const res = await authApi.patch(`/categories/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await authApi.delete(`/categories/${id}`);
  return res.data;
};
