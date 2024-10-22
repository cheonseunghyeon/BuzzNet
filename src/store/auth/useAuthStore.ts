import { create } from "zustand";
import { AuthState } from "./types";
import Cookies from "js-cookie";
import { IUser } from "@/lib/auth/types";

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  setUser: (user: IUser) => {
    set({ user, isLogin: true });
  },
}));
