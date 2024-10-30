import { api, authConfig } from "@/config/apiConfig";
import { AxiosError } from "axios";

export const getUserProfile = async () => {
  console.log("Iniciando la solicitud para obtener el perfil del usuario logueado...");

  try {
    const response = await api.get("/users/profile", authConfig()); 
    console.log("Solicitud exitosa. Perfil de usuario recibido:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error capturado en getUserProfile:", error);

    if (error instanceof AxiosError) {
      console.error("Error al obtener el perfil del usuario:", error.message);

      if (error.response) {
        console.error("Error en la respuesta del servidor:", `Status: ${error.response.status}`, `Datos: ${JSON.stringify(error.response.data)}`);
        throw error.response.data;
      } else if (error.request) {
        console.error("No hubo respuesta del servidor. Detalles de la solicitud:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
    } else {
      console.error("Error desconocido capturado:", error);
    }

    throw error;
  }
};
