import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import LogoBig from "@/components/custom/logo-big";
import { handleUpClick } from "@/lib/utils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <LogoBig className="mx-auto py-4" />
          <h2 className="text-2xl font-semibold text-center">¡Nos alegra verte de nuevo!</h2>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Correo
                </label>
                <Input id="email" placeholder="Ingresa tu correo" type="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Contraseña
                </label>
                <div className="relative">
                  <Input id="password" placeholder="Ingresa tu contraseña" type={showPassword ? "text" : "password"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Recuérdame
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Button className="w-full bg-primary hover:bg-primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            No tienes una cuenta?{" "}
            <Link to="/register" onClick={handleUpClick} className="text-sm text-blue-600 hover:underline">
              Registrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
