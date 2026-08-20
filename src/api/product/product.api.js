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

export const createProduct = async (data) => {
  const formData = new FormData();

  formData.append("productCategoryId", data.productCategoryId);

  if (data.sku?.trim()) {
    formData.append("sku", data.sku);
  }
  formData.append("name", data.name);

  if (data.description) {
    formData.append("description", data.description);
  }

  formData.append("costPrice", data.costPrice);

  formData.append("sellingPrice", data.sellingPrice);

  if (
    data.stockQuantity !== undefined &&
    data.stockQuantity !== null &&
    data.stockQuantity !== ""
  ) {
    formData.append("stockQuantity", data.stockQuantity);
  }

  formData.append("unit", data.unit);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await authApi.post("/products", formData);

  return response.data;
};
export const updateProduct = async (id, payload) => {
  const formData = new FormData();

  if (payload.productCategoryId !== undefined) {
    formData.append("productCategoryId", payload.productCategoryId);
  }

  if (payload.sku !== undefined) {
    formData.append("sku", payload.sku);
  }

  if (payload.name !== undefined) {
    formData.append("name", payload.name);
  }

  if (payload.description !== undefined) {
    formData.append("description", payload.description);
  }

  if (payload.costPrice !== undefined) {
    formData.append("costPrice", payload.costPrice);
  }

  if (payload.sellingPrice !== undefined) {
    formData.append("sellingPrice", payload.sellingPrice);
  }

  if (payload.stockQuantity !== undefined) {
    formData.append("stockQuantity", payload.stockQuantity);
  }

  if (payload.unit !== undefined) {
    formData.append("unit", payload.unit);
  }
  if (payload.isActive !== undefined) {
    formData.append("isActive", payload.isActive);
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const res = await authApi.patch(`/products/${id}`, formData);

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await authApi.delete(`/products/${id}`);
  return res.data;
};
