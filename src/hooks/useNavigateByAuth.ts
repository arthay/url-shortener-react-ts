import useMeQuery from "@/tanstack/hooks/user/useMeQuery";
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface IUseAuthCheckProps {
  successRoute?: string;
  errorRoute?: string;
}

const useNavigateByAuth = ({
  successRoute,
  errorRoute
}: IUseAuthCheckProps) => {
  const { isPending, isError} = useMeQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (isError) {
      if (errorRoute) {
        navigate(errorRoute);
      }

      return;
    }

    if (successRoute) {
      navigate(successRoute);
    }
  }, [isError, errorRoute, isPending, navigate, successRoute]);

  return {
    isPending
  }
}

export default useNavigateByAuth;
