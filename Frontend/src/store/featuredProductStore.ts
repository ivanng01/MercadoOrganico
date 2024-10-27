import { create } from "zustand";
import { FeaturedProductStore } from "@/types/types";
import { getProducts } from "@/pages/public/services/productService";

const useFeaturedProductStore = create<FeaturedProductStore>((set) => ({
  featuredProducts: [],
  loading: true,
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await getProducts({ is_featured: 1 });
      set({ featuredProducts: response.data, loading: false });
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      set({ loading: false });
    }
  },
}));

export default useFeaturedProductStore;
