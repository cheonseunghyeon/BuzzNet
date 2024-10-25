import { useState } from "react";

export const usePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return {
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
  };
};
