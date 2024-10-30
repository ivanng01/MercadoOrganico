import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PurchaseSuccessProps {
  orderId: string;
  totalAmount: number;
  products: { name: string; price: number; quantity: number }[];
}

export default function PurchaseSuccess({ orderId, totalAmount, products }: PurchaseSuccessProps) {
  return (
    <div className="container mx-auto mt-8 text-card-foreground">
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
              <strong>Total de la Compra:</strong> ${totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Productos Comprados</h3>
            <ul className="list-disc list-inside">
              {products.map((product, index) => (
                <li key={index}>
                  {product.name} - {product.quantity} x ${product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>

      <div className="mt-4">
        <Link to="/store">
          <Button size="lg" onClick={() => (window.location.href = "/")}>
            Volver a la Tienda
          </Button>
        </Link>
      </div>
    </div>
  );
}
