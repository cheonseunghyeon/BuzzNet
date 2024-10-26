import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/init";
import { PostType } from "@/components/types";

export const fetchPosts = async (): Promise<PostType[]> => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      author: {
        displayName: data.author.displayName,
        uid: data.author.uid,
      },
      content: data.content,
      createdAt: data.createdAt.toDate(),
      imageUrl: data.imageUrl,
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
    } as PostType;
  });
};
