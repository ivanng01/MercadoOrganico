import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, User, LogOut, Settings, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import LogoBrand from "./LogoBrand";
import { useAuthStore } from "@/store/authStore";
import { getInitials, handleUpClick } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import SearchModal from "./SearchModal";

export default function AuthenticatedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  const { firstName, lastName, role, clearAuthData } = useAuthStore();
  const { getTotalQuantity } = useCartStore();
  const totalQuantity = getTotalQuantity();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNotificationCount(3);
  }, []);

  const handleLogout = () => {
    clearAuthData();
    navigate("/");
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-muted ${isScrolled ? "supports-[backdrop-filter]" : ""}`}>
      <nav className="flex justify-between h-16 items-center p-4">
        <LogoBrand variant="small" />

        {/* Navegación Principal para Clientes */}
        {role === "cliente" && (
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="link" asChild>
              <Link to="/" onClick={handleUpClick}>
                Inicio
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/about" onClick={handleUpClick}>
                Sobre Nosotros
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/store" onClick={handleUpClick}>
                Tienda
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/events" onClick={handleUpClick}>
                Eventos
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/contact" onClick={handleUpClick}>
                Contacto
              </Link>
            </Button>
          </nav>
        )}

        <ul className="hidden sm:flex sm:items-center space-x-4">
          {role === "cliente" && (
            <div className="flex items-center space-x-4">
              <button className="text-button" aria-label="Buscar" onClick={() => setSearchModalOpen(true)}>
                <Search className="h-5 w-5" />
              </button>
              <Link to="/cart" aria-label="Carrito" className="relative">
                <ShoppingCart className="h-5 w-5" onClick={handleUpClick} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{totalQuantity}</span>
                )}
              </Link>
            </div>
          )}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Notificación 1</DropdownMenuItem>
                <DropdownMenuItem>Notificación 2</DropdownMenuItem>
                <DropdownMenuItem>Notificación 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative rounded-full h-8 w-8 p-0">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                    <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{`${firstName} ${lastName}`}</p>
                    <p className="text-sm text-muted-foreground capitalize">{role}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <div className="flex items-center sm:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                    <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{`${firstName} ${lastName}`}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
                {role === "cliente" && (
                  <>
                    <Link to="/" className="text-sm font-medium">
                      Inicio
                    </Link>
                    <Link to="/about" className="text-sm font-medium">
                      Sobre Nosotros
                    </Link>
                    <Link to="/store" className="text-sm font-medium">
                      Tienda
                    </Link>
                    <Link to="/events" className="text-sm font-medium">
                      Eventos
                    </Link>
                    <Link to="/contact" className="text-sm font-medium">
                      Contacto
                    </Link>
                  </>
                )}
                <Link to="/profile" className="text-sm font-medium">
                  Perfil
                </Link>
                <Link to="/settings" className="text-sm font-medium">
                  Configuración
                </Link>
                <Button onClick={handleLogout} variant="ghost" className="justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <SearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />
    </header>
  );
}
