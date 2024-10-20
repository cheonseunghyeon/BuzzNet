"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      router.push("/main");
    } catch (error: unknown) {
      if (error instanceof Error) {
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <FormInput type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-blue-500 text-white p-4 mb-4 rounded-lg hover:bg-blue-600">
        로그인
      </button>

      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">또는</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <SocialLoginButtons />
    </form>
  );
};
