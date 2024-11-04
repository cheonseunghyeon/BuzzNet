"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/init";
import { Comment, CommentListProps } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

const CommentList: React.FC<CommentListProps> = ({ postId, limit }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [uid, setUid] = useState("");
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, "posts", postId, "comments");
      const q = limit
        ? query(commentsRef, orderBy("createdAt", "asc"), firestoreLimit(limit))
        : query(commentsRef, orderBy("createdAt", "asc"));

      try {
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => {
          const data = doc.data();
          setUid(data.author.uid);
          return {
            id: doc.id,
            content: data.content,
            createdAt: (data.createdAt as Timestamp).toDate(),
            author: {
              uid: data.author.uid,
              displayName: data.author.displayName,
              userImageUrl: data.author.userImageUrl,
            },
          } as Comment;
        });

        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, limit]);

  const handleDeleteComment = async (commentId: string) => {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    try {
      await deleteDoc(commentRef);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
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
