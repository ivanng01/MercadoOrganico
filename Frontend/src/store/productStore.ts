import { ProductStore } from "@/types/types";
import { create } from "zustand";

const useProductStore = create<ProductStore>((set) => ({
  products: {},
  setProducts: (newProducts) => set({ products: newProducts }),
  addProduct: (id, productData) =>
    set((state) => ({
      products: { ...state.products, [id]: productData },
    })),
}));

export default useProductStore;
