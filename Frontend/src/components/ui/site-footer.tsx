import { Facebook, Instagram, Twitter } from "lucide-react";
import LogoBrand from "../custom/LogoBrand";
import { Separator } from "./separator";

export default function SiteFooter() {
  return (
    <section className="px-4 lg:px-[120px] overflow-hidden bg-muted">
      <footer className="relative py-12 mx-auto max-h-[474px] max-w-screen-2xl pb-60">
        <img src="/Image [site-footer__shape-1].svg" alt="" className="absolute top-0 -right-[4%] w-[150px] lg:w-1/2 lg:h-auto" />
        <img src="/Image [site-footer__shape-2].svg" alt="" className="absolute bottom-0 -left-[4%] w-[250px] lg:w-1/2 lg:h-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <LogoBrand variant="small" />
            </div>
            <p className="text-sm">Naturaleza en cada bocado, bienestar en cada compra.</p>
            <div className="flex space-x-[10px]">
              <a href="#" className="hover:text-primary rounded-full bg-[#313332] p-4">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="hover:text-primary rounded-full bg-[#313332] p-4">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="hover:text-primary rounded-full bg-[#313332] p-4">
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span>+54 11 4321-5678</span>
              </li>
              <li>
                <a href="mailto:info@company.com" className="hover:text-primary">
                  info@company.com
                </a>
              </li>
              <li>
                <span>Av. Corrientes 1234, C1043AAX, BS, Argentina</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Pedidos y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Mapa del Sitio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary">
                  Nuevos Productos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Mi Cuenta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Boletín</h3>
            <p className="text-sm mb-4">Recibe las últimas noticias y actualizaciones directamente en tu bandeja.</p>
            <form className="flex relative">
              <input type="email" placeholder="Ingresa tu correo" className="bg-white text-gray-900 rounded-l-md px-4 py-2 outline-none text-sm" />
              <button type="submit" className="bg-primary text-white hover:bg-green-600 rounded-r-md px-4 py-2">
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 text-sm text-center">
          <Separator className="my-4 mx-auto w-full" />© Copyright 2024 Todos los derechos reservados - s18-13-n-php-react
        </div>
      </footer>
    </section>
  );
}
