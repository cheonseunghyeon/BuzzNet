"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

interface Author {
  name: string;
  imageUrl?: string;
  bio?: string;
}

const ProfileMain = ({ uid }: { uid: string }) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

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

    fetchAuthorData();
  }, [uid]);

  const handleFollow = () => {
    setIsFollowing(prev => !prev);
    // 팔로우/언팔로우 로직 추가 필요 시 여기에서 처리
  };

  if (!author) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto mt-6">
      {/* 유저 이미지 */}
      {author.imageUrl ? (
        <img
          src={author.imageUrl}
          alt="User Image"
          className="w-28 h-28 rounded-full shadow-md border-4 border-white -mt-14"
        />
      ) : (
        <div className="w-28 h-28 bg-gray-200 rounded-full shadow-md border-4 border-white -mt-14" />
      )}

      {/* 유저 이름 */}
      <h1 className="text-3xl font-semibold mt-6 text-gray-800">{author.name}</h1>

      {/* 유저 소개 */}
      <p className="text-gray-600 text-center mt-2 px-4">{author.bio}</p>

      {/* 버튼들 */}
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
