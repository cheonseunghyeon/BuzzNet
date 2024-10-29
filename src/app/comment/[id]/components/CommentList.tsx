"use client";
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, Timestamp, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/init";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    uid: string;
    displayName: string;
    userImageUrl: string;
  };
}

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedComments = querySnapshot.docs.map(doc => {
        const data = doc.data();
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
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="flex items-start space-x-4  p-4 rounded-lg shadow-sm">
          {comment.author.userImageUrl ? (
            // <img src={comment.author.userImageUrl} alt="Post" className="w-14 h-14 rounded-full" />
            <div className="w-14 h-14 bg-gray-300 rounded-full" />
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-full" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-800">{comment.author.displayName}</div>
              <div className="text-gray-500 text-xs">{comment.createdAt.toLocaleString()}</div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
