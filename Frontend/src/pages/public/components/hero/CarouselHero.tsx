import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Slide } from "@/types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides: Slide[] = [
  {
    id: 1,
    tagline: "100% Sano y Económico",
    title: "Productos Naturales y Orgánicos",
    subtitle: "Cuida tu salud con lo mejor de la naturaleza.",
    image: "hero-carousel1.webp",
  },
  {
    id: 2,
    tagline: "Frescura Garantizada",
    title: "Frutas y Verduras Orgánicas",
    subtitle: "Del campo a tu mesa, sin intermediarios.",
    image: "hero-carousel2.webp",
  },
  {
    id: 3,
    tagline: "Alimentación Consciente",
    title: "Superalimentos y Suplementos",
    subtitle: "Potencia tu bienestar de forma natural.",
    image: "hero-carousel3.webp",
  },
];

export default function CarouselHero() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex);

      if (selectedIndex === slides.length - 1) {
        setTimeout(() => api.scrollTo(0), 5000);
      }
    };

    api.on("select", handleSelect);

    const autoScrollInterval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoScrollInterval);
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} className="w-full h-screen max-w-screen-2xl mx-auto">
        <CarouselContent>
          {slides.map(({ id, tagline, title, subtitle, image }) => (
            <CarouselItem key={id} className="relative">
              <div className="absolute inset-0">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-80" />
              </div>
              <div className="relative z-10 flex h-screen flex-col justify-center items-start px-4 lg:px-[120px] max-w-4xl">
                <p className="text-left mb-4 text-sm font-bold text-primary uppercase tracking-wider">{tagline}</p>
                <h1 className="text-left mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-tight">{title}</h1>
                <p className="text-left mb-8 text-xl text-gray-200 italic">{subtitle}</p>
                <Link to="/store">
                  <Button className="hover:bg-primary text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                    Comprar Ahora
                  </Button>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Ir al slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${current === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
