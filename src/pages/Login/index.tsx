import LoginForm from "@/components/forms/LoginForm";
import { useForm } from "react-hook-form";
import { loginFormSchema, TLoginForm } from "@/components/forms/LoginForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginMutation from "@/tanstack/hooks/auth/useLoginMutation";
import { useCallback } from "react";
import useNavigateByAuth from "@/hooks/useNavigateByAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

function Login () {
  const intl = useIntl();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const { isPending } = useNavigateByAuth({ successRoute: '/' });

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
    reValidateMode: 'onChange',
  });

  const handleSubmitLoginForm = useCallback(async (values: TLoginForm) => {
    try {
      await loginMutation.mutateAsync({
        options: {
          body: JSON.stringify(values)
        }
      });

      navigate('/');
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      if (err) {
        toast.error(intl.formatMessage({ id: `validations.${message}` }));
      }
    }
  }, [intl, loginMutation, navigate]);

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
        <Link to="/register">
          <FormattedMessage id="link.register" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
