import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { useNavigate } from "react-router-dom";
import showDialog from "@/lib/showDialog";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "Gisela",
    lastName: "Lago",
    email: "gisela.lago@gmail.com",
    phone: "+54 9 11 1234 5678",
    address: "Av. Corrientes 1234",
    city: "Buenos Aires",
    postalCode: "C1010",
    country: "Argentina",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.paymentMethod) {
      await showDialog({
        title: "Método de Pago Requerido",
        text: "Por favor, selecciona un método de pago para continuar.",
        icon: "warning",
      });
      return;
    }

    if (
      (formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card") &&
      (!formData.cardNumber || !formData.expiryDate || !formData.cvv)
    ) {
      await showDialog({
        title: "Datos de Tarjeta Requeridos",
        text: "Por favor, completa todos los campos de la tarjeta para continuar.",
        icon: "warning",
      });
      return;
    }

    navigate("success");
  };

  return (
    <div className="container mx-auto text-card-foreground">
      <CardHeader className="flex flex-col justify-between items-start space-y-2">
        <div>
          <CardTitle className="text-2xl font-bold pb-2">Confirmar Compra</CardTitle>
          <CardDescription className="text-gray-700">Por favor, completa la información para procesar tu pedido.</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" placeholder="Ingresa tu nombre" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Ingresa tu apellido" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="Ingresa tu correo electrónico" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <PhoneInput id="phone" placeholder="Ingresa tu teléfono" value={formData.phone} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección de Envío</Label>
            <Input id="address" placeholder="Ingresa tu dirección de envío" value={formData.address} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" placeholder="Ingresa tu ciudad" value={formData.city} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input id="postalCode" placeholder="Ingresa tu código postal" value={formData.postalCode} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input id="country" placeholder="Ingresa tu país" value={formData.country} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Selecciona un método de pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Tarjeta de Crédito</SelectItem>
                <SelectItem value="debit-card">Tarjeta de Débito</SelectItem>
                <SelectItem value="mercado-pago">Mercado Pago</SelectItem>
                <SelectItem value="cash-on-delivery">Contra Entrega</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.paymentMethod === "credit-card" || formData.paymentMethod === "debit-card") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input id="cardNumber" placeholder="Ingresa el número de tarjeta" value={formData.cardNumber} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                  <Input id="expiryDate" placeholder="MM/AA" value={formData.expiryDate} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" type="password" placeholder="Ingresa el CVV" value={formData.cvv} onChange={handleChange} required />
                </div>
              </div>
            </>
          )}

          <Button size="lg" className="mt-4" onClick={handleSubmit}>
            Procesar Pedido
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
