"use client";

import React, { useEffect, useState } from "react";

import { PostType } from "../../../components/types";
import Link from "next/link";
import { fetchPosts } from "@/lib/fetchPosts";
import Post from "@/components/post/PostItem";

const Profile = () => {
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

  return (
    <div className="pt-4">
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

export default Profile;
