import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardProps } from "@/types/types";
import { formatPrice, generateEAN8SKUFromID } from "@/lib/utils";

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div className="border border-input rounded-lg shadow-sm p-4 flex flex-col cursor-pointer min-h-[380px] max-h-[400px]" onClick={onClick}>
      <img src={product.image_path || "/placeholder.svg"} alt={product.name} className="w-full max-h-40 object-contain mb-4 rounded" />
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-2">SKU: {generateEAN8SKUFromID(product.id)}</p>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-primary font-bold">{formatPrice(product.price)}</span>
        <Button variant="outline" className="bg-primary text-white gap-2">
          <ShoppingCart />
          Agregar
        </Button>
      </div>
    </div>
  );
}
