import { useMutation, useQueryClient } from "@tanstack/react-query";
import createShortUrl from "@/tanstack/queries/createShortUrl";
import { SHORT_URLS_QUERY_KEY } from "@/tanstack/hooks/shortUrl/constants";

const useCreateShortUrlMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ options }: { options: RequestInit }) => createShortUrl(options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHORT_URLS_QUERY_KEY]});
    },
  })
}

export default useCreateShortUrlMutation;
