"use client";
import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaAngleUp } from "react-icons/fa";
import { PostActionsProps } from "../types";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

const PostActions = ({ postId, userId, initialLikes = [], comments, shares }: PostActionsProps) => {
  const likesArray = Array.isArray(initialLikes) ? initialLikes : [];
  const [likes, setLikes] = useState(initialLikes.length);
  const [isLiked, setIsLiked] = useState(likesArray.includes(userId ?? ""));

  const toggleLike = async () => {
    if (!userId || !postId) return;

    const postRef = doc(db, "posts", postId);
    const newIsLiked = !isLiked;

    try {
      if (newIsLiked) {
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
        setLikes(prevLikes => prevLikes + 0);
      } else {
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
        setLikes(prevLikes => prevLikes - 1);
      }
      setIsLiked(newIsLiked);
    } catch (error) {
      console.error("좋아요 업데이트 오류:", error);
    }
  };

  useEffect(() => {
    if (!postId) return;

    const fetchPostLikes = async () => {
      const postRef = doc(db, "posts", postId);

      try {
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const likesArray = Array.isArray(data?.likes) ? data.likes : [];
          setLikes(likesArray.length);
          setIsLiked(userId ? likesArray.includes(userId) : false);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchPostLikes();
  }, [postId, userId]);

  if (!postId) {
    console.error("postId가 정의되지 않았습니다.");
    return null;
  }

  return (
    <div className="flex items-center pt-4 pl-2 pb-4">
      <button
        onClick={toggleLike}
        className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-600`}
      >
        <FaHeart className="w-6 h-6" />
        <span>{likes}</span>
      </button>
      <button className="flex items-center space-x-1 ml-12 text-blue-500 hover:text-blue-600">
        <FaComment className="w-6 h-6" />
        <span>{comments}</span>
      </button>
      <button className="flex items-center space-x-1 ml-12 text-gray-500 hover:text-gray-600">
        <FaAngleUp className="w-6 h-6" />
        <span>{shares}</span>
      </button>
    </div>
  );
};

export default PostActions;
