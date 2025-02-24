import { useInfiniteQuery } from '@tanstack/react-query';
import getShortUrls from "@/tanstack/queries/getShortUrls";
import { SHORT_URLS_QUERY_KEY } from './constants';

const useShortUrlsQuery = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [SHORT_URLS_QUERY_KEY],
    queryFn: ({pageParam}) => {
      const searchParams = new URLSearchParams('itemsPerPage=20');
      searchParams.set('currentPage', String(pageParam));
      return getShortUrls(searchParams);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (
      lastPage ? lastPage.pagination?.currentPage === lastPage.pagination?.totalPages
          ? undefined
          : lastPage.pagination?.currentPage + 1
        : undefined
    ),
  });

  return {
    data: data?.pages.flatMap((item) => item?.urls || []) || [],
    ...rest
  }
};

export default useShortUrlsQuery;
