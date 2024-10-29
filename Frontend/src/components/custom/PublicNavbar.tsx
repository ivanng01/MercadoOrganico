import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import SocialMediaNavbar from "./SocialMediaNavbar";
import LogoBrand from "./LogoBrand";
import { handleUpClick } from "@/lib/utils";
import useCartStore from "@/store/cartStore";

export default function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  const { getTotalQuantity, initializeCart } = useCartStore();
  const totalQuantity = getTotalQuantity();

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthRoute = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!isAuthRoute && <SocialMediaNavbar />}

      <header className={`sticky top-0 z-50 w-full px-4 lg:px-[120px] bg-muted py-2 ${isScrolled ? "shadow-lg" : ""}`}>
        <div className="flex h-16 items-center justify-between max-w-screen-2xl mx-auto">
          <LogoBrand variant="small" />

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

          <div className="flex items-center space-x-4">
            <button className="text-button" aria-label="Buscar" onClick={() => setSearchModalOpen(true)}>
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" aria-label="Carrito" className="relative">
              <ShoppingCart className="h-5 w-5" onClick={handleUpClick} />
              {totalQuantity > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{totalQuantity}</span>}
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Toggle Menu" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <Button variant="link" asChild>
                    <Link to="/">Inicio</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link to="/about">Sobre Nosotros</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link to="/store">Tienda</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link to="/events">Eventos</Link>
                  </Button>
                  <Button variant="link" asChild>
                    <Link to="/contact">Contacto</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SearchModal open={searchModalOpen} onOpenChange={setSearchModalOpen} />
    </>
  );
}
