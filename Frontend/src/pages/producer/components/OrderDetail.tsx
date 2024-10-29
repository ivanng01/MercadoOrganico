import { useParams, useNavigate } from "react-router-dom";
import { orders } from "../data/ordersList";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck, Package, XCircle } from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((order) => order.id === id);
  const navigate = useNavigate();

  const handleUpdateStatus = (newStatus: string) => {
    if (order) {
      console.log(`Estado de la orden ${order.id} actualizado a ${newStatus}`);
    }
  };

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "Pendiente":
        return {
          color: "bg-yellow-500 hover:bg-yellow-600",
          icon: <Truck className="mr-1" />,
        };
      case "Enviado":
        return {
          color: "bg-blue-500 hover:bg-blue-600",
          icon: <Package className="mr-1" />,
        };
      case "Entregado":
        return {
          color: "bg-green-500 hover:bg-green-600",
          icon: <CheckCircle className="mr-1" />,
        };
      case "Cancelado":
        return {
          color: "bg-red-500 hover:bg-red-600",
          icon: <XCircle className="mr-1" />,
        };
      default:
        return {
          color: "bg-gray-300 hover:bg-gray-400",
          icon: null,
        };
    }
  };

  return (
    <div className="container p-4 text-card-foreground bg-card border border-input">
      {order ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Detalles de la Orden</h2>
          <p>
            <strong>ID Pedido:</strong> {order.id}
          </p>
          <p>
            <strong>Cliente:</strong> {order.customerName}
          </p>
          <p>
            <strong>Fecha:</strong> {order.orderDate}
          </p>
          <p>
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
          <p>
            <strong>Estado:</strong> {order.status}
          </p>

          <h3 className="mt-4 font-semibold pb-4">Cambiar Estado:</h3>
          <div className="flex space-x-2">
            {["Pendiente", "Enviado", "Entregado", "Cancelado"].map((status) => {
              const { color, icon } = getStatusDetails(status);
              return (
                <Button key={status} className={`text-white ${color} rounded-full flex items-center`} onClick={() => handleUpdateStatus(status)}>
                  {icon}
                  {status}
                </Button>
              );
            })}
          </div>

          <Button variant="secondary" className="mt-4" onClick={() => navigate("/producer/orders")}>
            Volver a la lista
          </Button>
        </div>
      ) : (
        <p>Orden no encontrada.</p>
      )}
    </div>
  );
}
