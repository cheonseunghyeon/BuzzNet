"use client";

import React, { useState } from "react";
import mockPostsData from "@/mock/Post-mock.json";

import { PostType } from "../../components/types";
import Post from "@/components/PostItem";
import Link from "next/link";

const Home = () => {
  const [mockPosts] = useState<PostType[]>(mockPostsData);
  return (
    <div className="max-w-6xl mx-auto pt-4">
      <div className="bg-white shadow-md rounded-lg mb-4">
        <Link href={`/post-create`}>
          <div className="flex items-center p-4">게시물 생성</div>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg mb-4"></div>
      {mockPosts.map((post, index) => (
        <Link href={`/post/${index}`} key={index}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
