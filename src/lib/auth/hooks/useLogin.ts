import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../authAPI";
import { LoginRequestDTO, LoginResponseDTO } from "../types";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const { setIsLogin, setUser } = useAuthStore();

  const router = useRouter();

  return useMutation<LoginResponseDTO, Error, LoginRequestDTO>({
    mutationFn: loginAPI,
    onSuccess: userData => {
      setIsLogin(true);
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name ?? "",
      });
      router.push("/main");
    },
    onError: (error: Error) => {
      //   addToast('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.', 'error');
      console.error("로그인 중 오류가 발생했습니다.", error.message);
    },
  });
};
