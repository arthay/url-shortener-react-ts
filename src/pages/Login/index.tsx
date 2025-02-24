import LoginForm from "@/components/forms/LoginForm";
import { useForm } from "react-hook-form";
import { loginFormSchema, TLoginForm } from "@/components/forms/LoginForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginMutation from "@/tanstack/hooks/auth/useLoginMutation";
import { useCallback } from "react";
import useNavigateByAuth from "@/hooks/useNavigateByAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login () {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const { isPending } = useNavigateByAuth({ successRoute: '/' });

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
    reValidateMode: 'onChange',
  })

  const handleSubmitLoginForm = useCallback(async (values: TLoginForm) => {
    await loginMutation.mutateAsync({
      options: {
        body: JSON.stringify(values)
      }
    });

    navigate('/');
  }, [loginMutation, navigate]);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <div>
        <LoginForm
          onSubmit={handleSubmitLoginForm}
          form={form}
          isLoading={loginMutation.isPending}
          isDisabled={isPending}
        />
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
