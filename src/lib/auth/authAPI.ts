import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/init";
import { AuthUser, LoginRequestDTO, LoginResponseDTO, RegisterUserReqDTO } from "./types";
import Cookies from "js-cookie";

export const registerUserAPI = async ({ email, password, name }: RegisterUserReqDTO): Promise<AuthUser> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    bio: null,
    createdAt: new Date(),
  });

  return {
    uid: user.uid,
    email: user.email!,
    name,
    bio: "",
    createdAt: new Date(),
  };
};

export const loginAPI = async (loginData: LoginRequestDTO): Promise<LoginResponseDTO> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // firebase 인증 코드
    const token = await user.getIdToken();

    // 쿠키로 저장
    Cookies.set("accessToken", token, { expires: 7 });

    return {
      uid: user.uid,
      email: user.email ?? "",
      name: user.displayName ?? "",
      accessToken: token,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
};
