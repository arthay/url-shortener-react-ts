import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IntlProvider } from "react-intl";
import enMessages from "@/assets/translations/en.json";
import { RouterProvider } from "react-router-dom";
import routes from "@/routes";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const locale = 'en';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <IntlProvider messages={enMessages} locale={locale}>
        <RouterProvider router={routes} />
        <Toaster />
      </IntlProvider>
    </QueryClientProvider>
  );
}

export default App;
