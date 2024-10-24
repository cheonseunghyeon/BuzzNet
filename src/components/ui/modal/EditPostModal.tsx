import React, { useState } from "react";
import Layout from "./layout";

const EditPostModal: React.FC<{ id: string; currentContent: string }> = ({ id, currentContent }) => {
  const [postContent, setPostContent] = useState(currentContent);

  const handleEditPost = () => {
    console.log("게시물 수정:", postContent);
  };

  return (
    <Layout id={id} title="게시물 수정" onConfirm={handleEditPost}>
      <textarea
        value={postContent}
        onChange={e => setPostContent(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </Layout>
  );
};

export default EditPostModal;
