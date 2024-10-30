import { useState, useEffect, useCallback } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import { getProductById } from "../../services/productService";
import CartEmpty from "./CartEmpty";
import { formatPrice, handleUpClick } from "@/lib/utils";
import SpinnerProducts from "@/components/custom/SpinnerProducts";
import useProductStore from "@/store/productStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import showDialog from "@/lib/showDialog";

interface CartItemDisplay {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItemDisplay[]>([]);
  const { products, addProduct } = useProductStore();
  const [loading, setLoading] = useState(true);
  const { cart, clearCart } = useCartStore();
  const { token } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const loadCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const productRequests = new Map<number, number>();

      cart.forEach((cartProduct) => {
        productRequests.set(cartProduct.product_id, (productRequests.get(cartProduct.product_id) || 0) + cartProduct.quantity);
      });

      const loadedItems = await Promise.all(
        Array.from(productRequests.keys()).map(async (productId) => {
          const existingProduct = products[productId];
          const quantity = productRequests.get(productId) ?? 0;

          if (existingProduct) {
            return {
              id: existingProduct.id,
              name: existingProduct.name,
              price: existingProduct.price,
              quantity: quantity,
              image: existingProduct.image_path || "/placeholder.svg",
            };
          }

          try {
            const product = await getProductById(productId);
            addProduct(productId, product);
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              image: product.image_path || "/placeholder.svg",
            };
          } catch (error) {
            console.error(`Error loading product ${productId}:`, error);
            return {
              id: productId,
              name: "Producto no encontrado",
              price: 0,
              quantity: quantity,
              image: "/placeholder.svg",
            };
          }
        }),
      );

      setCartItems(loadedItems);
    } catch (error) {
      console.error("Error loading cart items:", error);
    } finally {
      setLoading(false);
    }
  }, [cart, products, addProduct]);

  useEffect(() => {
    if (cart.length === 0) {
      setCartItems([]);
      setLoading(false);
    } else {
      const loadedProductIds = new Set(cartItems.map((item) => item.id));

      const hasProductChanges = cart.length !== cartItems.length || cart.some((cartItem) => !loadedProductIds.has(cartItem.product_id));

      if (hasProductChanges) {
        loadCartItems();
      } else {
        const updatedItems = cartItems.map((item) => ({
          ...item,
          quantity: cart.find((cartItem) => cartItem.product_id === item.id)?.quantity || item.quantity,
        }));
        setCartItems(updatedItems);
      }
    }
  }, [cart, loadCartItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cart.map((item) => (item.product_id === id ? { ...item, quantity: newQuantity } : item));

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    useCartStore.setState({ cart: updatedCart });

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.product_id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    useCartStore.setState({ cart: updatedCart });
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 8.0;
  const total = subtotal + shipping;

  const handleCancel = () => {
    clearCart();
    setCartItems([]);
    setLoading(false);
  };

  const handleConfirm = async () => {
    if (token) {
      console.log("Procesando orden...", cartItems);
      handleUpClick();
      navigate("/client/checkout");
    } else {
      const confirmed = await showDialog({
        title: "Iniciar Sesión",
        text: "Por favor, inicia sesión para continuar con la compra.",
        icon: "info",
        isConfirmation: true,
      });

      if (confirmed) {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <SpinnerProducts />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="bg-white rounded-lg border border-input p-4 text-card-foreground">
      <table className="w-full">
        <thead>
          <tr className="border-b border-input">
            <th className="text-left py-2">Item</th>
            <th className="text-left py-2">Precio</th>
            <th className="text-left py-2">Cantidad</th>
            <th className="text-left py-2">Total</th>
            <th className="text-left py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b border-input">
              <td className="py-4 flex items-center">
                <img src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                <span>{item.name}</span>
              </td>
              <td className="py-4 text-card-foreground font-bold">{formatPrice(item.price)}</td>
              <td className="py-4">
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-12 text-center mx-2 border rounded"
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td className="py-4 text-card-foreground font-bold">{formatPrice(item.price * item.quantity)}</td>
              <td className="py-4">
                <button onClick={() => removeItem(item.id)} className="text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-right pt-6">
        <div className="flex justify-end items-center mb-2">
          <span className="mr-4">Subtotal</span>
          <span className="text-card-foreground font-bold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-end items-center mb-2">
          <span className="mr-4">Envío</span>
          <span className="text-card-foreground font-bold">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-end items-center mb-4">
          <span className="mr-4 font-bold">Total</span>
          <span className="text-card-foreground font-bold">{formatPrice(total)}</span>
        </div>

        <Button variant="secondary" className="mr-2" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </div>
  );
}
