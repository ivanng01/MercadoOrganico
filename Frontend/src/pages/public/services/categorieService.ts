import { api } from "@/config/apiConfig";
import { AxiosError } from "axios";

export const getCategories = async () => {
  return api
    .get("/categories")
    .then((response) => {
      return response.data.data.categories.data;
    })
    .catch((error: AxiosError) => {
      console.error("Error al obtener categorías:", error);

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
