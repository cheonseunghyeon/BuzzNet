"use client";
import React from "react";
import PostActions from "./PostActions";
import { PostType } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

const Post = ({ post }: { post: PostType }) => {
  const { author, createdAt, content, imageUrl, likes, comments, shares } = post;
  const user = useAuthStore(state => state.user);
  const userId = user?.uid;
  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center p-4">
        <div className="w-14 h-14 bg-gray-300 rounded-full" />

        <div className="ml-4 flex flex-col">
          <span className="font-bold text-lg">{author.displayName}</span>
          <span className="text-gray-500 text-sm">{createdAt.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4">{content && <p className="text-gray-700">{content}</p>}</div>

      {imageUrl && <img src={imageUrl} alt="Post" className="w-full h-auto rounded-xl" />}
      <PostActions
        postId={post.id} // 게시물 ID
        userId={userId} // 현재 로그인한 사용자 ID
        initialLikes={likes} // 초기 좋아요 상태
        comments={comments}
        shares={shares}
      />
    </div>
  );
};

export default Post;
