import { orders } from "../data/ordersList";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { CheckCircle, Truck, Package, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const navigate = useNavigate();

  const handleOrderSelect = (orderId: string) => {
    navigate(`/producer/orders/${orderId}`);
  };

  return (
    <div className="container text-card-foreground space-y-4 min-h-screen">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            Gestión de Pedidos
            <span className="ml-2 text-sm font-bold text-primary">15 Pedidos</span>
          </CardTitle>
          <p className="text-sm text-gray-500">Administra y organiza tus pedidos para optimizar tus ventas y mejorar la satisfacción del cliente.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Share className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="w-full bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const { color, icon } = getStatusDetails(order.status);
              return (
                <TableRow
                  key={order.id}
                  onClick={() => handleOrderSelect(order.id)}
                  className="cursor-pointer transition duration-200 hover:bg-gray-100 hover:shadow-lg"
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Button variant="default" className={`text-white ${color} rounded-full px-4 py-1 flex items-center`}>
                      {icon}
                      <span className="ml-2">{order.status}</span>
                    </Button>
                  </TableCell>
                  <TableCell>{`$${order.total.toFixed(2)}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
}

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
