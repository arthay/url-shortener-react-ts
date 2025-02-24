import { useQuery } from "@tanstack/react-query";
import { USER_INFO } from "./constants";
import getMe from "../../queries/getMe";

const useMeQuery = () => (
  useQuery({
    queryKey: [USER_INFO],
    queryFn: getMe,
    retry: 0
  })
)

export default useMeQuery;
