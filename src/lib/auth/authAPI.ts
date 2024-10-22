import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/init";
import { AuthUser, RegisterUserReqDTO } from "./types";

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
