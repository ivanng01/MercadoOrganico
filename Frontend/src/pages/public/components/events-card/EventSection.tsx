import { TitleDecor } from "@/lib/iconsCustom";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";
import { EventSectionProps } from "@/types/types";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default function EventSection({ title, subtitle, events }: EventSectionProps) {
  const firstThreeEvents = events.slice(0, 4);

  return (
    <div className="px-4 lg:px-[120px]">
      <header className="flex flex-col justify-center items-center pt-8">
        <TitleDecor className="h-8 w-8 text-primary" />
        <p className="text-primary mb-2 font-semibold text-xl">{subtitle}</p>
        <h1 className="text-3xl font-bold mb-8 text-card-foreground text-center">{title}</h1>
      </header>

      <main className="container mx-auto pb-8">
        <Carousel className="relative">
          <CarouselContent className="flex gap-4 md:gap-8 lg:gap-12">
            {firstThreeEvents.map((event) => (
              <CarouselItem key={`${event.date.day}-${event.date.month}`} className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4">
                <div className="h-full flex items-stretch">
                  <EventCard {...event} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="pt-8 flex justify-center">
          <Link to="/events">
            <Button onClick={handleUpClick}>Ver todos los eventos</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
