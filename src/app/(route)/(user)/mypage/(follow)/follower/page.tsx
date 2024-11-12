"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserList from "@/components/user/List/UserList";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAllUser } from "@/lib/user/hooks/useAllluser";

const fetchFollowers = async (userId: string) => {
  const followersQuery = query(collection(db, "following"), where("followerId", "==", userId));

  const snapshot = await getDocs(followersQuery);

  if (snapshot.empty) {
    console.log("No matching documents.");
    return [];
  }

  return snapshot.docs.map(doc => doc.data().followingId);
};

const Follower = () => {
  const [followerIds, setFollowerIds] = useState<string[]>([]);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const loadFollowers = async () => {
      if (user?.uid) {
        const fetchedFollowers = await fetchFollowers(user.uid);
        setFollowerIds(fetchedFollowers);
      }
    };
    loadFollowers();
  }, [user]);

  const { data: followersData = [] } = useAllUser(followerIds);

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <div className="flex justify-between items-center px-28">
          <Link href="/mypage/following">
            <span className="text-lg font-bold text-gray-500 cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
              Following
            </span>
          </Link>
          <Link href="/mypage/follower">
            <span className="text-xl font-bold text-black cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
              Follower
            </span>
          </Link>
        </div>

        <hr className="my-4 border-gray-300 border-t-2" />

        <UserList users={followersData} />
      </div>
    </div>
  );
};

export default Follower;
