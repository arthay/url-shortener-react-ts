import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateShortUrlForm from "@/components/forms/CreateShortUrlForm";
import { useForm } from "react-hook-form";
import { createShortUrlFormSchema, TCreateShortUrlForm } from "@/components/forms/CreateShortUrlForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import useCreateShortUrlMutation from "@/tanstack/hooks/shortUrl/useCreateShortUrlMutation";
import { toast } from "sonner";
import { useIntl } from "react-intl";

interface IShortUrlCreatorProps {
  disabled?: boolean;
}

function ShortUrlCreator({
  disabled = false
}: IShortUrlCreatorProps) {
  const intl = useIntl();
  const form = useForm<TCreateShortUrlForm>({
    resolver: zodResolver(createShortUrlFormSchema),
    defaultValues: { url: ''},
    reValidateMode: 'onChange',
  });

  const createShortUrlMutation = useCreateShortUrlMutation();

  const handleCreateShortUrl = useCallback(async (values: TCreateShortUrlForm) => {
    await createShortUrlMutation.mutateAsync({
      options: {
        body: JSON.stringify({ to: values.url })
      }
    });

    form.reset({ url: '' });

    toast.success(intl.formatMessage({ id: 'notifications.shortUrl.create.success' }));
  }, [createShortUrlMutation, form, intl]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create short url</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <CreateShortUrlForm
            onSubmit={handleCreateShortUrl}
            form={form}
            isDisabled={disabled}
            isLoading={createShortUrlMutation.isPending}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ShortUrlCreator;
