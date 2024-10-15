import { api } from "@/config/apiConfig";
import { LoginData, RegisterData } from "@/types/types";

export const registerUser = async (userData: RegisterData) => {
  return api
    .post("/auth/register", userData)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.status, error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("No hubo respuesta del servidor:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
      throw error;
    });
};

export const loginUser = async (userData: LoginData) => {
  return api
    .post("/auth/login", userData)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.status, error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("No hubo respuesta del servidor:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
      throw error;
    });
};
