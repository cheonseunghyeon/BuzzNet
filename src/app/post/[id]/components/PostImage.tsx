import React from "react";

interface PostImageProps {
  postImage: string | undefined;
}

const PostImage = ({ postImage }: PostImageProps) => {
  if (!postImage) return null;

  return <img src={postImage} alt="Post Image" className="w-full h-auto rounded-lg mb-8" />;
};

export default PostImage;
