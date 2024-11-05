"use client";

import React, { useState } from "react";
import PostActions from "@/components/post/PostActions";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import PostHeader from "@/components/post/PostHeader";
import PostImage from "@/components/post/PostImage";
import CommentList from "@/components/comment/CommentList";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { usePost } from "@/lib/post/hooks/usePost";
import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useUpdatePost } from "@/lib/post/hooks/useUpdatePost";
import PostSkeleton from "@/components/Skeleton/PostSkeleton";
import { useQueryClient } from "@tanstack/react-query";

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const { data: post, isLoading, isError } = usePost(params.id);
  const { mutate: deletePost } = useDeletePost(params.id);
  const { mutate: updatePost } = useUpdatePost();
  const queryClient = useQueryClient();
  const handleUpdate = () => {
    updatePost(
      { postId: params.id, content: editContent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["post", params.id] });
          setIsEditing(false);
        },
      },
    );
  };

  const handleDelete = () => {
    deletePost(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.back();
      },
    });
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (isError || !post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4 relative">
        <div className="flex justify-between items-center">
          <PostHeader post={post} />
          {post.author.uid == user?.uid && (
            <BsThreeDotsVertical
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="text-2xl cursor-pointer text-gray-500"
            />
          )}

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
            <button onClick={handleDelete} className="px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-md">
              삭제
            </button>
          </div>
        </div>

        <p className="mt-1 mb-8">{post.content}</p>
        <PostImage postImage={post.imageUrl} />
        <PostActions
          postId={post.id}
          userId={user?.uid}
          initialLikes={post.likes}
          comments={post.comments}
          shares={post.shares}
        />
        {isEditing && (
          <div className="mt-4">
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button onClick={handleUpdate} className="px-4 py-2 bg-green-500 text-white rounded-md mt-2">
              저장
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <Link href={`/comment/${post.id}`} key={post.id}>
          <CommentList postId={params.id} limit={3} />
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
