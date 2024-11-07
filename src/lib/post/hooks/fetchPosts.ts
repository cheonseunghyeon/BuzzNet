import { query, collection, orderBy, limit, startAfter, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/init";
import { PostType } from "@/components/types";

// fetchPosts.ts에서
export const fetchPosts = async ({ pageParam = null }: { pageParam?: string | null }) => {
  const postsQuery = pageParam
    ? query(collection(db, "posts"), orderBy("createdAt", "desc"), startAfter(pageParam), limit(5))
    : query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(5));

  const snapshot = await getDocs(postsQuery);
  const posts: PostType[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      author: data.author || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      likes: data.likes || 0,
      comments: data.comments || 0,
      shares: data.shares || 0,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
    };
  });

  const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;
  return { posts, nextCursor: lastVisible, hasMore: snapshot.docs.length === 5 };
};
