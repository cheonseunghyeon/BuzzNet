import React from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">Welcome to BuzzNet</h1>
      <p className="text-center text-gray-500 mb-8">BuzzNet에 로그인하세요. 임시 소개 문구 입니다</p>
      <LoginForm />
      <div className="flex justify-center mt-8">
        <p className="text-center">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline ml-2">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
