"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useImageUpload } from "@/lib/post/hooks/useImageUpload";
import { usePostForm } from "@/lib/post/hooks/usePostForm";
import { useRouter } from "next/navigation";
import { FaRegImage, FaPaperPlane } from "react-icons/fa";

const PostCreateForm: React.FC = () => {
  const { content, setContent, image, setImage } = usePostForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  const router = useRouter();
  const { uploadImage } = useImageUpload();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (!user) {
        setError("로그인 후에 게시물을 작성할 수 있습니다.");
        setLoading(false);
        return;
      }

      const postRef = await addDoc(collection(db, "posts"), {
        content,
        imageUrl,
        createdAt: new Date(),
        author: {
          uid: user.uid,
          displayName: user.name || "Anonymous",
          userimageUrl: user.imageUrl,
        },
        likes: 0,
        comments: 0,
        shares: 0,
      });

      console.log(postRef);
      setContent("");
      setImage(null);

      router.back();
    } catch (err) {
      console.error("Error creating post: ", err);
      setError("게시물 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-3xl font-bold">게시물 작성하기</h2>
        <div className="text-center my-4">
          <hr className="border-t-2 border-gray-300 w-full" />
        </div>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 mr-4" />
          <div className="text-xl font-semibold">{user?.name || "Anonymous"}</div>
        </div>

        <div className={`text-xl mb-4 font-semibold ${content ? "text-gray-800" : "text-gray-400"}`}>
          {content ? content : `${user?.name || "Anonymous"}님 무슨 생각을 하고 계신가요?`}
        </div>

        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="미리보기"
              className="w-full h-auto object-contain my-4 rounded-lg "
            />
          </div>
        )}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col border border-gray-300 rounded-xl p-2 pr-4 gap-2">
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={e => setContent(e.target.value)}
              onInput={e => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              required
              className="w-full p-2 border border-white rounded-lg resize-none outline-none"
            />

            <div className="flex items-center justify-end space-x-4">
              <label htmlFor="file-input">
                <FaRegImage className="text-2xl cursor-pointer text-gray-500" />
              </label>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <button
                type="submit"
                disabled={loading}
                className="p-2 bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1"
              >
                Create
                <FaPaperPlane className="text-md cursor-pointer" />
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PostCreateForm;
