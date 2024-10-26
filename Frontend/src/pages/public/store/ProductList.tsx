import { useEffect, useState } from "react";
import { Product, ProductFilters } from "@/types/types";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../services/productService";
import ProductFilter from "../components/product/ProductFilter";
import NoProductsFound from "../components/product/NoProductsFound";
import ResultsCounterSorter from "../components/product/ResultsCounterSorter";
import { useNavigate } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";
import { AxiosError } from "axios";
import Pagination from "@/components/custom/Pagination";
import Header from "../components/header/Header";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({ page: 1 });
  const [totalResults, setTotalResults] = useState<number>(0);
  const resultsPerPage = 15;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(filters);
      setProducts(data.data);
      setTotalResults(data.meta.total);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(`Error en la respuesta: ${error.response?.status} - ${error.response?.data.message || "Sin mensaje"}`);
      } else {
        setError("Error desconocido");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleSortChange = (option: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: option,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // Handle product click navigation
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    handleUpClick();
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <>
      <Header title="Tienda" />
      <section className="p-4 lg:px-[120px] bg-foreground gap-4 w-full min-h-screen flex flex-col">
        <section className="flex max-w-screen-2xl mx-auto flex-1">
          <ProductFilter onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters, page: 1 })} />
          <section className="w-full col-span-full flex flex-col">
            <ResultsCounterSorter
              totalResults={totalResults}
              currentPage={filters.page || 1}
              resultsPerPage={resultsPerPage}
              onSortChange={handleSortChange}
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 flex-1">
              {loading && <p className="text-center col-span-full">Cargando productos...</p>}
              {!loading && error && (
                <div className="col-span-full">
                  <NoProductsFound />
                </div>
              )}
              {!loading &&
                !error &&
                products.length > 0 &&
                products.map((product) => <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />)}
            </div>
            <section className="mt-4">
              <Pagination currentPage={filters.page || 1} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
