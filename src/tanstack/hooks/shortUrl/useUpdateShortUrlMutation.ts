import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SHORT_URLS_QUERY_KEY } from "@/tanstack/hooks/shortUrl/constants";
import updateShortUrl from "@/tanstack/queries/updateShortUrl";

const useUpdateShortUrlMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ options }: { options: RequestInit }) => updateShortUrl(options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SHORT_URLS_QUERY_KEY]});
    },
  })
}

export default useUpdateShortUrlMutation;
