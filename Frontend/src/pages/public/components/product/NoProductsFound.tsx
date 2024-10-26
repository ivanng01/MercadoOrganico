import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

export default function NoProductsFound() {
  return (
    <div className="w-full flex flex-col items-center justify-start text-center pt-20 h-screen">
      <PackageX className="w-24 h-24 text-muted-foreground mb-6" />
      <h2 className="text-2xl font-bold text-card-foreground mb-2">No se encontraron productos</h2>
      <p className="text-gray-400 mb-6">Lo sentimos, no hemos podido encontrar productos en categoría.</p>
      <div className="inline-block space-x-2">
        <Button>Explorar otras categorías</Button>
        <Button variant="secondary">Limpiar filtros</Button>
      </div>
    </div>
  );
}
