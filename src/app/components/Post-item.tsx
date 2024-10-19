import React from "react";
import { FaHeart, FaComment, FaAngleUp } from "react-icons/fa";
import { PostType } from "../types";

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

      <div className="flex items-center p-4">
        <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
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
    </div>
  );
};

export default Post;
