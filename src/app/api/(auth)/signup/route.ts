import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/init";
import { RegisterUserReqDTO } from "@/lib/auth/types";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name }: RegisterUserReqDTO = await req.json();

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      bio: null,
      createdAt: new Date(),
      imageUrl: "",
    });

    return NextResponse.json({ uid: user.uid, email: user.email, name });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json({ error: "회원가입에 실패했습니다." }, { status: 500 });
  }
}
