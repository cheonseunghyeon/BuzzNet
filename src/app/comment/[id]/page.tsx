// pages/comment/[id]/page.tsx

"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAuthStore } from "@/store/auth/useAuthStore";
import CommentList from "./components/CommentList";

const CommentPage = () => {
  const { id: postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  // 댓글 추가하기
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      const newCommentData = {
        content: newComment,
        createdAt: new Date(),
        author: {
          uid: user.uid,
          displayName: user.name || "Anonymous",
          userImageUrl: user.imageUrl || "/default-profile.png",
        },
      };

      await addDoc(collection(db, "posts", postId as string, "comments"), newCommentData);
      setNewComment("");
    } catch (err) {
      console.error("댓글 작성 중 오류:", err);
      setError("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-full mx-auto p-4 flex flex-col gap-5">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">댓글 리스트</h2>

        <CommentList postId={postId as string} />
        <form onSubmit={handleAddComment} className="flex flex-col gap-2 mt-4">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          />
          <button type="submit" disabled={loading} className="p-2 bg-blue-500 text-white rounded-lg mt-4">
            {loading ? "작성 중..." : "댓글 작성"}
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CommentPage;