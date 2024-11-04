export async function getPost(postId: string) {
  const response = await fetch(`/api/post/${postId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  return response.json();
}

export async function updatePost(postId: string, content: string) {
  const response = await fetch(`/api/post/update/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
}

export async function deletePost(postId: string) {
  const response = await fetch(`/api/post/delete/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return response.json();
}
