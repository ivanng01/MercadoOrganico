import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TitleDecor } from "@/lib/iconsCustom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { handleUpClick } from "@/lib/utils";
import { CarouselApi, ExtendedProduct, ProductsApiResponse, RelatedSuggestionsProps } from "@/types/types";
import { getProducts } from "../../services/productService";
import { AxiosError } from "axios";

export default function RelatedSuggestions({ categoryId }: RelatedSuggestionsProps) {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryProducts = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data: ProductsApiResponse = await getProducts({ category_id: id });

      const extendedProducts: ExtendedProduct[] = data.data.map((product) => ({
        ...product,
        sku: product.id.toString(),
      }));

      setCategoryProducts(extendedProducts);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(`Error en la respuesta: ${error.response?.status} - ${error.response?.data.message || "Sin mensaje"}`);
      } else {
        setError("Error desconocido");
      }
      setCategoryProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryProducts(categoryId);
    }
  }, [categoryId]);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    handleUpClick();
  };

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="px-4 lg:px-[120px] bg-foreground mx-auto">
      <div className="py-12 max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <TitleDecor className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-primary mb-4 font-semibold text-xl">Similares a tu elección</p>
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Quienes vieron este producto también compraron</h2>
        </div>

        <Carousel className="w-full mx-auto" setApi={(api) => setApi(api as CarouselApi)}>
          <CarouselContent className="gap-4">
            {categoryProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4 2xl:basis-1/5">
                <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center mt-8">
          <div className="text-center mt-8">
            <div className="text-center mt-8">
              <Link to={`/store?category_id=${categoryId}`}>
                <Button variant="outline" className="bg-primary text-white px-8 py-2" onClick={handleUpClick}>
                  Ver más productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
