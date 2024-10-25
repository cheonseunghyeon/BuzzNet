import { PostType } from "@/components/types";
import React from "react";

interface PostHeaderProps {
  post: PostType;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{post.author.displayName}</h1>
      <p className="text-gray-500 mb-2">
        {post.createdAt instanceof Date ? post.createdAt.toLocaleString() : post.createdAt}
      </p>
      <p className="mb-8">{post.content}</p>
    </>
  );
};

export default PostHeader;
