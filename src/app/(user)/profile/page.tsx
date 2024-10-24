"use client";

import React, { useState } from "react";
import mockPostsData from "@/mock/Post-mock.json";

import { PostType } from "../../types";
import Link from "next/link";
import Post from "@/app/components/PostItem";

const Profile = () => {
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

export default Profile;
