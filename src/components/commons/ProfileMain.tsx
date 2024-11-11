"use client";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFollow } from "@/lib/follow/hooks/useFollow";
import { useUnfollow } from "@/lib/follow/hooks/useUnfollow";
import { useUser } from "@/lib/user/hooks/useUser";
import { useCheckIfFollow } from "@/lib/follow/hooks/useCheckIfFollow";
import { useRouter } from "next/navigation";
import { useGetOrCreateChatRoom } from "@/lib/chat/hooks/useChatRoom";

const ProfileMain = ({ uid }: { uid: string }) => {
  const { data: author, isLoading: isAuthorLoading, isError: isAuthorError } = useUser(uid);
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const { data: isFollowing, isLoading: isFollowingLoading } = useCheckIfFollow(user?.uid ?? "", uid);

  const { mutate: follow } = useFollow();
  const { mutate: unfollow } = useUnfollow();
  const { mutate: createChatRoom } = useGetOrCreateChatRoom();

  const handleFollow = () => {
    if (!user || !user.uid) {
      console.error("User not logged in");
      return;
    }

    if (isFollowing) {
      unfollow({ followerId: user.uid, followedId: uid });
    } else {
      follow({ followerId: user.uid, followedId: uid });
    }
  };

  const handleMessage = () => {
    if (!user || !user.uid) {
      console.error("User not logged in");
      return;
    }

    createChatRoom(
      { user1Id: user.uid, user2Id: uid },
      {
        onSuccess: chatRoomId => {
          router.push(`/mypage/chat/${chatRoomId}`);
        },
      },
    );
  };

  if (isAuthorLoading || isFollowingLoading) return <p>Loading...</p>;
  if (isAuthorError) return <p>Error loading user data</p>;
  if (!author) return <p>No user found</p>;

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
        <button
          onClick={handleMessage}
          className="px-5 py-2 font-medium rounded-lg shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          메시지
        </button>
      </div>
    </div>
  );
};

export default ProfileMain;
