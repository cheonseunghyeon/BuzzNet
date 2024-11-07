"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserList from "@/components/user/List/UserList";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useAllUser } from "@/lib/user/hooks/useAllluser";

const fetchFollowers = async (userId: string) => {
  const followersQuery = query(collection(db, "following"), where("followingId", "==", userId));

  const snapshot = await getDocs(followersQuery);

  if (snapshot.empty) {
    console.log("No matching documents.");
    return [];
  }

  return snapshot.docs.map(doc => doc.data().followerId);
};

const Following = () => {
  const [followerIds, setFollowerIds] = useState<string[]>([]);
  const user = useAuthStore(state => state.user);

  //1. 팔로우 유저 uid 저장
  useEffect(() => {
    const loadFollowers = async () => {
      if (user?.uid) {
        const fetchedFollowers = await fetchFollowers(user.uid);
        setFollowerIds(fetchedFollowers);
      }
    };
    loadFollowers();
  }, [user]);

  //2. 해당하는 모든 유저의 값을 배열로 받아오기?
  const { data: followersData = [] } = useAllUser(followerIds);

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <div className="flex justify-between items-center px-28">
          <Link href="/mypage/following">
            <span className="text-lg font-bold text-black cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
              Following
            </span>
          </Link>
          <Link href="/mypage/follower">
            <span className="text-xl font-bold text-gray-500 cursor-pointer transition duration-200 ease-in-out transform hover:text-blue-500 hover:text-xl">
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

export default Following;
