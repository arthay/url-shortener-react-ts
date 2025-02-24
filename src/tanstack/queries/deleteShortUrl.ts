import request from "../request";

const deleteShortUrl = (id: string) => request(
  { path: `api/short-urls/${id}` },
  { method: 'DELETE' },
);

export default deleteShortUrl;
