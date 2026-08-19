import { authApi } from "../axios";

export const getAllServices = async () => {
  const res = await authApi.get("/services/all-services", {
    globalLoading: false,
  });
  return res.data.data;
};
export const getServices = async () => {
  const res = await authApi.get("/services/all", {
    globalLoading: false,
  });
  return res.data.data;
};

export const createService = async (payload) => {
  const res = await authApi.post("/services", payload, {
    globalLoading: false,
  });

  return res.data;
};
export const updateService = async (id, payload) => {
  const res = await authApi.patch(`/services/${id}`, payload);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await authApi.delete(`/services/${id}`);
  return res.data;
};
