"use client";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/init";

export const SocialLoginButtons = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google 로그인 성공:", user);
    } catch (error) {
      console.error("Google 로그인 오류:", error);
    }
  };

  const handleFacebookLogin = () => {
    // 임시로 Facebook 로그인 처리
    console.log("Facebook 로그인");
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center w-full max-w-xs p-4 bg-white text-black border border-gray-300 rounded-lg hover:border-gray-500 mr-2"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        <span>Google 로그인</span>
      </button>
      <button
        onClick={handleFacebookLogin}
        className="flex items-center justify-center w-full max-w-xs p-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 ml-2"
      >
        <FaFacebook className="w-6 h-6 mr-2" />
        <span>Facebook 로그인</span>
      </button>
    </div>
  );
};
