import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Footprints, Gift, Truck, BarChart2 } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email suscrito:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-700" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-green-800">Próximamente</CardTitle>
          <CardDescription>Innovadoras funcionalidades sostenibles para tu e-commerce</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="space-y-2 mb-6">
            <li className="flex items-center space-x-2">
              <Footprints className="h-5 w-5 text-green-600" />
              <span>Huella de carbono personalizada</span>
            </li>
            <li className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span>Programa de recompensas verdes</span>
            </li>
            <li className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span>Suscripción de productos frescos</span>
            </li>
            <li className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-green-600" />
              <span>Eco-comparador de productos</span>
            </li>
            <li className="flex items-center space-x-2">
              <Footprints className="h-5 w-5 text-green-600" />
              <span>Impacto ambiental del pedido</span>
            </li>
          </motion.ul>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <section className="flex justify-center">
              <Button type="submit" className="w-full">Mantenerme informado</Button>
            </section>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">Sé el primero en conocer nuestras nuevas características sostenibles</CardFooter>
      </Card>
    </div>
  );
}
