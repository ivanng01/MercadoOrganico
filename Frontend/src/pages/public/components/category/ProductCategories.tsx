import { Bread, Cheese, Dip, Jar } from "@/lib/iconsCustom";
import { Egg, Carrot, CupSoda, Beef, Wheat, Apple } from "lucide-react";

const categories = [
  { name: "Huevos", products: 2, icon: Egg },
  { name: "Verduras", products: 2, icon: Carrot },
  { name: "Lácteos y Sustitutos", products: 3, icon: Cheese },
  { name: "Condimentos y Salsas", products: 10, icon: Dip },
  { name: "Carnes y Sustitutos", products: 3, icon: Beef },
  { name: "Miel y Edulcorantes", products: 3, icon: Jar },
  { name: "Bebidas", products: 2, icon: CupSoda },
  { name: "Productos de Panadería", products: 2, icon: Bread },
  { name: "Frutas", products: 5, icon: Apple },
  { name: "Granos y Legumbres", products: 3, icon: Wheat },
];

export default function ProductCategories() {
  return (
    <div className="relative p-4 lg:px-[120px] py-14">
      <img src="/category_head.svg" alt="" className="absolute bottom-0 left-0 w-full h-auto" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        {categories.map((category) => (
          <div key={category.name} className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between items-center text-center h-full">
            <div className="flex items-center justify-center mb-2">
              <category.icon className="w-12 h-12 text-gray-800" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.products} Productos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
