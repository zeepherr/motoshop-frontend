import { authApi, publicApi } from "../axios";

export const login = async (payload) => {
  const response = await publicApi.post("/auth/login", payload, {
    errorMode: "inline",
    globalLoading: false,
  });
  return response.data;
};
export const registerUser = async (payload) => {
  const response = await publicApi.post("/auth/register", payload, {
    errorMode: "inline",
    globalLoading: false,
  });
  return response.data;
};
export const logout = async () => {
  const response = await publicApi.post("/auth/logout");
  return response.data;
};

export async function fetchMe() {
  const response = await authApi.get("/auth/me");

  return response.data;
}
export async function refresh() {
  const response = await publicApi.post(
    "/auth/refresh",
    {},
    {
      errorMode: "silent",
    },
  );

  return response.data;
}
export const verifyRegistrationEmail = async (payload) => {
  const response = await publicApi.post("/auth/register/verify", payload, {
    errorMode: "local",
  });

  return response.data;
};

export const resendRegistrationOtp = async (payload) => {
  const response = await publicApi.post("/auth/register/resend", payload, {
    errorMode: "inline",
  });

  return response.data;
};
