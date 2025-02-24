import { ICreateShortUrlApiResponse } from "../types/api";
import request from "../request";

const createShortUrl = (options: RequestInit) => request<ICreateShortUrlApiResponse>(
  { path: 'api/short-urls'},
  {
    ...options,
    method: 'POST'
  },
);

export default createShortUrl;
