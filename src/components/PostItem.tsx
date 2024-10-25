import React from "react";
import { PostType } from "./types";
import PostActions from "./PostActions";

const Post = ({ post }: { post: PostType }) => {
  const { author, createdAt, content, imageUrl, likes, comments, shares } = post;

  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center p-4">
        <img src="/default-profile.png" alt="Profile" className="w-14 h-14 rounded-full" />
        <div className="ml-4">
          <span className="font-bold text-lg">{author.displayName}</span>
          <span className="text-gray-500 text-sm">{createdAt.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4">{content && <p className="text-gray-700">{content}</p>}</div>

      {imageUrl && <img src={imageUrl} alt="Post" className="w-full h-auto rounded-xl" />}

      <PostActions likes={likes} comments={comments} shares={shares} />
    </div>
  );
};

export default Post;
