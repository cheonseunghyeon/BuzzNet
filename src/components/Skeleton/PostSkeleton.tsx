import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto animate-pulse">
      <div className="bg-gray-300 h-10 w-3/4 rounded-md" />

      <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
        <div className="bg-gray-300 h-6 w-1/2 rounded-md" />
        <div className="bg-gray-300 h-40 w-full rounded-md" />
        <div className="flex gap-4">
          <div className="bg-gray-300 h-6 w-20 rounded-md" />
          <div className="bg-gray-300 h-6 w-20 rounded-md" />
          <div className="bg-gray-300 h-6 w-20 rounded-md" />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 space-y-3">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="flex-1 space-y-3">
              <div className="bg-gray-300 h-4 w-1/4 rounded-md" />
              <div className="bg-gray-300 h-4 w-full rounded-md" />
              <div className="bg-gray-300 h-4 w-5/6 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSkeleton;
