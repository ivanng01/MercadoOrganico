import { useEffect, useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import SliderwithNumberInput from "@/components/custom/SliderwithNumberInput";
import { getCategories } from "../services/categorieService";
import CategoriesSidebar from "../components/category/CategoriesSidebar";
import { ProductFilterProps } from "@/types/types";

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isSliderExpanded, setIsSliderExpanded] = useState<boolean>(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setError("No se pudieron cargar las categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string | { id: number; name: string }) => {
    const categoryName = category === "Todos" ? "Todos" : (category as { id: number; name: string }).name;
    setSelectedCategory(categoryName);
    const filters = category === "Todos" ? {} : { category_id: (category as { id: number }).id };
    onFilterChange(filters);
  };

  return (
    <div className="flex flex-col gap-2 min-w-[270px] items-start justify-start rounded-lg">
      <div className="w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Búsqueda"
            className="w-full py-2 px-4 h-11 rounded-lg outline-none text-white bg-primary placeholder-white"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-6 w-6 text-white" />
          </span>
        </div>
      </div>

      <div className="w-full">
        <button onClick={() => setIsSliderExpanded(!isSliderExpanded)} className="flex items-center text-gray-700 font-bold pb-4">
          {isSliderExpanded ? <Minus className="h-4 w-4 mr-4" /> : <Plus className="h-4 w-4 mr-4" />} Filtrar por
        </button>
        {isSliderExpanded && (
          <div className="pl-4">
            <SliderwithNumberInput />
          </div>
        )}
      </div>

      <div className="w-full">
        {selectedCategory && <div className={`p-2 text-white font-bold rounded-lg bg-gray-500`}>Categoría seleccionada: {selectedCategory}</div>}
        <button onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)} className="flex items-center text-gray-700 font-bold pb-4">
          {isCategoriesExpanded ? <Minus className="h-4 w-4 mr-4" /> : <Plus className="h-4 w-4 mr-4" />} Categorías
        </button>
        {isCategoriesExpanded && (
          <CategoriesSidebar categories={categories} loading={loading} error={error} onCategoryChange={handleCategoryChange} />
        )}
      </div>
    </div>
  );
}
