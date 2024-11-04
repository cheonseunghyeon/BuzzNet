import PostMain from "@/components/post/PostMain";
import { fetchPosts } from "@/lib/post/hooks/fetchPosts";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function MainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts({ pageParam: null }),
    initialPageParam: null,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostMain />
    </HydrationBoundary>
  );
}
