import { toast } from "sonner";

import { authApi, publicApi } from "@/api/axios";
import { getApiError } from "@/utils/api.error";
let isInstalled = false;

function handleApiError(error) {
  const apiError = getApiError(error);

  // Preserve original Axios error while exposing
  // a normalized error for UI/business logic.
  error.apiError = apiError;

  const config = error.config;
  const errorMode = config?.errorMode ?? "toast";

  // Avoid duplicate handling in retry chains.
  if (config?._globalErrorHandled) {
    return Promise.reject(error);
  }

  if (config) {
    config._globalErrorHandled = true;
  }

  // Canceled requests should never notify the user.
  if (apiError.isCanceled) {
    return Promise.reject(error);
  }

  if (errorMode === "toast") {
    const toastId = [config?.method, config?.url, apiError.code]
      .filter(Boolean)
      .join(":");

    toast.error(apiError.message, {
      id: toastId,
      position: "top-center",
    });
  }

  return Promise.reject(error);
}

export function setupGlobalErrorInterceptors() {
  if (isInstalled) {
    return;
  }

  isInstalled = true;

  publicApi.interceptors.response.use((response) => response, handleApiError);

  authApi.interceptors.response.use((response) => response, handleApiError);
}
