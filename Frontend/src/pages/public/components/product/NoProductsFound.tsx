import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";

export default function NoProductsFound() {
  return (
    <div className="w-screen flex flex-col items-center justify-start gap-4 p-8 rounded-lg min-h-[300px]">
      <PackageX className="w-16 h-16 text-muted-foreground" />
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">No se encontraron productos</h3>
        <p className="text-muted-foreground mb-4">Intenta ajustar los filtros o realiza una nueva búsqueda</p>
        <section className="flex gap-4 justify-center">
          <Button>Limpiar Filtros</Button>
          <Button variant="secondary" className="w-32">
            Volver
          </Button>
        </section>
      </div>
    </div>
  );
}
