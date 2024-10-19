"use client";

import React, { useState } from "react";
import mockPostsData from "../../mock/Post-mock.json";
import { CommentType, PostType } from "../../types";
import PostActions from "@/app/components/PostActions";
import commentsData from "../../mock/comments.json";
import PostHeader from "./components/PostHeader";
import PostImage from "./components/PostImage";
import PostComments from "./components/PostComments";

interface PostDetailProps {
  params: { id: string };
}

const PostDetail = ({ params }: PostDetailProps) => {
  const post = mockPostsData[parseInt(params.id)] as PostType;
  const [comments] = useState<CommentType[]>(commentsData);

  if (!post) {
    return <div>Post not found</div>;
  }

  const postComments = comments.filter(comment => comment.postId === parseInt(params.id));

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <PostHeader post={post} />
        <PostImage postImage={post.postImage} />
        <PostActions likes={post.likes} comments={post.comments} shares={post.shares} />
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <PostComments comments={postComments} />
      </div>
    </div>
  );
};

export default PostDetail;
