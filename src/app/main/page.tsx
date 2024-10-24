"use client";

import React, { useState } from "react";
import mockPostsData from "@/mock/Post-mock.json";

import { PostType } from "../types";
import Post from "@/components/PostItem";
import Link from "next/link";
import { useModalStore } from "@/store/modal/useModalStore";
import CreatePostModal from "@/components/ui/modal/CreatePostModal";
import EditPostModal from "@/components/ui/modal/EditPostModal";

const Home = () => {
  const [mockPosts] = useState<PostType[]>(mockPostsData);
  const { showModal } = useModalStore();

  return (
    <div className="max-w-6xl mx-auto pt-4">
      <div className="bg-white shadow-md rounded-lg mb-4">
        <div className="flex items-center p-4">
          <button onClick={() => showModal("createPost")}>게시물 생성</button>
          <button onClick={() => showModal("editPost")}>게시물 수정</button>
          <CreatePostModal id="createPost" />
          <EditPostModal id="editPost" currentContent="현재 게시물 내용" />
        </div>
      </div>
      {mockPosts.map((post, index) => (
        <Link href={`/post/${index}`} key={index}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
