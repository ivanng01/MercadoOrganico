import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";

export default function DiscountManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto min-h-screen text-card-foreground">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            Gestión de Descuentos
            <span className="ml-2 text-sm font-normal text-primary">0 Descuentos</span>
          </CardTitle>
          <p className="text-sm text-gray-700">Administra, edita y organiza tus descuentos para optimizar tus ventas.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" /> Importar
          </Button>
          <Link to="new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Agregar un descuento
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Nombre (A-Z)</SelectItem>
                <SelectItem value="name_desc">Nombre (Z-A)</SelectItem>
                <SelectItem value="price_asc">Valor (Menor a Mayor)</SelectItem>
                <SelectItem value="price_desc">Valor (Mayor a Menor)</SelectItem>
                <SelectItem value="date_asc">Fecha (Más Antiguo)</SelectItem>
                <SelectItem value="date_desc">Fecha (Más Reciente)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative mb-2 sm:mb-0">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar descuentos.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="secondary">
              <Filter className="mr-2 h-4 w-4" /> Filtrar
            </Button>
          </div>
        </div>

        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Aún no tienes descuentos en tu tienda.</h2>
          <p className="text-gray-500 mb-4">Crea ofertas personalizadas y aumenta tus ventas</p>
          <div className="flex justify-center space-x-2">
            <Button variant="secondary">Ver ejemplos</Button>
            <Link to="new">
              <Button onClick={handleUpClick}>
                <Plus className="mr-2 h-4 w-4" /> Agregar descuento
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
