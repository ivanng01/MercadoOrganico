import { Facebook, Instagram, Twitter, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function SocialMediaNavbar() {
  return (
    <>
      <nav className="p-4 lg:px-[120px] bg-muted">
        <div className="container mx-auto flex justify-between items-center max-w-screen-2xl text-foreground">
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <User className="bg-primary h-auto w-6 rounded-full m-auto p-1 text-white" />
            <Link to="/login" className="hover:text-primary">
              Acceso
            </Link>
            <span>/</span>
            <Link to="/register" className="hover:text-primary">
              Registro
            </Link>
          </div>
        </div>
      </nav>
      <section className="bg-muted">
        <Separator/>
      </section>
    </>
  );
}
