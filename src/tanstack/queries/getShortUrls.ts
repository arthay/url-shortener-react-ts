import { IShortUrlsApiResponse } from "@/tanstack/types/api";
import request from "@/tanstack/request";

const getShortUrls = (searchParams: URLSearchParams) => request<IShortUrlsApiResponse>(
  {
    path: '/api/short-urls',
    searchParams,
  },
);

export default getShortUrls;
