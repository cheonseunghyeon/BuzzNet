import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthUser, RegisterUserReqDTO } from "../types";
import { registerUserAPI } from "../authAPI";
import { useToastStore } from "@/store/toast/useToastStore";

export const useRegisterUser = () => {
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  return useMutation<AuthUser, Error, RegisterUserReqDTO>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      showToast("회원가입 성공하셨습니다");
      router.push("/login");
    },
    onError: (error: Error) => {
      showToast(`${error.message}`);
    },
  });
};
