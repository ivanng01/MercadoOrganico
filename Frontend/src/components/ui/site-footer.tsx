import { Facebook, Instagram, Twitter } from "lucide-react";
import LogoBrand from "../custom/LogoBrand";
import { Separator } from "./separator";

export default function SiteFooter() {
  return (
    <section className="bg-muted px-6 py-20 md:px-8 lg:px-[120px] overflow-hidden">
      <footer className="relative mx-auto max-w-screen-2xl lg:h-[320px]">
        <img src="/Image [site-footer__shape-1].svg" alt="" className="absolute top-0 -right-[4%] w-[150px] lg:w-1/2 lg:h-auto" />
        <img src="/Image [site-footer__shape-2].svg" alt="" className="absolute -bottom-1/3 -left-[4%] w-[250px] lg:w-1/2 lg:h-auto" />

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-6 lg:gap-12 z-20">
          <div className="space-y-6">
            <div className="flex items-center">
              <LogoBrand variant="small" />
            </div>
            <p className="text-sm">Naturaleza en cada bocado, bienestar en cada compra.</p>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-[#313332] p-3 transition-colors hover:bg-primary">
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="rounded-full bg-[#313332] p-3 transition-colors hover:bg-primary">
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="rounded-full bg-[#313332] p-3 transition-colors hover:bg-primary">
                <Instagram className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>+54 11 4321-5678</li>
              <li>
                <a href="mailto:info@mercadoorganico.com" className="transition-colors hover:text-primary">
                  info@mercadoorganico.com
                </a>
              </li>
              <li>Av. Corrientes 1234, C1043AAX, BS, Argentina</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Pedidos y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Mapa del Sitio
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Nuevos Productos
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Mi Cuenta
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold">Boletín</h3>
            <p className="text-sm">Recibe las últimas noticias y actualizaciones directamente en tu bandeja.</p>
            <form className="flex z-10">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="w-full rounded-l-md bg-card px-4 py-2 text-sm text-gray-900 outline-none"
                required
              />
              <button
                type="submit"
                className="h-11 rounded-r-md bg-primary px-6 py-2 text-sm text-white transition-colors hover:bg-green-600 cursor-pointer"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-sm">
          <Separator className="mx-auto my-6 w-full" />
          © Copyright 2024 Todos los derechos reservados <br /> s18-13-n-php-react
        </div>
      </footer>
    </section>
  );
}
