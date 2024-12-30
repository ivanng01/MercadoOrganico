import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TitleDecor } from "@/lib/iconsCustom";
import { testimonials } from "../../data/testimonials";
import { CarouselApi } from "@/types/types";

export default function TestimonialSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="px-4 lg:px-[120px]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <TitleDecor className="h-8 w-8 text-primary" />
          <span className="text-primary text-xl font-semibold">Voces Orgánicas</span>
          <h2 className="text-3xl font-bold text-card-foreground text-center">Qué Dicen de Nuestros Productos?</h2>
        </div>

        <Carousel className="w-full mx-auto" setApi={(api) => setApi(api as CarouselApi)}>
          <CarouselContent className="gap-4 pt-36">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="bg-card relative border border-input rounded-lg p-6 flex flex-col items-center text-center text-card-foreground md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="absolute w-40 h-40 rounded-[50px] overflow-hidden -top-1/2 border border-input">
                  <img src={testimonial.image} alt={testimonial.name} className="object-cover w-full h-full" />
                </div>

                <div className="pt-10 px-4">
                  <p className="text-sm mb-4 italic">{testimonial.quote}</p>
                  <h3 className="text-primary font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
