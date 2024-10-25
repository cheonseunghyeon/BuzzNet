"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { CommentType, PostType } from "@/components/types";
import PostActions from "@/components/PostActions";
import commentsData from "@/mock/comments.json";
import PostHeader from "./components/PostHeader";
import PostImage from "./components/PostImage";
import PostComments from "./components/PostComments";

export interface PostDetailProps {
  params: { id: string };
}

const PostDetail = ({ params }: PostDetailProps) => {
  const [post, setPost] = useState<PostType | null>(null); // 단일 게시물 데이터 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postRef = doc(db, "posts", params.id); // 특정 게시물 참조
        const postSnap = await getDoc(postRef); // 게시물 데이터 가져오기

        if (postSnap.exists()) {
          const data = postSnap.data();
          setPost({
            id: postSnap.id,
            author: {
              displayName: data.author.displayName,
              uid: data.author.uid,
            },
            content: data.content,
            createdAt: data.createdAt.toDate(),
            imageUrl: data.imageUrl,
            likes: data.likes,
            comments: data.comments,
            shares: data.shares,
          } as PostType);
        } else {
          console.error("No such post!");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params.id]);

  const [comments] = useState<CommentType[]>(commentsData);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const postComments = comments.filter(comment => comment.postId === parseInt(params.id));

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <PostHeader post={post} />
        <PostImage postImage={post.imageUrl} />
        <PostActions likes={post.likes} comments={post.comments} shares={post.shares} />
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <PostComments comments={postComments} />
      </div>
    </div>
  );
};

export default PostDetail;
