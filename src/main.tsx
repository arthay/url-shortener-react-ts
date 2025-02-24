import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import enMessages from "@/assets/translations/en.json";

import './index.css'
import routes from "@/routes";
import { IntlProvider } from "react-intl";

const local = 'en';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <IntlProvider messages={enMessages} locale={local}>
        <RouterProvider router={routes} />
      </IntlProvider>
    </QueryClientProvider>
  </StrictMode>,
)
