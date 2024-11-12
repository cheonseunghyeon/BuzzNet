import { SignupForm } from "@/components/auth/SignupForm";
import React from "react";

const SignupPage = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Welcome to BuzzNet</h1>
      <p className="text-center text-gray-500 mb-8">BuzzNet에 가입하세요.</p>
      <SignupForm />
    </>
  );
};

export default SignupPage;
