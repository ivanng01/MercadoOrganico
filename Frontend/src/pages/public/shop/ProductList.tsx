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
import { X, ListFilter, SlidersHorizontal } from "lucide-react";
import SearchBar from "@/components/custom/SearchBar";
import LogoBrand from "@/components/custom/LogoBrand";
import SpinnerProducts from "@/components/custom/SpinnerProducts";
import { useLocation } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({ page: 1 });
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search");
  const categoryId = query.get("category_id");
  const minPrice = query.get("min_price");
  const maxPrice = query.get("max_price");

  const resultsPerPage = 60;

  useEffect(() => {
    if (searchTerm) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchTerm,
        page: 1,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: undefined,
        page: 1,
      }));
    }
  }, [searchTerm]);

  useEffect(() => {
    const handlePriceFilterChange = (event: CustomEvent) => {
      const { min, max } = event.detail;
      setFilters((prevFilters) => ({
        ...prevFilters,
        min_price: min,
        max_price: max,
        page: 1,
      }));
    };

    const handlePriceFilterClear = () => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        min_price: undefined,
        max_price: undefined,
        page: 1,
      }));
    };

    window.addEventListener("priceFilterChanged", handlePriceFilterChange as EventListener);
    window.addEventListener("priceFilterCleared", handlePriceFilterClear);

    return () => {
      window.removeEventListener("priceFilterChanged", handlePriceFilterChange as EventListener);
      window.removeEventListener("priceFilterCleared", handlePriceFilterClear);
    };
  }, []);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    const categoryIdAsNumber = categoryId ? Number(categoryId) : undefined;

    try {
      const data = await getProducts({
        ...filters,
        min_price: minPrice ? Number(minPrice) : undefined,
        max_price: maxPrice ? Number(maxPrice) : undefined,
        category_id: categoryIdAsNumber,
      });

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
    handleUpClick();
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      category_id: typeof newFilters.category_id === "string" && newFilters.category_id === "Todos" ? undefined : newFilters.category_id,
      page: 1,
    };

    setFilters(updatedFilters);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    handleUpClick();
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <>
      <section className="p-4 lg:px-[120px] gap-4 w-full min-h-screen flex flex-col">
        <div className="relative flex flex-col max-w-screen-2xl mx-auto gap-4">
          <div className="sticky top-20 flex justify-between items-center bg-white text-card-foreground p-4 py-4 rounded-lg border border-input">
            <SearchBar />
            <button onClick={toggleFilter}>{isFilterOpen ? <ListFilter /> : <SlidersHorizontal />}</button>
          </div>

          {isFilterOpen && <div className="fixed inset-0 bg-black bg-opacity-70 z-30" onClick={toggleFilter} />}

          <div className="flex gap-4">
            <aside
              className={`fixed inset-y-0 left-0 w-80 max-w-[80vw] bg-background z-50
                transform transition-all duration-300 ease-in-out
                ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
                shadow-lg
              `}
            >
              <div className="bg-muted sticky top-0 flex justify-between items-center p-4 border-b">
                <LogoBrand variant="small" />
                <button onClick={toggleFilter} className="p-2 hover:bg-primary rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-64px)]">
                <ProductFilter onFilterChange={handleFilterChange} />
              </div>
            </aside>

            <main className="container grid min-h-screen">
              <section className="w-full">
                <ResultsCounterSorter
                  totalResults={totalResults}
                  currentPage={filters.page || 1}
                  resultsPerPage={resultsPerPage}
                  onSortChange={handleSortChange}
                />
              </section>
              <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 w-full min-h-[200px] flex-1">
                {loading ? (
                  <div className="container flex items-center justify-center col-span-full">
                    <SpinnerProducts />
                  </div>
                ) : error ? (
                  <div className="container flex items-center justify-start col-span-full">
                    <NoProductsFound />
                  </div>
                ) : (
                  products.length > 0 &&
                  products.map((product) => <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />)
                )}
              </div>
              <Pagination currentPage={filters.page || 1} totalPages={totalPages} onPageChange={handlePageChange} />
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
