import { useMutation } from '@tanstack/react-query';
import register from "../../queries/register";

const useRegisterMutation = () =>
  useMutation({
    mutationFn: ({ options }: { options: RequestInit }) => register(options),
  });

export default useRegisterMutation;
