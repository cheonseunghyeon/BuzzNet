import { IUser } from "@/lib/auth/types";

export interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  checkLoginStatus: () => Promise<void>;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
  setUser: (user: IUser) => void;
}
