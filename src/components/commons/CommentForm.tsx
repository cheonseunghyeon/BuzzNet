"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAuthStore } from "@/store/auth/useAuthStore";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("로그인 후에 댓글을 작성할 수 있습니다.");
        setLoading(false);
        return;
      }

      // 게시물의 comments 서브컬렉션에 댓글 추가
      await addDoc(collection(db, "posts", postId, "comments"), {
        content,
        createdAt: new Date(),
        author: {
          uid: user.uid,
          displayName: user.name || "Anonymous",
          userImageUrl: user.imageUrl || "/default-profile.png",
        },
      });

      setContent(""); // 댓글 작성 후 입력 내용 초기화
    } catch (err) {
      console.error("댓글 작성 중 오류 발생:", err);
      setError("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold">댓글 작성하기</h2>
        <form onSubmit={handleSubmit} className="relative mt-4">
          <textarea
            placeholder="댓글을 입력하세요"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg resize-none outline-none"
          />

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1"
            >
              {loading ? "작성 중..." : "댓글 작성"}
            </button>
          </div>
        </form>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CommentForm;
