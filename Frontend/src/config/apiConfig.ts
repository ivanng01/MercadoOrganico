import { useAuthStore } from "@/store/authStore";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const authConfig = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const { token } = useAuthStore.getState();

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return config;
};
