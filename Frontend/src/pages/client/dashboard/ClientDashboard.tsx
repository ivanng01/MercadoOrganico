import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, FileIcon, MoreHorizontal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";

const data = [
  { name: "Feb", value: 30000 },
  { name: "Mar", value: 35000 },
  { name: "Abr", value: 32000 },
  { name: "May", value: 45591 },
  { name: "Jun", value: 40000 },
  { name: "Jul", value: 42000 },
  { name: "Ago", value: 38000 },
  { name: "Set", value: 41000 },
  { name: "Oct", value: 47000 },
  { name: "Nov", value: 50000 },
  { name: "Dic", value: 52000 },
  { name: "Ene", value: 55000 },
];

const lastPurchases = [
  {
    id: 1,
    name: "Tomate Italiano x kg",
    price: "5.00",
    date: "25 Octubre 2024",
    image_path: "https://vivanda.vtexassets.com/arquivos/ids/474846-300-300?v=638410520043170000&width=300&height=300&aspect=true",
  },
  {
    id: 2,
    name: "Zanahoria",
    price: "2.00",
    date: "25 Octubre 2024",
    image_path: "https://vivanda.vtexassets.com/arquivos/ids/178947-300-300?v=636978561154000000&width=300&height=300&aspect=true",
  },
  {
    id: 3,
    name: "Limón Ácido x kg",
    price: "3.00",
    date: "25 Octubre 2024",
    image_path: "https://vivanda.vtexassets.com/arquivos/ids/474844-300-300?v=638410519454100000&width=300&height=300&aspect=true",
  },
  {
    id: 4,
    name: "Cebolla Roja x kg",
    price: "2.00",
    date: "25 Octubre 2024",
    image_path: "https://vivanda.vtexassets.com/arquivos/ids/474842-300-300?v=638410518843130000&width=300&height=300&aspect=true",
  },
  {
    id: 5,
    name: "Papa Blanca Yungay x kg",
    price: "4.00",
    date: "25 Octubre 2024",
    image_path: "https://vivanda.vtexassets.com/arquivos/ids/474843-300-300?v=638410519142870000&width=300&height=300&aspect=true",
  },
];

export default function ClientDashboard() {
  const [timeRange, setTimeRange] = useState("6 Meses");
  const { firstName } = useAuthStore();

  return (
    <div className="container mx-auto space-y-4 lg:p-6">
      <h1 className="text-2xl text-card-foreground">
        <span className="font-bold">Hola {firstName}</span> - Aquí tienes un resumen de tu cuenta.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TUS GASTOS HOY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(1426)}</div>
            <p className="text-xs text-primary">
              +12% <ArrowUpIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL GASTADO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(12485)}</div>
            <p className="text-xs text-red-500">
              -8% <ArrowDownIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL DE TRANSACCIONES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-primary">
              +20% <ArrowUpIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Reporte de Gastos</CardTitle>
          <div className="flex space-x-2">
            {["6 Meses", "3 Meses", "30 Días", "7 Días"].map((range) => (
              <Button key={range} variant={timeRange === range ? "secondary" : "ghost"} size="sm" onClick={() => setTimeRange(range)}>
                {range}
              </Button>
            ))}
            <Button variant="destructive" size="sm">
              <FileIcon className="mr-2 h-4 w-4" /> Exportar PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Últimas Compras</CardTitle>
          <Button variant="link" size="sm">
            Ver todas las compras
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">Revisa el registro de tus últimas compras.</p>
          <div className="space-y-2">
            {lastPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img src={purchase.image_path} alt={purchase.name} className="h-16 w-16 object-cover rounded" />
                  <div>
                    <p className="font-medium">{purchase.name}</p>
                    <p className="text-sm text-gray-500">{purchase.date}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-medium">${purchase.price}</p>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
