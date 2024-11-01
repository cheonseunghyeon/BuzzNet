import React from "react";
import CommentItem from "@/components/commons/CommentItem";
import { CommentType } from "@/components/types";

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
