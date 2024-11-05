import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { fetchPosts } from "@/lib/post/hooks/fetchPosts";

export const useInfiniteScroll = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: null,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { data, isFetchingNextPage, observerRef };
};
