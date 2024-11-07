import { PostType } from "@/components/types";
import Link from "next/link";
import React from "react";

interface PostHeaderProps {
  post: PostType;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  console.log(post);
  return (
    <div className="flex flex-col mb-4">
      <Link href={`/profiles/${post.author.uid}`}>
        <div className="flex flex-row items-center">
          {post.author.userimageUrl ? (
            <img src={post.author.userimageUrl} alt="Post" className="w-14 h-14 rounded-full" />
          ) : (
            <div className="w-14 h-14 bg-gray-300 rounded-full" />
          )}
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{post.author.displayName}</h1>
            <p className="text-gray-500">
              {post.createdAt instanceof Date ? post.createdAt.toLocaleString() : post.createdAt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;
