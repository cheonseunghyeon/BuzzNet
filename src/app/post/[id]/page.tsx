"use client";

import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/init";
import { PostType } from "@/components/types";
import PostActions from "@/components/post/PostActions";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import PostHeader from "@/components/post/PostHeader";
import PostImage from "@/components/post/PostImage";
import CommentList from "@/components/comment/CommentList";

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const postRef = doc(db, "posts", params.id);
    const unsubscribe = onSnapshot(postRef, postSnap => {
      if (postSnap.exists()) {
        const data = postSnap.data();
        setPost({
          id: postSnap.id,
          author: {
            displayName: data.author.displayName,
            uid: data.author.uid,
            userimageUrl: data.author.userimageUrl,
          },
          content: data.content,
          createdAt: data.createdAt.toDate(),
          imageUrl: data.imageUrl,
          likes: data.likes,
          comments: data.comments,
          shares: data.shares,
        } as PostType);
        setEditContent(data.content);
      } else {
        console.error("No such post!");
        setPost(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [params.id]);

  const updatePost = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/post/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        setIsEditing(false);
        setIsMenuOpen(false);
      } else {
        console.error("Error updating post:", await response.json());
      }
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const deletePost = async () => {
    if (!post) return;

    try {
      const response = await fetch(`/api/post/${post.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.back();
      } else {
        console.error("Error deleting post:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // const postComments = comments.filter(comment => comment.postId === parseInt(params.id));

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4 relative">
        <div className="flex justify-between items-center">
          <PostHeader post={post} />

          <BsThreeDotsVertical
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="text-2xl cursor-pointer text-gray-500"
          />

          <div
            className={`absolute top-10 right-8 bg-white border border-gray-300 shadow-md rounded-lg p-2 flex flex-col gap-1 transition-all duration-300 ease-in-out transform ${
              isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <button
              onClick={() => setIsEditing(prev => !prev)}
              className="px-4 py-2 text-left text-blue-500 hover:bg-blue-100 rounded-md"
            >
              {isEditing ? "취소" : "수정"}
            </button>
            <button onClick={deletePost} className="px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-md">
              삭제
            </button>
          </div>
        </div>

        <p className="mt-1 mb-8">{post.content}</p>
        <PostImage postImage={post.imageUrl} />
        <PostActions likes={post.likes} comments={post.comments} shares={post.shares} />

        {isEditing && (
          <div className="mt-4">
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button onClick={updatePost} className="px-4 py-2 bg-green-500 text-white rounded-md mt-2">
              저장
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <Link href={`/comment/${post.id}`} key={post.id}>
          <CommentList postId={params.id} />
          {/* <PostComments comments={postComments} /> */}
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
