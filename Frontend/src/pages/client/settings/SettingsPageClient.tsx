import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Trash2, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function SettingsPageClient() {
  const [expirationDate, setExpirationDate] = useState<Date>();

  return (
    <div className="container mx-auto text-card-foreground">
      <CardHeader className="flex flex-col justify-between items-start space-y-2">
        <div>
          <CardTitle className="text-2xl font-bold pb-2">Mi Cuenta</CardTitle>
          <CardDescription className="text-gray-700">
            Mantén tu información actualizada para optimizar tu experiencia en la plataforma.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
              <AvatarFallback className="bg-blue-500">MC</AvatarFallback>
            </Avatar>
            <div className="space-x-2">
              <Button variant="destructive" className="gap-2">
                <Trash2 />
                Eliminar
              </Button>
              <Button className="gap-2">
                <Upload />
                Actualizar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" placeholder="Ingresa tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Ingresa tu apellido" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="Ingresa tu correo electrónico" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Fecha de Nacimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className={`w-full justify-start text-left font-normal ${!expirationDate ? "text-muted-foreground" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expirationDate ? format(expirationDate, "PPP") : <span>Seleccionar una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <PhoneInput id="phone" type="tel" placeholder="Ingresa tu teléfono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm w-1/2">
                mercado-organico.vercel.app/user/
              </span>
              <Input id="username" className="rounded-l-none w-1/2" placeholder="Ingresa tu nombre de usuario" />
            </div>
          </div>

          {/* Campo de Dirección */}
          <div className="space-y-2">
            <Label htmlFor="address">Dirección de Envío</Label>
            <Input id="address" placeholder="Ingresa tu dirección de envío" />
          </div>

          {/* Campo de Ciudad */}
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Ingresa tu ciudad" />
          </div>

          {/* Campo de Código Postal */}
          <div className="space-y-2">
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input id="postalCode" placeholder="Ingresa tu código postal" />
          </div>

          {/* Campo de País */}
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input id="country" placeholder="Ingresa tu país" />
          </div>

          {/* Selección de Método de Pago */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Selecciona un método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Tarjeta de Crédito</SelectItem>
                <SelectItem value="debit-card">Tarjeta de Débito</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de Información de la Tarjeta */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
            <Input id="cardNumber" placeholder="Ingresa el número de tarjeta" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Fecha de Expiración</Label>
              <Input id="expiryDate" placeholder="MM/AA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="Ingresa el CVV" />
            </div>
          </div>

          <Button size="lg">Actualizar</Button>
        </div>
      </CardContent>
    </div>
  );
}
