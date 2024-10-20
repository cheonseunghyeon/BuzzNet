"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "@/firebase/init";
import { auth } from "@/firebase/init";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Passwords do not match."); // 후에 toast로 변경 예정
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up and data stored in Firestore:", user.uid);
      router.push("/login");
      // await setDoc(doc(db, "users", user.uid), {
      //   uid: user.uid,
      //   email: user.email,
      //   name: name,
      //   createdAt: new Date(),
      // });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <FormInput type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
      <FormInput type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <FormInput
        type="password"
        placeholder="Confirm password"
        value={confirmpassword}
        onChange={e => setConfirmpassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-4 mb-8 rounded-lg hover:bg-blue-600">
        회원가입
      </button>
    </form>
  );
};
