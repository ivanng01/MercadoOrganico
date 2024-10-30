import { create } from "zustand";

interface AuthState {
  token: string | null;
  firstName: string;
  lastName: string;
  role: string;
  user_id: number;
  email: string;
  setAuthData: (token: string | null, firstName: string, lastName: string, role: string, email: string, user_id: number) => void; // Agregar user_id como parámetro
  clearAuthData: () => void;
}

const roleTranslations: Record<string, string> = {
  administrator: "administrador",
  producer: "productor",
  client: "cliente",
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  firstName: "",
  lastName: "",
  role: "",
  user_id: 0,
  email: "",
  setAuthData: (token, firstName, lastName, role, email, user_id) => {
    const translatedRole = roleTranslations[role] || role;
    set({ token, firstName, lastName, role: translatedRole, email, user_id });
  },
  clearAuthData: () => set({ token: null, firstName: "", lastName: "", role: "", email: "", user_id: 0 }),
}));
