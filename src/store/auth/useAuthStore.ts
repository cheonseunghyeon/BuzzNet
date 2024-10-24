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
    const token = Cookies.get("accessToken");
    console.log(token);
    if (token) {
      auth.onAuthStateChanged(currentUser => {
        if (currentUser) {
          set({
            user: {
              uid: currentUser.uid,
              email: currentUser.email ?? "",
              name: currentUser.displayName ?? "",
            },
            isLogin: true,
          });
        } else {
          set({ user: null, isLogin: false });
          console.error("유저 정보를 가져올 수 없습니다.");
        }
      });
    }
  },

  logout: () => {
    Cookies.remove("accessToken");
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
