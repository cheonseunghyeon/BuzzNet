export const userAPI = async (uid: string) => {
  const response = await fetch(`/api/user/${uid}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to follow user");
  }

  return response.json();
};
