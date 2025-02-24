import RegisterForm from "@/components/forms/RegisterForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { registerFormSchema, TRegisterForm } from "@/components/forms/RegisterForm/validation.schema";
import useRegisterMutation from "@/tanstack/hooks/auth/useRegisterMutation";
import { useNavigate } from "react-router";
import useNavigateByAuth from "@/hooks/useNavigateByAuth";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { isPending } = useNavigateByAuth({ successRoute: '/' +
      '' });

  const registerMutation = useRegisterMutation();

  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {email: '', password: ''},
    reValidateMode: 'onChange',
  });

  const handleSubmitRegisterForm = useCallback(async (values: TRegisterForm) => {
    await registerMutation.mutateAsync({
      options: {
        body: JSON.stringify(values)
      }
    });

    navigate('/login');
  }, [navigate, registerMutation]);

  return (
    <div
      className="w-screen h-screen flex flex-col gap-4 justify-center items-center"
    >
      <div>
        <RegisterForm
          form={form}
          isLoading={registerMutation.isPending}
          onSubmit={handleSubmitRegisterForm}
          isDisabled={isPending}
        />
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
