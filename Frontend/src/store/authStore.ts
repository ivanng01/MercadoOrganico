import { create } from "zustand";

interface AuthState {
  token: string | null;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  setAuthData: (token: string | null, firstName: string, lastName: string, role: string, email: string) => void;
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
  email: "",
  setAuthData: (token, firstName, lastName, role, email) => {
    const translatedRole = roleTranslations[role] || role;
    set({ token, firstName, lastName, role: translatedRole, email });
  },
  clearAuthData: () => set({ token: null, firstName: "", lastName: "", role: "", email: "" }),
}));
