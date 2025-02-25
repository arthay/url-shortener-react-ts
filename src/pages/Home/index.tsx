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
import useLogoutMutation from "@/tanstack/hooks/auth/useLogoutMutation";
import { useNavigate } from "react-router";

function Home () {
  const [selectedItem, setSelectedItem] = useState<IShortUrl>();

  const intl = useIntl();
  const navigate = useNavigate();

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
  const logoutMutation = useLogoutMutation();

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
    if (updateShortUrlMutation.isPending) {
      return;
    }

    setSelectedItem(undefined);
    form.reset({ slug: '' });
  }, [form, updateShortUrlMutation.isPending]);

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

  const handleCopyShortUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url);

    toast.success(intl.formatMessage({ id: 'notifications.shortUrl.copy.success' }))
  }, [intl]);

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync();

    navigate('/login');
  }, [logoutMutation, navigate]);

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
      <div className=" relative w-full place-self-center max-w-8xl p-4 flex flex-col gap-4">
        <div className="absolute right-4 top-4">
          <Button disabled={logoutMutation.isPending} onClick={handleLogout}>
            {logoutMutation.isPending && <Loader className="animate-spin" />}
            Logout
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl">
            <FormattedMessage id="shortUrl.title"/>
          </h1>
          <div>
            <ShortUrlCreator disabled={logoutMutation.isPending || deleteShortUrlMutation.isPending} />
          </div>
        </div>
        <h3 className="text-3xl place-self-center">
          <FormattedMessage id="shortUrl.list"/>
        </h3>
        <div className="flex flex-col gap-2 max-w-full">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-2 justify-center place-items-center">
            {
              (data || []).map((item) => (
                <ShortUrlItem
                  item={item}
                  key={item.public_id}
                  disabledCTA={logoutMutation.isPending || deleteShortUrlMutation.isPending}
                  onDelete={handleDeleteShortUrl}
                  onUpdateClick={handleUpdateClick}
                  onCopyUrl={handleCopyShortUrl}
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
