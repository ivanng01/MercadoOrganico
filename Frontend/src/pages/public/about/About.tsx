import { Check } from "lucide-react";
import Header from "../components/header/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TitleDecor } from "@/lib/iconsCustom";
import { AboutProps } from "@/types/types";
import Partner from "../components/partner/Partner";
import VideoHero from "../components/hero/VideoHero";
import TeamSection from "../components/Team/TeamSection";

export default function About({
  title = "¿Quiénes Somos?",
  description = "Somos una plataforma de e-commerce que conecta a productores independientes con compradores de productos orgánicos.Ofrecemos una búsqueda fácil y rápida, sin intermediarios, para garantizar precios justos. Nuestra plataforma es intuitiva, accesible desde dispositivos móviles, y asegura transacciones transparentes.",
  features = [
    { text: "Apoyo a Productores Locales" },
    { text: "Fácil y Conveniente" },
    { text: "Precios Justos" },
    { text: "Productos Frescos y Orgánicos" },
  ],
  buttonText = "Comprar Ahora",
}: AboutProps) {
  return (
    <>
      <Header title="Sobre Nosotros" />
      <div className="container mx-auto px-4 py-12 max-w-screen-2xl bg-foreground">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square">
              <img src="/[call-to-action-two__image].png" alt="Fresh vegetables in heart shape" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="relative w-full md:w-1/2 space-y-6">
            <img src="/shape1.svg" alt="Avocado decoration" className="absolute top-0 right-0 w-40 h-40 object-contain" />
            <img src="/shape2.svg" alt="Avocado decoration" className="absolute -bottom-20 right-1/2 w-24 h-24 object-contain" />
            <div className="grid items-center gap-1 text-primary">
              <TitleDecor className="h-8 w-8 text-primary" />
              <span>Tu Fuente de Productos Orgánicos</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{description}</p>

            {/* Features list */}
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link to="/store">
                <Button>{buttonText}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Partner/>
      <VideoHero/>
      <TeamSection/>
    </>
  );
}
