import { api } from "@/config/apiConfig";
import { ProductData, ProductFilters, ProductsApiResponse } from "@/types/types";
import { AxiosError } from "axios";

export const getProducts = async (filters?: ProductFilters) => {
  try {
    // Log para mostrar los filtros utilizados en la solicitud
    console.log("Iniciando solicitud para obtener productos...");
    if (filters) {
      console.log("Filtros aplicados:", filters);
    } else {
      console.log("No se aplicaron filtros.");
    }

    // Realizar la solicitud
    const response = await api.get<ProductsApiResponse>("/products", { params: filters });

    // Log para mostrar la respuesta de la solicitud
    console.log("Respuesta recibida:", response.data);

    return response.data;
  } catch (error) {
    console.log("Error al obtener productos:", error); // Log para capturar el error general

    if (error instanceof AxiosError) {
      if (error.response) {
        console.log("Error en la respuesta del servidor:", error.response.status, "-", error.response.data.message || "Sin mensaje");
        throw new Error(`Error en la respuesta del servidor: ${error.response.status} - ${error.response.data.message || "Sin mensaje"}`);
      } else if (error.request) {
        console.log("Error: No hubo respuesta del servidor.");
        throw new Error("No hubo respuesta del servidor.");
      } else {
        console.log("Error al configurar la solicitud:", error.message);
        throw new Error(`Error al configurar la solicitud: ${error.message}`);
      }
    } else {
      console.log("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export const getProductById = async (id: number): Promise<ProductData> => {
  return api
    .get<{ status: string; code: number; message: string; data: ProductData }>(`/products/${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        if (error.response) {
          throw new Error(`Error en la respuesta del servidor: ${error.response.status} - ${error.response.data.message || "Sin mensaje"}`);
        } else if (error.request) {
          throw new Error("No hubo respuesta del servidor.");
        } else {
          throw new Error(`Error al configurar la solicitud: ${error.message}`);
        }
      } else {
        throw new Error("Error desconocido");
      }
    });
};
