import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TitleDecor } from "@/lib/iconsCustom";
import { Product } from "@/types/types";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { handleUpClick } from "@/lib/utils";
import { getProducts } from "../../services/productService";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await getProducts({ is_featured: 1 });
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    handleUpClick();
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="bg-foreground py-12 px-4 lg:px-[120px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <TitleDecor className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-primary font-medium mb-4">Sabor y Salud en Cada Bocado</p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Nuestros productos destacados</h2>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="gap-2">
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-8">
          <Link to="/store">
            <Button variant="outline" className="bg-primary text-white px-8 py-2">
              Ver más productos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
