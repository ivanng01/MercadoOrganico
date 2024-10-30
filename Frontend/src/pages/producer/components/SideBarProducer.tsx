import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Box,
  ClipboardList,
  FileText,
  Percent,
  HelpCircle,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getInitials, handleUpClick } from "@/lib/utils";

export default function SideBarProducer() {
  const [isOpen, setIsOpen] = useState(true);
  const { email, firstName, lastName, clearAuthData, role } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate("/");
  };

  console.log(role);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: `dashboard`, roles: ["admin", "productor", "cliente"] },
    { icon: Box, label: "Productos", badge: "10", path: `products`, roles: ["admin", "productor"] },
    { icon: ClipboardList, label: "Inventario", path: "inventory", roles: ["admin", "productor"] },
    { icon: FileText, label: "Pedidos", badge: "15", path: "orders", roles: ["admin", "productor"] },
    { icon: Percent, label: "Descuentos", path: "discounts", roles: ["admin", "productor"] },
    { icon: HelpCircle, label: "Ayuda", path: "help", roles: ["admin", "productor", "viewer"] },
    { icon: ShoppingCart, label: "Confirmar compra", path: "checkout", roles: ["cliente"] },
    { icon: Settings, label: "Configuración", path: "settings", roles: ["productor", "cliente"] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(role));

  return (
    <div
      className={`sticky top-[64px] left-0 h-[calc(100vh-64px)] flex flex-col justify-between transition-all duration-300 bg-card text-card-foreground border-input ${
        isOpen ? "w-72" : "w-20"
      } border-r`}
    >
      <div>
        <div className="p-2">
          <Button className={`w-full justify-${isOpen ? "start" : "center"} bg-primary hover:bg-green-600 text-white`} onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
            {isOpen && <span className="ml-2">Menu</span>}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {filteredMenuItems.map((item, index) => (
              <li key={index} className="px-4 py-1">
                <Link to={item.path}>
                  <Button variant="ghost" onClick={handleUpClick} className={`w-full justify-${isOpen ? "start" : "center"}`}>
                    <item.icon className="h-5 w-5" />
                    {isOpen && <span className="ml-2">{item.label}</span>}
                    {isOpen && item.badge && (
                      <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-0.5 rounded">{item.badge}</span>
                    )}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`p-4 border-t border-input ${isOpen ? "" : "text-center"}`}>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="text-white">{getInitials(firstName, lastName)}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium">{`${firstName} ${lastName}`}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          className={`w-full justify-${isOpen ? "start" : "center"} text-red-500 hover:text-red-700 hover:bg-red-100 mt-2`}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-2">Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  );
}
