import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../authAPI";
import { LoginRequestDTO, LoginResponseDTO } from "../types";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toast/useToastStore";

export const useLogin = () => {
  const { setIsLogin, setUser } = useAuthStore();
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  return useMutation<LoginResponseDTO, Error, LoginRequestDTO>({
    mutationFn: loginAPI,
    onSuccess: userData => {
      showToast("로그인에 성공하셨습니다");
      setIsLogin(true);
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name ?? "",
      });
      router.push("/main");
    },
    onError: (error: Error) => {
      showToast(`${error.message}`);
    },
  });
};
