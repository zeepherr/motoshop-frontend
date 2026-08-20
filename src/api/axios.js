import axios from "axios";

import useUiStore from "@/stores/ui.store";

const baseConfig = {
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
};

const startGlobalLoading = (config) => {
  if (!config.globalLoading) {
    return config;
  }

  useUiStore.getState().startRequest();

  config._globalLoadingTracked = true;

  return config;
};

const stopGlobalLoading = (config) => {
  if (!config?._globalLoadingTracked) {
    return;
  }

  useUiStore.getState().finishRequest();

  delete config._globalLoadingTracked;
};

const attachGlobalLoading = (api) => {
  api.interceptors.request.use(
    (config) => startGlobalLoading(config),
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => {
      stopGlobalLoading(response.config);

      return response;
    },

    (error) => {
      stopGlobalLoading(error.config);

      return Promise.reject(error);
    },
  );
};

export const publicApi = axios.create(baseConfig);
export const authApi = axios.create(baseConfig);

attachGlobalLoading(publicApi);
attachGlobalLoading(authApi);
