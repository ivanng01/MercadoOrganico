import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import SliderwithNumberInput from "@/components/custom/SliderwithNumberInput";
import { getCategories } from "../../services/categorieService";
import CategoriesSidebar from "../category/CategoriesSidebar";
import { ProductFilterProps } from "@/types/types";
import { useNavigate } from "react-router-dom";

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [isSliderExpanded, setIsSliderExpanded] = useState<boolean>(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState<boolean>(true);

  const navigate = useNavigate();

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
    let categoryId: number | undefined;

    if (category === "Todos") {
      setSelectedCategory(null);
      onFilterChange({ category_id: undefined });
      categoryId = undefined;
    } else {
      const selected = category as { id: number; name: string };
      setSelectedCategory(selected.id);
      onFilterChange({ category_id: selected.id });
      categoryId = selected.id;
    }

    const params = new URLSearchParams(window.location.search);
    if (categoryId) {
      params.set("category_id", String(categoryId));
    } else {
      params.delete("category_id");
    }
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2 items-start justify-start w-full pl-4 bg-muted">
      <div className="w-full py-4">
        <button onClick={() => setIsSliderExpanded(!isSliderExpanded)} className="flex items-center font-bold pb-4">
          {isSliderExpanded ? <Minus className="h-4 w-4 mr-4" /> : <Plus className="h-4 w-4 mr-4" />} Filtrar por
        </button>
        {isSliderExpanded && (
          <div className="pl-4">
            <SliderwithNumberInput />
          </div>
        )}
      </div>

      <div className="w-full py-4">
        {selectedCategory !== null && (
          <div className={`p-2 text-white font-bold rounded-lg bg-gray-500`}>
            Categoría seleccionada: {categories.find((cat) => cat.id === selectedCategory)?.name}
          </div>
        )}
        <button onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)} className="flex items-center font-bold pb-4">
          {isCategoriesExpanded ? <Minus className="h-4 w-4 mr-4" /> : <Plus className="h-4 w-4 mr-4" />} Categorías
        </button>
        {isCategoriesExpanded && (
          <CategoriesSidebar categories={categories} loading={loading} error={error} onCategoryChange={handleCategoryChange} />
        )}
      </div>
    </div>
  );
}
