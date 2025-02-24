import { UseFormReturn } from "react-hook-form";
import { TLoginForm } from "@/components/forms/LoginForm/validation.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Loader, Mail } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";

export interface ILoginFormProps {
  onSubmit: (values: TLoginForm) => Promise<void>;
  form: UseFormReturn<TLoginForm>;
  isLoading?: boolean;
  isDisabled?: boolean;
}

function LoginForm({
  onSubmit,
  form,
  isLoading = false,
  isDisabled = false,
}: ILoginFormProps) {
  const isFieldsDisabled = isLoading || isDisabled;
  const intl = useIntl();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            disabled={isFieldsDisabled}
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel
                  className="leading-loose text-foreground">
                  <FormattedMessage id="form.field.email" />
                </FormLabel>
                <FormControl ref={field.ref}>
                  <div className="relative">
                    <Input
                      className="pl-8"
                      type="email"
                      placeholder={intl.formatMessage({ id: "form.field.email" })}
                      {...field}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Mail className="w-4 h-4 text-foreground"/>
                    </span>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="password"
              disabled={isFieldsDisabled}
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="leading-loose text-foreground">
                    <FormattedMessage id="form.field.password" />
                  </FormLabel>
                  <FormControl ref={field.ref}>
                    <PasswordInput
                      placeholder={intl.formatMessage({ id: "form.field.password" })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <Button
              variant="default"
              type="submit"
              className="w-full"
              disabled={isFieldsDisabled}
            >
              {isLoading && (<Loader className="animate-spin" />)}
              <FormattedMessage id="form.button.login" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
