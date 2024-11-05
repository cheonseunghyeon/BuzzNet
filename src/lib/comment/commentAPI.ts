import { AddCommentParams } from "./types";

export async function fetchComments(postId: string, limit: number) {
  const response = await fetch(`/api/post/${postId}/comment?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

export async function addComment({ postId, content, uid, displayName, userImageUrl }: AddCommentParams): Promise<void> {
  const response = await fetch(`/api/post/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      uid,
      displayName,
      userImageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("댓글 작성 중 오류가 발생했습니다.");
  }
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  const response = await fetch(`/api/post/${postId}/comment/${commentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
}
