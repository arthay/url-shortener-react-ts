import request from "../request";

const updateShortUrl = (options: RequestInit) => request(
  { path: `api/short-urls` },
  {
    ...options,
    method: 'PUT'
  },
);

export default updateShortUrl;
