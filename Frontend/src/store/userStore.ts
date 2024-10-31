import { ProfileData, UserStore } from "@/types/types";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  profileData: {
    firstname: "",
    lastname: "",
    email: "",
    birth_date: "",
    phone_number: "",
    picture: "",
    gender: "",
    username: "",
  },
  setProfileData: (data: ProfileData) => set({ profileData: { ...data } }),
}));
