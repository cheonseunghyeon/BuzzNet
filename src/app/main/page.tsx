"use client";

import React, { useState, useEffect } from "react";
import { PostType } from "../../components/types";
import Post from "@/components/PostItem";
import Link from "next/link";
import { fetchPosts } from "@/lib/fetchPosts";
import { FaPaperPlane, FaRegImage } from "react-icons/fa";

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
        <Link href={`/post-create`} className="flex flex-col border border-gray-300 rounded-xl p-2 pr-4 gap-2 ">
          <div className="flex flex-col border border-gray-300 rounded-xl p-2 pr-4 gap-2 cursor-pointer">
            <div className="w-full p-2 border border-white rounded-lg resize-none outline-none text-gray-500">
              내용을 입력하세요
            </div>
            <div className="flex items-center justify-end space-x-4">
              <FaRegImage className="text-2xl text-gray-500" />
              <button className="p-2 bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1">
                Create
                <FaPaperPlane className="text-md" />
              </button>
            </div>
          </div>
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
