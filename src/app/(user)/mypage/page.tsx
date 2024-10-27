"use client";

import React, { useEffect, useState } from "react";

import { PostType } from "../../../components/types";
import Link from "next/link";
import Post from "@/components/PostItem";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/init";

const MyPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const postsData = snapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          } as PostType),
      );
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
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

export default MyPage;
