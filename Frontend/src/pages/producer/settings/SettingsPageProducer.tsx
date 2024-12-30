import { useState, useEffect } from "react";
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
import { getInitials } from "@/lib/utils";
import { getUserProfile } from "@/pages/client/services/userService";

export default function SettingsPageProducer() {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birth_date: "",
    phone_number: "",
    picture: "",
    gender: "",
    username: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await getUserProfile();
        setProfileData(data);

        setExpirationDate(data.birth_date ? new Date(data.birth_date) : null);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchProfileData();
  }, []);

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
              {profileData.picture ? (
                <AvatarImage src={profileData.picture} alt="Usuario" className="w-25 h-auto" width={350} height={350} />
              ) : (
                <AvatarFallback className="bg-blue-500">{getInitials(profileData.firstname, profileData.lastname)}</AvatarFallback>
              )}
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
              <Input
                id="firstName"
                placeholder="Ingresa tu nombre"
                value={profileData.firstname}
                onChange={(e) => setProfileData({ ...profileData, firstname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                placeholder="Ingresa tu apellido"
                value={profileData.lastname}
                onChange={(e) => setProfileData({ ...profileData, lastname: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
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
                  <Calendar
                    mode="single"
                    selected={expirationDate || undefined}
                    onSelect={(date) => {
                      setExpirationDate(date ?? null);
                      setProfileData((prevData) => ({
                        ...prevData,
                        birth_date: date ? format(date, "yyyy-MM-dd") : "",
                      }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <PhoneInput
                id="phone"
                type="tel"
                placeholder="Ingresa tu teléfono"
                value={profileData.phone_number}
                onChange={(value) => setProfileData({ ...profileData, phone_number: value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
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
              <Input
                id="username"
                className="rounded-l-none w-1/2"
                placeholder="Ingresa tu nombre de usuario"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              />
            </div>
          </div>
          <Button size="lg">Guardar Cambios</Button>
        </div>
      </CardContent>
    </div>
  );
}
