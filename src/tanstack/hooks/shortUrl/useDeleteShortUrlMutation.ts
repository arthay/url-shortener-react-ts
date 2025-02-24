import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SHORT_URLS_QUERY_KEY } from "@/tanstack/hooks/shortUrl/constants";
import deleteShortUrl from "@/tanstack/queries/deleteShortUrl";

const useDeleteShortUrlMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteShortUrl(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHORT_URLS_QUERY_KEY]});
    },
  })
}

export default useDeleteShortUrlMutation;
