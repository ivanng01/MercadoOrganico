import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { handleUpClick } from "@/lib/utils";
import { z } from "zod";
import { loginSchema } from "@/lib/validation";
import { loginUser } from "@/api/services/authService";
import LogoBrand from "@/components/custom/LogoBrand";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/spinner";

const defaultUsers = [
  { label: "Productor", identifier: "max.cereceda", password: "12345678" },
  { label: "Cliente", identifier: "gisela.lago", password: "123456789" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const handleUserSelect = (event: { target: { value: string } }) => {
    const selectedUser = defaultUsers.find((user) => user.label === event.target.value);
    if (selectedUser) {
      setIdentifier(selectedUser.identifier);
      setPassword(selectedUser.password);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIdentifierError("");
    setPasswordError("");
    setLoading(true);

    try {
      loginSchema.parse({ identifier, password });

      const response = await loginUser({ identifier, password });
      const { token, user } = response.data;

      setAuthData(token, user.firstname, user.lastname, user.role.name, user.email, user.id);

      navigate(`/${user.role.name}/dashboard`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === "identifier") {
            setIdentifierError(err.message);
          } else if (err.path[0] === "password") {
            setPasswordError(err.message);
          }
        });
      } else {
        setIdentifierError("Los datos ingresados son incorrectos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <LogoBrand variant="big" className="mx-auto py-4" />
          <h2 className="text-2xl font-semibold text-center">¡Nos alegra verte de nuevo!</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="userSelect" className="text-sm font-medium leading-none">
                  Seleccionar Usuario: (Apartado solo para pruebas)
                </label>
                <select id="userSelect" onChange={handleUserSelect} className="w-full border p-2 rounded-md border-input bg-white">
                  <option value="">Selecciona un usuario</option>
                  {defaultUsers.map((user, index) => (
                    <option key={index} value={user.label}>
                      {user.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-medium leading-none">
                  Correo o Usuario
                </label>
                <Input
                  id="identifier"
                  placeholder="Ingresa tu correo o usuario"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`transition duration-200 ${identifierError ? "border-red-500" : identifier ? "border-primary" : "border-input"}`}
                  autoComplete="username"
                />
                {identifierError && <p className="text-red-500 text-sm">{identifierError}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`transition duration-200 ${passwordError ? "border-red-500" : password ? "border-primary" : "border-input"}`}
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none">
                    Recuérdame
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Button className="w-full hover:bg-primary flex justify-center items-center" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    Iniciando sesión...
                    <Spinner className="ml-2 text-muted" />
                  </>
                ) : (
                  "Iniciar sesión"
                )}
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
