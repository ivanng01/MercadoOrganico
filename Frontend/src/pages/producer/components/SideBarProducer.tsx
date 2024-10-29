import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Box, ClipboardList, FileText, Percent, HelpCircle, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function SideBarProducer() {
  const [isOpen, setIsOpen] = useState(true);
  const { email, firstName, lastName, clearAuthData } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: `dashboard` },
    { icon: Box, label: "Productos", badge: "10", path: `products` },
    { icon: ClipboardList, label: "Inventario", path: "inventory" },
    { icon: FileText, label: "Pedidos", badge: "32", path: "orders" },
    { icon: Percent, label: "Descuentos", path: "discounts" },
    { icon: HelpCircle, label: "Ayuda", path: "help" },
    { icon: Settings, label: "Configuración", path: "settings" },
  ];

  return (
    <div
      className={`flex flex-col container transition-all duration-300 bg-card text-card-foreground border-input ${isOpen ? "w-64" : "w-20"} border-r`}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full justify-${isOpen ? "start" : "center"} bg-primary hover:bg-green-600 text-white`}
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
          {isOpen && <span className="ml-2">Menu</span>}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="px-4 py-2">
              <Link to={item.path}>
                <Button variant="ghost" className={`w-full justify-${isOpen ? "start" : "center"}`}>
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

      <div className={`p-4 border-t border-input ${isOpen ? "" : "text-center"}`}>
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Olivia Peréz" />
            <AvatarFallback className="text-white">OP</AvatarFallback>
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
          className={`w-full justify-${isOpen ? "start" : "center"} text-red-500 hover:text-red-700 hover:bg-red-100`}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-2">Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  );
}
