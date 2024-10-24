import { TitleDecor } from "@/lib/iconsCustom";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";
import { EventSectionProps } from "@/types/types";

export default function EventSection({ title, subtitle, events }: EventSectionProps) {
  const firstThreeEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-foreground lg:px-[120px]">
      <header className="flex flex-col justify-center items-center pt-8 px-4">
        <TitleDecor className="h-8 w-8 text-primary" />
        <p className="text-primary mb-2">{subtitle}</p>
        <h1 className="text-3xl font-bold mb-8 text-card-foreground">{title}</h1>
      </header>

      <main className="container mx-auto pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {firstThreeEvents.map((event) => (
            <EventCard key={`${event.date.day}-${event.date.month}`} {...event} />
          ))}
        </div>
        <div className="pt-8 flex justify-center">
          <Link to="/events">
            <Button onClick={handleUpClick}>Ver todos los eventos</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
