"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useLogin } from "@/lib/auth/hooks/useLogin";
import Toast from "@/components/ui/Toast";
import { LoginFormData } from "../types";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginFormData>();
  const { mutate: login, isPending: isLoading } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toast />
      <div className="text-xl font-semibold text-gray-700 mb-2">Email</div>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
        })}
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 border border-gray-300 rounded-lg "
        onKeyUp={() => trigger("email")}
      />
      <p className="text-red-500 mb-2">
        {errors.email && typeof errors.email.message === "string" ? errors.email.message : "\u00A0"}
      </p>

      <div className="text-xl font-semibold text-gray-700 mb-2">Password</div>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
        type="password"
        placeholder="Enter your password"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onKeyUp={() => trigger("password")}
      />
      <p className="text-red-500 mb-4">
        {errors.password && typeof errors.password.message === "string" ? errors.password.message : "\u00A0"}
      </p>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-4 mb-4 rounded-lg hover:bg-blue-600 mt-2"
        disabled={isLoading}
      >
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
