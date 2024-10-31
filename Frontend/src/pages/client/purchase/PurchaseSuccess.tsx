import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import useCartStore from "@/store/cartStore";
import useProductStore from "@/store/productStore";
import { formatPrice } from "@/lib/utils";

export default function PurchaseSuccess() {
  const { cart, clearCart } = useCartStore();
  const { products } = useProductStore();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => {
    const product = products[item.product_id];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const shippingCost = 8;
  const finalTotal = totalAmount + shippingCost;
  const orderId = Math.floor(Math.random() * 1000000).toString();

  const handleBackToStore = () => {
    clearCart();
    navigate("/store");
  };

  return (
    <div className="container mx-auto mt-4 text-card-foreground">
      <CardHeader className="flex flex-col justify-between items-start space-y-2">
        <CardTitle className="text-2xl font-bold pb-2">¡Compra Exitosa!</CardTitle>
        <CardDescription className="text-gray-700">Gracias por tu compra. Tu pedido ha sido procesado con éxito.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Detalles de tu Pedido</h3>
            <p>
              <strong>Número de Pedido:</strong> {orderId}
            </p>
            <p>
              <strong>Envío:</strong> {formatPrice(shippingCost)}
            </p>
            <p>
              <strong>Total de la Compra:</strong> {formatPrice(finalTotal)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Productos Comprados</h3>
            <ul className="list-none space-y-4">
              {cart.map((item) => {
                const product = products[item.product_id];
                return (
                  <li key={item.product_id} className="flex items-center p-4 border border-gray-300 rounded-lg">
                    {product ? (
                      <>
                        <img src={product.image_path} alt={product.name} className="w-24 h-24 object-cover mr-4" />
                        <div className="flex-grow">
                          <h4 className="text-md font-semibold">{product.name}</h4>
                          <p className="text-gray-600">{product.description}</p>
                          <p>
                            <strong>Cantidad:</strong> {item.quantity} x {formatPrice(product.price)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <span>Producto ID: {item.product_id} no encontrado</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <Button size="lg" onClick={handleBackToStore}>
            Volver a la Tienda
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
