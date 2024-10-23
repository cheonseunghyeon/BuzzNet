import React, { useState } from "react";
import ModalLayout from "./layout";

const CreatePostModal: React.FC<{ id: string }> = ({ id }) => {
  const [postContent, setPostContent] = useState("");

  const handleCreatePost = () => {
    console.log("게시물 생성:", postContent);
  };

  return (
    <ModalLayout id={id} title="게시물 생성" onConfirm={handleCreatePost}>
      <textarea
        value={postContent}
        onChange={e => setPostContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="게시물 내용을 입력하세요."
      />
    </ModalLayout>
  );
};

export default CreatePostModal;
