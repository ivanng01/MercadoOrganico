import { ChevronRight } from "lucide-react";

interface CategoriesSidebarProps {
  categories: { id: number; name: string }[];
  loading: boolean;
  error: string | null;
  onCategoryChange: (category: string | { id: number; name: string }) => void;
}

export default function CategoriesSidebar({ categories, loading, error, onCategoryChange }: CategoriesSidebarProps) {
  return (
    <div className="rounded-lg pl-4">
      {loading ? (
        <p>Cargando categorías...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          <li className="flex justify-between items-center py-2 px-4 cursor-pointer" onClick={() => onCategoryChange("Todos")}>
            <span>Todos</span>
            <ChevronRight className="h-5 w-5" />
          </li>
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center p-4 cursor-pointer" onClick={() => onCategoryChange(category)}>
              <span>{category.name}</span>
              <ChevronRight className="h-5 w-5" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
