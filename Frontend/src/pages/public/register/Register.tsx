import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import LogoBig from "@/components/custom/logo-big";
import { handleUpClick } from "@/lib/utils";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <LogoBig className="mx-auto py-4" />
          <h2 className="text-2xl font-semibold text-center">¡Únete ahora!</h2>
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
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Repetir contraseña
                </label>
                <div className="relative">
                  <Input id="confirm-password" placeholder="Repite tu contraseña" type={showConfirmPassword ? "text" : "password"} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary" type="submit">
                Regístrate
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            Ya tienes una cuenta?{" "}
            <Link to="/login" onClick={handleUpClick} className="text-sm text-blue-600 hover:underline">
              Accede ahora
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
