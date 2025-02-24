import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Link } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { TCreateShortUrlForm } from "@/components/forms/CreateShortUrlForm/validation.schema";

export interface ILoginFormProps {
  onSubmit: (values: TCreateShortUrlForm) => Promise<void>;
  form: UseFormReturn<TCreateShortUrlForm>;
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
              name="url"
              disabled={isFieldsDisabled}
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="leading-loose text-foreground">
                    <FormattedMessage id="form.field.url"/>
                  </FormLabel>
                  <FormControl ref={field.ref}>
                    <div className="relative">
                      <Input
                        className="pl-8"
                        placeholder={intl.formatMessage({id: "form.field.url"})}
                        {...field}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Link className="w-4 h-4"/>
                    </span>
                    </div>
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
              {isLoading && (<Loader className="animate-spin"/>)}
              <FormattedMessage id="form.button.create"/>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CreateShortUrlForm;
