"use client";
import React from "react";
import { Comment, CommentListProps } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useDeleteComment } from "@/lib/comment/hooks/useDeleteComment";
import { useComments } from "@/lib/comment/hooks/useComments";
import CommentSkeleton from "../Skeleton/CommentSkeleton";

const CommentList: React.FC<CommentListProps> = ({ postId, limit }) => {
  const { data: comments = [], isLoading, isError } = useComments(postId, limit ?? 10);
  const user = useAuthStore(state => state.user);
  const { mutate: deleteComment } = useDeleteComment(postId);

  const handleDeleteComment = (commentId: string) => {
    deleteComment({ commentId });
  };

  if (isLoading) return <CommentSkeleton />;
  if (isError) return <p>Error loading comments.</p>;

  return (
    <div className="space-y-6">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="flex items-start space-x-4 p-4 rounded-lg shadow-sm">
          <div className="w-14 h-14 bg-gray-300 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">{comment.author.displayName}</div>
              <div className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              {user?.uid === comment.author.uid && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 text-xs ml-4 hover:underline"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
