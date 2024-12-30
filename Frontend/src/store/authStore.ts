import { create } from "zustand";

interface AuthState {
  token: string | null;
  firstName: string;
  lastName: string;
  role: string;
  user_id: number;
  email: string;
  setAuthData: (token: string | null, firstName: string, lastName: string, role: string, email: string, user_id: number) => void;
  clearAuthData: () => void;
}

const roleTranslations: Record<string, string> = {
  administrator: "administrador",
  producer: "productor",
  client: "cliente",
};

const loadAuthDataFromSessionStorage = () => {
  const authData = sessionStorage.getItem("authData");
  if (authData) {
    return JSON.parse(authData);
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => {
  const authDataFromSession = loadAuthDataFromSessionStorage();
  return {
    token: authDataFromSession?.token || null,
    firstName: authDataFromSession?.firstName || "",
    lastName: authDataFromSession?.lastName || "",
    role: authDataFromSession?.role || "",
    user_id: authDataFromSession?.user_id || 0,
    email: authDataFromSession?.email || "",
    setAuthData: (token, firstName, lastName, role, email, user_id) => {
      const translatedRole = roleTranslations[role] || role;

      const authData = { token, firstName, lastName, role: translatedRole, email, user_id };
      sessionStorage.setItem("authData", JSON.stringify(authData));

      set({ token, firstName, lastName, role: translatedRole, email, user_id });
    },
    clearAuthData: () => {
      sessionStorage.removeItem("authData");
      set({ token: null, firstName: "", lastName: "", role: "", email: "", user_id: 0 });
    },
  };
});
