import { authApi } from "../axios";

export const getMotors = async () => {
  const res = await authApi.get("/motors/all-motors", {
    globalLoading: false,
  });
  return res.data.data;
};

export const createMotor = async (payload) => {
  const res = await authApi.post("/motors", payload, {
    globalLoading: false,
  });

  return res.data;
};
export const updateMotor = async (id, payload) => {
  const res = await authApi.patch(`/motors/${id}`, payload);
  return res.data;
};

export const deleteMotor = async (id) => {
  const res = await authApi.delete(`/motors/${id}`);
  return res.data;
};
