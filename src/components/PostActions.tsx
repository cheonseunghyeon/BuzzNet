import React from "react";
import { FaHeart, FaComment, FaAngleUp } from "react-icons/fa";

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
}

const PostActions = ({ likes, comments, shares }: PostActionsProps) => {
  return (
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
  );
};

export default PostActions;
