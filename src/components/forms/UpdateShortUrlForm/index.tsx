import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { TUpdateShortUrlForm } from "@/components/forms/UpdateShortUrlForm/validation.schema";

export interface ILoginFormProps {
  onSubmit: (values: TUpdateShortUrlForm) => Promise<void>;
  form: UseFormReturn<TUpdateShortUrlForm>;
  isLoading?: boolean;
  isDisabled?: boolean;
}

function CreateShortUrlForm({
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
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="slug"
              disabled={isFieldsDisabled}
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="leading-loose text-foreground">
                    <FormattedMessage id="form.field.slug"/>
                  </FormLabel>
                  <FormControl ref={field.ref}>
                    <div className="relative">
                      <Input
                        placeholder={intl.formatMessage({id: "form.field.slug"})}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
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
              <FormattedMessage id="form.button.update" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CreateShortUrlForm;
