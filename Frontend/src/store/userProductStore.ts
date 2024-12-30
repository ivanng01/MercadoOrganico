import { create } from "zustand";
import { getProducts } from "@/pages/public/services/productService";
import { UserProductStore } from "@/types/types";

const useUserProductStore = create<UserProductStore>((set) => ({
  userProducts: [],
  loading: true,
  fetchUserProducts: async (user_id) => {
    set({ loading: true });
    try {
      const response = await getProducts({ user_id });
      set({ userProducts: response.data, loading: false });
    } catch (error) {
      console.error("Error al obtener productos del usuario:", error);
      set({ loading: false });
    }
  },
}));

export default useUserProductStore;
