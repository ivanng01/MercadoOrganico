import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CloudUpload, HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function NewDiscountForm() {
  const [expirationDate, setExpirationDate] = useState<Date>();

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Nuevo Descuento</CardTitle>
        <p className="text-gray-600">Añade un nuevo descuento a tu tienda y comienza a vender.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Ingresa el nombre del descuento" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" placeholder="Ingresa la descripción del descuento" />
          <a href="#" className="text-sm text-blue-500 hover:underline">
            ¿Necesitas ayuda para completar la descripción?
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Tipo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries({
                  Percentage: "Porcentaje",
                  FixedAmount: "Cantidad Fija",
                  BuyOneGetOne: "Compra Uno y Lleva Otro",
                  Seasonal: "Estacional",
                  Clearance: "Liquidación",
                  Loyalty: "Lealtad",
                  Referral: "Referencia",
                  Promotional: "Promocional",
                }).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lotNumber">Valor</Label>
            <Input id="price" type="number" placeholder="0" min="0" step="1" />
            <a href="#" className="text-sm text-blue-500 hover:underline flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              ¿Qué es esto?
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de Inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={`w-full justify-start text-left font-normal ${!expirationDate ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expirationDate ? format(expirationDate, "PPP") : <span>Seleccionar una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de vencimiento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className={`w-full justify-start text-left font-normal ${!expirationDate ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expirationDate ? format(expirationDate, "PPP") : <span>Seleccionar una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Arrastra y suelta fotos o explora para subir desde tu computadora.</p>
          <Button variant="secondary" className="mt-4">
            <CloudUpload className="mr-2 h-4 w-4" /> Subir fotos
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="secondary">Cancelar</Button>
        <Button>Crear Descuento</Button>
      </CardFooter>
    </Card>
  );
}
