import { useCallback, useState } from "react";
import { useGetAllUserNotesQuery } from "../../store/noteApi/note.api";

const useGetAllUserNotesQueryWithFetchMore = (
  isImportant?: boolean,
  onlyWithoutFolder?: boolean,
  options?: Record<string, unknown>
) => {
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, isLoading, refetch } = useGetAllUserNotesQuery(
    { isImportant, page, onlyWithoutFolder },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
      ...options,
    }
  );

  const fetchMore = useCallback(async () => {
    // Increment the page to load more data
    if (!isLoading && data && data.pageInfo.totalPages >= page) {
      setIsFetchingMore(true);

      try {
        await new Promise((resolve) => {
          // Simulate an asynchronous operation (replace with your actual data fetching logic)
          setTimeout(() => {
            // Increment the page to load more data
            setPage((prevPage) => prevPage + 1);
            setIsFetchingMore(false);
            resolve(true); // Resolve the promise to indicate the operation is complete
          }, 1000); // Simulated delay for demonstration purposes
        });
      } catch (error) {
        console.error("Error fetching more data:", error);
        setIsFetchingMore(false);
      }
    }
  }, [isLoading, data, page]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const response = refetch();
    if (response instanceof Promise) {
      try {
        await response;
      } finally {
        setIsRefreshing(false);
      }
    } else {
      setIsRefreshing(false);
    }
  }, [refetch]);

  if (!data) {
    return {
      notes: [],
      isLoading,
      isRefreshing,
      isFetchingMore,
      fetchMore: () => null,
      onRefresh: () => null,
    };
  }

  const { notes, pageInfo } = data;

  return {
    notes,
    pageInfo,
    isLoading,
    fetchMore,
    onRefresh,
    isRefreshing,
    isFetchingMore,
  };
};

export default useGetAllUserNotesQueryWithFetchMore;
