"use client";

import React, { useState } from "react";
import mockPostsData from "@/mock/Post-mock.json";

import { PostType } from "../types";
import Post from "../components/PostItem";
import Link from "next/link";

const Home = () => {
  const [mockPosts] = useState<PostType[]>(mockPostsData);

  return (
    <div className="max-w-6xl mx-auto pt-4">
      {mockPosts.map((post, index) => (
        <Link href={`/detail/${index}`} key={index}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
