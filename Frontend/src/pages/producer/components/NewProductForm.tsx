import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CloudUpload, HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function NewProductForm() {
  const [isFeatured, setIsFeatured] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date>();

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Nuevo Producto</CardTitle>
        <p className="text-gray-600">Añade un nuevo producto a tu tienda y comienza a vender.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Ingresa el nombre del producto" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" placeholder="Ingresa la descripción del producto" />
          <a href="#" className="text-sm text-blue-500 hover:underline">
            ¿Necesitas ayuda para completar la descripción?
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Origen</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries({
                  LocalFarm: "Granja Local",
                  OrganicCertified: "Orgánico Certificado",
                  WildHarvested: "Cosecha Silvestre",
                  SustainableFarm: "Granja Sostenible",
                  Imported: "Importado",
                  HomeGarden: "Huerto Casero",
                  Cooperative: "Cooperativa",
                }).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lotNumber">Número de Lote</Label>
            <Input id="lotNumber" placeholder="Ingresa el número de lote" />
            <a href="#" className="text-sm text-blue-500 hover:underline flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              ¿Qué es esto?
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad de medida</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                <SelectItem value="g">Gramos (g)</SelectItem>
                <SelectItem value="un">Unidad (un)</SelectItem>
                <SelectItem value="doc">Docena ()</SelectItem>
                <SelectItem value="l">Litros (L)</SelectItem>
                <SelectItem value="ml">Mililitros (mL)</SelectItem>
                <SelectItem value="pcs">Piezas (pcs)</SelectItem>
                <SelectItem value="pk">Paquete (pk)</SelectItem>
                <SelectItem value="box">Cajas (box)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialStock">Stock Inicial</Label>
            <Input id="initialStock" type="number" placeholder="0" min="0" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
          <Label htmlFor="featured">Producto Destacado</Label>
        </div>
        <p className="text-sm text-gray-500">Puedes destacar algunos productos de tu cartera para aumentar su visibilidad en la tienda.</p>

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
        <Button>Crear Producto</Button>
      </CardFooter>
    </Card>
  );
}
