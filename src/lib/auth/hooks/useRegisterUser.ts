import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthUser, RegisterUserReqDTO } from "../types";
import { useToastStore } from "@/store/toast/useToastStore";

export const useRegisterUser = () => {
  const showToast = useToastStore(state => state.showToast);
  const router = useRouter();

  return useMutation<AuthUser, Error, RegisterUserReqDTO>({
    mutationFn: async (data: RegisterUserReqDTO) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "회원가입에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      showToast("회원가입 성공하셨습니다");
      router.push("/login");
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });
};
