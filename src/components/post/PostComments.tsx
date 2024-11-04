import React from "react";
import { CommentType } from "@/components/types";
import CommentItem from "../comment/CommentItem";

interface PostCommentsProps {
  comments: CommentType[];
}

const PostComments = ({ comments }: PostCommentsProps) => {
  return (
    <div className="p-4">
      {comments.length > 0 ? (
        comments.map((comment, index) => <CommentItem key={index} comment={comment} />)
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostComments;
