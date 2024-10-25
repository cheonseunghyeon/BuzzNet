"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useImageUpload } from "@/lib/post/hooks/useImageUpload";
import { usePostForm } from "@/lib/post/hooks/usePostForm";
import { useRouter } from "next/navigation";

const PostCreateForm: React.FC = () => {
  const { title, setTitle, content, setContent, image, setImage } = usePostForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  const router = useRouter();
  const { uploadImage } = useImageUpload();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (!user) {
        setError("로그인 후에 게시물을 작성할 수 있습니다.");
        setLoading(false);
        return;
      }

      const postRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl,
        createdAt: new Date(),
        author: {
          uid: user.uid,
          displayName: user.name || "Anonymous",
        },
        likes: 0,
        comments: 0,
        shares: 0,
      });

      console.log(postRef);
      setTitle("");
      setContent("");
      setImage(null);

      router.push("/main");
    } catch (err) {
      console.error("Error creating post: ", err);
      setError("게시물 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-create-form">
      <h2>게시물 작성하기</h2>

      <div>
        <input type="text" placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div>
        <textarea placeholder="내용을 입력하세요" value={content} onChange={e => setContent(e.target.value)} required />
      </div>

      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <p>선택된 이미지: {image.name}</p>}
      </div>

      <div>
        <button type="submit" disabled={loading}>
          {loading ? "게시물 작성 중..." : "게시물 작성"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default PostCreateForm;
