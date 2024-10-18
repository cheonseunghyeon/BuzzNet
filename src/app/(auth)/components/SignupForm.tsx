"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 시도:", { email, name, password, confirmpassword });
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
