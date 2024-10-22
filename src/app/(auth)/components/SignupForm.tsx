"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "@/lib/auth/hooks/useRegisterUser";
import { SignupFormData } from "../type";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignupFormData>();

  const { mutate: registerUser, isPending: isLoading } = useRegisterUser();

  const onSubmit = (data: SignupFormData) => {
    if (data.password !== data.confirmpassword) {
      alert("Passwords do not match.");
      return;
    }
    registerUser({ email: data.email, password: data.password, name: data.name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-lg mx-auto">
      <div className="mb-2">
        <div className="text-xl font-semibold text-gray-700 mb-2">Email</div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
          })}
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          onKeyUp={() => trigger("email")}
        />
        <p className="text-red-500">
          {errors.email && typeof errors.email.message === "string" ? errors.email.message : "\u00A0"}
        </p>
      </div>
      <div className="mb-2">
        <div className="text-xl font-semibold text-gray-700 mb-2">Name</div>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          onKeyUp={() => trigger("name")}
        />
        <p className="text-red-500">
          {errors.name && typeof errors.name.message === "string" ? errors.name.message : "\u00A0"}
        </p>
      </div>
      <div className="mb-2">
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
        <p className="text-red-500">
          {errors.password && typeof errors.password.message === "string" ? errors.password.message : "\u00A0"}
        </p>
      </div>
      <div className="mb-2">
        <div className="text-xl font-semibold text-gray-700 mb-2">Confirm Password</div>
        <input
          {...register("confirmpassword", { required: "Please confirm your password" })}
          type="password"
          placeholder="Confirm your password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          onKeyUp={() => trigger("confirmpassword")}
        />
        <p className="text-red-500">
          {errors.confirmpassword && typeof errors.confirmpassword.message === "string"
            ? errors.confirmpassword.message
            : "\u00A0"}
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "회원가입"}
      </button>
    </form>
  );
};
