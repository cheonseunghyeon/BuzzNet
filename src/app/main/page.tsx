"use client";

import React, { useState, useEffect } from "react";
import { PostType } from "../../components/types";
import Post from "@/components/PostItem";
import Link from "next/link";
import { fetchPosts } from "@/lib/fetchPosts";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  console.log(posts);
  return (
    <div className="max-w-6xl mx-auto pt-4">
      <div className="bg-white shadow-md rounded-lg mb-4">
        <Link href={`/post-create`}>
          <div className="flex items-center p-4">게시물 생성</div>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">로딩 중...</div>
      ) : (
        posts.map(post => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <Post post={post} />
          </Link>
        ))
      )}
    </div>
  );
};

export default Home;
