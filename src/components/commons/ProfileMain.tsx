"use client";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAuthStore } from "@/store/auth/useAuthStore";

interface Author {
  name: string;
  imageUrl?: string;
  bio?: string;
}

const ProfileMain = ({ uid }: { uid: string }) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useAuthStore(state => state.user);

  const followUser = async (followerId: string, followedId: string) => {
    try {
      await addDoc(collection(db, "followers"), {
        followerId,
        followedId,
      });

      await addDoc(collection(db, "following"), {
        followerId,
        followingId: followedId,
      });
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const unfollowUser = async (followerId: string, followedId: string) => {
    try {
      const followersQuery = query(
        collection(db, "followers"),
        where("followerId", "==", followerId),
        where("followedId", "==", followedId),
      );
      const followersSnapshot = await getDocs(followersQuery);
      followersSnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
      });

      const followingQuery = query(
        collection(db, "following"),
        where("followerId", "==", followerId),
        where("followingId", "==", followedId),
      );
      const followingSnapshot = await getDocs(followingQuery);
      followingSnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const handleFollow = async () => {
    if (!user || !user.uid) {
      console.error("User not logged in");
      return;
    }

    if (isFollowing) {
      await unfollowUser(user.uid, uid);
    } else {
      await followUser(user.uid, uid);
    }

    setIsFollowing(prev => !prev);
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (uid) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setAuthor(docSnap.data() as Author);
          } else {
            console.log("No such user!");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    const checkIfFollowing = async () => {
      if (user && user.uid && uid) {
        const followingQuery = query(
          collection(db, "followers"),
          where("followerId", "==", user.uid),
          where("followedId", "==", uid),
        );

        const followingSnapshot = await getDocs(followingQuery);
        setIsFollowing(!followingSnapshot.empty);
      }
    };

    fetchAuthorData();
    checkIfFollowing();
  }, [uid, user]);

  if (!author) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-6">
      {author.imageUrl ? (
        <img
          src={author.imageUrl}
          alt="User Image"
          className="w-28 h-28 rounded-full shadow-md border-4 border-white -mt-14"
        />
      ) : (
        <div className="w-28 h-28 bg-gray-200 rounded-full shadow-md border-4 border-white -mt-14" />
      )}

      <h1 className="text-3xl font-semibold mt-6 text-gray-800">{author.name}</h1>

      <p className="text-gray-600 text-center mt-2 px-4">{author.bio}</p>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleFollow}
          className={`px-5 py-2 font-medium rounded-lg shadow-md transition-all duration-200 ${
            isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isFollowing ? "언팔로우" : "팔로우"}
        </button>
        <button className="px-5 py-2 font-medium rounded-lg shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800">
          메시지
        </button>
      </div>
    </div>
  );
};

export default ProfileMain;
