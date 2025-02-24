import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_INFO_QUERY_KEY } from "../user/constants";
import logout from "../../queries/Logout";

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [USER_INFO_QUERY_KEY] });
      localStorage.removeItem('token');
    },
  });
};

export default useLogout;
