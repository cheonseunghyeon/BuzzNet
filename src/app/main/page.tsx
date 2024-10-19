"use client";
import React, { useState } from "react";
import mockPostsData from "../mock/Post-mock.json";

import { PostType } from "../types";
import Post from "../components/Post-item";

const Home = () => {
  const [mockPosts] = useState<PostType[]>(mockPostsData);

  return (
    <div className="max-w-6xl mx-auto pt-4">
      {mockPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Home;
