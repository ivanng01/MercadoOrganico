import { useNavigate } from "react-router-dom";
import { Bread, Cheese, Dip, Jar } from "@/lib/iconsCustom";
import { Egg, Carrot, CupSoda, Beef, Wheat, Apple } from "lucide-react";
import { handleUpClick } from "@/lib/utils";

const categories = [
  { category_id: 1, name: "Huevos", icon: Egg },
  { category_id: 2, name: "Verduras", icon: Carrot },
  { category_id: 3, name: "Lácteos y Sustitutos", icon: Cheese },
  { category_id: 4, name: "Condimentos y Salsas", icon: Dip },
  { category_id: 5, name: "Carnes y Sustitutos", icon: Beef },
  { category_id: 6, name: "Miel y Edulcorantes", icon: Jar },
  { category_id: 7, name: "Bebidas", icon: CupSoda },
  { category_id: 8, name: "Productos de Panadería", icon: Bread },
  { category_id: 9, name: "Frutas", icon: Apple },
  { category_id: 10, name: "Granos y Legumbres", icon: Wheat },
];

export default function ProductCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`store?category_id=${categoryId}`);
    handleUpClick();
  };

  return (
    <section className="px-4 lg:px-[120px] bg-muted">
      <div className="relative py-14 max-w-screen-2xl mx-auto">
        <img src="/category_head.svg" alt="" className="absolute bottom-0 left-0 w-full h-auto" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.category_id)}
              className="bg-card rounded-lg p-4 shadow-md flex flex-col justify-between items-center text-center h-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-2">
                <category.icon className="w-12 h-12 text-gray-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
