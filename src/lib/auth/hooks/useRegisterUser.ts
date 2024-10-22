import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthUser, RegisterUserReqDTO } from "../types";
import { registerUserAPI } from "../authAPI";

export const useRegisterUser = () => {
  const router = useRouter();

  return useMutation<AuthUser, Error, RegisterUserReqDTO>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      // addToast('회원가입 성공!', 'success');
      router.push("/main");
    },
    onError: (error: Error) => {
      //   addToast('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.', 'error');
      console.error("회원가입 중 오류가 발생했습니다.", error.message);
    },
  });
};
