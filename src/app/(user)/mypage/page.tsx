"use client";

import React, { useState } from "react";
import mockPostsData from "@/mock/Post-mock.json";

import { PostType } from "../../../components/types";
import Link from "next/link";
import Post from "@/components/PostItem";

const MyPage = () => {
  const [mockPosts] = useState<PostType[]>(mockPostsData);

  return (
    <div className="pt-4">
      {mockPosts.map((post, index) => (
        <Link href={`/detail/${index}`} key={index}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default MyPage;
