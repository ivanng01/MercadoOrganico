import { useAuthStore } from "@/store/authStore";
import { ProtectedRouteProps } from "@/types/types";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ redirectTo = "/login", children }: ProtectedRouteProps) {
  const { token } = useAuthStore();

  return token ? <>{children}</> : <Navigate to={redirectTo} />;
}
