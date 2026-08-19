import { authApi } from "../axios";

export const getAllProducts = async () => {
  const res = await authApi.get("/products/all-products", {
    globalLoading: false,
  });
  return res.data.data;
};
export const getProducts = async () => {
  const res = await authApi.get("/products/all", {
    globalLoading: false,
  });
  return res.data.data;
};

export const createProduct = async (payload) => {
  const res = await authApi.post("/products", payload, {
    globalLoading: false,
  });

  return res.data;
};
export const updateProduct = async (id, payload) => {
  const res = await authApi.patch(`/products/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await authApi.delete(`/product/${id}`);
  return res.data;
};
