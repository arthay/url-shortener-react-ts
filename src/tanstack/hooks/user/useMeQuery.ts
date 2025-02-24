import { useQuery } from "@tanstack/react-query";
import { USER_INFO_QUERY_KEY } from "./constants";
import getMe from "../../queries/getMe";

const useMeQuery = () => (
  useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: getMe,
    retry: 0
  })
)

export default useMeQuery;
