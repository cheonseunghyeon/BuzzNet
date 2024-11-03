"use client";
import React from "react";
import Link from "next/link";
import Post from "@/components/post/PostItem";
import { FaPaperPlane, FaRegImage } from "react-icons/fa";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";

const Home = () => {
  const { data, isFetchingNextPage, observerRef } = useInfiniteScroll();

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

      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.posts.map(post => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Post post={post} />
            </Link>
          ))}
        </React.Fragment>
      ))}
      <div ref={observerRef}>{isFetchingNextPage && <p>로딩 중...</p>}</div>
    </div>
  );
};

export default Home;
