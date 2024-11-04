"use client";
import React, { useEffect, useState } from "react";
import { Comment, CommentListProps } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

const CommentList: React.FC<CommentListProps> = ({ postId, limit }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [uid, setUid] = useState("");
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/post/${postId}/comment?limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch comments");

        const data = await response.json();
        setComments(data);
        if (data.length > 0) {
          setUid(data[0].author.uid);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, limit]);

  const handleDeleteComment = async (commentid: string) => {
    try {
      const response = await fetch(`/api/post/${postId}/comment/${commentid}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete comment");

      setComments(prevComments => prevComments.filter(comment => comment.id !== commentid));
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="flex items-start space-x-4  p-4 rounded-lg shadow-sm">
          {comment.author.userImageUrl ? (
            <div className="w-14 h-14 bg-gray-300 rounded-full" />
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-full" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">{comment.author.displayName}</div>
              <div className="text-gray-500 text-xs">{comment.createdAt.toLocaleString()}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              {uid == user?.uid && (
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
