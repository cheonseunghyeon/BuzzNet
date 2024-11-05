"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import CommentList from "@/components/comment/CommentList";
import { useAddComment } from "@/lib/comment/hooks/useAddComment";

const CommentPage = () => {
  const { id: postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const user = useAuthStore(state => state.user);

  const { mutate: addComment, isPending: loading, isError, error } = useAddComment();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    addComment({
      postId: postId as string,
      content: newComment,
      uid: user.uid,
      displayName: user.name,
      userImageUrl: user.imageUrl ?? "",
    });

    if (!isError) {
      setNewComment("");
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

        {isError && <p className="text-red-500">{(error as Error).message}</p>}
      </div>
    </div>
  );
};

export default CommentPage;
