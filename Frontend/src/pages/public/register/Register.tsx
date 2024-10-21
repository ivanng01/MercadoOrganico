import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { handleUpClick } from "@/lib/utils";
import { RegisterData } from "@/types/types";
import { registerUser } from "@/api/services/authService";
import { showToast } from "@/lib/showToast";
import { registerSchema } from "@/lib/validation";
import { z } from "zod";
import LogoBrand from "@/components/custom/LogoBrand";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const isFieldValid = (field: keyof RegisterData) => {
    return !errorMessages[field] && formData[field] !== "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = registerSchema.parse(formData);

      const response = await registerUser(validatedData);
      console.log("Usuario registrado:", response);
      showToast("Registro exitoso", "success");

      setFormData({
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrorMessages: { [key: string]: string } = {};
        error.errors.forEach((issue) => {
          newErrorMessages[issue.path[0]] = issue.message;
        });
        setErrorMessages(newErrorMessages);
      } else if (typeof error === "object" && error !== null && "errors" in error) {
        const newErrorMessages: { [key: string]: string } = {};

        const typedError = error as { errors?: { email?: string; username?: string } };

        if (typedError.errors?.email) {
          newErrorMessages.email = "El correo electrónico ya ha sido tomado.";
        }

        if (typedError.errors?.username) {
          newErrorMessages.username = "El nombre de usuario ya ha sido tomado.";
        }

        setErrorMessages(newErrorMessages);
      } else {
        console.error("Error al registrar el usuario:", error);
        showToast("Error al registrar el usuario", "error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-foreground px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <LogoBrand variant="big" className="mx-auto py-4" />
          <h2 className="text-2xl font-semibold text-center">¡Únete ahora!</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Correo
                </label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border ${isFieldValid("email") ? "border-primary" : errorMessages.email ? "border-red-500" : "border-input"}`}
                />
                {errorMessages.email && <p className="text-red-500 text-sm">{errorMessages.email}</p>}
              </div>

              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex-1 space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium leading-none">
                    Nombre
                  </label>
                  <Input
                    id="firstname"
                    name="firstname"
                    placeholder="Ingresa tu nombre"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={`border ${isFieldValid("firstname") ? "border-primary" : errorMessages.firstname ? "border-red-500" : "border-input"}`}
                  />
                  {errorMessages.firstname && <p className="text-red-500 text-sm">{errorMessages.firstname}</p>}
                </div>

                <div className="flex-1 space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium leading-none">
                    Apellido
                  </label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Ingresa tu apellido"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`border ${isFieldValid("lastname") ? "border-primary" : errorMessages.lastname ? "border-red-500" : "border-input"}`}
                  />
                  {errorMessages.lastname && <p className="text-red-500 text-sm">{errorMessages.lastname}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none">
                  Usuario
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Ingresa un nombre de usuario"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className={`border ${isFieldValid("username") ? "border-primary" : errorMessages.username ? "border-red-500" : "border-input"}`}
                />
                {errorMessages.username && <p className="text-red-500 text-sm">{errorMessages.username}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    className={`border ${isFieldValid("password") ? "border-primary" : errorMessages.password ? "border-red-500" : "border-input"}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                {errorMessages.password && <p className="text-red-500 text-sm">{errorMessages.password}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
                  Repetir contraseña
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    placeholder="Repite tu contraseña"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={`border ${isFieldValid("confirmPassword") ? "border-primary" : errorMessages.confirmPassword ? "border-red-500" : "border-input"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
                {errorMessages.confirmPassword && <p className="text-red-500 text-sm">{errorMessages.confirmPassword}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Crear cuenta
            </Button>
            <p className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-blue-500 hover:underline text-sm" onClick={handleUpClick}>
                Accede ahora
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
