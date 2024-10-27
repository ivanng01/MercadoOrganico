import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TitleDecor } from "@/lib/iconsCustom";
import { handleUpClick } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function AdvertisementOrganic() {
  return (
    <section className="px-4 lg:px-[120px] bg-foreground mx-auto">
      <div className="bg-foreground text-card-foreground flex items-center justify-center py-12 max-w-screen-2xl mx-auto">
        <div className="relative grid md:grid-cols-2 gap-8 items-center pb-40">
          <div>
            <div className="flex flex-col items-start justify-start gap-2 mb-4">
              <TitleDecor className="h-8 w-8 text-primary" />
              <span className="text-primary text-xl font-semibold">100 % Natural y económico</span>
              <h2 className="text-3xl font-bold text-card-foreground">Productos frescos todos los días.</h2>
            </div>
            <p className="text-primary mb-4 font- italic">
              Un pequeño paso para ti,
              <br />
              un gran salto para el planeta
            </p>
            <p className="mb-6 text-[#717573]">
              Al elegir productos orgánicos, estás optando por una alimentación más saludable y contribuyendo a un futuro más sostenible.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Menos pesticidas",
                "Mayor contenido de nutrientes",
                "Suelos más saludables",
                "Menor contaminación",
                "Apoyo a la agricultura local",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-primary flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to={"/store"}>
              <Button className="bg-primary hover:bg-background text-white font-semibold py-2 px-6 rounded" onClick={handleUpClick}>
                Comprar Ahora
              </Button>
            </Link>
          </div>
          <img src="/[call-to-action-two__image].png" alt="Fresh vegetables in heart shape" className="w-full h-full object-contain" />
          <div className="absolute bottom-0 left-0 transform translate-y-1">
            <img src="/shape-advertisement-1.svg" alt="Shape decoration" />
          </div>
        </div>
      </div>
    </section>
  );
}
