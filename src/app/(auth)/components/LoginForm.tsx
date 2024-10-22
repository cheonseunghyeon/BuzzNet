"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useLogin } from "@/lib/auth/hooks/useLogin";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <FormInput type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-blue-500 text-white p-4 mb-4 rounded-lg hover:bg-blue-600">
        {isLoading ? "로그인 중..." : "로그인"}
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
