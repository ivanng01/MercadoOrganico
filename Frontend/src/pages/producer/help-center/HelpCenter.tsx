import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Truck, RotateCcw, CreditCard, Headphones, User } from "lucide-react";

const helpSections = [
  {
    title: "Preguntas Frecuentes (FAQ)",
    description: "Este tema cubre las preguntas más comunes que los usuarios tienen.",
    icon: HelpCircle,
  },
  {
    title: "Envíos y Entregas",
    description: "Detalles sobre opciones de envío, tiempos de entrega y costos.",
    icon: Truck,
  },
  {
    title: "Política de Devoluciones",
    description: "Información sobre cómo devolver productos y recibir reembolsos.",
    icon: RotateCcw,
  },
  {
    title: "Métodos de Pago",
    description: "Información sobre las formas de pago aceptadas y cómo procesarlas.",
    icon: CreditCard,
  },
  {
    title: "Soporte Técnico",
    description: "Ayuda con problemas técnicos, errores o dificultades con la plataforma.",
    icon: Headphones,
  },
  {
    title: "Cuenta y Perfil",
    description: "Guías sobre cómo gestionar tu cuenta, cambiar contraseñas o actualizar la información del perfil.",
    icon: User,
  },
];

export default function HelpCenter() {
  return (
    <section className="container mx-auto lg:p-6">
      <h1 className="text-4xl font-bold text-center mb-2 text-card-foreground">Centro de Ayuda</h1>
      <p className="text-xl text-center text-gray-600 mb-8">Encuentra respuestas a tus preguntas y soluciones rápidas</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpSections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex items-center space-x-2">
              <section.icon className="h-12 w-12 text-card-foreground pb-4" />
              <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{section.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
