import { authApi } from "../axios";

export const getAllusers = async () => {
  const res = await authApi.get("/users/all-users", {
    globalLoading: false,
  });
  return res.data.data;
};
