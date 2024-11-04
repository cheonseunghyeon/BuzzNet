"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import CommentList from "@/components/comment/CommentList";

const CommentPage = () => {
  const { id: postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

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
      const response = await fetch(`/api/comment/create/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          uid: user.uid,
          displayName: user.name,
          userImageUrl: user.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 작성 중 오류가 발생했습니다.");
      }

      setNewComment("");
    } catch (err) {
      console.error(err);
      setError("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-full mx-auto p-4 flex flex-col gap-5">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">댓글 리스트</h2>

        <CommentList postId={postId as string} limit={100} />
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
