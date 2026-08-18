import { authApi } from "../axios";

export const getMotorBrands = async () => {
  const res = await authApi.get("/motor-brands/all-brands", {
    globalLoading: false,
  });
  return res.data.data;
};

export const createMotoBrand = async (payload) => {
  const res = await authApi.post("/motor-brands", payload, {
    globalLoading: false,
  });

  return res.data;
};
export const updateMotoBrand = async (id, payload) => {
  const res = await authApi.patch(`/motor-brands/${id}`, payload);
  return res.data;
};

export const deleteMotoBrand = async (id) => {
  const res = await authApi.delete(`/motor-brands/${id}`);
  return res.data;
};
