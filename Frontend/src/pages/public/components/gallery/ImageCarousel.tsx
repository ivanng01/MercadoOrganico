import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TitleDecor } from "@/lib/iconsCustom";
import { CarouselApi } from "@/types/types";
import { galleryPhotos } from "../../data/galleryPhotos";

export default function ImageCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="bg-foreground py-12 px-4 lg:px-[120px]">
      <section className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <TitleDecor className="h-8 w-8 text-primary" />
          <span className="text-primary text-lg">Estamos en Redes Sociales</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Síguenos en Nuestras Redes Sociales</h2>
        </div>

        <Carousel className="w-full mx-auto pt-8" setApi={(api) => setApi(api as CarouselApi)}>
          <CarouselContent className="gap-4">
            {galleryPhotos.map((photo) => (
              <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/4 2xl:basis-1/5">
                <img src={photo.imageUrl} alt={photo.altText} className="w-full h-auto rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
