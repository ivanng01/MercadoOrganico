import { TitleDecor } from "@/lib/iconsCustom";
import EventCard from "../components/events-card/EventCard";
import Header from "../components/header/Header";
import { events } from "../data/events";

export default function EventsPage() {
  return (
    <>
      <Header title="Eventos" />
      <div className="min-h-screen bg-foreground px-4 lg:px-[120px]">
        <header className="flex flex-col justify-center items-center pt-8 px-4">
          <TitleDecor className="h-8 w-8 text-primary" />
          <p className="text-primary mb-2">No Te Pierdas Nuestros Eventos</p>
          <h1 className="text-3xl font-bold mb-8 text-card-foreground">Participa y disfruta de nuestras actividades</h1>
        </header>

        <main className="container mx-auto pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={`${event.date.day}-${event.date.month}`} {...event} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
