import React from "react";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg shadow-sm animate-pulse">
          <div className="w-14 h-14 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="w-24 h-4 bg-gray-300 rounded-md" />
              <div className="w-16 h-4 bg-gray-300 rounded-md" />
            </div>
            <div className="w-full h-4 bg-gray-300 rounded-md" />
            <div className="w-3/4 h-4 bg-gray-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
