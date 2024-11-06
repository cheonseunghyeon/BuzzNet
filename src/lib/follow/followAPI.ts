import { db } from "@/firebase/init";
import { collection, getDocs, query, where } from "firebase/firestore";

export const followUser = async (followerId: string, followedId: string) => {
  const response = await fetch(`/api/follow/${followedId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followerId }),
  });

  if (!response.ok) {
    throw new Error("Failed to follow user");
  }

  return response.json();
};

export const unfollowUser = async (followerId: string, followedId: string) => {
  const response = await fetch(`/api/follow/${followedId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followerId }),
  });

  if (!response.ok) {
    throw new Error("Failed to unfollow user");
  }

  return response.json();
};

export const checkIfFollowing = async (followerId: string, followedId: string) => {
  const followingQuery = query(
    collection(db, "followers"),
    where("followerId", "==", followerId),
    where("followedId", "==", followedId),
  );

  const followingSnapshot = await getDocs(followingQuery);
  return !followingSnapshot.empty;
};
