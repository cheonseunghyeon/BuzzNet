import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast/useToastStore";
import { LoginRequestDTO } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useLogin = () => {
  const router = useRouter();
  const showToast = useToastStore(state => state.showToast);
  const { setIsLogin, setUser } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginRequestDTO) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: data => {
      showToast("로그인에 성공하셨습니다.");
      setIsLogin(true);
      setUser({
        uid: data.uid,
        email: data.email,
        name: data.name ?? "",
      });
      router.push("/main");
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  return loginMutation;
};
