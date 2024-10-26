import { PostType } from "@/components/types";
import React from "react";

interface PostHeaderProps {
  post: PostType;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{post.author.displayName}</h1>
        <p className="text-gray-500 mb-2">
          {post.createdAt instanceof Date ? post.createdAt.toLocaleString() : post.createdAt}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
