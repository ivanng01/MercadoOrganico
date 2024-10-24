import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TitleDecor } from "@/lib/iconsCustom";
import CardsContact from "../components/contact-card/CardsContact";
import Header from "../components/header/Header";
import MapPage from "../components/contact-card/Map";

export default function ContactPage() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    event.currentTarget.reset();
  };

  return (
    <>
      <Header title="Contacto" />
      <div className="relative flex flex-col items-center p-4 bg-foreground text-card-foreground">
        <header className="flex flex-col justify-center items-center pt-8 px-4">
          <TitleDecor className="h-8 w-8 text-primary" />
          <p className="text-primary mb-2">Contactános</p>
          <h1 className="text-4xl font-bold mb-8 text-card-foreground max-w-md text-center z-20">Tu opinión es importante para nosotros</h1>
        </header>

        <div className="relative w-full max-w-lg">
          <img src="/contact-shape-1.png" alt="Decoración Naranja" className="absolute -top-1/2 -left-3/4 h-auto w-96 object-cover z-0" />
          <form onSubmit={onSubmit} className="relative space-y-4 z-10 bg-foreground rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <Input name="nombre" placeholder="Ingresa tu nombre" />
              <Input name="apellido" placeholder="Ingresa tu apellido" />
            </div>

            <Input name="correo" type="email" placeholder="Ingresa tu correo" />
            <Input name="asunto" placeholder="Ingresa el asunto" />
            <Textarea name="mensaje" placeholder="Escribe tu mensaje" className="h-32" />

            <div className="flex justify-center mt-8">
              <Button type="submit">Enviar Mensaje</Button>
            </div>
          </form>
          <img src="/contact-shape-2.png" alt="Decoración Aguacate" className="absolute -bottom-1/3 -right-1/2 h-auto w-80 object-cover z-0" />
        </div>

        <div className="pt-24">
          <CardsContact />
        </div>

        <div className="w-full pt-28">
          <MapPage />
        </div>
      </div>
    </>
  );
}
