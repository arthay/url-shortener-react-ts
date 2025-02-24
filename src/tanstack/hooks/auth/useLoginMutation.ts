import { useMutation } from '@tanstack/react-query';

import login from "../../queries/login";

const useLogin = () => {
  return useMutation({
    mutationFn: ({ options }: { options: RequestInit }) => login(options),
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem('token', data.token);
      }
    },
  });
};

export default useLogin;
