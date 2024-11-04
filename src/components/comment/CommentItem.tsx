import React from "react";
import { FaHeart } from "react-icons/fa";
import { CommentType } from "../types";

const CommentItem = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex items-center mb-4">
      <img src={comment.profileImage} alt="Profile" className="w-14 h-14 rounded-full" />
      <div className="ml-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm">{comment.userName}</span>
          <span className="text-gray-500 text-xs">{comment.commentDate}</span>
        </div>
        <p className="text-gray-700">{comment.commentText}</p>
        <div className="flex items-center space-x-1 text-red-500 hover:text-red-600">
          <FaHeart className="w-4 h-4" />
          <span>{comment.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
