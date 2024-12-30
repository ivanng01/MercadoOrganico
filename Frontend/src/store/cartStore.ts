import { create } from "zustand";

type CartProduct = {
  product_id: number;
  quantity: number;
};

interface CartStore {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  getTotalQuantity: () => number;
  initializeCart: () => void;
}

const getStoredCart = (): CartProduct[] => {
  if (typeof window === "undefined") return [];

  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const useCartStore = create<CartStore>((set, get) => ({
  cart: getStoredCart(),
  addToCart: (product) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item.product_id === product.product_id);
      const updatedCart = [...state.cart];

      if (existingProductIndex >= 0) {
        const existingProduct = updatedCart[existingProductIndex];
        const newQuantity = existingProduct.quantity + product.quantity;
        updatedCart[existingProductIndex] = { ...existingProduct, quantity: newQuantity };
      } else {
        updatedCart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
  getTotalQuantity: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
  initializeCart: () => {
    const storedCart = getStoredCart();
    set({ cart: storedCart });
  },
}));

export default useCartStore;
