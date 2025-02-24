import useNavigateByAuth from "@/hooks/useNavigateByAuth";
import { Loader } from "lucide-react";
import useShortUrlsQuery from "@/tanstack/hooks/shortUrl/useShortUrlsQuery";
import { FormattedMessage, useIntl } from "react-intl";
import ShortUrlCreator from "@/components/ShortUrlCreator";
import ShortUrlItem from "@/components/ShortUrlItem";
import useDeleteShortUrlMutation from "@/tanstack/hooks/shortUrl/useDeleteShortUrlMutation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import useUpdateShortUrlMutation from "@/tanstack/hooks/shortUrl/useUpdateShortUrlMutation";
import { IShortUrl } from "@/tanstack/types/entities";
import UpdateShortUrlModal from "@/components/UpdateShortUrlModal";
import { useForm } from "react-hook-form";
import { TUpdateShortUrlForm, updateShortUrlFormSchema } from "@/components/forms/UpdateShortUrlForm/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateShortUrlForm from "@/components/forms/UpdateShortUrlForm";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Home () {
  const [selectedItem, setSelectedItem] = useState<IShortUrl>();

  const intl = useIntl();

  const form = useForm<TUpdateShortUrlForm>({
    resolver: zodResolver(updateShortUrlFormSchema),
    defaultValues: { slug: '' },
    reValidateMode: 'onChange',
  });

  const { isPending: isAuthPending } = useNavigateByAuth({ errorRoute: '/login' });
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending: isShortUrlsPending
  } = useShortUrlsQuery();

  const deleteShortUrlMutation = useDeleteShortUrlMutation();
  const updateShortUrlMutation = useUpdateShortUrlMutation();

  const handleLoadMoreClick = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const handleDeleteShortUrl = useCallback(async (id: string) => {
    await deleteShortUrlMutation.mutateAsync({ id });

    toast.success(intl.formatMessage({ id: 'notifications.shortUrl.delete.success' }))
  }, [deleteShortUrlMutation, intl]);

  const handleUpdateClick = useCallback((item: IShortUrl) => {
    form.reset({ slug: item.from });
    setSelectedItem(item);
  }, [form]);

  const handleResetStates = useCallback(() => {
    setSelectedItem(undefined);
    form.reset({ slug: '' });
  }, [form]);

  const handleUpdateShortUrl = useCallback(async (values: TUpdateShortUrlForm) => {
    try {
      await updateShortUrlMutation.mutateAsync({
        options: {
          body: JSON.stringify({
            slug: values.slug.trim(),
            publicID: selectedItem?.public_id
          })
        }
      });
      handleResetStates();

      toast.success(intl.formatMessage({ id: 'notifications.shortUrl.update.success' }))
    } catch(err: unknown) {
      const message = getErrorMessage(err);

      if (message) {
        form.setError('slug', { type: 'custom', message })
      }
    }
  }, [form, handleResetStates, intl, selectedItem?.public_id, updateShortUrlMutation]);

  if (isAuthPending || isShortUrlsPending) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="animate-spin size-12" />
      </div>
    )
  }

  return (
    <>
      <UpdateShortUrlModal
        isOpen={!!selectedItem}
        onOpenChange={handleResetStates}
      >
        <UpdateShortUrlForm onSubmit={handleUpdateShortUrl} form={form} />
      </UpdateShortUrlModal>
      <div className="w-full max-w-8xl p-4 flex flex-col gap-4">
        <h1 className="text-4xl">
          <FormattedMessage id="shortUrl.title"/>
        </h1>
        <div>
          <ShortUrlCreator/>
        </div>
        <h3 className="text-2xl">
          <FormattedMessage id="shortUrl.list" />
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {
              (data || []).map((item) => (
                <ShortUrlItem
                  item={item}
                  key={item.public_id}
                  onDelete={handleDeleteShortUrl}
                  onUpdateClick={handleUpdateClick}
                />
              ))
            }
          </div>
          {
            hasNextPage && (
              <div className="flex justify-center">
                <Button disabled={isFetchingNextPage} className="w-fit" onClick={handleLoadMoreClick}>
                  {isFetchingNextPage && (<Loader className="animate-spin"/>)}
                  <FormattedMessage id="shortUrl.loadMore"/>
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Home;
