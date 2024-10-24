import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, Facebook, Twitter, Instagram, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductData } from "@/types/types";
import { formatPrice, generateEAN8SKUFromID } from "@/lib/utils";
import { getProductById } from "../../services/productService";
import Header from "../header/Header";

export default function ProductDetail() {
  const { id } = useParams<{ id: string | undefined }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const data = await getProductById(id);
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Header title="Detalle del Producto" />
      <div className="flex flex-col md:flex-row bg-foreground text-card-foreground p-6 gap-6">
        <div className="md:w-1/2">
          <img src={product.image_path} alt={product.name} width={600} height={600} className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <div className="text-gray-400">SKU: {generateEAN8SKUFromID(product.id)}</div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <div className="text-4xl font-bold text-primary">{formatPrice(product.price)}</div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="bg-gray-200 px-4 py-2 rounded">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1">Agregar Al Carrito</Button>
            <Button variant="secondary" className="flex-1">
              Lista De Deseos
            </Button>
          </div>
          <div>Stock Disponible: {product.stock} Kg</div>
          <div>
            <h3 className="font-semibold mb-2">Comparte este producto</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">¿Tienes productos que te gustaría vender?</h3>
            <p className="mb-2">Considera unirte a nuestra comunidad de vendedores para compartir tus productos y llegar a más clientes.</p>
            <Link to="/register">
              <Button>Únete Ahora</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
