import { auth } from "@/firebase/init";
import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>(set => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,
  registerStatus: "idle",
  registerError: null,

  checkLoginStatus: async () => {
    try {
      const response = await fetch("/api/check-auth", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        set({
          user: {
            uid: data.uid,
            email: data.email,
            name: data.name ?? "",
            imageUrl: "",
          },
          isLogin: true,
        });
      } else if (response.status === 401) {
        const newToken = await auth.currentUser?.getIdToken(true);
        if (newToken) {
          const retryResponse = await fetch("/api/check-auth", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            credentials: "include",
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            set({
              user: {
                uid: data.uid,
                email: data.email,
                name: data.name ?? "",
                imageUrl: "",
              },
              isLogin: true,
            });
          } else {
            set({ user: null, isLogin: false });
          }
        } else {
          set({ user: null, isLogin: false });
        }
      } else {
        set({ user: null, isLogin: false });
      }
    } catch (error) {
      console.error("토큰 갱신 오류:", error);
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
