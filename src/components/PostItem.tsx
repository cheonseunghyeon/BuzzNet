import React from "react";
import { PostType } from "../types";
import PostActions from "./PostActions";

const Post = ({ post }: { post: PostType }) => {
  const { userName, profileImage, postDate, postContent, postImage, likes, comments, shares } = post;

  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center p-4">
        <img src={profileImage} alt="Profile" className="w-14 h-14 rounded-full" />
        <div className="ml-4">
          <div className="flex flex-col">
            <span className="font-bold text-lg">{userName}</span>
            <span className="text-gray-500 text-sm">{postDate}</span>
          </div>
        </div>
      </div>

      <div className="p-4">{postContent && <p className="text-gray-700">{postContent}</p>}</div>

      {postImage && <img src={postImage} alt="Post" className="w-full h-auto rounded-xl" />}

      <PostActions likes={likes} comments={comments} shares={shares} />
    </div>
  );
};

export default Post;
