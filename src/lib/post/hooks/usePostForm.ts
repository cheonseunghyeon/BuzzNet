import { useState } from "react";

export const usePostForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return {
    content,
    setContent,
    image,
    setImage,
  };
};
