import { api } from "@/config/apiConfig";
import { AxiosError } from "axios";

export const addToCart = async (product: { product_id: string; quantity: string }) => {
  console.log("Iniciando la solicitud para añadir producto al carrito...");
  console.log("Datos del producto:", product);

  try {
    const response = await api.post("/cart/add", product);
    console.log("Solicitud exitosa. Respuesta recibida:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error capturado en addToCart:", error);

    if (error instanceof AxiosError) {
      console.error("Error al añadir producto al carrito:", error.message);

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
