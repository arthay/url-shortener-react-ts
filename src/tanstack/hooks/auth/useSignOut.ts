import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_INFO } from "../user/constants";
import signOut from "../../queries/signOut";

const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [USER_INFO] });
      localStorage.removeItem('token');
    },
  });
};

export default useSignOut;
