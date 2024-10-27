import { api } from "@/config/apiConfig";
import { ProductData, ProductFilters, ProductsApiResponse } from "@/types/types";
import { AxiosError } from "axios";

export const getProducts = async (filters?: ProductFilters) => {
  try {
    const response = await api.get<ProductsApiResponse>("/products", { params: filters });
    return response.data;
  } catch (error) {
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
