import { PostType } from "@/components/types";
import React from "react";

interface PostHeaderProps {
  post: PostType;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{post.userName}</h1>
      <p className="text-gray-500 mb-2">{post.postDate}</p>
      <p className="mb-8">{post.postContent}</p>
    </>
  );
};

export default PostHeader;
