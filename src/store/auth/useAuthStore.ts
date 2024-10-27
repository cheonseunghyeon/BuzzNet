// import { auth } from "@/firebase/init";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  registerStatus: "idle",
  registerError: null,

  checkLoginStatus: async () => {
    const response = await fetch("/api/check-auth", {
      method: "GET",
      credentials: "include", // 쿠키를 포함해 서버에 요청
    });

    if (response.ok) {
      const data = await response.json();
      set({
        user: {
          uid: data.uid,
          email: data.email,
          name: data.name ?? "",
        },
        isLogin: true,
      });
    } else {
      set({ user: null, isLogin: false });
    }
  },

  logout: async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    set({
      isLogin: false,
      user: null,
    });
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  setUser: user => {
    set({ user, isLogin: true });
  },
}));
