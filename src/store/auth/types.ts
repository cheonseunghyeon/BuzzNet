import { AuthUser } from "@/lib/auth/types";

export interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
}
