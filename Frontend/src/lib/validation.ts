import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Debes ingresar un correo válido"),
    username: z.string().min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
    firstname: z.string().nonempty("El nombre es obligatorio"),
    lastname: z.string().nonempty("El apellido es obligatorio"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().nonempty("Debes repetir la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identifier: z.string().nonempty("El correo o usuario es obligatorio").min(3, "El correo o usuario debe tener al menos 3 caracteres"),
  password: z.string().nonempty("La contraseña es obligatoria").min(8, "La contraseña debe tener al menos 8 caracteres"),
});
