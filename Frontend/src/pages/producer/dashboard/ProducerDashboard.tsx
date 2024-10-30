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

const transactions = [
  { status: "Completado", method: "Mastercard **** 6442", type: "Tarjeta de Crédito", amount: 99.0, date: "17 Enero 2024" },
  { status: "Completado", method: "Visa **** 6442", type: "Tarjeta de Crédito", amount: 99.0, date: "17 Enero 2024" },
  { status: "Pendiente", method: "Cuenta ****882", type: "Transferencia Bancaria", amount: 249.94, date: "17 Enero 2024" },
  { status: "Cancelado", method: "Amex card **** 5666", type: "Transferencia Bancaria", amount: 199.24, date: "17 Enero 2024" },
];

export default function ProducerDashboard() {
  const [timeRange, setTimeRange] = useState("6 Meses");
  const { firstName } = useAuthStore();

  return (
    <div className="container mx-auto space-y-4 lg:p-6">
      <h1 className="text-2xl text-card-foreground">
        <span className="font-bold">Hola {firstName}</span> - Esto es lo que está pasando con tu tienda hoy.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TUS VENTAS HOY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(12426)}</div>
            <p className="text-xs text-primary">
              +36% <ArrowUpIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL DE VENTAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(238485)}</div>
            <p className="text-xs text-red-500">
              -14% <ArrowDownIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TOTAL DE PEDIDOS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84,382</div>
            <p className="text-xs text-primary">
              +36% <ArrowUpIcon className="inline" size={12} />
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Reporte de Ventas</CardTitle>
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Movimientos</CardTitle>
          <Button variant="link" size="sm">
            Ver todos los movimientos
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">Este es el consolidado de los últimos movimientos.</p>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      transaction.status === "Completado" ? "bg-primary" : transaction.status === "Pendiente" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{transaction.method}</p>
                    <p className="text-sm text-gray-500">{transaction.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
