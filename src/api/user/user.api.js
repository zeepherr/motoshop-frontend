import { authApi } from "../axios";

export const getAllusers = async () => {
  const res = await authApi.get("/users/all-users", {
    globalLoading: false,
  });
  return res.data.data;
};

export const changeUserRole = async (userId, role) => {
  const response = await authApi.patch(`/users/${userId}/role`, {
    role,
  });

  return response.data;
};
